import { useLink } from "enrouter";

import { createLog } from "#log.js";
import github_logo from "/github-light.svg";

const log = createLog("_index");

export default {
  Main,
};

function Main() {
  log("Rendering");

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 flex flex-col items-center justify-center gap-8 p-4">
      <p className="max-w-[30rem] text-center">
        <span className="font-semibold">enrouter</span> is not ready for use in
        production yet.
      </p>
      <p className="max-w-[30rem] text-center">
        It is at early development stages and just making its first baby steps.
      </p>
      <p className="max-w-[30rem] text-center">Stay tuned for updates.</p>
      <div className="flex justify-center gap-8">
        <a
          className="rounded-md border border-paperBorder px-4 py-2 text-sm"
          {...useLink("/docs/start")}
        >
          Get started
        </a>
        <a
          className="flex items-center gap-2 rounded-md border border-paperBorder px-4 py-2 text-sm"
          href="https://github.com/eu-ge-ne/enrouter"
          target="_blank"
        >
          <img
            src={github_logo}
            className="size-4"
            alt="https://github.com/eu-ge-ne/enrouter"
            width="16"
            height="16"
          />
          GitHub
        </a>
      </div>
    </div>
  );
}
