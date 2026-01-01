import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/SmartMeetingDashboard";
    }
  }, [token]);

  return <h2>Logging you in with Google...</h2>;
};

export default GoogleSuccess;
