import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProjectSummaryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectInfo, setProjectInfo] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();
      const { data: taskList } = await supabase.from('tasks').select('*').eq('project_id', id);
      const { data: docList } = await supabase.from('documents').select('*').eq('project_id', id);

      setProjectInfo(project);
      setTasks(taskList || []);
      setDocuments(docList || []);
    };

    fetchData();
  }, [id]);

  const cycleStatus = (current) => {
    const statusOrder = ['Pending', 'In Progress', 'Complete'];
    const nextIndex = (statusOrder.indexOf(current) + 1) % statusOrder.length;
    return statusOrder[nextIndex];
  };

  const updateTaskStatus = async (taskId, currentStatus) => {
    const newStatus = cycleStatus(currentStatus);
    await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const addTask = async () => {
    if (!newTaskName) return;
    const { data: newTask } = await supabase
      .from('tasks')
      .insert([{ project_id: id, name: newTaskName, status: 'Pending' }])
      .select()
      .single();

    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const filePath = `${id}/${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('project-documents')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from('project-documents')
      .getPublicUrl(filePath);

    const { data: newDoc } = await supabase
      .from('documents')
      .insert([{ project_id: id, file_name: file.name, file_url: publicUrl.publicUrl }])
      .select()
      .single();

    setDocuments([...documents, newDoc]);
  };

  if (!projectInfo) return <div className="p-8">Loading project...</div>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Project: {projectInfo.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div><strong>Client:</strong> {projectInfo.client}</div>
        <div><strong>Address:</strong> {projectInfo.address}</div>
        <div><strong>Budget:</strong> ${projectInfo.budget?.toLocaleString()}</div>
        <div><strong>Status:</strong> {projectInfo.status}</div>
        <div><strong>Stage:</strong> {projectInfo.stage}</div>
        <div><strong>Site Manager:</strong> {projectInfo.site_manager}</div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Documents</h2>
        <input type="file" onChange={handleFileUpload} className="mb-2" />
        <ul className="list-disc pl-5">
          {documents.map((doc) => (
            <li key={doc.id}>
              <a href={doc.file_url} target="_blank" className="text-blue-600 underline">{doc.file_name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Tasks</h2>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="border p-1 rounded w-full"
            placeholder="New task name"
          />
          <button onClick={addTask} className="bg-green-600 text-white px-3 py-1 rounded">Add Task</button>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name}{' '}
              <button
                onClick={() => updateTaskStatus(task.id, task.status)}
                className="text-sm text-blue-600"
              >
                ({task.status})
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
