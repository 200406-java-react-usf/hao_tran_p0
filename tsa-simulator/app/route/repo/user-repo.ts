
import { CrudRepository } from "./crud-repo";
import User from "../../data/model/user";

export class UserRepository implements CrudRepository<User> {
    getAll(req, res): Promise<User[]> {
        return new Promise<User>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    getById(req, resr): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject("BadRequestError");
                return;
            }
            const user: User = { 
                ...data.filter(user => user.id === id).pop() 
            };
            if (!user) {
                reject("new ResourceNotFoundError()");
                return;
            }
            resolve(user);
        })
    }
    save(newUser: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    update(updatedUser: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    deleteById(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("NotImplementedError()");
        });
    }

    getUsersByUsererId(pid: number): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {

            if (typeof pid !== 'number' || !Number.isInteger(pid) || pid <= 0) {
                reject("new BadRequestError()");
                return;
            }

            setTimeout(function () {
                const users = data.filter(user => user.usererId == pid);
                resolve(users);
            }, 250);

        });
    }
}