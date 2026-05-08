
import React from "react";
import "./Hero.css";
import BlurText from "../Effetcs/BlurText";
import LightRays from "../Effetcs/LightRays";
import heroimg from "../../assets/R4.png";
import joinus from "@/assets/joinus.png";

const Hero = () => {
  return (
    <section className="hero">

      {/* Background Effect */}
      <div className="hero-bg">
        <LightRays
          raysOrigin="top-center"
          raysColor="#F1E194"
          raysSpeed={2.2}
          lightSpread={1.2}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.12}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
           
            <BlurText
              text="Trusted Service Provider for Your Society!"
              delay={200}
              animateBy="words"
              direction="top"
            />
          </h1>

          <p className="hero-text">
            <BlurText
              text=" Book electricians, plumbers, cleaners and more in just a few clicks."
              delay={120}
              animateBy="words"
              direction="bottom"
            />
            {/* Book electricians, plumbers, cleaners and more in just a few clicks. */}
          </p>

          <button className="hero-btn">Get Started</button>
        </div>

        <div className="hero-right">
          <img
            // src={heroimg} alt="workers" className="hero-worker"
            src={joinus} alt="workers" className="hero-worker"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;