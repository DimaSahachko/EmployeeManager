export class Employee {

    name: string;

    age: number;

    id?: number;

    constructor(name: string, age: number, id?: number) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}