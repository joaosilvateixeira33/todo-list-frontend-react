import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tasks';

export const getTasks = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(BASE_URL, task);
        return response.data;
    } catch (error) {
        console.error('Failed to create task:', error);
        throw error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, task); // Alterado para PATCH
        return response.data;
    } catch (error) {
        console.error('Failed to update task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error('Failed to delete task:', error);
        throw error;
    }
};
