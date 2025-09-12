import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import signupBackground from "../assets/signup-house-one.jpg";
import signupBackground02 from "../assets/signup-house-two.jpg";
import signupBackground03 from "../assets/signup-house-three.jpg";
import signupBackground04 from "../assets/signup-house-four.jpg";
import { FaEye, FaEyeSlash, FaCheckCircle, FaSpinner } from "react-icons/fa";
import "./signupBox.css"
import axios from 'axios';

export const Signup = () => {
    const [fullName, setName] = useState('');
    let [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginSuccessTwo, setLoginSuccessTwo] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [signupBackground, signupBackground02, signupBackground03, signupBackground04];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const homeEmail = sessionStorage.getItem("homeEmail");
        if (homeEmail) {
            setEmail(homeEmail)
        }

    }, [])

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userDataTwo = { fullName, email, password };

        try {
            const response = await axios.post(
                "https://makaan-real-estate.onrender.com/api/users/register",
                userDataTwo
            );

            // ✅ Save token and user from backend response
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));

            setLoginSuccess(true); // show success

            console.log(response.data);

            // ⏳ Wait 3 seconds → hide message → redirect
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
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
        }
    };


    const clientId = "110792969621-2dqqu6j4lqiil510id88cc1oaairv72r.apps.googleusercontent.com";

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            // ✅ Decode Google JWT to get user info (email, name, etc.)
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google User Info:", decoded);

            const res = await fetch("https://makaan-real-estate.onrender.com/auth/google", {
                method: "POST",
                mode: "cors",               // ✅ allow cross-origin requests
                credentials: "include",     // ✅ send cookies if backend uses them
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
            console.error("Google login error:", err);
            alert("Something went wrong with Google login.");
        }
    };


    const handleLoginError = () => {
        console.log("Google Login Failed")
    };

    // ✅ Access Token based Google login
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // 🔑 tokenResponse contains access_token
                console.log("Google Access Token:", tokenResponse.access_token);

                // ✅ Send access_token to backend
                // const res = await fetch("https://makaan-real-estate.onrender.com/auth/google", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({ access_token: tokenResponse.access_token }),
                // });

                const res = await fetch("https://makaan-real-estate.onrender.com/auth/google", {
                    method: "POST",
                    mode: "cors",               // ✅ allow cross-origin requests
                    credentials: "include",     // ✅ send cookies if backend uses them
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
        <div className='signup-box'>

            {images.map((img, index) => (
                <div
                    key={index}
                    className={`bg-image ${index === currentIndex ? 'active' : ''}`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`
                    }}
                ></div>
            ))}

            <aside className="signup-box-main">
                <h2 className='signup-title'>Create an account!</h2>
                <form onSubmit={handleSignup}>
                    <p className='fullname-label'>Full name</p>
                    <input className="input-one"
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setName(e.target.value)}
                    /><br />

                    <p className='email-label'>Email</p>
                    <input className="input-two"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />

                    <p className='password-label'>Password</p>
                    <div className="password-container">
                        <input className='input-three'
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

                    <button className='signup-btn' type="submit" disabled={loading}>
                        {loading ? (
                            <span className="spinner-text">
                                <FaSpinner className="spinner" /> Signing up...
                            </span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>

                    <p className='have-account'>Already have an account?
                        <NavLink className="have-account-signin" to="/login"> Sign In</NavLink>
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
            </aside>

            <div className={`login-success ${loginSuccess ? "success" : ""}`}>
                <FaCheckCircle className="check-icon" color="#00B98E" size={25} />
                <p>Signup Successful!</p>
            </div>

            <div className={`login-success ${loginSuccessTwo ? "success" : ""}`}>
                <FaCheckCircle className="check-icon" color="#00B98E" size={25} />
                <p>Sign in Successful!</p>
            </div>
        </div>
    );
};
