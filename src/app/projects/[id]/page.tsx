import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Link from "next/link";
import MarkdownViewer from "@/components/MarkdownViewer";

export const revalidate = 3600;

async function getProject(id: string) {
  await dbConnect();
  try {
    const project = await Project.findById(id).lean();
    return project;
  } catch (error) {
    return null;
  }
}

async function getReadme(repoUrl: string) {
  if (!repoUrl || repoUrl === '#') return null;
  try {
    const urlObj = new URL(repoUrl);
    if (urlObj.hostname !== 'github.com') return null;
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) return null;
    
    const owner = pathParts[0];
    const repo = pathParts[1];
    
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw'
      },
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.text();
  } catch (error) {
    return null;
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.id);
  
  if (!project) {
    return (
      <div className="max-w-[1192px] mx-auto p-[24px] min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-[var(--color-custom-dark-blue)]">Project not found</h1>
        <Link href="/" className="ml-4 text-[var(--color-custom-blue)] hover:underline">Back to Home</Link>
      </div>
    );
  }

  const markdown = await getReadme(project.repoUrl);

  return (
    <div className="max-w-[1192px] mx-auto p-[24px] min-h-screen pt-12">
      <Link href="/" className="text-[var(--color-custom-blue)] font-bold hover:underline mb-8 inline-block">
        &larr; Back to Home
      </Link>
      
      <header className="mb-12 border-b-2 border-[var(--color-custom-overlay)] pb-8">
        <h1 className="text-[40px] font-bold text-[var(--color-custom-dark-blue)] leading-[1.2] mb-4">
          {project.name}
        </h1>
        <p className="text-[18px] text-[var(--color-custom-dark-blue)] mb-6">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-[14px] font-bold text-[var(--color-custom-dark-blue)] bg-[var(--color-custom-overlay)] px-3 py-1 rounded-full">
            {project.techStack}
          </p>
          {project.repoUrl && project.repoUrl !== '#' && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-[var(--color-custom-blue)] font-bold hover:underline">
              View Repository
            </a>
          )}
          {project.DemoUrl && project.DemoUrl !== '#' && (
            <a href={project.DemoUrl} target="_blank" rel="noreferrer" className="text-[var(--color-custom-blue)] font-bold hover:underline">
              Live Demo
            </a>
          )}
        </div>
      </header>

      <main className="bg-white p-8 rounded-2xl shadow-sm border-2 border-[var(--color-custom-overlay)] overflow-hidden">
        {markdown ? (
          <MarkdownViewer content={markdown} repoUrl={project.repoUrl} />
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-custom-dark-blue)]">No README.md found for this project, or the repository is private.</p>
          </div>
        )}
      </main>
    </div>
  );
}
