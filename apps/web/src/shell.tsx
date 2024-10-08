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
          <meta charSet="utf-8" />
          <meta name="description" content="Put your description here" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>enrouter</title>
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          {stylesheets?.map((href) => (
            <link key={href} rel="stylesheet" href={href}></link>
          ))}
        </head>
        <body className="bg-customBackground">{children}</body>
      </html>
    </StrictMode>
  );
}
