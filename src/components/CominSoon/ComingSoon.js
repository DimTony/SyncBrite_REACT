"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Menu,
  Star,
  X,
} from "lucide-react";
import comingSoonLogo from "../../images/p-pic.png";
import comingSoonHeroPic from "../../images/coming-soon.png";
import "./ComingSoon.css";
import Countdown from "../../helpers/CountdownTimer";

const menuItems = [
  {
    name: "Home",
    href: "https://tonydim.vercel.app/",
  },
  {
    name: "About",
    href: "https://tonydim.vercel.app/about",
  },
  {
    name: "Contact",
    href: "https://tonydim.vercel.app/contact",
  },
  {
    name: "Resume",
    href: "https://tonydim.vercel.app/resume",
  },
];

export function ComingSoon() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [headline, setHeadline] = useState("Countdown to my page launch");
  const [countdownStyle, setCountdownStyle] = useState({ display: "block" });
  const [contentStyle, setContentStyle] = useState({ display: "none" });
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post("http://your-backend-endpoint", {
        email,
      });
      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const enddate = "01/01/2024";
    const countDown = new Date(enddate).getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDown - now;

      setDays(Math.floor(distance / day));
      setHours(Math.floor((distance % day) / hour));
      setMinutes(Math.floor((distance % hour) / minute));
      setSeconds(Math.floor((distance % minute) / second));

      if (distance < 0) {
        setHeadline("It's Here!");
        setCountdownStyle({ display: "none" });
        setContentStyle({ display: "block" });
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="comingSoon_wrapper">
      <header className="comingSoon_header_wrapper">
        <div className="comingSoon_header_container">
          <div className="comingSoon_header_logo_wrapper">
            <span>
              <img src={comingSoonLogo} style={{ width: "5rem" }} alt="logo" />
            </span>
            <span
              className="comingSoon_header_logo_font"
              style={{ fontSize: "14px" }}
            >
              Dimojiaku Anthony
            </span>
          </div>
          <div className="hidden lg:block" style={{ width: "65rem" }}>
            <ul className="comingSoon_header_nav_wrapper">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                    style={{ fontSize: "20px" }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block" hidden>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Button text
            </button>
          </div>
          <div className="comingSoon_header_hamburger">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <span>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 50 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                      <span className="font-bold">DevUI</span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Button text
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <div className="comingSoon_body_wrapper">
        <div className="comingSoon_body_container">
          <div className="comingSoon_bodyLeft_wrapper">
            <div className="comingSoon_bodyLeft_one_wrapper">
              <div className="comingSoon_bodyLeft_oneLeft_wrapper">
                <p className="comingSoon_bodyLeft_oneLeft_font">
                  Open to Opportunities
                </p>
              </div>
              <p className="comingSoon_bodyLeft_oneRight_font">
                Love to join your team
              </p>
            </div>
            <h1 className="comingSoon_bodyLeft_two_font">PAGE COMING SOON</h1>
            <p
              className="comingSoon_bodyLeft_three_font"
              style={{ fontSize: "15px" }}
            >
              🚀 Exciting News Unveiling Soon! 🎉 Get Ready to Embark on a
              Journey with me. I'm Cooking Up Something Special Just for You.
              Stay Tuned for an Unforgettable Experience. Your Adventure Begins
              now! #StayExcited #ComingSoon ✨
            </p>
            <div>
              <div id="countdown">
                <ul className="countdown_navs">
                  <li>
                    <span id="days">{days}</span>days
                  </li>
                  <li>
                    <span id="hours">{hours}</span>Hours
                  </li>
                  <li>
                    <span id="minutes">{minutes}</span>Minutes
                  </li>
                  <li>
                    <span id="seconds">{seconds}</span>Seconds
                  </li>
                </ul>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendEmail();
              }}
              className="comingSoon_bodyLeft_four_form"
            >
              <div>
                <input
                  className="comingSoon_bodyLeft_four_form_input"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                ></input>
                <p className="comingSoon_bodyLeft_four_form_text">
                  Send your email to request consultation
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="comingSoon_bodyLeft_four_form_btn"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="comingSoon_bodyRight_wrapper">
            <img
              className="comingSoon_bodyRight_img"
              src={comingSoonHeroPic}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
