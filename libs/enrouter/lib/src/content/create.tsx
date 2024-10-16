import type { ReactElement } from "react";

import type { Match } from "#lib/match/mod.js";
import type { Content } from "./mod.js";
import { logger } from "#lib/debug.js";
import { ContentProvider } from "./context.js";
import { NotFound } from "./notFound.js";

const log = logger("content/create");

export function createContent(matches: Match[]): ReactElement[] {
  log("Creating matched content");

  const content = matches.map(toContent);
  const elements = render(content);

  log("Matched content created");

  return elements;
}

function toContent(match: Match): Content {
  const content: Content = {
    match,
  };

  function wrapChildren([key, children]: [string, ReactElement]) {
    const el = (
      <ContentProvider key={key} value={content}>
        {children}
      </ContentProvider>
    );
    return [key, el];
  }

  // do not render if match.next !== undefined
  if (!match.next && match.route.elements.index) {
    content.index = Object.fromEntries(
      Object.entries(match.route.elements.index).map((entry) => {
        log(
          'Creating content from index component "%s" matched by "%s"',
          entry[0],
          match.route.path,
        );
        return wrapChildren(entry);
      }),
    );
  }

  if (match.route.elements.layout) {
    content.layout = Object.fromEntries(
      Object.entries(match.route.elements.layout).map((entry) => {
        log(
          'Creating content from layout component "%s" matched by "%s"',
          entry[0],
          match.route.path,
        );
        return wrapChildren(entry);
      }),
    );
  }

  return content;
}

function render(content: Content[]): ReactElement[] {
  // 404?
  if (!content.at(-1)?.match.isFull) {
    log("404: %o", content);

    const i = content.findLastIndex((x) => x.match.route.elements.notFound);
    if (i === -1) {
      return [<NotFound />];
    }

    content = content.slice(0, i + 1);

    const x = content[i]!;
    x.index = x.match.route.elements.notFound;
  }

  const last = content.at(-1);
  content.forEach((x, i) => {
    x.prev = content[i - 1];
    x.next = content[i + 1];
    x.last = last;
  });

  return Object.values(content[0]?.layout ?? {});
}
