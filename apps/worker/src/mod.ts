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
import { hello } from "enrouter";
//@ts-ignore
import { ssr as _ssr } from "@enrouter/web";

const ssr = _ssr as (req: Request) => Promise<Response>;

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/message":
        return new Response(`${hello()} ${new Date().toLocaleString()}`);
      case "/random":
        return new Response(crypto.randomUUID());
      default:
        //return new Response("Not Found Error", { status: 500 });
        return ssr(request);
    }
  },
} satisfies ExportedHandler<Env>;
