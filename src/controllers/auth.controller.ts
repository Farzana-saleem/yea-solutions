import { Request, Response } from 'express'
import * as authService from '../services/auth.service'

export const register = async (req: Request, res: Response) => {
    const { name, username, password, role } = req.body;
    const newUser = await authService.registerUser(username, password);
    res.json(newUser);
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = authService.loginUser(username, password);
    res.json(user);

}