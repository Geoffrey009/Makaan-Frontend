import "./Hero.css";
import makaanHero from "../assets/makaanHero.jpg";
import makaanHero2 from "../assets/makaanHero2.jpg";
import { NavLink } from "react-router-dom";
import { PiGreaterThanLight, PiLessThanLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

export const Hero = () => {
    const [imageShowing, setImageShowing] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);

    const images = [makaanHero, makaanHero2];

    function goForward() {
        setImageShowing(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    }

    function goBackward() {
        setImageShowing(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    }

    useEffect(() => {
        const interval = setInterval(() => {
            goForward();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    function handleScroll() {
        if (window.scrollY > 80) {
            setHasScrolled(true);
        }
        else {
            setHasScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <>
            <div className="hero" id="header">
                <div className="leftHero">
                    <h1>
                        Find A <span style={{ color: "#00B98E" }}>Perfect Home</span> <br />
                        To Live With Your <br /> Family
                    </h1>
                    <p className="intro">
                        Discover your dream home today. We make it simple <br /> to find the perfect place where comfort, <br /> style, and family come together!
                    </p>
                    <NavLink to="/getStarted">
                        <button className="start"><span>Get Started</span></button>
                    </NavLink>
                </div>

                <div className="rightHero">
                    <div className="leftRightIcons">
                        <div
                            className="leftIconCover"
                            onClick={goBackward}
                        >
                            <PiLessThanLight
                                className="leftIcon"
                                color="white"
                                strokeWidth={10}
                                size={20}
                            />
                        </div>
                        <div
                            className="rightIconCover"
                            onClick={goForward}
                        >
                            <PiGreaterThanLight
                                className="rightIcon"
                                color="white"
                                strokeWidth={10}
                                size={20}
                            />
                        </div>
                    </div>
                    <img
                        src={images[imageShowing]}
                        alt="slider"
                        className="heroImage"
                    />
                </div>
            </div>

            <div className="search">
                <input type="text" className="searchBox" placeholder="Search Keyword" />
                <select name="" className="propertyType">
                    <option value="">Property Type</option>
                    <option value="">Property Type 1</option>
                    <option value="">Property Type 2</option>
                    <option value="">Property Type 3</option>
                </select>
                <select name="" className="location">
                    <option value="">Location</option>
                    <option value="">Location 1</option>
                    <option value="">Location 2</option>
                    <option value="">Location 3</option>
                </select>
                <button className="searchBtn">Search</button>
            </div>

            <div className={`scrollUp ${hasScrolled ? "scrolled" : ""}`} onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }}>
                <IoIosArrowRoundUp className="upIcon" color="white"
                    strokeWidth={0.001}
                    size={32} />
            </div>
        </>
    );
};
