import { BrowserRouter, Routes, Route } from "react-router"; 
import ResetPassword from "./components/auth/ResetPassword";
import VerifyToken from "./components/auth/VerifyToken"; 
import { ErrorNotification, SuccessNotification } from "./components/common/Notification";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import ForgetPassword from "./components/auth/ForgetPassword";
function App() {
 
  const { error, message , notification } = useSelector((state) => state.auth);
 
  return (
  <BrowserRouter> 
    { notification && (error ? <ErrorNotification error={error} /> 
          : <SuccessNotification message={message} />)
    }
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/auth/*" element={<AuthLayout />} >
        <Route path="login" element={<Login />} /> 
        <Route path="registration" element={<Registration />} /> 
        <Route path="forget-password" element={<ForgetPassword />} /> 
      </Route>
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-token/:token" element={<VerifyToken />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
