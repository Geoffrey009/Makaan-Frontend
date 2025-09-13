import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaCheckCircle, FaSpinner } from "react-icons/fa";
import loginBackground from "../assets/loginBackground.webp";
import loginBackground02 from "../assets/loginBackground02.jpg";
import loginBackground03 from "../assets/loginBackground03.jpg";
import loginBackground04 from "../assets/loginBackground04.jpg";
import "./loginBox.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [loginBackground, loginBackground02, loginBackground03, loginBackground04];

  // Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // =====================
  // Normal email/password login
  // =====================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("All fields are required");
      return; // Stop here if inputs are empty
    }

    setLoading(true);
    try {
      const res = await axios.post("https://makaan-real-estate.onrender.com/api/users/login", { email, password });

      // Save token and user
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      setLoginSuccess(true);

      setTimeout(() => {
        setLoginSuccess(false);
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  // =====================
  // Google login
  // =====================
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google Access Token:", tokenResponse.access_token);

        // Send token to backend
        const res = await fetch("https://makaan-real-estate.onrender.com/auth/google", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });

        const data = await res.json();
        console.log("Backend Response:", data);

        if (res.ok && data.token && data.user) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user));

          setLoginSuccess(true);
          setTimeout(() => {
            setLoginSuccess(false);
            window.location.href = "/dashboard";
          }, 1500);
        } else {
          alert(data.message || "Google login failed");
        }
      } catch (err) {
        console.error("Google login error:", err);
        alert("Something went wrong with Google login");
      }
    },
    onError: () => alert("Google login failed"),
  });

  return (
    <div className="login-box">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`bg-image ${idx === currentIndex ? "active" : ""}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img})`,
          }}
        />
      ))}

      <div className="login-box-main">
        <h2 className="login-title">Welcome Back to Makaan!</h2>
        <p className="login-desc">Login to your account to discover your next home</p>

        {/* Normal login form */}
        <form onSubmit={handleLogin}>
          <p className="email-label">Email</p>
          <input
            className="input-one"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <p className="password-label">Password</p>
          <div className="password-container">
            <input
              className="input-two"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye className="eye" /> : <FaEyeSlash className="eye-slash" />}
            </span>
          </div>
          <br />

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-text">
                <FaSpinner className="spinner" /> Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>

          <p className="no-account">
            Don't have an account? <NavLink className="no-account-signup" to="/signup">Sign Up</NavLink>
          </p>

          <div className="or">
            <hr className="line-one" />
            <p>OR</p>
            <hr className="line-two" />
          </div>
        </form>

        {/* Google login button outside the form */}
        <div className="google-auth">
          <button className="google-btn" type="button" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
        </div>
      </div>

      {/* Login success message */}
      <div className={`login-success ${loginSuccess ? "success" : ""}`}>
        <FaCheckCircle className="check-icon" color="#00B98E" size={25} />
        <p>Login Successful!</p>
      </div>
    </div>
  );
};
