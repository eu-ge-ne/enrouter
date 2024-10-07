export function createLog(ns: string): typeof console.log {
  let t = Date.now();

  const log: typeof console.log = (msg, ...params) => {
    console.log(`enrouter/${ns}: ${msg} (${Date.now() - t} ms)`, ...params);
    t = Date.now();
  };

  return log;
}
