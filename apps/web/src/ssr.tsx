//@ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";

import {
  buildRoutes,
  buildRouteHandlers,
  loadRouteHandlers,
  matchRoutes,
  StaticRouter,
} from "enrouter";
//@ts-ignore
import viteManifest from "@enrouter/web/manifest";
import { Shell } from "./shell.js";
import { modules } from "./routes.js";
import { createManifest } from "./manifest.js";

export async function createSSRHandler() {
  const getModuleAssets = createManifest(
    (x) => new URL(x, "http://localhost").pathname,
    viteManifest,
  );

  const routes = buildRoutes({
    entryId: "src/main.tsx",
    modules,
    getModuleAssets,
  });

  if (!routes) {
    throw new Error("No routes found");
  }

  const handlers = buildRouteHandlers({ routes });

  await loadRouteHandlers({ handlers, modules });

  console.log("Handlers: %O", handlers);

  return async function ssrHandler(req: Request) {
    const isCrawler = false;

    let caughtError: Error | undefined;

    function getStatusCode(): number {
      if (!caughtError) {
        return 200;
      }
      return 500;
    }

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000);

      const location = new URL(req.url, "http://localhost").pathname;

      const matches = matchRoutes({ handlers, location });

      console.log("Matches: %O", matches);

      const stylesheets = [
        ...new Set(matches.flatMap((x) => x.handler.route.link.css)),
      ];

      const bootstrapScriptContent = `
window.$ROUTES = ${JSON.stringify(routes)};`;

      const bootstrapModules = [
        ...new Set([...matches.flatMap((x) => x.handler.route.link.mod)]),
      ];

      console.log("Rendering the shell: %O", {
        location,
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
          caughtError = err as Error;
          console.error(err, "renderToReadableStream.onError");
        },
      });

      if (isCrawler) {
        await stream.allReady;
      }

      return new Response(stream, {
        status: getStatusCode(),
        headers: { "Content-Type": "text/html" },
      });
    } catch (err) {
      console.error(err);

      return new Response("SSR error", {
        status: getStatusCode(),
      });
    }
  };
}
