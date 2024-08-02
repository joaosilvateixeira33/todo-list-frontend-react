import React, { useState } from 'react';
import { createTask } from '../services/taskService';

export const TaskCreateForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Incompleta');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status };
    
    try {
      const createdTask = await createTask(newTask);
      console.log('Task created successfully:', createdTask);
      setTitle('');
      setDescription('');
      setStatus('Incompleta');
      setError(null);

      if (onTaskCreated) {
        onTaskCreated(); // Chama o callback após a criação da tarefa
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='form_style'>
        <label htmlFor="title">Título:</label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Descrição:</label>
        <textarea 
          name="description" 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="status">Status:</label>
        <select 
          name="status" 
          id="status" 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Incompleta">Incompleta</option>
          <option value="Em progresso">Em Progresso</option>
          <option value="Completa">Completa</option>
        </select>

        <button type="submit" className='btn_submit'>Adicionar Tarefa</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};
