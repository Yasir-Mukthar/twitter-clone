import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/svgs/common/Sidebar";
import RightPanel from "./components/svgs/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/svgs/common/LoadingSpinner";

function App() {
  const {
    data: authUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/getCurrentUser");
        const data = await res.json();
        if(data.error) return null;
        if (!res.ok) {
          throw new Error(data.error);
        }
        console.log(data);
        return data;
      } catch (error) {
        if(error)return null
        throw new Error(error);
      }
    },
    retry:false
  });

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  console.log(authUser);

  return (
    <div className="flex max-w-6xl mx-auto">
      <BrowserRouter>
       {
        authUser &&  <Sidebar />
       }

        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/notifications"
            element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
        {
          authUser &&  <RightPanel />
        }
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
