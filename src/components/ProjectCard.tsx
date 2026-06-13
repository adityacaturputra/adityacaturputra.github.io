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
  return (
    <div className="project-container relative w-full sm:w-[calc(50%-9px)] bg-[var(--color-custom-bg)]">
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
            {project.repoUrl && project.repoUrl !== '#' && (
              <a className="text-[var(--color-custom-blue)] font-bold hover:underline" href={project.repoUrl} target="_blank" rel="noreferrer">Repo</a>
            )}
            {project.repoUrl && project.repoUrl !== '#' && project.DemoUrl && project.DemoUrl !== '#' && (
              <span className="mx-1 text-[var(--color-custom-dark-blue)]">|</span>
            )}
            {project.DemoUrl && project.DemoUrl !== '#' && (
              <a className="text-[var(--color-custom-blue)] font-bold hover:underline" href={project.DemoUrl} target="_blank" rel="noreferrer">Demo</a>
            )}
          </p>
        </div>
      </div>
      <p className="project-title text-[18px] font-bold text-[var(--color-custom-blue)] p-3 w-4/5 leading-[150%]">
        {project.name}
      </p>
    </div>
  );
}
