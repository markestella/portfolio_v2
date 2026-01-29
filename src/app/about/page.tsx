import AboutSection from "@/components/sections/AboutSection";
import TechStackSection from "@/components/sections/TechStackSection";
import CertificatesSection from "@/components/sections/CertificatesSection";

export const metadata = {
  title: "About | Mark Estella",
  description: "Learn about Mark Estella's professional background, experience, and expertise in software engineering.",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <TechStackSection />
      <CertificatesSection />
    </>
  );
}
