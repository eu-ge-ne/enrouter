import { hydrateRoot } from "react-dom/client";

import "./index.css";

import { Shell } from "./shell.js";
import { App } from "./app.js";

hydrateRoot(
  document,
  <Shell>
    <App />
  </Shell>
);
