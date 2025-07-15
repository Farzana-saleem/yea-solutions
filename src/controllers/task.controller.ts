import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { error, success } from '../utils/responseFormat.util';

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.user?.id;
    const { title, description, deadline } = req.body;
    const task = await TaskService.createTask(userId, title, description, deadline);
    return res.json(success(
      'Task added',
      task,
      201
    ));
  } catch (err) {
    res.json(error('Failed to create task', 500));
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.user?.id;
    const tasks = await TaskService.getTasks(userId);
    if (tasks.length == 0) {
      res.json(error('Task not found'));
    }
    return res.json(success(
      'Tasks retrieved',
      tasks,
      200
    ));
  } catch (err) {
    res.json(error('Failed to retreieve task', 500));
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    const task :any = await TaskService.getTaskById(taskId);
    if (task.length == 0) {
      res.json(error('Task not found'));
    }
    return res.json(success(
      'Task retrieved',
      task,
      200
    ));
  } catch (err) {
    res.json(error('Failed to retreieve task', 500));
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.user?.id;
    const taskId = parseInt(req.params.id);
    const result = await TaskService.updateTask(userId, taskId, req.body);
    return res.json(success(
      'Task updated',
      result,
      200
    ));
  } catch (err) {
    res.json(error('Failed to update task', 500));
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.user?.id;
    const taskId = parseInt(req.params.id);
    await TaskService.deleteTask(userId, taskId);
    return res.json(success(
      'Task deleted',
      {taskId},
      200
    ));
  } catch (err) {
    res.json(error('Failed to delete task', 500));
  }
};

export const markTaskDone = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.user?.id;
    const taskId = parseInt(req.params.id);
    await TaskService.markTaskDone(userId, taskId);
    return res.json(success(
      'Task marked as done',
      taskId,
      200
    ));
  } catch (err) {
    res.json(error('Failed to mark task done', 500));
  }
};