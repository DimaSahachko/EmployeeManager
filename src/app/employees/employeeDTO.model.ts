export class EmployeeDTO {

    employee_name: string;

    employee_age: number;

    id?: number;

    employee_salary?: number;

    profile_image?: string;

    constructor(name: string, age: number, id?: number, salary?: number, imagePath?: string) {
        this.employee_name = name;
        this.employee_age = age;
        this.id = id;
        this.employee_salary = salary;
        this.profile_image = imagePath;
    }

}