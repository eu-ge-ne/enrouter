//@ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";

import {
  buildRoutes,
  buildRouteHandlers,
  loadRouteHandlers,
  matchRoutes,
  StaticRouter,
} from "enrouter";
import { Shell } from "./shell.js";
import { modules } from "./routes.js";
import { assets } from "./assets.js";
import { createLog } from "#log.js";

const log = createLog("ssr");

export async function createSSRHandler() {
  log("Building routes");

  const routes = buildRoutes({ entryId: "src/main.tsx", modules, assets });
  if (!routes) {
    throw new Error("No routes found");
  }

  log("Routes built: %O", routes);

  const handlers = buildRouteHandlers(routes);

  await loadRouteHandlers({ handlers, modules });

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

      const stylesheets = [
        ...new Set(matches.flatMap((x) => x.handler.route.link[0])),
      ];

      const bootstrapScriptContent = `
window.$ROUTES = ${JSON.stringify(routes)};`;

      const bootstrapModules = [
        ...new Set([...matches.flatMap((x) => x.handler.route.link[1])]),
      ];

      log("Rendering Shell: %O", {
        location,
        status,
        bootstrapScriptContent,
        bootstrapModules,
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
