import { StrictMode } from "react";

interface ShellProps {
  stylesheets?: string[];
}

export function Shell({
  stylesheets,
  children,
}: React.PropsWithChildren<ShellProps>) {
  console.log("Rendering Shell");

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
        <body className="bg-orange-50">{children}</body>
      </html>
    </StrictMode>
  );
}
