import type { ReactNode } from "react";

import { useLocation } from "#lib/router/location.js";

export function NotFound(): ReactNode {
  const location = useLocation();

  return `${location} is not found`;
}
