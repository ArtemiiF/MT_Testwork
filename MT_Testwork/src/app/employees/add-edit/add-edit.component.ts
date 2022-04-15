import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { SharedService } from 'src/app/shared.service'


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() Employee!: Employee;

  ngOnInit(): void {

  }

  addEmployee() {
    this.service.addEmployee(this.Employee).subscribe((res) => {
      alert('Сотрудник добавлен. Закройте окно');
    });
  }

  updateEmployee() {
    this.service.updateEmployee(this.Employee).subscribe(res => {
      alert('Изменения сохранены! Закройте окно');
    });
  }

}


