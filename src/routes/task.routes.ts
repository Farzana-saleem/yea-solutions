import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    markTaskDone,
} from '../controllers/task.controller';

export const taskRoutes = Router();

taskRoutes.post('/', authenticate, createTask);
taskRoutes.get('/', authenticate, getTasks);
taskRoutes.get('/:id', authenticate, getTaskById);
taskRoutes.put('/:id', authenticate, updateTask);
taskRoutes.patch('/:id/done', authenticate, markTaskDone);
taskRoutes.delete('/:id', authenticate, deleteTask);
