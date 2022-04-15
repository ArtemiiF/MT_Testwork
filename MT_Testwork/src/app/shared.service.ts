import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:7008"

  constructor(private http: HttpClient) { }

  getEmployeeList() : Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/api/employees');
  }

  addEmployee(val: Employee) {
    return this.http.post(this.APIUrl + '/api/employees', val)
  }

  updateEmployee(val: Employee) {
    return this.http.put(this.APIUrl + '/api/employees', val)
  }

  deleteEmployee(val: number) {
    return this.http.delete(this.APIUrl + '/api/employees/' + val.toString())
  }
}
