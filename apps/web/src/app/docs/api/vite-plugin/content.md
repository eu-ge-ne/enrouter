# Vite Plugin

## virtual:enrouter

enrouter creates internal "virtual" module with name `virtual:enrouter`
where it is generating and storing your route tree.
You need to add `virtual:enrouter` module to `optimizeDeps.exclude` because
the notion of "virtual" module does exist only in Rollup and does not exist in
esbuild.

Vite is using Rollup for producing final bundle for prod.
But during development it is using two bundlers: Rollup for compiling your code
and esbuild for precompiling dependencies in `node_modules` folder.
That's why we need to use `optimizeDeps.exclude`. To tell esbuild to
ignore `virtual:enrouter` and do not try to compile it, because it is handled
somewhere else (by Rollup).
