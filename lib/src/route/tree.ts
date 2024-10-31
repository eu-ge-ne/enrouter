import type { Route } from "./mod.js";
//@ts-ignore
import routeTree from "virtual:enrouter";

export function getRouteTree(): Route {
  return routeTree;
}
