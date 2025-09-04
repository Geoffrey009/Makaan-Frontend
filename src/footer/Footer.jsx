import "./Footer.css"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaGreaterThan } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Hero } from "../hero/Hero"
import { NavLink } from "react-router-dom"
import houseOne from "../assets/house1.jpg"
import houseTwo from "../assets/house2.jpg"
import houseThree from "../assets/house3.jpg"
import houseFour from "../assets/house4.jpg"
import houseFive from "../assets/house5.jpg"
import houseSix from "../assets/house6.jpg"
import { useState } from "react"

export const Footer = () => {
    const [homeEmail, setHomeEmail] = useState("");

    sessionStorage.setItem("homeEmail", homeEmail);

    return (
        <>
            <div className="footer">
                <div className="footer-main">
                    <div className="get-in-touch">
                        <h3>Get In Touch</h3>

                        <div className="get-in-touch-other">
                            <div className="details">
                                <FaLocationDot className="footer-icon" color="rgba(255, 255, 255, 0.5)" />
                                <p>Rumuagholu Port-Harcourt</p>
                            </div>
                            <div className="details">
                                <FaPhoneAlt color="rgba(255, 255, 255, 0.5)" />
                                <p>+234-703-759-4187</p>
                            </div>
                            <div className="details">
                                <MdEmail size={20} color="rgba(255, 255, 255, 0.5)" />
                                <p>amazwhule999@gmail.com</p>
                            </div>

                            <div className="social-media">
                                <a className="twitter-outline" href="https://x.com/GeoffreyAm36120?s=09" target="blank">
                                    <FaTwitter color="white" size={18} className="social-media-icon" />
                                </a>
                                <a className="facebook-outline" href="https://www.facebook.com/share/16tMGhzvM4/" target="blank">
                                    <FaFacebookF color="white" size={18} className="social-media-icon" />
                                </a>
                                <a className="youtube-outline" href="https://youtube.com/@amazfrey_versatile?si=l0hAO8g28cCsYdhZ" target="blank">
                                    <FaYoutube color="white" size={18} className="social-media-icon" />
                                </a>
                                <a className="linkedin-outline" href="https://www.linkedin.com/in/geoffrey-amewhule-47b3a8364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="blank">
                                    <FaLinkedinIn color="white" size={18} className="social-media-icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="quick-links">
                        <h3>Quick Links</h3>

                        <div className="quick-links-other">
                            <NavLink to="./about" className="details-two">
                                <FaGreaterThan color="rgba(255, 255, 255, 0.5)" size={12} />
                                <p>About Us</p>
                            </NavLink>
                            <NavLink to="./contact" className="details-two">
                                <FaGreaterThan color="rgba(255, 255, 255, 0.5)" size={12} />
                                <p>Contact Us</p>
                            </NavLink>
                            <NavLink to="./services" className="details-two">
                                <FaGreaterThan color="rgba(255, 255, 255, 0.5)" size={12} />
                                <p>Our Services</p>
                            </NavLink>
                            <NavLink to="./privacy" className="details-two">
                                <FaGreaterThan color="rgba(255, 255, 255, 0.5)" size={12} />
                                <p>Privacy Policy</p>
                            </NavLink>
                            <NavLink to="./terms" className="details-two">
                                <FaGreaterThan color="rgba(255, 255, 255, 0.5)" size={12} />
                                <p>Terms And Conditions</p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="photo-gallery">
                        <h3>Photo Gallery</h3>

                        <div className="photo-gallery-other">
                            <a className="photo" href="#houseOne">
                                <img src={houseOne} alt="" />
                            </a>
                            <a className="photo" href="#houseTwo">
                                <img src={houseTwo} alt="" />
                            </a>
                            <a className="photo" href="#houseThree">
                                <img src={houseThree} alt="" />
                            </a>
                            <a className="photo" href="#houseFour">
                                <img src={houseFour} alt="" />
                            </a>
                            <a className="photo" href="#houseFive">
                                <img src={houseFive} alt="" />
                            </a>
                            <a className="photo" href="#houseSix">
                                <img src={houseSix} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="newsletter">
                        <h3>Newsletter</h3>

                        <div className="newsletter-other">
                            <p>Dolor amet sit justo amet elitr <br /> clita ipsum elitr est.</p>

                            <div className="quick-sign-up">
                                <input type="text" placeholder="Your Email" value={homeEmail} onChange={(e) => {
                                    setHomeEmail(e.target.value)
                                }} />
                                <NavLink to="/signup"><button>SignUp</button></NavLink>
                            </div>
                        </div>
                    </div>

                </div>
                <hr />

                <div className="last">
                    <div className="last-one">
                        <p><span>©</span> <a href="#header">Makaan,</a> <span>All Right Reserved. Designed By <a href="">Geoffrey Amewhule</a></span></p>
                    </div>

                    <div className="last-two">
                        <div className="partition">
                            <a href="#header">Home</a>
                        </div>
                        <div className="partition">
                            <a href="">Cookies</a>
                            <hr />
                        </div>
                        <div className="partition">
                            <a href="">Help</a>
                            <hr />
                        </div>
                        <div className="partition">
                            <a href="">FAQ's</a>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

