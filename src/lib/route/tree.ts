import type { Route } from "./route.js";
//@ts-ignore
import routeTree from "virtual:enrouter";

export function getRouteTree(): Route {
  return routeTree;
}
