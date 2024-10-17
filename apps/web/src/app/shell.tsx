import type { PropsWithChildren } from "react";
import { useContext } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("shell");

export function Shell({ children }: PropsWithChildren) {
  log("Rendering");

  const ctx = useContext<{ styles: string[] } | undefined>();

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N28HCL4GB9"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-N28HCL4GB9');
`,
          }}
        ></script>
        <meta charSet="utf-8" />
        <meta name="description" content="Put your description here" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>enrouter</title>
        <link rel="icon" type="image/svg+xml" href="/javascript.svg" />
        {ctx?.styles?.map((href) => (
          <link key={href} rel="stylesheet" href={href}></link>
        ))}
      </head>
      <body className="bg-paper">{children}</body>
    </html>
  );
}
