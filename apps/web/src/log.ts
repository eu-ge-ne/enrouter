let t = Date.now();

export const log: typeof console.log = (msg, ...params) => {
  console.log(`@enrouter/web (+${Date.now() - t}ms): ${msg}`, ...params);
  t = Date.now();
};
