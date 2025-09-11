import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./Home";
import { LoginPage } from "./Login";
import { Contact } from "./Contact";
import { SignupPage } from "./Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "./Dashboard";
import { Preloader } from "./preLoader/preLoader";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation(); // detect current route
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show preloader on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // 1s preloader
    return () => clearTimeout(timer);
  }, [location.pathname]); // triggers on route changes

  if (loading) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute children={<Dashboard />} />}
      />
      <Route
        path="/contact"
        element={<ProtectedRoute children={<Contact />} />}
      />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
