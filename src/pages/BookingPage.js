import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function BookingPage() {
  const navigate = useNavigate();

  /** Load inital states */
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const appConfig = useSelector((state) => state.appConfigStore);


  /** Check logged in */
  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <>booking page
      {appConfig.doctors.map((doctor) => <p>{doctor.f_name}</p>)}
    </>
  );
}
