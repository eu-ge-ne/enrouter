import { useLink } from "enrouter";

import { log } from "#log.js";
import { GitHub } from "#svg/github.js";

export default function Index() {
  log("Rendering: /_index");

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
          className="border-appButtonBorder bg-appButtonBg rounded-md border px-4 py-2 text-sm"
          {...useLink("/docs/start")}
        >
          Get started
        </a>
        <a
          className="border-appButtonBorder flex items-center gap-2 rounded-md border px-4 py-2 text-sm"
          href="https://github.com/eu-ge-ne/enrouter"
          target="_blank"
        >
          <GitHub size="1rem" />
          GitHub
        </a>
      </div>
    </div>
  );
}
