import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ChatScreen from "./pages/ChatScreen";
import MobileScreens from "./pages/MobileScreens";

import type { Screen } from "./types/navigation";

function AppRoutes() {
  const navigate = useNavigate();
  const initialize = useAuthStore((state) => state.initialize);

  // Initialize authentication when the app loads
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Central navigation handler
  const go = (screen: Screen) => {
    const routes: Record<Screen, string> = {
      landing: "/",
      dashboard: "/dashboard",
      chat: "/chat",
      mobile: "/mobile-preview",
    };

    navigate(routes[screen]);

    // Scroll to top after navigation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage onNavigate={go} />}
      />

    <Route element={<ProtectedRoute />}>
      <Route
        path="/dashboard"
        element={<Dashboard onNavigate={go} />}
      />

      <Route
        path="/chat"
        element={<ChatScreen onNavigate={go} />}
      />

      <Route
        path="/mobile-preview"
        element={<MobileScreens />}
      />
    </Route>
    
      {/* Fallback route */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/login"
        element={<Login/>}
      />

      <Route
        path="/register"
        element={<Register/>}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}