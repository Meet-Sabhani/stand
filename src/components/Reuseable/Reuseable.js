import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem("setLoging") === "true";

  const checkAuthAndNavigate = () => {
    if (!isLoggedIn) {
      nav("/");
    }
  };

  return { checkAuthAndNavigate };
};

export default useAuth;
