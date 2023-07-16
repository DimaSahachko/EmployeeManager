import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../emplooyee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee.model';
import { EmployeeDTO } from '../employeeDTO.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  submittedForm: NgForm;
  editMode:boolean = false;
  id:number;
  editedEmployee: Employee;
  error: string = null;

  constructor(private service: EmployeeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(params['id'] == null) {
          this.editMode = false;
        } else {
          this.editMode = true;
          if(!Number.isInteger(this.id) || this.service.getById(this.id) == null) {
            this.redirect();
          } else {
            this.editedEmployee = this.service.getById(this.id);
          }
        }
      }
    )
  }

  onSubmit(form: NgForm): void {
    this.submittedForm = form;
  }

  onCreate(): void {
    const newEmployee = new Employee(this.submittedForm.value['name'], this.submittedForm.value['age']);
    this.service.save(newEmployee).subscribe({
      next: (employeeDTO: EmployeeDTO) => {
        this.error = null;
        this.router.navigate(['/employees', employeeDTO.id]);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.error = 'Code ' + errorResponse.status + '. ' + errorResponse.error['message']
      }
  })
  }

  onUpdate(): void {
    this.editedEmployee.name = this.submittedForm.value['name'];
    this.editedEmployee.age = this.submittedForm.value['age'];
    this.service.update(this.editedEmployee).subscribe({
      next: (responseData) => {
        this.router.navigate(['/employees', this.editedEmployee.id]);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.error = 'Code ' + errorResponse.status + '. ' + errorResponse.error['message']
      }
    }

    )
  }

  onReset(form: NgForm): void {
    form.form.reset();
  }

  private redirect(): void {
    this.router.navigate(['/employees'], {queryParams: {mode: 'not-found'}} );
  }

}
