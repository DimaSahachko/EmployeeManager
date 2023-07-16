import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../emplooyee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  selectedEmployee: Employee;
  id: number;
  error:string = null;

  constructor(private service: EmployeeService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(!Number.isInteger(this.id) || this.service.getById(this.id) == null) {
          this.redirect();
        } else {
          this.error = null;
          this.selectedEmployee = this.service.getById(this.id);
        }
      }
    )
  }

  onClose(): void {
    this.router.navigate(['/employees']);
  }

  onDelete() {
    this.service.delete(this.selectedEmployee.id).subscribe({
      next: (responseData) => {
        this.router.navigate(['/employees']);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.error = 'Code ' + errorResponse.status + '. ' + errorResponse.error['message']
      }
    }

    )
  }

  private redirect(): void {
    this.router.navigate(['/employees'], {queryParams: {mode: 'not-found'}} );
  }
}
