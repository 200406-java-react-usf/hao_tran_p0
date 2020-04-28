import { AnyARecord } from "dns";

export interface CrudRepository<T> {
    getAll(req: any, res: any): Promise<T>;
    getByUsername(username: string): Promise<T>;
    save(req: any, res: any): Promise<T>;
    update(req: any, res: any): Promise<boolean>;
    deleteById(req: any, res: any): Promise<boolean>;
}