import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../stores/UserContext";
import client from "../axios";
import { Backdrop, CircularProgress } from "@mui/material";

export default function AuthRoute({ children }) {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if (!token) {
      setUser(undefined);
    } else {
      if (!user) {
        const shouldRedirect = async () => {
          const res = await client.get("/user/me");
          setUser(res.data.data.user);
        };
        shouldRedirect().catch((err) => {
          console.log(err);
        });
      }
    }
  }, []);

  if (user === null) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (!user.email_verified_at) {
    return <Navigate to={"/auth/verification"} />;
  }

  return <>{children ? children : <Outlet />}</>;
}
