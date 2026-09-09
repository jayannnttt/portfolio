import Hero from '../components/Hero';
import ProjectsGrid from '../components/ProjectsGrid';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
