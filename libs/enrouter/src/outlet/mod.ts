import { useContext } from "react";
import type { ReactNode, ReactElement } from "react";

import { RouteRenderContext } from "#render/context.js";

interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  return useOutlets()?.[name];
}

function useOutlets(): Record<string, ReactElement> | undefined {
  let nodes = useContext(RouteRenderContext);

  if (!nodes.next) {
    return nodes.index;
  }

  while (nodes.next) {
    nodes = nodes.next;
    const outlets = nodes.layout || nodes.index;
    if (outlets) {
      return outlets;
    }
  }
}
