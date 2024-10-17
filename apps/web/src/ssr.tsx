import { StrictMode } from "react";
//@ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";

import { debug, matchRoutes, prepareMatches, StaticRouter } from "enrouter";
import { type ViteManifest, getModuleAssets } from "enrouter/vite/manifest";

import { createLog } from "#log.js";
//@ts-ignore
import { routes } from "virtual:routes";

export default createSsrHandler;

debug(console.debug);

const log = createLog("ssr");

const mapAssetUrl = (x: string) => new URL(x, "http://localhost").pathname;

interface SsrHandlerCtx {
  isBot: boolean;
}

function createSsrHandler(manifest: ViteManifest) {
  return async function handleSsrRequest(
    req: Request,
    { isBot }: SsrHandlerCtx,
  ) {
    let status = 200;

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000);

      const location = new URL(req.url, "http://localhost").pathname;

      const matches = matchRoutes({ routes, location });
      if (!matches.at(-1)?.isFull) {
        status = 404;
      }
      await prepareMatches(matches);

      let bootstrapStyles: string[] = [];
      let bootstrapModules: string[] = [mapAssetUrl("src/main.tsx")];

      if (manifest) {
        const entryAssets = getModuleAssets({
          manifest,
          moduleId: "src/main.tsx",
        });

        const matchedAssets = matches.flatMap((x) =>
          x.route.modules.map((x) =>
            getModuleAssets({
              manifest,
              moduleId: x.id,
            }),
          ),
        );

        const assets = [entryAssets, ...matchedAssets].filter(
          (x) => x !== undefined,
        );

        bootstrapStyles = [...new Set(assets.flatMap((x) => x.styles))].map(
          mapAssetUrl,
        );

        bootstrapModules = [
          ...new Set([...assets.flatMap((x) => x.modules)]),
        ].map(mapAssetUrl);
      }

      log("Rendering Shell: %o", {
        location,
        status,
        bootstrapModules,
      });

      const children = (
        <StrictMode>
          <StaticRouter
            routes={routes}
            location={location}
            matches={matches}
            ctx={{ styles: bootstrapStyles }}
          />
        </StrictMode>
      );

      const stream = await renderToReadableStream(children, {
        signal: controller.signal,
        bootstrapModules,
        onError(err: unknown) {
          status = 500;
          console.error(err, "renderToReadableStream.onError");
        },
      });

      if (isBot) {
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
