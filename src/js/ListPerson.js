import Person from "./Person.js";

export class Student extends Person {
  constructor(
    id,
    name,
    address,
    personId,
    email,
    type,
    math,
    physics,
    chemistry
  ) {
    super(id, name, address, personId, email, type);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }

  calcAverage() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}
export class Employee extends Person {
  constructor(
    id,
    name,
    address,
    personId,
    email,
    type,
    workingDays,
    salaryPerDay
  ) {
    super(id, name, address, personId, email, type);
    this.workingDays = workingDays;
    this.salaryPerDay = salaryPerDay;
  }

  calcSalary() {
    return this.workingDays * this.salaryPerDay;
  }
}
export class Customer extends Person {
  constructor(
    id,
    name,
    address,
    personId,
    email,
    type,
    company,
    billValue,
    evaluate
  ) {
    super(id, name, address, personId, email, type);
    this.company = company;
    this.billValue = billValue;
    this.evaluate = evaluate;
  }
}

class ListPerson {
  constructor(arrayList) {
    this.arrayList = arrayList;
  }
}

export const listPerson = new ListPerson([Student, Employee, Customer]);
