import { useState } from "react";

import npm_logo from "/npm.svg";
import github_logo from "/github-light.svg";

export const components = {
  main: App,
};

function App() {
  console.log("Rendering App");

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((x) => x + 1);
  }

  return (
    <div>
      <div className="p-4 border-b flex items-center justify-between">
        <span className="text-lg tracking-tighter font-medium font-mono">
          enrouter
        </span>
        <div className="flex justify-end gap-x-4">
          <a href="https://www.npmjs.com/package/enrouter" target="_blank">
            <img
              src={npm_logo}
              className="size-6"
              alt="https://www.npmjs.com/package/enrouter"
            />
          </a>
          <a href="https://github.com/eu-ge-ne/enrouter" target="_blank">
            <img
              src={github_logo}
              className="size-6"
              alt="https://github.com/eu-ge-ne/enrouter"
            />
          </a>
        </div>
      </div>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
}
