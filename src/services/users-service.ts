import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { User } from '../models/user-model';
import { users as usersList } from './../mock-data/users'
import { ERROR_MESSAGES } from '../models/error-codes';
import { validateUser } from '../utils/validate-user';

export class UsersService {
    private users: User[];

    constructor() {
        this.users = usersList;
        console.log('UsersService initialized');
    }

    public getUsers() {
        return this.users;
    }

    public getUserById(id: string) {
        if (!uuidValidate(id)) {
            const error = new Error("Invalid user ID");
            error.name = ERROR_MESSAGES.INVALID_ID;
            throw error;
        }
    
        const user = this.users.find(user => user.id === id);
        if (user) {
            return user;
        }

        const error = new Error("User not found");
        error.name = ERROR_MESSAGES.USER_NOT_EXIST;
        throw error;
    }

    public createUser(user: User) {
        if (!validateUser(user)) {
            const error = new Error("Invalid User Data");
            error.name = ERROR_MESSAGES.INVALID_DATA_FORMAT;
            throw error;
        }

        user.id = uuidv4();
        this.users.push(user);

        return user;
    }

    public updateUser(id: string, user: User) {
        if(!id || !uuidValidate(id)) {
            const error = new Error("Invalid user ID");
            error.name = ERROR_MESSAGES.INVALID_ID;
            throw error;
        }

        const index = this.users.findIndex(u => u.id === user.id);
        
        if (index !== -1) {
            this.users[index] = {...this.users[index], ...user};
        }
        return user;
    }

    public deleteUser(id: string) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }

        return this.users;
    }
}
