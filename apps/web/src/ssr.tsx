//@ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";
import * as enrouter from "enrouter";
import { type ViteManifest, getModuleAssets } from "enrouter/vite/manifest";
//@ts-ignore
import { routes } from "virtual:enrouter/vite/routes";

import { log } from "#log.js";
import { Shell } from "./shell.js";

export default createSsrHandler;

enrouter.debug(console.debug);

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

      const matches = await enrouter.match({ routes, location });
      if (!matches.at(-1)?.isFull) {
        status = 404;
      }

      let bootstrapStyles: string[] = [];
      let bootstrapModules: string[] = [mapAssetUrl("src/main.tsx")];

      if (manifest) {
        const entryAssets = getModuleAssets({
          manifest,
          moduleId: "src/main.tsx",
        });

        const matchedAssets = matches.flatMap((x) =>
          x.route?.modules.map((x) =>
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

      log("SSR: %o", {
        location,
        status,
        bootstrapModules,
      });

      const children = (
        <Shell styles={bootstrapStyles}>
          <enrouter.Static location={location} matches={matches} />
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
