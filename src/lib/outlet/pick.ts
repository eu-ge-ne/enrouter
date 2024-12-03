import type { ReactNode, ReactElement } from "react";

export function pick(
  els: Record<string, ReactElement> | undefined,
  name?: string,
): ReactNode {
  if (els) {
    return name ? els[name] : Object.values(els)[0];
  }
}
