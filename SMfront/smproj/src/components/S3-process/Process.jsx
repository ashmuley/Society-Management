import React, { useEffect, useRef, useState } from "react";
import "./Process.css";
import TextType from "../Effetcs/TextType";

const steps = [
  {
    no: "1",
    title: "Sign Up / Login",
    desc: "Create your account or login to get started.",
    icon: "👤",
  },
  {
    no: "2",
    title: "Choose Service",
    desc: "Select the type of service you need.",
    icon: "🛠️",
  },
  {
    no: "3",
    title: "Book Service",
    desc: "Choose date, time & preferred worker.",
    icon: "📅",
  },
  {
    no: "4",
    title: "Worker Accepts",
    desc: "Get notified when request is accepted.",
    icon: "✅",
  },
  {
    no: "5",
    title: "OTP to Start",
    desc: "Share secure OTP to begin service.",
    icon: "🔐",
  },
  {
    no: "6",
    title: "Service Completed",
    desc: "Review, rate and complete process.",
    icon: "✔️",
  },
];

const Process = () => {
  const [startTyping, setStartTyping] = useState(false);
const sectionRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStartTyping(true);
      }
    },
    { threshold: 0.1 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);
  return (
    <section id="about" className="process-section" ref={sectionRef}>
      {/* <p className="process-tag">
        <TextType 
              text={["HOW IT WORKS", "Simple and Easy", "Book NOW!"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              // texts={["Welcome to React Bits! Good to see you!","Build some amazing experiences!"]}
              deletingSpeed={50}
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
            />
      </p> */}

      <p  className="process-tag">
  {startTyping ? (
    <TextType
      text={["HOW IT WORKS", "Simple and Easy", "Book NOW!"]}
      typingSpeed={75}
      pauseDuration={1800}
      showCursor
      cursorCharacter="_"
      deletingSpeed={50}
      variableSpeedEnabled={false}
      cursorBlinkDuration={0.5}
    />
  ) : (
    "HOW IT WORKS"
  )}
</p>
      <h2>Simple Steps. Seamless Service.</h2>
      <p className="process-sub">
        From booking to completion — we make home services easy,
        secure and hassle-free for residents.
      </p>

      <div className="process-wrapper">
        <div className="process-line"></div>

        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-number">{step.no}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="process-footer">
        <span>TRUSTED</span>
        <span>SECURE</span>
        <span>HASSLE-FREE</span>
      </div>
    </section>
  );
};

export default Process;