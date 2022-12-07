import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/RegisterPage";
import StatusPage from "./pages/StatusPage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:userId/status/:_id" element={<StatusPage />} />
          <Route path="/:userId" element={<ProfilePage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
