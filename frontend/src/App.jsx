import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/Auth";
import ResetPassword from "./components/auth/ResetPassword";
function App() {
 
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
