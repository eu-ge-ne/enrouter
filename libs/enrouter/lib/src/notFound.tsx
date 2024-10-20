import type { ReactNode } from "react";

import { useLocation } from "./router/location.js";

export function NotFound(): ReactNode {
  const location = useLocation();

  return (
    <div>
      <b>enrouter:</b> <mark>{location}</mark> is not found
    </div>
  );
}
