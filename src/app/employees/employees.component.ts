import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeService } from './emplooyee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 8;
  error: string = null;
  employees: Employee[];

  constructor(private service: EmployeeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.service.getAll();
    this.service.employeesChanged.subscribe(
      (employees) => {
        this.error = null;
        this.employees = employees;
      }
    );
    this.service.getAllError.subscribe(
      (errorResponse : HttpErrorResponse) => {
        console.log(this.employees);
        this.error = 'Code ' + errorResponse.status + '. ' + errorResponse.error['message']
      }
    )
  }
  
  onAddEmployee(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  findById(form: NgForm) {
    const id = +form.value['identifier'];
    form.form.reset();
    if(!Number.isInteger(id) || this.service.getById(id) == null) {
      this.router.navigate(['/employees'], {queryParams: {mode: 'not-found'}} );
    } else {
      this.router.navigate(['/employees', id]);
    }
  }

}
