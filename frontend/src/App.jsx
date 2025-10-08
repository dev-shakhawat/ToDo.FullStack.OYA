import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/Auth";
import ResetPassword from "./components/auth/ResetPassword";
import VerifyToken from "./components/auth/VerifyToken"; 
import { ErrorNotification, SuccessNotification } from "./components/common/Notification";
import { useSelector } from "react-redux";
function App() {
 
  const { error, message , notification } = useSelector((state) => state.auth);
 
  return (
  <BrowserRouter> 
        { notification && (error ? <ErrorNotification error={error} /> 
              : <SuccessNotification message={message} />)
        }
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      <Route path="/auth/verify-token/:token" element={<VerifyToken />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
