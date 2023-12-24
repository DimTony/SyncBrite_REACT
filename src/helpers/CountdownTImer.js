import React, { useEffect, useState } from "react";
// import "./CountdownTimer.css";

const Countdown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [headline, setHeadline] = useState("Countdown to my page launch");
  const [countdownStyle, setCountdownStyle] = useState({ display: "block" });
  const [contentStyle, setContentStyle] = useState({ display: "none" });

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

  return (
    <div className="container">
      <h1 id="headline">{headline}</h1>
      <div id="countdown" style={countdownStyle}>
        <ul>
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
      <div id="content" className="emoji" style={contentStyle}>
        <span>🥳</span>
        <span>🎉</span>
        <span>🎂</span>
      </div>
    </div>
  );
};

export default Countdown;
