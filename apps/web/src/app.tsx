import { useState } from "react";

import { hello } from "enrouter";

import reactLogo from "/react.svg";

export function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((x) => x + 1);
  }

  return (
    <div>
      {hello()}
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
}
