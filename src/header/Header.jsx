import "./Header.css";
import { useState, useEffect } from "react";
import makaanLogo from "../assets/makaanIcon.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";


export const Header = () => {
    const [propertyOpen, setPropertyOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    // 🔑 Check login state on mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        setIsLoggedIn(!!storedUser); // true if user exists
    }, []);

    function checkScroll() {
        if (window.scrollY > 80) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, []);

    // 🔑 Handle logout
    const handleLogout = () => {
        sessionStorage.clear(); // remove token + user
        window.location.href = "/login";
    };

    return (
        <div className={`header ${hasScrolled ? "scrolled" : ""}`}>
            <div className="iconTitle">
                <div className="icon">
                    <img src={makaanLogo} alt="makaanLogo" className="logo" />
                </div>
                <h1 className="title">JeffHomes</h1>
            </div>

            <div className="navlinks">
                <nav>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>HOME</NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>ABOUT</NavLink>

                    <div
                        className="dropdownWrapper"
                        onMouseEnter={() => setPropertyOpen(true)}
                        onMouseLeave={() => setPropertyOpen(false)}
                    >
                        <p className="property">
                            PROPERTY <RiArrowDropDownLine size={25} className="dropdownIcon" />
                        </p>
                        <div className={`propertyBox ${propertyOpen ? "open" : ""}`}>
                            <NavLink to="/propertyList" className={({ isActive }) => (isActive ? "active-link" : "")}>Property List</NavLink>
                            <br />
                            <NavLink to="/propertyType" className={({ isActive }) => (isActive ? "active-link" : "")}>Property Type</NavLink>
                            <br />
                            <NavLink to="/propertyAgent" className={({ isActive }) => (isActive ? "active-link" : "")}>Property Agent</NavLink>
                        </div>
                    </div>

                    <div
                        className="dropdownWrapper"
                        onMouseEnter={() => setPagesOpen(true)}
                        onMouseLeave={() => setPagesOpen(false)}
                    >
                        <p className="pages">
                            PAGES <RiArrowDropDownLine size={25} className="dropdownIcon" />
                        </p>
                        <div className={`pagesBox ${pagesOpen ? "open" : ""}`}>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>Contact</NavLink>
                            <br />
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>Dashboard</NavLink>
                        </div>
                    </div>

                    {/* 🔑 Show LOGIN if not logged in, else show LOGOUT */}
                    {!isLoggedIn ? (
                        <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "")}>LOGIN</NavLink>
                    ) : (
                        <NavLink onClick={handleLogout} className="logout-btn">LOGOUT</NavLink>
                    )}

                    <NavLink to="/addProperty" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <button className="addProperty"><span>Add Property</span></button>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};
