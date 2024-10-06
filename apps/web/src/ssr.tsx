//@ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";

import { Shell } from "./shell.js";
import { App } from "./app.js";

const isCrawler = false;

export async function ssr(_req: Request, { manifest }: { manifest: any }) {
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

    const bootstrapModules: string[] = [manifest["src/main.tsx"].file];

    const stylesheets = manifest["src/main.tsx"].css;

    const children = (
      <Shell stylesheets={stylesheets}>
        <App />
      </Shell>
    );

    const stream = await renderToReadableStream(children, {
      signal: controller.signal,
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
}
