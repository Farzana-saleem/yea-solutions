import { comparePassword, hashString, jwtTokenGenerator } from "../utils/jwt.util"
import { User } from '../models/user.model';
import { error } from "../utils/responseFormat.util";

export class AuthService {

    static registerUser = async (username: string, password: string) => {
        const user = await User.findOne({
            where: { username }
        });
        if (user) {
            return error('User already exists');
        }
        const hashPass = await hashString(password);
        const newUser = await User.create({
            username,
            password: hashPass,
        });
        return ({
            id: newUser.id,
            username: newUser.username
        });
    }

    static loginUser = async (username: string, password: string) => {
        const user: any = await User.findOne({
            where: { username }
        });
        if (!user) {
            return error('User not found', 404);
        }
        const validPass = await comparePassword(password, user.password);
        if (!validPass) {
            return error('Invalid Password', 401);
        }

        const token = jwtTokenGenerator(user);
        return { user, token };
    }
}