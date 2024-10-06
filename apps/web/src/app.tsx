import { useState } from "react";

import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";

export function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((x) => x + 1);
  }

  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
