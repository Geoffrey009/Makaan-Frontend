import "./Agent.css"
import certifiedAgent from "../assets/certifiedAgent.jpg"
import { FaCalendarAlt, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import agentOne from "../assets/agent-1.jpg"
import agentTwo from "../assets/agent-2.jpg"
import agentThree from "../assets/agent-3.jpg"
import agentFour from "../assets/agent-4.jpg"

export const Agent = () => {
    return (
        <>
            <div className="agentCover">
                <div className="agent">
                    <img src={certifiedAgent} alt="" className="certifiedAgent-image" />

                    <div className="agent-other">
                        <h1>Contact With Our <br /> Certified Agent</h1>
                        <p>Eirmod sed ipsum dolor sit rebum magna erat. Tempor lorem kasd  vero ipsum sit sit diam justo sed vero dolor duo.</p>

                        <div className="whatsapp-appointment">
                            <a href="https://wa.link/ne3rat" target="blank">
                                <button className="whatsapp-btn"><FaWhatsapp color="white" className="whatsapp-icon" size={23} /> Chat On Whatsapp</button>
                            </a>
                            <a href="mailto:geoffrey.dev@gmail.com?subject=Appointment%20Request&body=I%20would%20like%20to%20book%20an%20appointment%20with%20Makaan's%20Consultant%20at%20(day)%20(month)%20(2025)." target="blank">
                                <button className="appointment-btn"><FaCalendarAlt color="white" className="calendar-icon" size={18} /> Get Appointment</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="propertyAgent">
                <h1>Property Agents</h1>
                <p className="agent-desc">Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd <br /> vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>

                <div className="agents">
                    <div className="agent-one">
                        <img src={agentOne} alt="" className="agent-image" />

                        <div className="agent-socials">
                            <a className="agent-socials-cover" href="https://www.facebook.com/share/16tMGhzvM4/" target="blank">
                                <FaFacebookF className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://x.com/GeoffreyAm36120?s=09" target="blank">
                                <FaTwitter className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://www.instagram.com/geoffreyamewhule?igsh=MTJsdHE1ZWVhZWl0eQ==" target="blank">
                                <FaInstagram className="agent-socials-image" color="#00B98E" />
                            </a>
                        </div>

                        <h3>Full Name</h3>
                        <p>Designation</p>

                    </div>
                    <div className="agent-two">
                        <img src={agentTwo} alt="" className="agent-image" />

                        <div className="agent-socials">
                            <a className="agent-socials-cover" href="https://www.facebook.com/share/16tMGhzvM4/" target="blank">
                                <FaFacebookF className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://x.com/GeoffreyAm36120?s=09" target="blank">
                                <FaTwitter className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://www.instagram.com/geoffreyamewhule?igsh=MTJsdHE1ZWVhZWl0eQ==" target="blank">
                                <FaInstagram className="agent-socials-image" color="#00B98E" />
                            </a>
                        </div>

                        <h3>Full Name</h3>
                        <p>Designation</p>

                    </div>
                    <div className="agent-three">
                        <img src={agentThree} alt="" className="agent-image" />
                        
                        <div className="agent-socials">
                            <a className="agent-socials-cover" href="https://www.facebook.com/share/16tMGhzvM4/" target="blank">
                                <FaFacebookF className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://x.com/GeoffreyAm36120?s=09" target="blank">
                                <FaTwitter className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://www.instagram.com/geoffreyamewhule?igsh=MTJsdHE1ZWVhZWl0eQ==" target="blank">
                                <FaInstagram className="agent-socials-image" color="#00B98E" />
                            </a>
                        </div>

                        <h3>Full Name</h3>
                        <p>Designation</p>

                    </div>
                    <div className="agent-four">
                        <img src={agentFour} alt="" className="agent-image" />
                        
                        <div className="agent-socials">
                            <a className="agent-socials-cover" href="https://www.facebook.com/share/16tMGhzvM4/" target="blank">
                                <FaFacebookF className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://x.com/GeoffreyAm36120?s=09" target="blank">
                                <FaTwitter className="agent-socials-image" color="#00B98E" />
                            </a>
                            <a className="agent-socials-cover" href="https://www.instagram.com/geoffreyamewhule?igsh=MTJsdHE1ZWVhZWl0eQ==" target="blank">
                                <FaInstagram className="agent-socials-image" color="#00B98E" />
                            </a>
                        </div>

                        <h3>Full Name</h3>
                        <p>Designation</p>

                    </div>
                </div>
            </div>
        </>
    )
}
