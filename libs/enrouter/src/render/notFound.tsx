import { useLocation } from "#hooks.js";

export function NotFound() {
  const location = useLocation();

  return `${location} is not found`;
}
