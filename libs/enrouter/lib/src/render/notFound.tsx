import { useLocation } from "#lib/hooks.js";

export function NotFound() {
  const location = useLocation();

  return `${location} is not found`;
}
