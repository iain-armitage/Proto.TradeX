import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProjectSummaryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectInfo, setProjectInfo] = useState({
    id,
    name: 'Greenvale Apartments',
    client: 'ACME Constructions',
    address: '22 Market St, Sydney',
    budget: 2400000,
    status: 'In Progress',
    stage: 'Rough-in',
    siteManager: 'Jordan Lee'
  });

  const [documents, setDocuments] = useState([
    { name: 'Site Plan.pdf', url: '#' },
    { name: 'Compliance Cert.docx', url: '#' }
  ]);

  const [tasks, setTasks] = useState([
    { name: 'Excavation', status: 'Complete' },
    { name: 'Rough-in Plumbing', status: 'In Progress' },
    { name: 'Final Fit-Off', status: 'Pending' }
  ]);

  const handleStatusCycle = (index) => {
    const statusOrder = ['Pending', 'In Progress', 'Complete'];
    setTasks(prev => {
      const newTasks = [...prev];
      const currentStatus = newTasks[index].status;
      const nextIndex = (statusOrder.indexOf(currentStatus) + 1) % statusOrder.length;
      newTasks[index].status = statusOrder[nextIndex];
      return newTasks;
    });
  };

  const handleAddTask = () => {
    setTasks(prev => [...prev, { name: 'New Task', status: 'Pending' }]);
  };

  const handleDeleteTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => [...prev, { name: file.name, url: '#' }]);
    }
  };

  const handleInfoChange = (field, value) => {
    setProjectInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Project: {projectInfo.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(projectInfo).map(([key, value]) => (
          key !== 'id' && (
            <div key={key}>
              <h2 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h2>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInfoChange(key, e.target.value)}
                className="border p-1 rounded w-full"
              />
            </div>
          )
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Documents</h2>
        <input type="file" onChange={handleAddDocument} className="mb-2" />
        <ul className="list-disc pl-5">
          {documents.map((doc, index) => (
            <li key={index}>
              <a href={doc.url} className="text-blue-600 underline">{doc.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Tasks</h2>
        <button
          className="mb-2 px-3 py-1 bg-green-600 text-white rounded"
          onClick={handleAddTask}
        >
          + Add Task
        </button>
        <ul className="list-disc pl-5 space-y-1">
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="text"
                value={task.name}
                onChange={(e) => {
                  const newTasks = [...tasks];
                  newTasks[index].name = e.target.value;
                  setTasks(newTasks);
                }}
                className="border p-1 rounded mr-2"
              />
              <button
                className="text-sm text-blue-600 mr-2"
                onClick={() => handleStatusCycle(index)}
              >
                {task.status}
              </button>
              <button
                className="text-sm text-red-600"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
