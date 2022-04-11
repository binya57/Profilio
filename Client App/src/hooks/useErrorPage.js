import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useErrorPage = (to) => {
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate(to || "/error", { replace: true });
    }
  }, [error, to]);

  return { error, setError };
};
export default useErrorPage;
