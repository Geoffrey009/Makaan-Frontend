import "./Property.css"
import apartment from "../assets/icon-apartment.png"
import building from "../assets/icon-building.png"
import garage from "../assets/icon-garage.png"
import house from "../assets/icon-house.png"
import office from "../assets/icon-office.png"
import shop from "../assets/icon-shop.png"
import townhouse from "../assets/icon-townhouse.png"
import villa from "../assets/icon-villa.png"
import perfectProperty from "../assets/perfectProperty.jpg"
import { useState } from "react"
import { FaCheck } from "react-icons/fa6";

export const PropertyOne = () => {
    const [hovered, setHovered] = useState(false);

    // function hover() {
    //     setHovered(true)
    // }

    // function notHover() {
    //     setHovered(false)
    // }

    return (
        <>
            <div className="propertyTypes">
                <div className="headingCover">
                    <h1 className="heading">Property Types</h1>
                    <p className="headingContent">Explore a wide range of property types designed to fit your needs — from cozy <br /> apartments to spacious family homes and luxury villas.</p>
                </div>
                <div className="types">
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainOne ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={apartment} alt="" className="image" />
                            </div>
                            <p className="iconName">Apartment</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainTwo ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={villa} alt="" className="image" />
                            </div>
                            <p className="iconName">Villa</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainThree ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={house} alt="" className="image" />
                            </div>
                            <p className="iconName">Home</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainFour ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={office} alt="" className="image" />
                            </div>
                            <p className="iconName">Office</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainFive ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={building} alt="" className="image" />
                            </div>
                            <p className="iconName">Building</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainSix ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={townhouse} alt="" className="image" />
                            </div>
                            <p className="iconName">Townhouse</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainSeven ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={shop} alt="" className="image" />
                            </div>
                            <p className="iconName">Shop</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                    <div className="type" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} id="type">
                        <div className={`typeMainEight ${hovered ? "hover" : ""}`}>
                            <div className="iconCover">
                                <img src={garage} alt="" className="image" />
                            </div>
                            <p className="iconName">Garage</p>
                            <p className="number">123 Properties</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="perfectProperty">
                <div className="perfectOne">
                        <div className="bg-shape">
                            
                        </div>
                        <img src={perfectProperty} alt="" className="perfectImage" />
                </div>

                <div className="perfectTwo">
                    <h1 className="perfectTwoTitle">#1 Place To Find The <br /> Perfect Property</h1>
                    <p className="perfectTwoIntro">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam <br /> amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita <br /> duo justo magna dolore erat amet</p>
                    
                    <div className="checks">
                        <FaCheck color="#00B98E" strokeWidth={20} className="check" />
                        <p>Tempor erat elitr rebum at clita</p>
                    </div>
                    <div className="checks">
                        <FaCheck color="#00B98E" strokeWidth={20} className="check" />
                        <p>Aliqu diam amet diam et eos</p>
                    </div>
                    <div className="checks">
                        <FaCheck color="#00B98E" strokeWidth={20} className="check" />
                        <p>Clita duo justo magna dolore erat amet</p>
                    </div>

                    <button className="readMore">Read More</button>
                </div>
            </div>
        </>
    )
}
