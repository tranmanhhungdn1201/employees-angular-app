import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) {}

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

}
