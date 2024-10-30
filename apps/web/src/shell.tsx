import { type PropsWithChildren, StrictMode } from "react";

import { log } from "#log.js";

interface ShellProps {
  styles?: string[];
}

export function Shell({ styles, children }: PropsWithChildren<ShellProps>) {
  log("Rendering Shell");

  return (
    <StrictMode>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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
          <title>enrouter</title>
          <meta
            name="description"
            content="File based router library for React"
          />
          <link rel="icon" type="image/svg+xml" href="/javascript.svg" />
          {styles?.map((href) => (
            <link key={href} rel="stylesheet" href={href}></link>
          ))}
        </head>
        <body>{children}</body>
      </html>
    </StrictMode>
  );
}
