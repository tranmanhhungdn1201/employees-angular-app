import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Employee } from '../models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) {}
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
  employeeList: AngularFireList<any>;

  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(emp: any) {
    this.employeeList.push({
      fullName: emp.fullName,
      email: emp.email,
      mobile: emp.mobile,
      city: emp.city,
      gender: emp.gender,
      department: emp.department,
      hireDate: emp.hireDate == "" ? "" : this.datePipe.transform(emp.hireDate, 'yyyy-MM-dd'),
      isPermanent: emp.isPermanent
    }).then(data => {
      console.log('success');
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
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

  updateEmployee(emp: any) {
    this.employeeList.update(emp.$key, {
      fullName: emp.fullName,
      email: emp.email,
      mobile: emp.mobile,
      city: emp.city,
      gender: emp.gender,
      department: emp.department,
      hireDate: emp.hireDate == "" ? "" : this.datePipe.transform(emp.hireDate, 'yyyy-MM-dd'),
      isPermanent: emp.isPermanent
    })
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(emp:Employee) {
    this.form.setValue(emp);
  }

}
