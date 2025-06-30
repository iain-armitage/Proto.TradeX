import Link from 'next/link';

const projects = [
  { id: 'PR-001', name: 'Greenvale Apartments', client: 'ACME Constructions' },
  { id: 'PR-002', name: 'Riverside Towers', client: 'BuildPro Services' }
];

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">All Projects</h1>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="text-blue-600 hover:underline">
            <Link href={`/projects/${project.id}`}>
              {project.name} - {project.client}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
