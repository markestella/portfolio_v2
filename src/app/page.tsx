// Main portfolio page with Vintage IDE design
import IDEWrapper from "@/components/layout/IDEWrapper";
import ContentWithLines from "@/components/layout/ContentWithLines";
import VintageHeroSection from "@/components/sections/VintageHeroSection";
import VintageAboutSection from "@/components/sections/VintageAboutSection";
import VintageProjectsSection from "@/components/sections/VintageProjectsSection";
import VintageProductsSection from "@/components/sections/VintageProductsSection";
import VintageTechSection from "@/components/sections/VintageTechSection";
import VintageCertificatesSection from "@/components/sections/VintageCertificatesSection";
import VintageContactSection from "@/components/sections/VintageContactSection";

export default function Home() {
  return (
    <IDEWrapper>
      <ContentWithLines>
        <div id="home">
          <VintageHeroSection />
        </div>
        <VintageAboutSection />
        <VintageProjectsSection />
        <VintageProductsSection />
        <VintageTechSection />
        <VintageCertificatesSection />
        <VintageContactSection />
      </ContentWithLines>
    </IDEWrapper>
  );
}
