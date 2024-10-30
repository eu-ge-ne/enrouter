import { useMatch } from "#lib/match/context.js";

export function Root() {
  const match = useMatch();

  return match?.route.elements._layout?.Root;
}
