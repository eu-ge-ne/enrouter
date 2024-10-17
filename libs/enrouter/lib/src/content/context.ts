import { createContext, useContext } from "react";

import type { Content } from "./mod.js";

const ContentContext = createContext<Content>({
  match: {
    route: {
      path: "",
      test: {
        keys: [],
        pattern: new RegExp(""),
      },
      modules: [],
      loaded: false,
      elements: {},
    },
    location: "",
    isFull: false,
    params: {},
  },
});

export const ContentProvider = ContentContext.Provider;

export function useContent(): Content {
  return useContext(ContentContext);
}
