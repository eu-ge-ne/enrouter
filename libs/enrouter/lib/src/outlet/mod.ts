import { useContext } from "react";
import type { ReactNode, ReactElement } from "react";

import { useContent } from "#lib/content/context.js";

export interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  return useOutlets()?.[name];
}

function useOutlets(): Record<string, ReactElement> | undefined {
  let x = useContent();

  if (!x.next) {
    return x.index;
  }

  while (x.next) {
    x = x.next;
    const outlets = x.layout || x.index;
    if (outlets) {
      return outlets;
    }
  }
}
