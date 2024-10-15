import { resolve } from "node:path";
import { Readable } from "node:stream";

import express from "express";
import morgan from "morgan";
import { createServer as createViteServer } from "vite";
import { type ViteManifest } from "enrouter/vite/manifest";

import { createFetchRequest } from "./fetch.js";

const WEB_PATH = resolve(import.meta.dirname, "../../web");
const VITE_CONFIG_PATH = resolve(WEB_PATH, "configs/vite.config.ts");
const SSR_PATH = resolve(WEB_PATH, "src/ssr.tsx");
const PORT = 8000;

interface SsrModule {
  createSsrHandler: (manifest?: ViteManifest) => (
    req: Request,
    ctx: {
      isBot: boolean;
    },
  ) => Promise<Response>;
}

const app = express();

app.use(morgan("dev"));

const vite = await createViteServer({
  configFile: VITE_CONFIG_PATH,
});

app.use(vite.middlewares);

app.use(async (req, res) => {
  const { createSsrHandler } = (await vite.ssrLoadModule(SSR_PATH, {
    fixStacktrace: true,
  })) as SsrModule;

  const ssrHandler = createSsrHandler();

  const fetchReq = createFetchRequest(req, res);

  const { body } = await ssrHandler(fetchReq, { isBot: false });

  Readable.fromWeb(body!).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Dev server is listening on port ${PORT}`);
});
