//@ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";

import {
  buildRoutesWithViteManifest,
  buildRouteHandlers,
  loadRouteMatches,
  matchRoutes,
  StaticRouter,
  debug,
} from "enrouter";
import { Shell } from "./shell.js";
import { createLog } from "#log.js";
//import { modules } from "./modules.js";
//@ts-ignore
import { modules } from "virtual:routeModules";
import manifest from "@enrouter/web/manifest";

debug(console.debug);

const log = createLog("ssr");

export async function createSSRHandler() {
  // TODO: prebuild
  const routes = buildRoutesWithViteManifest({
    modules,
    manifest,
    mapAssetUrl: (x) => new URL(x, "http://localhost").pathname,
    entryId: "src/main.tsx",
  });

  if (!routes) {
    throw new Error("No routes found");
  }

  const handlers = buildRouteHandlers(routes);

  return async function ssrHandler(req: Request) {
    const isCrawler = false;

    let status = 200;

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000);

      const location = new URL(req.url, "http://localhost").pathname;

      const matches = matchRoutes({ handlers, location });
      if (!matches.at(-1)?.isFull) {
        status = 404;
      }
      await loadRouteMatches({ matches, modules });

      const stylesheets = [
        ...new Set(matches.flatMap((x) => x.handler.route.link[0])),
      ];

      const $ROUTES = JSON.stringify(routes);

      const bootstrapScriptContent = `
window.$ROUTES = ${$ROUTES};`;

      const bootstrapModules = [
        ...new Set([...matches.flatMap((x) => x.handler.route.link[1])]),
      ];

      log("Rendering Shell: %o", {
        location,
        status,
        bootstrapScriptContent,
        bootstrapModules,
        $ROUTES_LENGTH: $ROUTES.length,
      });

      const children = (
        <Shell stylesheets={stylesheets}>
          <StaticRouter
            handlers={handlers}
            location={location}
            matches={matches}
          />
        </Shell>
      );

      const stream = await renderToReadableStream(children, {
        signal: controller.signal,
        bootstrapScriptContent,
        bootstrapModules,
        onError(err: unknown) {
          status = 500;
          console.error(err, "renderToReadableStream.onError");
        },
      });

      if (isCrawler) {
        await stream.allReady;
      }

      return new Response(stream, {
        status,
        headers: { "Content-Type": "text/html" },
      });
    } catch (err) {
      console.error(err);

      return new Response("SSR error", {
        status: 500,
      });
    }
  };
}
