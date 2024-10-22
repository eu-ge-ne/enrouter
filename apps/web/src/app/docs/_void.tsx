import { useLocation } from "enrouter";

export default {
  Docs() {
    const location = useLocation();

    return <div>docs: {location} is not found</div>;
  },
};
