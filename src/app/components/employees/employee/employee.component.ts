import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeparmentService } from 'src/app/services/deparment.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  departments = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  })

  constructor(private employeeService: EmployeeService, private departmentService: DeparmentService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees();
    console.log(this.departmentService.array);
    // this.departments = this.departmentService.array;
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false,
    })
  }

  onSubmit(){
    if (this.form.valid) {
      console.log('haha sbumit')
      this.employeeService.insertEmployee(this.form.value);
      this.onClear();
    }
  }

}
