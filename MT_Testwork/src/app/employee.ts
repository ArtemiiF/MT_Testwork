
export class Employee {
  constructor(
    public id: number,
    public department: string,
    public fullname: string,
    public dateOfBirth: Date,
    public dateOfWorkStart: Date,
    public salary: number
  ) { }
}
