import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee/employee';
import { config } from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDBService {
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(`${config.apiUrl}/api/employees/get-all`);
  }

  getDepartments(): Observable<any[]> {

    return this.http.get<any[]>(`${config.apiUrl}/api/departments/get-all`);
  }
}
