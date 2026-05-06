import Navbar from "../components/Navbar";
import Hero from "../components/S1-hero/Hero";
import Services from "@/components/S2-service/Services";
import Process from "../components/S3-process/Process"
import JoinUs from "@/components/S4-Joinus/JoinUs";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <JoinUs />
    </>
  );
}
    
export default Home;