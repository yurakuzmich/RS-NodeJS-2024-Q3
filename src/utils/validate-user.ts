import { User } from "../models/user-model";

export const validateUser = (user: User) => {
    if (!user.username || !user.age || !user.hobbies) {
        return false;
    }

    if (typeof user.username !== 'string' || typeof user.age !== 'number' || !Array.isArray(user.hobbies)) {
        return false;
    }

    return true;
}