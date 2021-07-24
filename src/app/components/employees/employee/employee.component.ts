import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public employeeService: EmployeeService,
    public departmentService: DepartmentService,
    private dialogRef: MatDialogRef<EmployeeComponent>
    ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees();
  }

  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
  }

  onSubmit(){
    if (this.employeeService.form.valid) {
      if(!this.employeeService.form.get('$key')?.value)
        this.employeeService.insertEmployee(this.employeeService.form.value);
      else
        this.employeeService.updateEmployee(this.employeeService.form.value);
      this.onClose();
      this.onClear();
    }
  }

  onClose() {
    this.onClear();
    this.dialogRef.close();
  }

}
