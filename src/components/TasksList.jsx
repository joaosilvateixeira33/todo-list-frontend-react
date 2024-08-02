import React, { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../services/taskService';
import { TaskCreateForm } from './TaskForm';
import TaskEditForm from './TaskEditForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);

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

  useEffect(() => {
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

  const handleTaskCreated = () => {
    fetchTasks(); // Atualize a lista de tarefas após a criação
  };

  const handleTaskUpdated = () => {
    fetchTasks(); // Atualize a lista de tarefas após a edição
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
  if (error) return <p className="error">{error}</p>;

  return (
    <div className='task_container'>
      <TaskCreateForm onTaskCreated={handleTaskCreated} />
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
              <div className='container_btn_front'>
                <button onClick={() => handleDelete(task.id)} className='btn'>
                  <i className="bi bi-trash2-fill"></i>
                </button>
                <button onClick={() => handleEditClick(task.id)} className='btn'>
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </div>
            </div>
            <div className="card_back">
              {editTaskId === task.id ? (
                <TaskEditForm
                  taskId={task.id}
                  onBack={handleBackClick}
                  onTaskUpdated={handleTaskUpdated}
                />
              ) : (
                <p>Formulário de Edição</p>
              )}
              
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TaskList;
