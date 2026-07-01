"use client";

import { useRouter } from "next/navigation";
import { useActiveSection } from "../hooks/useActiveSection";
import Navbar from "./layout/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import BlogSection from "./blog/BlogSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./layout/Footer";

const SECTION_IDS = ["hero", "about", "skills", "projects", "blog", "contact"];

export default function HomeClient() {
  const router = useRouter();
  const active = useActiveSection(SECTION_IDS);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openPost = (id) => {
    router.push(`/blog/${id}`);
  };

  return (
    <>
      <Navbar active={active} onNav={goTo} />
      <main>
        <HeroSection onNav={goTo} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection onOpen={openPost} />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
