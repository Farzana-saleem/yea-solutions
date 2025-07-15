import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET as string || '';

export const hashString = async (data: string,) => {
    return await bcrypt.hash(data, 10);
}

export const comparePassword = async (password: string, hashString: string) => {
    return await bcrypt.compare(password, hashString);
}

export const jwtTokenGenerator = async (user: User) => {
    return jwt.sign({
        id: user.id,
        username: user.username
    },
        JWT_SECRET, {
        expiresIn: '1d'
    });
}