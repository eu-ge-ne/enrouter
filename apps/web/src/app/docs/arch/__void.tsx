import { useLocation } from "enrouter";

export default function Void() {
  const location = useLocation();

  return <div>arch: {location} is not found</div>;
}
