import { Injectable } from "@angular/core";
import { Employee } from "./employee.model";
import { Subject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EmployeeDTO } from "./employeeDTO.model";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root'})
export class EmployeeService {

    employeesChanged = new Subject<Employee[]>();
    getAllError = new Subject<HttpErrorResponse>();

    allEmployees: Map<number, Employee> = new Map();

    private apiUrl: string = 'https://dummy.restapiexample.com/api/v1';

    constructor(private http: HttpClient) {
    }

    getAll() {
        this.http.get(this.apiUrl + '/employees').pipe(map(
            (responseData: {
                status: String,
                data: EmployeeDTO[],
                message: string}) => {
                    return responseData.data;
                }
            )
        ).subscribe({
            next: (employees: EmployeeDTO[]) => {
                for(const employeeDTO of employees) {
                    this.allEmployees.set(employeeDTO.id, new Employee(employeeDTO.employee_name, employeeDTO.employee_age, employeeDTO.id));
                    this.employeesChanged.next(Array.from(this.allEmployees.values()));
                }
            },
            error: (errorResponse: HttpErrorResponse) => {
                this.getAllError.next(errorResponse);
            }
        })
    }

    getById(id: number): Employee {
        return this.allEmployees.get(id);
    }

    save(employee: Employee) {
        const postData: EmployeeDTO = new EmployeeDTO(employee.name, employee.age);
       return this.http.post(this.apiUrl + '/create', postData).pipe(
        map(
            (responseData: {
                status: String,
                data: EmployeeDTO,
                message: string}) => {
                    return responseData.data;
        }), tap({
            next: (employeeDto: EmployeeDTO) => {
                this.allEmployees.set(employeeDto.id, new Employee(employeeDto.employee_name, employeeDto.employee_age, employeeDto.id));
                this.employeesChanged.next(Array.from(this.allEmployees.values()));
            }
        }));    
    }

    update(employee: Employee) {
        return this.http.put(this.apiUrl + '/update/' + employee.id, employee).pipe(tap({
            next: (responseData) => {
                this.allEmployees.set(employee.id, employee);
                this.employeesChanged.next(Array.from(this.allEmployees.values()));
            }
        })
        );
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl + '/delete/' + id).pipe(tap({
            next: (responseData) => {
                this.allEmployees.delete(id);
                this.employeesChanged.next(Array.from(this.allEmployees.values()));
            }
        }));
    }
}