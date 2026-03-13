import HeroSection      from "../components/sections/HeroSection";
import AboutSection     from "../components/sections/AboutSection";
import SkillsSection    from "../components/sections/SkillsSection";
import ProjectsSection  from "../components/sections/ProjectsSection";
import BlogSection      from "../components/blog/BlogSection";
import ContactSection   from "../components/sections/ContactSection";
import Footer           from "../components/layout/Footer";

export default function HomePage({ onNav, onOpenPost }) {
  return (
    <main>
      <HeroSection     onNav={onNav} />
      <AboutSection    />
      <SkillsSection   />
      <ProjectsSection onBlog={onOpenPost} />
      <BlogSection     onOpen={onOpenPost} />
      <ContactSection  />
      <Footer          />
    </main>
  );
}