import { useLocation } from "enrouter";

export default function Api() {
  const location = useLocation();

  return <div>api: {location} is not found</div>;
}
