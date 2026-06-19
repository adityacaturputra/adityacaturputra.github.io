"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: {
    _id: string;
    name: string;
    description: string;
    techStack: string;
    imgUrl: string;
    repoUrl: string;
    DemoUrl: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/projects/${project._id.toString()}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="project-container relative w-full sm:w-[calc(50%-9px)] bg-[var(--color-custom-bg)] group cursor-pointer"
    >
      <div className="project-image m-3 relative">
        <img 
          src={project.imgUrl} 
          alt={project.name}
          className="project-image__img object-cover w-full sm:w-fit h-[500px]"
        />
        <div className="project-image__img-overlay absolute bottom-0 w-full h-full"></div>
        
        <div className="project-text absolute bottom-1.5 left-3 leading-[180%] opacity-0">
          <p className="project-name mb-4 text-[18px] font-bold text-[var(--color-custom-blue)]">{project.name}</p>
          <p className="project-description text-[12px] font-semibold text-[var(--color-custom-dark-blue)]">{project.description}</p>
          <br/>
          <p className="project-tech-stack text-[12px] font-bold text-[var(--color-custom-dark-blue)]">{project.techStack}</p>
          <p className="project-description mt-2">
            <Link 
              className="text-[var(--color-custom-blue)] font-bold hover:underline" 
              href={`/projects/${project._id.toString()}`}
              onClick={(e) => e.stopPropagation()}
            >
              Detail
            </Link>
            {project.repoUrl && project.repoUrl !== '#' && (
              <>
                <span className="mx-1 text-[var(--color-custom-dark-blue)]">|</span>
                <a 
                  className="text-[var(--color-custom-blue)] font-bold hover:underline" 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Repo
                </a>
              </>
            )}
            {project.DemoUrl && project.DemoUrl !== '#' && (
              <>
                <span className="mx-1 text-[var(--color-custom-dark-blue)]">|</span>
                <a 
                  className="text-[var(--color-custom-blue)] font-bold hover:underline" 
                  href={project.DemoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Demo
                </a>
              </>
            )}
          </p>
        </div>
      </div>
      <p className="project-title text-[18px] font-bold text-[var(--color-custom-blue)] p-3 w-4/5 leading-[150%] hover:underline">
        {project.name}
      </p>
    </div>
  );
}
