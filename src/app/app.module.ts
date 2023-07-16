import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEmptyComponent } from './employees/employee-empty/employee-empty.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

const appRoutes: Routes = [
  {path: '', redirectTo: '/employees', pathMatch: 'full'},
  {path: 'employees', component: EmployeesComponent, children: [
    {path: '', component: EmployeeEmptyComponent, pathMatch: 'full'},
    {path: 'new', component: EmployeeEditComponent},
    {path: ':id', component: EmployeeDetailsComponent},
    {path: ':id/edit', component: EmployeeEditComponent},
    {path: '**', redirectTo: '/employees'}
  ]}
  
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    EmployeeEmptyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
