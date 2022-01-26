import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (auth !== true) {
        navigate("/login");
      }
    }, [auth, navigate]);

  return (
    <>
booking page
    </>
  );
}
