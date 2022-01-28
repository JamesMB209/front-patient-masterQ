import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function BookingPage() {
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const appConfig = useSelector((state) => state.appConfigStore);
  // console.log(appConfig);
  const navigate = useNavigate();
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
