import { StrictMode } from "react";

import { createLog } from "#log.js";

const log = createLog("shell");

interface ShellProps {
  stylesheets?: string[];
}

export function Shell({
  stylesheets,
  children,
}: React.PropsWithChildren<ShellProps>) {
  log("Rendering");

  return (
    <StrictMode>
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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>enrouter</title>
          <link rel="icon" type="image/svg+xml" href="/javascript.svg" />
          {stylesheets?.map((href) => (
            <link key={href} rel="stylesheet" href={href}></link>
          ))}
        </head>
        <body className="bg-paper">{children}</body>
      </html>
    </StrictMode>
  );
}
