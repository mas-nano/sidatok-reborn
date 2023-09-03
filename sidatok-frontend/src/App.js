import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Layouts/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerfication from "./pages/EmailVerification";
import AdminLayout from "./Layouts/Admin";
import Dashboard from "./pages/dashboard/Dashboard";
import GettingStarted from "./pages/GettingStarted";
import Items from "./pages/dashboard/Items";
import UserContext from "./stores/UserContext";
import { useMemo, useState } from "react";
import AuthRoute from "./Layouts/AuthRoute";
import Verify from "./pages/Verify";
import Cashier from "./pages/dashboard/Cashier";

function App() {
  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={providerValue}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verification" element={<EmailVerfication />} />
          <Route path="verify" element={<Verify />} />
          <Route element={<AuthRoute />}>
            <Route path="getting-started" element={<GettingStarted />} />
          </Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/cashier" element={<Cashier />} />
          </Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
