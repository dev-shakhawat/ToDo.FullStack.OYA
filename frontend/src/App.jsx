import { BrowserRouter, Routes, Route } from "react-router"; 
import ResetPassword from "./components/auth/ResetPassword";
import VerifyToken from "./components/auth/VerifyToken"; 
import { ErrorNotification, SuccessNotification } from "./components/common/Notification";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
function App() {
 
  const { error, message , notification } = useSelector((state) => state.auth);
 
  return (
  <BrowserRouter> 
        { notification && (error ? <ErrorNotification error={error} /> 
              : <SuccessNotification message={message} />)
        }
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      <Route path="/auth/verify-token/:token" element={<VerifyToken />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
