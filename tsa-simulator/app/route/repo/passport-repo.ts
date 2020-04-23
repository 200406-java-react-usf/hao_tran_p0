
import { CrudRepository } from "./crud-repo";
import { Passport } from "../../data/model/passport";

export class PassportRepository implements CrudRepository<Passport> {
    getAll(): Promise<Passport[]> {
        return new Promise<Passport>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    getById(id: number): Promise<Passport> {
        return new Promise<Passport>((resolve, reject) => {
            
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject("BadRequestError");
                return;
            }
            const passport: Passport = { 
                ...data.filter(passport => passport.id === id).pop() 
            };
            if (!passport) {
                reject("new ResourceNotFoundError()");
                return;
            }
            resolve(passport);
        })
    }
    save(newPassport: Passport): Promise<Passport> {
        return new Promise<Passport>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    update(updatedPassport: Passport): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    deleteById(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("NotImplementedError()");
        });
    }

    getPassportsByPassporterId(pid: number): Promise<Passport[]> {
        return new Promise<Passport[]>((resolve, reject) => {

            if (typeof pid !== 'number' || !Number.isInteger(pid) || pid <= 0) {
                reject("new BadRequestError()");
                return;
            }

            setTimeout(function () {
                const passports = data.filter(passport => passport.passporterId == pid);
                resolve(passports);
            }, 250);

        });
    }
}