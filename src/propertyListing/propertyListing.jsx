import { useState, useEffect, useRef } from "react";
import { FaLocationDot, FaBed, FaBath } from "react-icons/fa6";
import { FaRulerCombined } from "react-icons/fa";
import houseOne from "../assets/house1.jpg"
import houseTwo from "../assets/house2.jpg"
import houseThree from "../assets/house3.jpg"
import houseFour from "../assets/house4.jpg"
import houseFive from "../assets/house5.jpg"
import houseSix from "../assets/house6.jpg"
import "./propertyListing.css";

export const PropertyTwo = () => {
    const [isFeatured, setIsFeatured] = useState(true);
    const [isForSell, setIsForSell] = useState(false);
    const [isForRent, setIsForRent] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const elementsRef = useRef([]);

    const getPropertyCards = () =>
        elementsRef.current.slice(3).filter(Boolean);

    const getCardType = (cardEl) => {
        const badge = cardEl.querySelector(".rent-sell");
        const txt = (badge?.textContent || "").toLowerCase();
        if (txt.includes("rent")) return "rent";
        if (txt.includes("sell")) return "sell";
        return "unknown";
    };

    const showCard = (cardEl, shouldShow) => {
        if (!cardEl) return;
        cardEl.style.display = shouldShow ? "" : "none";
    };

    const showAllCards = () => {
        getPropertyCards().forEach((el) => showCard(el, true));
    };

    const filterByType = (type) => {
        getPropertyCards().forEach((el) => {
            showCard(el, getCardType(el) === type);
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add a class when the element comes into view
                        setIsVisible(true)
                    } else {
                        // Remove the class if it goes out of view
                        setIsVisible(false)
                    }
                });
            },
            { threshold: 0 } // Adjust as needed
        );

        // Observe each element in the array
        elementsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            elementsRef.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);


    const forSell = () => {
        isFeatured && setIsFeatured(false);
        isForRent && setIsForRent(false);
        isForSell === false && setIsForSell(true);
        filterByType("sell");
    }

    const forRent = () => {
        isFeatured && setIsFeatured(false);
        isForSell && setIsForSell(false);
        isForRent === false && setIsForRent(true);
        filterByType("rent");
    }

    const forFeatured = () => {
        isForSell && setIsForSell(false);
        isForRent && setIsForRent(false);
        isFeatured === false && setIsFeatured(true);
        showAllCards();
    }

    return (
        <>
            <div className="propertyListing">
                <h1 className={`titleMain ${isVisible ? "visible" : ""}`} ref={(el) => (elementsRef.current[0] = el)}>Property Listing</h1>
                <div className="content-types">
                    <p className={`content  ${isVisible ? "visible" : ""}`} ref={(el) => (elementsRef.current[1] = el)}>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore <br /> lorem kasd vero ipsum sit eirmod sit diam justo sed rebum.</p>

                    <div className={`types-main  ${isVisible ? "visible-two" : ""}`} ref={(el) => (elementsRef.current[2] = el)}>
                        <button className={`types-one ${isForSell || isForRent ? "featured-false" : isFeatured && "featured-true"}`} onClick={() => forFeatured()}>Featured</button>
                        <button className={`types-two ${isForSell ? "for-sell" : ""}`} onClick={() => forSell()}>For Sell</button>
                        <button className={`types-three ${isForRent ? "for-rent" : ""}`} onClick={() => forRent()}>For Rent</button>
                    </div>
                </div>

                <div className="property-types">
                    <div className={`p-types  ${isVisible ? "visible-three" : ""}`} ref={(el) => (elementsRef.current[3] = el)} id="houseOne">
                        <img src={houseOne} alt="" className="type-image" />
                        <div className="other">
                            <button className="rent-sell">For Sell</button>
                            <button className="house-type">Apartment</button>
                            <h4 className="price-tag">$12,345</h4>
                            <h3 className="house-desc">Golden Urban House For Sell</h3>
                            <div className="location-display">
                                <FaLocationDot color="#00B98E" className="location-icon" />
                                <p>123 Street, New York, USA</p>
                            </div>
                            <div className="size-bed-bath">
                                <div className="size">
                                    <FaRulerCombined color="#00B98E" className="sqft-icon" />
                                    <p>1000 Sqft</p>
                                </div>
                                <div className="bed">
                                    <FaBed color="#00B98E" className="bed-icon" />
                                    <p>3 Bed</p>
                                </div>
                                <div className="bath">
                                    <FaBath color="#00B98E" className="bath-icon" />
                                    <p>2 Bath</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`p-types  ${isVisible ? "visible-three" : ""}`} ref={(el) => (elementsRef.current[4] = el)} id="houseTwo">
                        <img src={houseTwo} alt="" className="type-image" />
                        <div className="other">
                            <button className="rent-sell">For Rent</button>
                            <button className="house-type-villa">Villa</button>
                            <h4 className="price-tag">$12,345</h4>
                            <h3 className="house-desc">Golden Urban House For Sell</h3>
                            <div className="location-display">
                                <FaLocationDot color="#00B98E" className="location-icon" />
                                <p>123 Street, New York, USA</p>
                            </div>
                            <div className="size-bed-bath">
                                <div className="size">
                                    <FaRulerCombined color="#00B98E" className="sqft-icon" />
                                    <p>1000 Sqft</p>
                                </div>
                                <div className="bed">
                                    <FaBed color="#00B98E" className="bed-icon" />
                                    <p>3 Bed</p>
                                </div>
                                <div className="bath">
                                    <FaBath color="#00B98E" className="bath-icon" />
                                    <p>2 Bath</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`p-types  ${isVisible ? "visible-three" : ""}`} ref={(el) => (elementsRef.current[5] = el)} id="houseThree">
                        <img src={houseThree} alt="" className="type-image" />
                        <div className="other">
                            <button className="rent-sell">For Sell</button>
                            <button className="house-type-office">Office</button>
                            <h4 className="price-tag">$12,345</h4>
                            <h3 className="house-desc">Golden Urban House For Sell</h3>
                            <div className="location-display">
                                <FaLocationDot color="#00B98E" className="location-icon" />
                                <p>123 Street, New York, USA</p>
                            </div>
                            <div className="size-bed-bath">
                                <div className="size">
                                    <FaRulerCombined color="#00B98E" className="sqft-icon" />
                                    <p>1000 Sqft</p>
                                </div>
                                <div className="bed">
                                    <FaBed color="#00B98E" className="bed-icon" />
                                    <p>3 Bed</p>
                                </div>
                                <div className="bath">
                                    <FaBath color="#00B98E" className="bath-icon" />
                                    <p>2 Bath</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`p-types  ${isVisible ? "visible-three" : ""}`} ref={(el) => (elementsRef.current[6] = el)} id="houseFour">
                        <img src={houseFour} alt="" className="type-image" />
                        <div className="other">
                            <button className="rent-sell">For Rent</button>
                            <button className="house-type-building">Building</button>
                            <h4 className="price-tag">$12,345</h4>
                            <h3 className="house-desc">Golden Urban House For Sell</h3>
                            <div className="location-display">
                                <FaLocationDot color="#00B98E" className="location-icon" />
                                <p>123 Street, New York, USA</p>
                            </div>
                            <div className="size-bed-bath">
                                <div className="size">
                                    <FaRulerCombined color="#00B98E" className="sqft-icon" />
                                    <p>1000 Sqft</p>
                                </div>
                                <div className="bed">
                                    <FaBed color="#00B98E" className="bed-icon" />
                                    <p>3 Bed</p>
                                </div>
                                <div className="bath">
                                    <FaBath color="#00B98E" className="bath-icon" />
                                    <p>2 Bath</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`p-types  ${isVisible ? "visible-three" : ""}`} ref={(el) => (elementsRef.current[7] = el)} id="houseFive">
                        <img src={houseFive} alt="" className="type-image" />
                        <div className="other">
                            <button className="rent-sell">For Sell</button>
                            <button className="house-type-home">Home</button>
                            <h4 className="price-tag">$12,345</h4>
                            <h3 className="house-desc">Golden Urban House For Sell</h3>
                            <div className="location-display">
                                <FaLocationDot color="#00B98E" className="location-icon" />
                                <p>123 Street, New York, USA</p>
                            </div>
                            <div className="size-bed-bath">
                                <div className="size">
                                    <FaRulerCombined color="#00B98E" className="sqft-icon" />
                                    <p>1000 Sqft</p>
                                </div>
                                <div className="bed">
                                    <FaBed color="#00B98E" className="bed-icon" />
                                    <p>3 Bed</p>
                                </div>
                                <div className="bath">
                                    <FaBath color="#00B98E" className="bath-icon" />
                                    <p>2 Bath</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`p-types  ${isVisible ? "visible-three" : ""}`} ref={(el) => (elementsRef.current[8] = el)} id="houseSix">
                        <img src={houseSix} alt="" className="type-image" />
                        <div className="other">
                            <button className="rent-sell">For Rent</button>
                            <button className="house-type-home">Shop</button>
                            <h4 className="price-tag">$12,345</h4>
                            <h3 className="house-desc">Golden Urban House For Sell</h3>
                            <div className="location-display">
                                <FaLocationDot color="#00B98E" className="location-icon" />
                                <p>123 Street, New York, USA</p>
                            </div>
                            <div className="size-bed-bath">
                                <div className="size">
                                    <FaRulerCombined color="#00B98E" className="sqft-icon" />
                                    <p>1000 Sqft</p>
                                </div>
                                <div className="bed">
                                    <FaBed color="#00B98E" className="bed-icon" />
                                    <p>3 Bed</p>
                                </div>
                                <div className="bath">
                                    <FaBath color="#00B98E" className="bath-icon" />
                                    <p>2 Bath</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="browse-more">Browse More Properties</button>
            </div>
        </>
    )
}
