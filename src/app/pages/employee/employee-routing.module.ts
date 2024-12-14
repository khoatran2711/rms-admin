import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from 'src/app/pages/employee/employee-list/employee-list.component';
import { EmployeeUpsertComponent } from 'src/app/pages/employee/employee-upsert/employee-upsert.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'upsert',
    data: { title: 'Create Employee' },
    component: EmployeeUpsertComponent
  },
  {
    path: 'upsert/:id',
    data: { title: 'Update Employee' },
    component: EmployeeUpsertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
