//@ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";

import {
  debug,
  loadRouteMatches,
  matchRoutes,
  StaticRouter,
  getModuleAssets,
} from "enrouter";
import { Shell } from "./shell.js";
import { createLog } from "#log.js";
import manifest from "@enrouter/web/manifest";
//@ts-ignore
import { handlers } from "virtual:routes";

debug(console.debug);

const log = createLog("ssr");

const mapAssetUrl = (x: string) => new URL(x, "http://localhost").pathname;

export async function createSSRHandler() {
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
      await loadRouteMatches({ matches });

      const entryAssets = getModuleAssets({
        manifest,
        moduleId: "src/main.tsx",
      });

      const matchedAssets = matches.flatMap((x) =>
        x.handler.route.modules.map((x) =>
          getModuleAssets({
            manifest,
            moduleId: x.id,
          }),
        ),
      );

      const assets = [entryAssets, ...matchedAssets].filter(
        (x) => x !== undefined,
      );

      const stylesheets = [...new Set(assets.flatMap((x) => x.styles))].map(
        mapAssetUrl,
      );

      const bootstrapModules = [
        ...new Set([...assets.flatMap((x) => x.modules)]),
      ].map(mapAssetUrl);

      log("Rendering Shell: %o", {
        location,
        status,
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
