import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Employee } from 'src/app/employee';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-del',
  templateUrl: './show-del.component.html',
  styleUrls: ['./show-del.component.css'],
  providers: [SharedService, DatePipe]
})
export class ShowDelComponent implements OnInit {

  Employee!: Employee;
  EmployeeList?: Employee[];
  EmployeeListWithoutFilter!: Employee[];

  ModalTitle?: string;
  ActivateAddEditEmp: boolean = false;

  DepartmentFilter: string = "";
  FullnameFilter: string = "";
  SalaryFilter: number = 0;
  DateBirthFilter!: Date;
  DateStartWorkFilter!: Date;

  constructor(private service: SharedService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmployeeList().subscribe((data: Employee[]) => {
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter = data;
    });
  }

  addClick() {
    this.Employee = {
      id: 0,
      fullname: "",
      department: "",
      dateOfBirth: new Date(),
      dateOfWorkStart: new Date(),
      salary: 0
    }
    this.ModalTitle = "Добавить сотрудника";
    this.ActivateAddEditEmp = true;
  }

  closeClick() {
    this.ActivateAddEditEmp = false;
    this.refreshEmpList();
  }

  editClick(e: Employee) {
    this.Employee = e;
    this.ModalTitle = "Редактирование";
    this.ActivateAddEditEmp = true;
  }

  deleteClick(emp: Employee) {
    if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
      this.service.deleteEmployee(emp.id).subscribe(() => {
        alert('Сотрудник удален :-(');
      });
      this.refreshEmpList();
    }
  }

  FilterFn() {
    var DepartmentFilter = this.DepartmentFilter;
    var FullnameFilter = this.FullnameFilter;
    var SalaryFilter = this.SalaryFilter;

    var DateBirthFilter = this.DateBirthFilter;
    var DateStartWorkFilter = this.DateStartWorkFilter;


    if (DateBirthFilter != null) {
      this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
        return el.department?.toString().toLowerCase().includes(
          DepartmentFilter.toString().trim().toLowerCase()
        )
          &&
          el.fullname?.toString().toLowerCase().includes(
            FullnameFilter.toString().trim().toLowerCase()
          )
          &&
          el.salary >= SalaryFilter
          &&
          el.dateOfBirth >= DateBirthFilter
      });

    }
    else if (DateStartWorkFilter != null) {
      this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
        return el.department?.toString().toLowerCase().includes(
          DepartmentFilter.toString().trim().toLowerCase()
        )
          &&
          el.fullname?.toString().toLowerCase().includes(
            FullnameFilter.toString().trim().toLowerCase()
          )
          &&
          el.salary >= SalaryFilter
          &&
          el.dateOfWorkStart >= DateStartWorkFilter
      });

    }
    else if (DateBirthFilter != null && DateStartWorkFilter != null) {
      this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
        return el.department?.toString().toLowerCase().includes(
          DepartmentFilter.toString().trim().toLowerCase()
        )
          &&
          el.fullname?.toString().toLowerCase().includes(
            FullnameFilter.toString().trim().toLowerCase()
          )
          &&
          el.salary >= SalaryFilter
          &&
          el.dateOfBirth >= DateBirthFilter
          &&
          el.dateOfWorkStart >= DateStartWorkFilter
      });
    }
    else
    {
      this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
        return el.department?.toString().toLowerCase().includes(
          DepartmentFilter.toString().trim().toLowerCase()
        )
          &&
          el.fullname?.toString().toLowerCase().includes(
            FullnameFilter.toString().trim().toLowerCase()
          )
          &&
          el.salary >= SalaryFilter
      });
    }

    




  }

  sortResult(prop: string, asc: boolean) {
    this.EmployeeList = this.EmployeeList?.sort(function (a, b) {
      switch (prop) {
        case 'Department': {
          if (asc) {
            return (a.department > b.department) ? 1 : ((a.department < b.department) ? -1 : 0);
          }
          else {
            return (b.department > a.department) ? 1 : ((b.department < a.department) ? -1 : 0);
          }
        }
        case 'Fullname': {
          if (asc) {
            return (a.fullname > b.fullname) ? 1 : ((a.fullname < b.fullname) ? -1 : 0);
          }
          else {
            return (b.fullname > a.fullname) ? 1 : ((b.fullname < a.fullname) ? -1 : 0);
          }
        }
        case 'DateBirth': {
          if (asc) {
            return (a.dateOfBirth > b.dateOfBirth) ? 1 : ((a.dateOfBirth < b.dateOfBirth) ? -1 : 0);
          }
          else {
            return (b.dateOfBirth > a.dateOfBirth) ? 1 : ((b.dateOfBirth < a.dateOfBirth) ? -1 : 0);
          }
        }
        case 'DateStartWork': {
          if (asc) {
            return (a.dateOfWorkStart > b.dateOfWorkStart) ? 1 : ((a.dateOfWorkStart < b.dateOfWorkStart) ? -1 : 0);
          }
          else {
            return (b.dateOfWorkStart > a.dateOfWorkStart) ? 1 : ((b.dateOfWorkStart < a.dateOfWorkStart) ? -1 : 0);
          }
        }
        case 'Salary': {
          if (asc) {
            return (a.salary > b.salary) ? 1 : ((a.salary < b.salary) ? -1 : 0);
          }
          else {
            return (b.salary > a.salary) ? 1 : ((b.salary < a.salary) ? -1 : 0);
          }
        }
        default:
          return 0;
      }
    });
  }
}
