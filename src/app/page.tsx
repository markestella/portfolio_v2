// Main portfolio page with all sections
import HeroSection from "@/components/sections/HeroSection";
import DashboardStats from "@/components/sections/DashboardStats";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <DashboardStats />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <CertificatesSection />
      <ContactSection />
    </>
  );
}

