import { useLocation } from "enrouter";

export default function Arch() {
  const location = useLocation();

  return <div>arch: {location} is not found</div>;
}
