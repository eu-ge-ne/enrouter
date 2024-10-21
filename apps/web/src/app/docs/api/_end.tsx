import { useLocation } from "enrouter";

export default {
  Api() {
    const location = useLocation();

    return <div>api: {location} is not found</div>;
  },
};
