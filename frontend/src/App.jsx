import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/Auth";
import ResetPassword from "./components/auth/ResetPassword";
import VerifyToken from "./components/auth/VerifyToken";
import Notification from "./components/common/Notification";
import { useSelector } from "react-redux";
function App() {

  const { error, message } = useSelector((state) => state.auth);
 
  return (
  <BrowserRouter>
      {error || message && <Notification message={error || message}  />}
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      <Route path="/auth/verify-token/:token" element={<VerifyToken />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
