type DebugFn = typeof console.log;

let debugFn: DebugFn | undefined;

const lastTime: Record<string, number> = {};

export function debug(fn?: DebugFn) {
  debugFn = fn;
}

export function logger(ns: string): DebugFn {
  return (msg, ...params) => {
    if (debugFn) {
      const t = lastTime[ns] ?? Date.now();
      debugFn(`enrouter/${ns} (+${Date.now() - t}ms): ${msg}`, ...params);
      lastTime[ns] = Date.now();
    }
  };
}
