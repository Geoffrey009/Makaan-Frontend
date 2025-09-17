import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import signupBackground from "../assets/signup-house-one.jpg";
import signupBackground02 from "../assets/signup-house-two.jpg";
import signupBackground03 from "../assets/signup-house-three.jpg";
import signupBackground04 from "../assets/signup-house-four.jpg";
import "./signupBox.css";

export const Signup = () => {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Background carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [signupBackground, signupBackground02, signupBackground03, signupBackground04];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Prefill email if stored
  useEffect(() => {
    const homeEmail = sessionStorage.getItem("homeEmail");
    if (homeEmail) setEmail(homeEmail);
  }, []);

  // Handle normal email/password signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Front-end validation
    if (!fullName || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://makaan-real-estate.onrender.com/api/users/register", {
        fullName,
        email,
        password,
      });

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      setSignupSuccess(true);

      setTimeout(() => {
        setSignupSuccess(false);
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
      console.error(err);
    } finally {
      setFullName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  // Handle Google signup/login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google Access Token:", tokenResponse.access_token);

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
          setSignupSuccess(true);

          setTimeout(() => {
            setSignupSuccess(false);
            window.location.href = "/dashboard";
          }, 1500);
        } else {
          alert(data.message || "Google signup failed");
        }
      } catch (err) {
        console.error("Google signup error:", err);
        alert("Something went wrong with Google signup");
      }
    },
    onError: () => {
      alert("Google Signup Failed");
    },
  });

  return (
    <div className="signup-box">
      {images.map((img, index) => (
        <div
          key={index}
          className={`bg-image ${index === currentIndex ? "active" : ""}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img})`,
          }}
        ></div>
      ))}

      <aside className="signup-box-main">
        <h2 className="signup-title">Create an account!</h2>

        <form onSubmit={handleSignup}>
          <p className="fullname-label">Full name</p>
          <input
            className="input-one"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <br />

          <p className="email-label">Email</p>
          <input
            className="input-two"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <p className="password-label">Password</p>
          <div className="password-container">
            <input
              className="input-three"
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

          <button className={`signup-btn ${loading ? "not-allowed" : ""}`} type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-text">
                <FaSpinner className="spinner" /> Signing up...
              </span>
            ) : (
              <span>Sign Up</span>
            )}
          </button>

          <p className="have-account">
            Already have an account? <NavLink className="have-account-signin" to="/login">Sign In</NavLink>
          </p>

          <div className="or">
            <hr className="line-one" />
            <p>OR</p>
            <hr className="line-two" />
          </div>
        </form>

        {/* Google button OUTSIDE the form */}
        <div className="google-auth">
          <button className="google-btn" type="button" onClick={() => googleLogin()}>
            <FcGoogle size={25} className="google-icon" />
            <span>Continue with Google</span>
          </button>
        </div>
      </aside>

      {/* Success message */}
      <div className={`login-success ${signupSuccess ? "success" : ""}`}>
        <FaCheckCircle className="check-icon" color="#00B98E" size={25} />
        <p>Signup Successful!</p>
      </div>
    </div>
  );
};
