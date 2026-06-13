import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

export const revalidate = 3600;

async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return projects;
}

export default async function Home() {
  const allProjects = await getProjects();
  const personalProjects = allProjects.filter(
    (p: any) => p.category !== "Community",
  );
  const communityProjects = allProjects.filter(
    (p: any) => p.category === "Community",
  );

  return (
    <>
      <Navbar />

      <header
        className="max-w-[1192px] mx-auto p-[24px] mt-[12vh] flex justify-between flex-wrap"
        id="about"
      >
        <section className="basis-full lg:basis-1/2">
          <h1 className="text-[28px] sm:text-[56px] text-center lg:text-left text-[var(--color-custom-dark-blue)] font-bold mb-[1vh]">
            Aditya Catur Putra
          </h1>
          <p className="text-center lg:text-left text-[var(--color-custom-dark-blue)] text-[20px] font-normal mb-[6vh]">
            Software Engineer
          </p>
          <a
            className="btn-cv block text-[18px] font-bold cursor-pointer py-3 text-center no-underline mb-[6vh] rounded-md"
            href="https://docs.google.com/document/d/1MjgmyTl4aJo7zQNgpd-5bXBOAJzBjzhBd6ObvmKy-AY/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Curriculum Vitae
          </a>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-[4vh]">
            <div className="flex flex-col justify-center gap-[4vh]">
              <div>
                <p className="text-[var(--color-custom-dark-blue)] text-[14px] font-semibold mb-4">
                  SUMMARY
                </p>
                <p className="text-[var(--color-custom-blue)] text-[18px] font-bold leading-[150%] max-w-md">
                  Skilled Fullstack Developer with over 3 years of experience,
                  specializing in robust, scalable backend systems using Java
                  and Spring Boot, while fully capable of delivering interactive
                  frontends with React and Next.js.
                </p>
              </div>
              <div>
                <p className="text-[var(--color-custom-dark-blue)] text-[14px] font-semibold mb-4">
                  CONTACT
                </p>
                <p className="text-[var(--color-custom-blue)] text-[18px] font-bold leading-[150%]">
                  Jakarta, ID
                </p>
                <p className="text-[var(--color-custom-blue)] text-[18px] font-bold leading-[150%]">
                  adityacaturputra25@gmail.com
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-[4vh]">
              <div>
                <p className="text-[var(--color-custom-dark-blue)] text-[14px] font-semibold mb-4">
                  YEARS OF EXPERIENCE
                </p>
                <p className="text-[var(--color-custom-blue)] font-bold leading-[150%] mt-[-12px] text-[40px]">
                  4+
                </p>
              </div>
              <div>
                <p className="text-[var(--color-custom-dark-blue)] text-[14px] font-semibold mb-4">
                  PROJECTS DONE
                </p>
                <p className="text-[var(--color-custom-blue)] font-bold leading-[150%] mt-[-12px] text-[40px]">
                  10+
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="hidden lg:block max-w-[485px] min-w-[240px]">
          <img className="w-full" src="/profile.png" alt="profile-picture" />
        </section>
      </header>

      <main className="max-w-[1192px] mx-auto p-[24px]">
        {/* Personal Projects */}
        <h2
          className="text-[28px] text-[var(--color-custom-dark-blue)] font-bold mt-[118px] mb-[32px]"
          id="projects-link"
        >
          Latest Personal Projects
        </h2>
        <section className="flex flex-wrap gap-[18px]">
          {personalProjects.map((project: any) => (
            <ProjectCard key={project._id.toString()} project={project} />
          ))}
        </section>

        {/* Community Projects */}
        <h2 className="text-[28px] text-[var(--color-custom-dark-blue)] font-bold mt-[118px] mb-[32px]">
          Latest Community Projects
        </h2>
        <section className="flex flex-wrap gap-[18px]">
          {communityProjects.map((project: any) => (
            <ProjectCard key={project._id.toString()} project={project} />
          ))}
        </section>

        <h2
          className="text-[28px] text-[var(--color-custom-dark-blue)] font-bold mt-[118px] mb-[32px]"
          id="skills"
        >
          Technical Skills
        </h2>
        <section className="flex flex-col gap-0 mb-32">
          <p className="text-[14px] font-normal text-[var(--color-custom-blue)] leading-[180%]">
            <span className="text-[18px] font-bold leading-[180%]">
              Languages:{" "}
            </span>
            Advanced in Java, Javascript, Typescript, Mysql, Postgresql,
            HTML/CSS; Proficient in C#, VB.Net, Python, PHP, Golang
          </p>
          <p className="text-[14px] font-normal text-[var(--color-custom-blue)] leading-[180%] mt-4">
            <span className="text-[18px] font-bold leading-[180%]">
              Frameworks:{" "}
            </span>
            React (CRA, Next, React Native), Spring Boots, NodeJS, Express,
            9Router, Codex, MongoDB, Mongoose, Laravel, Mysql
          </p>
          <p className="text-[14px] font-normal text-[var(--color-custom-blue)] leading-[180%] mt-4">
            <span className="text-[18px] font-bold leading-[180%]">
              Developer Tools:{" "}
            </span>
            Git, Firebase, Docker, RabbitMQ, Redis, Styled Components, Tailwind,
            Bootstraps, React Query, Redux
          </p>
          <p className="text-[14px] font-normal text-[var(--color-custom-blue)] leading-[180%] mt-4">
            <span className="text-[18px] font-bold leading-[180%]">
              Tools:{" "}
            </span>
            Intellij Idea, Visual Studio Code, Visual Studio (C# .Net), XAMPP,
            Postman, Figma
          </p>
          <p className="text-[14px] font-normal text-[var(--color-custom-blue)] leading-[180%] mt-4">
            <span className="text-[18px] font-bold leading-[180%]">
              Relevant Skills:{" "}
            </span>
            Clean Code, Clean Architecture, REST API, JSON, UI Design, AI/LLM
            Prompt Engineering & Agent Frameworks, Vibe Coding & Pattern-Driven
            Development.
          </p>
          <div className="text-[14px] font-normal text-[var(--color-custom-blue)] leading-[180%] mt-4">
            <span className="text-[18px] font-bold leading-[180%]">Certifications & Training: </span>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">BNSP Occupation of Programmer</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Backend Developer Expert (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Backend Developer Intermediate (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Backend Developer Beginner (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Frontend Web Developer Intermediate (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Frontend Web Developer Beginner (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Devops Path CI/CD (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Devops Path Basics (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">Architecting on AWS (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">AWS Cloud Practitioner Essentials (Dicoding)</a></li>
              <li><a href="#" className="hover:underline hover:text-[var(--color-custom-dark-blue)] transition-colors" target="_blank" rel="noreferrer">NodeJs Roadmap Path (Progate)</a></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
