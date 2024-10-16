import { useLocation } from "#lib/router/hooks.js";

export function NotFound() {
  const location = useLocation();

  return `${location} is not found`;
}
