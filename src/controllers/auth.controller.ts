import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { success } from '../utils/responseFormat.util';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const newUser = await AuthService.registerUser(username, password);
    return res.json(success(
        'Registration success',
        newUser,
        200
    ));
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await AuthService.loginUser(username, password);
    return res.json(success(
        'Login success',
        user,
        200
    ));
}