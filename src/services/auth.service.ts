import { comparePassword, hashString, jwtTokenGenerator } from "../utils/jwt.util"
import { User } from '../models/user.model';

export const registerUser = async (username: string, password: string) => {
    const user = await User.findOne({
        where: { username }
    });
    if (user) {
        throw new Error('User already exists');
    }
    const hashPass = await hashString(password);
    return await User.create({
        data: {
            username,
            password: hashPass,
        }
    });
}

export const loginUser = async (username: string, password: string) => {
    const user: any = User.findOne({
        where: { username }
    });
    if (!user) {
        throw new Error('User not found');
    }

    const validPass = await comparePassword(password, user.password);
    if (!validPass) {
        throw new Error('Invalid Password');
    }

    const token = jwtTokenGenerator(user);
    return { user, token };
}