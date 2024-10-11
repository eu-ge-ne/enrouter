import { useLinkProps } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("_index");

export const components = {
  main: Index,
};

function Index() {
  log("Rendering");

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 flex flex-col items-center justify-center gap-8 p-4">
      <div className="max-w-[30rem] text-center">
        <p>enrouter is not ready for use in production yet.</p>
        <p>
          It is just making its first baby steps at early development stages.
        </p>
      </div>
      <div className="flex justify-center gap-8">
        <a
          className="rounded-md border border-paperBorder px-4 py-2 text-sm"
          {...useLinkProps("/docs/start")}
        >
          Get started
        </a>
        <a
          className="rounded-md border border-paperBorder px-4 py-2 text-sm"
          href="https://github.com/eu-ge-ne/enrouter"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
