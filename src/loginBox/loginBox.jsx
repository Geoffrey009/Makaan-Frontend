import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle, FaSpinner } from "react-icons/fa";
import loginBackground from "../assets/loginBackground.webp";
import loginBackground02 from "../assets/loginBackground02.jpg";
import loginBackground03 from "../assets/loginBackground03.jpg";
import loginBackground04 from "../assets/loginBackground04.jpg";
import "./loginBox.css";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0); // ✅ Track which image is active
    const images = [loginBackground, loginBackground02, loginBackground03, loginBackground04];

    // ✅ Change background every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        const userData = { email, password };

        try {
            const response = await axios.post(
                'https://makaan-real-estate.onrender.com/api/users/login',
                userData
            );

            console.log('JWT Token:', response.data.token);
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));

            // Show success message
            setLoginSuccess(true);
            console.log("User from backend:", response.data.user);

            // Wait 4 seconds, then hide the message and redirect
            setTimeout(() => {
                setLoginSuccess(false);
                window.location.href = "/dashboard";
            }, 1500);

        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message); // e.g. "User already exists"
            } else {
                alert("Something went wrong");
            }
            console.error(error);
        } finally {
            setEmail("");
            setPassword("");
            setLoading(false);
        }
    };


    const clientId = "110792969621-2dqqu6j4lqiil510id88cc1oaairv72r.apps.googleusercontent.com"; // Replace with your actual client ID

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            // ✅ Decode Google JWT to get user info (email, name, etc.)
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google User Info:", decoded);

            // ✅ Send token to backend for verification and DB handling
            const res = await fetch("https://makaan-real-estate.onrender.com/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });

            const data = await res.json();
            console.log("Backend Response:", data);

            if (res.ok && data.token && data.user) {
                // ✅ Save token + user in sessionStorage
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));

                // ✅ Show success message
                setLoginSuccess(true);
                console.log("User from backend:", data.user);


                // ✅ Redirect after delay
                setTimeout(() => {
                    setLoginSuccess(false);
                    window.location.href = "/dashboard";
                }, 1500);
            } else {
                // Backend returned an error (e.g., missing token/user)
                alert(data.message || "Google login failed. Please try again.");
            }
        } catch (err) {
            console.log("Google login error:", err);
            console.log("Something went wrong with Google login.");
        }
    };

    const handleLoginError = () => {
        alert("Google Login Failed");
    };

    // ✅ Access Token based Google login
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // 🔑 tokenResponse contains access_token
                console.log("Google Access Token:", tokenResponse.access_token);

                // ✅ Send access_token to backend
                const res = await fetch("https://makaan-real-estate.onrender.com/auth/google", {
                    method: "POST",
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
                    alert(data.message || "Google login failed. Please try again.");
                }
            } catch (err) {
                console.error("Google login error:", err);
                alert("Something went wrong with Google login.");
            }
        },
        onError: () => {
            alert("Google Login Failed");
        },
    });


    return (
        <div className='login-box'>

            {/* ✅ Background layers */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`bg-image ${index === currentIndex ? 'active' : ''}`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`
                    }}
                ></div>
            ))}

            <div className="login-box-main">
                <h2 className='login-title'>Welcome Back to Makaan!</h2>
                <p className='login-desc'>Login to your account to discover your next home</p>
                <form onSubmit={handleLogin}>
                    <p className='email-label'>Email</p>
                    <input className='input-one'
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />

                    <p className='password-label'>Password</p>
                    <div className="password-container">
                        <input className='input-two'
                            type={showPassword ? "text" : "password"}
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye className='eye' /> : <FaEyeSlash className='eye-slash' />}
                        </span>
                    </div>
                    <br />
                    <button className='login-btn' type="submit" disabled={loading}>
                        {loading ? (
                            <span className="spinner-text">
                                <FaSpinner className="spinner" /> Logging in...
                            </span>
                        ) : (
                            "Log In"
                        )}
                    </button>
                    <p className='no-account'>Don't have an account?
                        <NavLink className="no-account-signup" to="/signup"> Sign Up</NavLink>
                    </p>

                    <div className="or">
                        <hr className="line-one" />
                        <p>OR</p>
                        <hr className="line-two" />
                    </div>

                    <div className="google-auth">
                        <button
                            className="google-btn"
                            onClick={() =>
                                login() // call the hook when user clicks button
                            }
                        >
                            Sign in with Google
                        </button>
                    </div>


                </form>
            </div>

            <div className={`login-success ${loginSuccess ? "success" : "unsuccess"}`}>
                <FaCheckCircle className="check-icon" color="#00B98E" size={25} />
                <p>Login Successful!</p>
            </div>
        </div>

    );
};








