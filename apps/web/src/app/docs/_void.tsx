import { PrimaryLinkItem } from "./links.js";
import { NotFound } from "./notFound.js";

export default function Void() {
  return (
    <div className="flex flex-col divide-appBorder p-4 max-sm:divide-y md:flex-row md:divide-x">
      <div className="flex flex-col max-sm:pb-4 md:w-[15rem] md:pr-4">
        <ul className="flex flex-col gap-y-2">
          <PrimaryLinkItem href="/docs">Docs</PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/start">
            Getting Started
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/features">
            Features
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/arch">
            Architecture
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/api">
            API
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/vite">
            Vite
          </PrimaryLinkItem>
        </ul>
      </div>
      <div className="max-sm:pt-4 md:w-[45rem] md:pl-4">
        <NotFound />
      </div>
    </div>
  );
}
