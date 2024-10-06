import { hydrateRoot } from "react-dom/client";

import "./index.css";

import { Shell } from "./shell.js";
import { App } from "./aapp.js";

hydrateRoot(
  document,
  <Shell stylesheets={[]}>
    <App />
  </Shell>
);
