import type { Route } from "./mod.js";
//@ts-ignore
import routes from "virtual:enrouter/vite/routes";

export const routeTree = routes as Route;
