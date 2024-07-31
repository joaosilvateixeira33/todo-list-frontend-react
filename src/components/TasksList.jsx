import React, { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../services/taskService.jsx';
import { TaskCreateForm } from './TaskForm.jsx';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError('Failed to delete task');
      console.error(error);
    }
  };

  const handleEditClick = (id) => {
    setEditTaskId(id);
  };

  const handleBackClick = () => {
    setEditTaskId(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Incompleta':
        return 'status_circle status-incomplete';
      case 'Em progresso':
        return 'status_circle status-in-progress';
      case 'Completa':
        return 'status_circle status-complete';
      default:
        return 'status_circle';
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='task_container'>
      <TaskCreateForm/>
      {tasks.map(task => (
        <li key={task.id}>
          <div className={`card ${editTaskId === task.id ? 'flipped' : ''}`}>
            <div className="card_front">
              <strong className='title_task'>{task.title}</strong>
              <p className='description_task'>{task.description}</p>
              <p className='status_task'>
                <span className={getStatusClass(task.status)}></span> 
                {task.status}
              </p>
              <button onClick={() => handleDelete(task.id)} className='btn'><i className="bi bi-trash2-fill"></i></button>
              <button onClick={() => handleEditClick(task.id)} className='btn'><i className="bi bi-pencil-fill"></i></button>
            </div>
            <div className="card_back">
              {/* Aqui você pode incluir o formulário de edição */}
              <p>Formulário de Edição</p>
              <button onClick={handleBackClick} className='btn_back'>Voltar</button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TaskList;
