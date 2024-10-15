/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

//@ts-ignore
import _createSsrHandler from "@enrouter/web/ssr";
import manifest from "@enrouter/web/manifest";

import { type ViteManifest } from "enrouter/vite/manifest";

// TODO: export from @enrouter/web
type CreateSsrHandler = (manifest?: ViteManifest) => (
  req: Request,
  ctx: {
    isBot: boolean;
  },
) => Promise<Response>;

const createSsrHandler = _createSsrHandler as CreateSsrHandler;

const ssrHandler = createSsrHandler(manifest);

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/random":
        return new Response(crypto.randomUUID());
      default:
        return ssrHandler(request, { isBot: false });
    }
  },
} satisfies ExportedHandler<Env>;
