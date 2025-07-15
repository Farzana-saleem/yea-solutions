import { Task } from '../models/task.model';

export class TaskService {

    static createTask = async (userId: number, title: string, description: string, deadline?: Date) => {
        const newtask = await Task.create({ title, description, deadline, userId });
        return ({
            userId,
            taskId: newtask.id,
            title: newtask.title,
            description: newtask.description ?? null,
            deadline: newtask?.deadline ?? null,
            done: newtask.done,
        })
    }

    static getTasks = async (userId: number) => {
        return await Task.findAll({
            where: { userId },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    static getTaskById = async (taskId: number) => {
        return await Task.findOne({
            where: { id: taskId },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    static updateTask = async (userId: number, taskId: number, updateData: any) => {
        await Task.update(updateData, { where: { id: taskId, userId } });
        return await Task.findOne({
            where: { id: taskId },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    static deleteTask = async (userId: number, taskId: number) => {
        return await Task.destroy({ where: { id: taskId, userId } });
    }

    static markTaskDone = async (userId: number, taskId: number) => {
        return await Task.update({ done: true }, { where: { id: taskId, userId } });
    }
}