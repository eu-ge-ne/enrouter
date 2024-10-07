export function createLog(ns: string): typeof console.log {
  let t = Date.now();

  const log: typeof console.log = (msg, ...params) => {
    console.log(
      `@enrouter/web/${ns} (+${Date.now() - t}ms): ${msg}`,
      ...params,
    );
    t = Date.now();
  };

  return log;
}
