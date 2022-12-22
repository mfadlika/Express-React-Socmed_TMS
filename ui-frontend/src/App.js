import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import UploadPhoto from "./pages/EditProfile";
import HomePage from "./pages/HomePage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import StatusPage from "./pages/StatusPage";

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
          <Route path="/:userId/editprofile" element={<UploadPhoto />} />
          <Route path="/:userId" element={<ProfilePage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
