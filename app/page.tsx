"use client";

import { useEffect, useState } from "react";
import LoaderScreen from "@/components/loader/LoaderScreen";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import ArchitectureSection from "@/components/architecture/ArchitectureSection";
import KineticMarquee from "@/components/shared/KineticMarquee";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import ServicesSection from "@/components/services/ServicesSection";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import ProjectsSection from "@/components/projects/ProjectsSection";
import CertificatesSection from "@/components/certificates/CertificatesSection";
import EducationSection from "@/components/education/EducationSection";
import ContactSection from "@/components/contact/ContactSection";
import CinematicFooter from "@/components/shared/CinematicFooter";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [loaded]);

  return (
    <>
      <LoaderScreen onComplete={() => setLoaded(true)} />

      <main
        aria-hidden={!loaded}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 600ms ease"
        }}
      >
        <HeroSection active={loaded} />
        <AboutSection />
        <KineticMarquee
          words={[
            "SHIPPED",
            "MEASURED",
            "REPRODUCIBLE",
            "OBSERVED",
            "ENGINEERED"
          ]}
          speed={48}
          italic
        />
        <ArchitectureSection />
        <CapabilitiesSection />
        <ServicesSection />
        <ExperienceTimeline />
        <ProjectsSection />
        <CertificatesSection />
        <EducationSection />
        <ContactSection />
        <CinematicFooter />
      </main>
    </>
  );
}
