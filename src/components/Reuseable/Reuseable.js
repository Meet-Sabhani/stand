import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("setLoging") === "true";

  const checkAuthAndNavigate = () => {
    if (!isLoggedIn) {
      navigate("/");
    }
  };

  return { checkAuthAndNavigate };
};

export default useAuth;
