import { Database } from "../../lib/database";

export class Car extends Database.getModel() {
    static tableName: string = 'cars';
}