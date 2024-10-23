import type { Route } from "./mod.js";
//@ts-ignore
import routeTree from "virtual:enrouter/vite/routes";

export function getRouteTree(): Route {
  return routeTree;
}
