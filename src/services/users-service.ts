import { User } from '../models/user-model';
import { users as usersList } from './../mock-data/users'

export class UsersService {
    private users: User[];

    constructor() {
        this.users = usersList;
        console.log('UsersService initialized');
        console.log('Users are: ', this.users);
    }

    public getUsers() {
        return this.users;
    }

    public getUserById(id: string) {
        return this.users.find(user => user.id === id);
    }

    createUser(user: User) {
        this.users.push(user);
        return user;
    }

    updateUser(user: User) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        }
        return user;
    }

    deleteUser(id: string) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}