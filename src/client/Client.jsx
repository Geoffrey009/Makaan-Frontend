import { useRef, useState, useEffect } from "react";
import "./Client.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import testimonialOne from "../assets/testimonial-1.jpg";
import testimonialTwo from "../assets/testimonial-2.jpg";
import testimonialThree from "../assets/testimonial-3.jpg";

export const Client = () => {
  const cardOne = useRef(null);
  const cardTwo = useRef(null);
  const cardThree = useRef(null);

  const [visibleCards, setVisibleCards] = useState([1, 2]); // 1 & 2 on first load
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const ANIM_MS = 500; // match your CSS animation duration

  const allCards = [
    { ref: cardOne, index: 1 },
    { ref: cardTwo, index: 2 },
    { ref: cardThree, index: 3 },
  ];

  // On first mount: make 1 & 2 visible immediately (no waiting for animation)
  useEffect(() => {
    allCards.forEach(({ ref, index }) => {
      if (!ref.current) return;
      // outer containers are the flex items
      ref.current.style.display = visibleCards.includes(index) ? "block" : "none";
      // ensure no stray animation classes on the inner content
      const inner = ref.current.firstElementChild; // review-*-inside
      if (inner) {
        inner.classList.remove(
          "slide-in-right",
          "slide-in-left",
          "slide-out-left",
          "slide-out-right"
        );
      }
    });
  }, []); // run once

  // Whenever visible pair or direction changes, animate the swap
  useEffect(() => {
    // 1) Make new visible pair display:block FIRST so flex keeps two items
    allCards.forEach(({ ref, index }) => {
      if (!ref.current) return;
      if (visibleCards.includes(index)) {
        ref.current.style.display = "block"; // reserve space in the row
      }
    });

    // 2) Apply animations on inner content only
    allCards.forEach(({ ref, index }) => {
      const el = ref.current;
      if (!el) return;

      const inner = el.firstElementChild; // .review-*-inside
      if (!inner) return;

      // clear previous animation classes
      inner.classList.remove(
        "slide-in-right",
        "slide-in-left",
        "slide-out-left",
        "slide-out-right"
      );

      if (visibleCards.includes(index)) {
        // incoming or staying visible
        inner.classList.add(direction === "next" ? "slide-in-right" : "slide-in-left");
      } else {
        // outgoing
        inner.classList.add(direction === "next" ? "slide-out-left" : "slide-out-right");
        // after animation completes, hide the card's outer container
        setTimeout(() => {
          // still not visible? hide it
          if (!visibleCards.includes(index) && ref.current) {
            ref.current.style.display = "none";
          }
        }, ANIM_MS);
      }
    });
  }, [visibleCards, direction]);

  // Rotation logic (always shift by one, keep two visible)
  const clickNext = () => {
    setDirection("next");
    const last = visibleCards[1];
    const next = last === 3 ? 1 : last + 1;
    setVisibleCards([visibleCards[1], next]); // shift right
  };

  const clickBack = () => {
    setDirection("prev");
    const first = visibleCards[0];
    const prev = first === 1 ? 3 : first - 1;
    setVisibleCards([prev, visibleCards[0]]); // shift left
  };

  return (
    <>
      <h1 className="client-title">Our Clients Say!</h1>
      <p className="client-desc">
        Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd <br />
        vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
      </p>

      <div className="client-reviews">
        <div className="nav-icons">
          <div className="left-icon-cover" onClick={clickBack}>
            <IoIosArrowRoundBack className="left-icon" color="white" strokeWidth={0.001} size={32} />
          </div>
          <div className="right-icon-cover" onClick={clickNext}>
            <IoIosArrowRoundForward className="right-icon" color="white" strokeWidth={0.001} size={32} />
          </div>
        </div>

        <div className="client-reviews-main">
          <div className="client-review client-review-one" ref={cardOne}>
            <div className="review-one-inside">
              <p className="review">
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet.
                Est stet ea lorem amet est kasd kasd erat eos
              </p>
              <div className="client-identity">
                <img src={testimonialOne} alt="" />
                <div className="name-proff">
                  <h6>Client Name</h6>
                  <p>Profession</p>
                </div>
              </div>
            </div>
          </div>

          <div className="client-review client-review-two" ref={cardTwo}>
            <div className="review-two-inside">
              <p className="review">
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet.
                Est stet ea lorem amet est kasd kasd erat eos
              </p>
              <div className="client-identity">
                <img src={testimonialTwo} alt="" />
                <div className="name-proff">
                  <h6>Client Name</h6>
                  <p>Profession</p>
                </div>
              </div>
            </div>
          </div>

          <div className="client-review client-review-three" ref={cardThree}>
            <div className="review-three-inside">
              <p className="review">
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet.
                Est stet ea lorem amet est kasd kasd erat eos
              </p>
              <div className="client-identity">
                <img src={testimonialThree} alt="" />
                <div className="name-proff">
                  <h6>Client Name</h6>
                  <p>Profession</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
