import React, { useState, useEffect } from 'react';
import { updateTask, getTasks } from '../services/taskService';

const TaskEditForm = ({ taskId, onBack, onTaskUpdated }) => {
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await getTasks();
        const taskToEdit = tasks.find(t => t.id === taskId);
        if (taskToEdit) {
          setTask(taskToEdit);
          setTitle(taskToEdit.title);
          setDescription(taskToEdit.description);
          setStatus(taskToEdit.status);
        }
      } catch (error) {
        setError('Failed to fetch task details');
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(taskId, { title, description, status });
      onTaskUpdated(); // Atualize a lista de tarefas após a edição
      onBack(); // Voltar após a atualização
    } catch (error) {
      setError('Failed to update task');
      console.error(error);
    }
  };

  if (!task) return <p>Loading task...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <form onSubmit={handleSubmit} className='task_edit_form'>
      <h2>Edit Task</h2>
      <div className='form_group'>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className='form_group'>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className='form_group'>
        <label htmlFor='status'>Status</label>
        <select
          id='status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value='Incompleta'>Incompleta</option>
          <option value='Em progresso'>Em progresso</option>
          <option value='Completa'>Completa</option>
        </select>
      </div>
      <div className='container_button'>
        <button type='submit' className='btn'>Save</button>
        <button type='button' onClick={onBack} className='btn_back'>Cancel</button>
      </div>
    </form>
  );
};

export default TaskEditForm;
