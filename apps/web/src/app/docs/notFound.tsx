import { useLocation } from "enrouter";

export function NotFound() {
  const location = useLocation();

  return (
    <div>
      <h1 className="mt-8 text-2xl font-semibold first:mt-0">
        {location} is not found
      </h1>
      <p className="mt-8">Will soon be updated...</p>
    </div>
  );
}
