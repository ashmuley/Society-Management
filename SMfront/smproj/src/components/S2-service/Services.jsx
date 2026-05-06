import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

import electricianImg from "../../assets/Selectrician.png";
import plumberImg from "../../assets/Splumber.png";
import carpenterImg from "../../assets/Scarpenter.png";
import cleanerImg from "../../assets/Scleaner.png";
import painterImg from "../../assets/Spainter.png";
import acrepairImg from "../../assets/Sacrepair.png";
import ScrollFloat from "../Effetcs/ScrollFloat";

const services = [
  {
    title: "Electrician",
    desc: "Wiring, switch fitting, repairs and electrical maintenance.",
    img: electricianImg,
  },
  {
    title: "Plumber",
    desc: "Pipe leaks, tap fitting, drainage and bathroom solutions.",
    img: plumberImg,
    className: "plumber-card",
  },
  {
    title: "Carpenter",
    desc: "Furniture work, wooden repairs and custom fittings.",
    img: carpenterImg,
    className: "carpenter-card",
  },
  {
    title: "Cleaner",
    desc: "Furniture work, wooden repairs and custom fittings.",
    img: cleanerImg,
  },
  {
    title: "Painter",
    desc: "Furniture work, wooden repairs and custom fittings.",
    img: painterImg,
  },
  {
    title: "AC Repair",
    desc: "Furniture work, wooden repairs and custom fittings.",
    img: acrepairImg,
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (title) => {

    const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

    const serviceName = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/services/${serviceName}`);
  };

  return (
    <section id="service" className="services-section">
      <div className="services-header">
        <h2>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=30%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Our Services
          </ScrollFloat>
        </h2>
        <p>Trusted experts for your daily home needs</p>
      </div>

      <div className="services-grid">
        {services.map((item, index) => (
          <div
            className={`service-card ${item.className || ""}`}
            key={index}
            onClick={() => handleServiceClick(item.title)}
            style={{ cursor: "pointer" }}
          >
            <div className="service-image">
              <img src={item.img} alt={item.title} />
            </div>

            <div className="service-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

// import React from "react";
// import "./Services.css";

// import electricianImg from "../../assets/Selectrician.png";
// import plumberImg from "../../assets/Splumber.png";
// import carpenterImg from "../../assets/Scarpenter.png";
// import cleanerImg from "../../assets/Scleaner.png";
// import painterImg from "../../assets/Spainter.png";
// import acrepairImg from "../../assets/Sacrepair.png";
// import ScrollFloat from '../Effetcs/ScrollFloat';

// const services = [
//   {
//     title: "Electrician",
//     desc: "Wiring, switch fitting, repairs and electrical maintenance.",
//     img: electricianImg,
//   },
//   {
//     title: "Plumber",
//     desc: "Pipe leaks, tap fitting, drainage and bathroom solutions.",
//     img: plumberImg,
//     className: "plumber-card"
//   },
//   {
//     title: "Carpenter",
//     desc: "Furniture work, wooden repairs and custom fittings.",
//     img: carpenterImg,
//     className: "carpenter-card"
// },
// {
//     title: "Cleaner",
//     desc: "Furniture work, wooden repairs and custom fittings.",
//     img: cleanerImg,
//   },
//   {
//     title: "Painter",
//     desc: "Furniture work, wooden repairs and custom fittings.",
//     img: painterImg,
//   },
//   {
//     title: "AC Repair",
//     desc: "Furniture work, wooden repairs and custom fittings.",
//     img: acrepairImg,
//   },
// ];

// const Services = () => {
//   return (
//     <section className="services-section">
//       <div className="services-header">
//         <h2>
//           <ScrollFloat
//   animationDuration={1}
//   ease='back.inOut(2)'
//   scrollStart='center bottom+=30%'
//   scrollEnd='bottom bottom-=40%'
//   stagger={0.03}
// >
//   Our Services
// </ScrollFloat></h2>
//         <p>Trusted experts for your daily home needs</p>
//       </div>

//       <div className="services-grid">
//         {services.map((item, index) => (
//           <div className={`service-card ${item.className || ""}`} key={index}>
//             <div className="service-image">
//               <img src={item.img} alt={item.title} />
//             </div>

//             <div className="service-content">
//               <h3>{item.title}</h3>
//               <p>{item.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Services;