import Person from "./Person.js";
import { listPerson } from "./ListPerson.js";
import { getType } from "./getType.js";
import {
  apiGetPersons,
  apiCreatePerson,
  apiDeletePerson,
  apiGetPersonById,
  apiUpdatePersonById,
} from "./personAPI.js";
import People from "./People.js";
import { Student } from "./ListPerson.js";
import { Employee } from "./ListPerson.js";
import { Customer } from "./ListPerson.js";
// import validate from "./validate.js";

getELe("#type").onchange = function getType() {
  let type = getELe("#type").value;

  switch (type) {
    case "Student":
      getELe("#student").style.display = "block";
      getELe("#employee").style.display = "none";
      getELe("#customer").style.display = "none";
      getELe("#averageS").style.display = "none";
      break;
    case "Employee":
      getELe("#employee").style.display = "block";
      getELe("#student").style.display = "none";
      getELe("#customer").style.display = "none";
      getELe("#totalS").style.display = "none";
      break;
    case "Customer":
      getELe("#customer").style.display = "block";
      getELe("#student").style.display = "none";
      getELe("#employee").style.display = "none";
      break;
    default:
      getELe("#customer").style.display = "none";
      getELe("#student").style.display = "none";
      getELe("#employee").style.display = "none";
      getELe("#averageS").style.display = "none";
      getELe("#totalS").style.display = "none";
      break;
  }
  resetForm();
  getELe("#type").value = type;
};

//hàm getPerson
async function getPerson() {
  try {
    const { data } = await apiGetPersons();
    const persons = data.map((person) => {
      if (person.type == "Student") {
        return new Student(
          person.id,
          person.name,
          person.address,
          person.personId,
          person.email,
          person.type,
          person.math,
          person.physics,
          person.chemistry
        );
      } else if (person.type == "Employee") {
        return new Employee(
          person.id,
          person.name,
          person.address,
          person.personId,
          person.email,
          person.type,
          person.workingDays,
          person.salaryPerDay
        );
      } else if (person.type == "Customer") {
        return new Customer(
          person.id,
          person.name,
          person.address,
          person.personId,
          person.email,
          person.type,
          person.company,
          person.billValue,
          person.evaluate
        );
      }
    });
    renderPersons(persons);
  } catch (error) {
    alert("API get persons error");
  }
  resetForm();
}

//Hàm getStudent
async function getStudent() {
  try {
    const { data } = await apiGetPersons();
    const persons = data.map((person) => {
      return new Student(
        person.id,
        person.name,
        person.address,
        person.personId,
        person.email,
        person.type,
        person.math,
        person.physics,
        person.chemistry
      );
    });
    renderStudents(persons);
  } catch (error) {
    alert("API get students error");
  }
  resetForm();
}

//Hàm getEmployee
async function getEmployee() {
  try {
    const { data } = await apiGetPersons();
    const persons = data.map((person) => {
      return new Employee(
        person.id,
        person.name,
        person.address,
        person.personId,
        person.email,
        person.type,
        person.workingDays,
        person.salaryPerDay
      );
    });
    renderEmployees(persons);
  } catch (error) {
    alert("API get employees error");
  }
  resetForm();
}

// Hàm getCustomer
async function getCustomer() {
  try {
    const { data } = await apiGetPersons();
    const persons = data.map((person) => {
      return new Customer(
        person.id,
        person.name,
        person.address,
        person.personId,
        person.email,
        person.type,
        person.company,
        person.billValue,
        person.evaluate
      );
    });
    renderCustomers(persons);
  } catch (error) {
    alert("API get customers error");
  }
  resetForm();
}

//Hàm thêm person
async function createPerson() {
  try {
    const person = {
      name: getELe("#name").value,
      address: getELe("#address").value,
      personId: getELe("#personId").value,
      email: getELe("#email").value,
      workingDays: +getELe("#workingDays").value,
      salaryPerDay: +getELe("#salaryPerDay").value,
      company: getELe("#company").value,
      billValue: +getELe("#billValue").value,
      evaluate: getELe("#evaluate").value,
      math: +getELe("#math").value,
      physics: +getELe("#physics").value,
      chemistry: +getELe("#chemistry").value,
      type: getELe("#type").value,
    };
    const { data: persons } = await apiGetPersons();
    let isValid = validate(person, persons);
    if (!isValid) {
      return;
    }
    const response = await apiCreatePerson(person);
    getPerson();
    resetForm();
    $("#myModal").modal("hide");
  } catch (error) {
    // alert("Add person error");
  }
}

//Hàm xóa người dùng
getELe("#tblBody").addEventListener("click", async (event) => {
  const personID = event.target.getAttribute("delete-id");
  if (personID) {
    await apiDeletePerson(personID)
      .then(() => {
        getPerson();
      })
      .catch((error) => {
        alert("Delete person error");
      });
  }
});

//Hàm xóa student/ sort student
getELe("#tblBody").addEventListener("click", async (event) => {
  const personID = event.target.getAttribute("delete-id-student");
  if (personID) {
    await apiDeletePerson(personID)
      .then(() => {
        getStudent();
      })
      .catch((error) => {
        alert("Delete student error");
      });
  }
});

//Hàm xóa employee / sort employee
getELe("#tblBody").addEventListener("click", async (event) => {
  const personID = event.target.getAttribute("delete-id-employee");
  if (personID) {
    await apiDeletePerson(personID)
      .then(() => {
        getEmployee();
      })
      .catch((error) => {
        alert("Delete employee error");
      });
  }
});

//Hàm xóa customer/ sort customer
getELe("#tblBody").addEventListener("click", async (event) => {
  const personID = event.target.getAttribute("delete-id-customer");
  if (personID) {
    await apiDeletePerson(personID)
      .then(() => {
        getCustomer();
      })
      .catch((error) => {
        alert("Delete customer error");
      });
  }
});

//Hàm getTypeModalShow
function getTypeModalShow(type) {
  switch (type) {
    case "Student":
      getELe("#student").style.display = "block";
      getELe("#employee").style.display = "none";
      getELe("#customer").style.display = "none";
      break;
    case "Employee":
      getELe("#employee").style.display = "block";
      getELe("#student").style.display = "none";
      getELe("#customer").style.display = "none";
      break;
    case "Customer":
      getELe("#customer").style.display = "block";
      getELe("#student").style.display = "none";
      getELe("#employee").style.display = "none";
      break;
    default:
      getELe("#customer").style.display = "none";
      getELe("#student").style.display = "none";
      getELe("#employee").style.display = "none";
      // getELe("#averageS").style.display = "none";
      // getELe("#totalS").style.display = "none";
      break;
  }
}

//Hàm lấy chi tiết người dùng và hiển thị modal
getELe("#tblBody").addEventListener("click", async (evt) => {
  const personID = evt.target.getAttribute("watch-id");
  resetForm();
  if (personID) {
    try {
      const { data: person } = await apiGetPersonById(personID);
      getELe("#name").value = person.name;
      getELe("#personId").value = person.personId;
      getELe("#address").value = person.address;
      getELe("#email").value = person.email;
      getELe("#type").value = person.type;
      getELe("#math").value = person.math;
      getELe("#physics").value = person.physics;
      getELe("#chemistry").value = person.chemistry;
      getELe("#workingDays").value = person.workingDays;
      getELe("#salaryPerDay").value = person.salaryPerDay;
      getELe("#company").value = person.company;
      getELe("#billValue").value = person.billValue;
      getELe("#evaluate").value = person.evaluate;

      getTypeModalShow(person.type);

      getELe("#averageScore").value = (
        (Number(person.math) +
          Number(person.physics) +
          Number(person.chemistry)) /
        3
      ).toLocaleString();
      getELe("#averageScore").style.display = "block";
      getELe("#totalSalary").value =
        Number(person.workingDays) * Number(person.salaryPerDay);
      getELe("#totalSalary").style.display = "block";

      getELe(".modal-title").innerHTML = "Update User's Information";

      getELe(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button class="btn btn-primary" update-id="${person.id}">Update</button>
      `;

      $("#myModal").modal("show");
      // reset();
    } catch (error) {
      alert("API get user's information error");
    }
  }
});

//Student
getELe("#tblBody").addEventListener("click", async (evt) => {
  const personID = evt.target.getAttribute("watch-id-Student");
  if (personID) {
    try {
      const { data: person } = await apiGetPersonById(personID);
      getELe("#name").value = person.name;
      getELe("#personId").value = person.personId;
      getELe("#address").value = person.address;
      getELe("#email").value = person.email;
      getELe("#type").value = person.type;
      getELe("#math").value = person.math;
      getELe("#physics").value = person.physics;
      getELe("#chemistry").value = person.chemistry;
      getELe("#workingDays").value = person.workingDays;
      getELe("#salaryPerDay").value = person.salaryPerDay;
      getELe("#company").value = person.company;
      getELe("#billValue").value = person.billValue;
      getELe("#evaluate").value = person.evaluate;

      getTypeModalShow(person.type);

      getELe("#averageScore").value = (
        (Number(person.math) +
          Number(person.physics) +
          Number(person.chemistry)) /
        3
      ).toLocaleString();
      getELe("#averageScore").style.display = "block";

      getELe(".modal-title").innerHTML = "Update Student's Information";

      getELe(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button class="btn btn-primary" update-id-student="${person.id}">Update</button>
      `;

      $("#myModal").modal("show");
      // reset();
    } catch (error) {
      alert("API get student's information error");
    }
  }
});

//Employee
getELe("#tblBody").addEventListener("click", async (evt) => {
  const personID = evt.target.getAttribute("watch-id-employee");
  if (personID) {
    try {
      const { data: person } = await apiGetPersonById(personID);
      getELe("#name").value = person.name;
      getELe("#personId").value = person.personId;
      getELe("#address").value = person.address;
      getELe("#email").value = person.email;
      getELe("#type").value = person.type;
      getELe("#math").value = person.math;
      getELe("#physics").value = person.physics;
      getELe("#chemistry").value = person.chemistry;
      getELe("#workingDays").value = person.workingDays;
      getELe("#salaryPerDay").value = person.salaryPerDay;
      getELe("#company").value = person.company;
      getELe("#billValue").value = person.billValue;
      getELe("#evaluate").value = person.evaluate;

      getTypeModalShow(person.type);

      getELe("#totalSalary").value =
        Number(person.workingDays) * Number(person.salaryPerDay);
      getELe("#totalSalary").style.display = "block";

      getELe(".modal-title").innerHTML = "Update Employee's Information";

      getELe(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button class="btn btn-primary" update-id-employee="${person.id}">Update</button>
      `;

      $("#myModal").modal("show");
      // reset();
    } catch (error) {
      alert("API get user's information error");
    }
  }
});

//Customer
getELe("#tblBody").addEventListener("click", async (evt) => {
  const personID = evt.target.getAttribute("watch-id-customer");
  if (personID) {
    try {
      const { data: person } = await apiGetPersonById(personID);
      getELe("#name").value = person.name;
      getELe("#personId").value = person.personId;
      getELe("#address").value = person.address;
      getELe("#email").value = person.email;
      getELe("#type").value = person.type;
      getELe("#math").value = person.math;
      getELe("#physics").value = person.physics;
      getELe("#chemistry").value = person.chemistry;
      getELe("#workingDays").value = person.workingDays;
      getELe("#salaryPerDay").value = person.salaryPerDay;
      getELe("#company").value = person.company;
      getELe("#billValue").value = person.billValue;
      getELe("#evaluate").value = person.evaluate;

      getTypeModalShow(person.type);

      getELe(".modal-title").innerHTML = "Update Customer's Information";

      getELe(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button class="btn btn-primary" update-id-customer="${person.id}">Update</button>
      `;

      $("#myModal").modal("show");
      // reset();
    } catch (error) {
      alert("API get customer's information error");
    }
  }
});

//Hàm cập nhật người dùng
getELe("#myModal").addEventListener("click", async (evt) => {
  const personID = evt.target.getAttribute("update-id");
  const studentID = evt.target.getAttribute("update-id-student");
  const employeeID = evt.target.getAttribute("update-id-employee");
  const customerID = evt.target.getAttribute("update-id-customer");
  if (personID) {
    try {
      const person = {
        name: getELe("#name").value,
        personId: getELe("#personId").value,
        address: getELe("#address").value,
        email: getELe("#email").value,
        type: getELe("#type").value,
        math: +getELe("#math").value,
        physics: +getELe("#physics").value,
        chemistry: +getELe("#chemistry").value,
        workingDays: +getELe("#workingDays").value,
        salaryPerDay: +getELe("#salaryPerDay").value,
        company: getELe("#company").value,
        billValue: +getELe("#billValue").value,
        evaluate: getELe("#evaluate").value,
      };
      const { data: persons } = await apiGetPersons();
      let isValid = validate(person, persons);
      if (!isValid) {
        return;
      }
      const response = await apiUpdatePersonById(personID, person);
      getPerson();
      $("#myModal").modal("hide");
    } catch (error) {
      alert("Update person error");
    }
  }
  if (studentID) {
    try {
      const person = {
        name: getELe("#name").value,
        personId: getELe("#personId").value,
        address: getELe("#address").value,
        email: getELe("#email").value,
        type: getELe("#type").value,
        math: +getELe("#math").value,
        physics: +getELe("#physics").value,
        chemistry: +getELe("#chemistry").value,
        workingDays: +getELe("#workingDays").value,
        salaryPerDay: +getELe("#salaryPerDay").value,
        company: getELe("#company").value,
        billValue: +getELe("#billValue").value,
        evaluate: getELe("#evaluate").value,
      };
      const { data: persons } = await apiGetPersons();
      let isValid = validate(person, persons);
      if (!isValid) {
        return;
      }

      await apiUpdatePersonById(studentID, person);
      getStudent();
      $("#myModal").modal("hide");
    } catch (error) {
      alert("Update student error");
    }
  }
  if (employeeID) {
    try {
      const person = {
        name: getELe("#name").value,
        personId: getELe("#personId").value,
        address: getELe("#address").value,
        email: getELe("#email").value,
        type: getELe("#type").value,
        math: +getELe("#math").value,
        physics: +getELe("#physics").value,
        chemistry: +getELe("#chemistry").value,
        workingDays: +getELe("#workingDays").value,
        salaryPerDay: +getELe("#salaryPerDay").value,
        company: getELe("#company").value,
        billValue: +getELe("#billValue").value,
        evaluate: getELe("#evaluate").value,
      };
      const { data: persons } = await apiGetPersons();
      let isValid = validate(person, persons);
      if (!isValid) {
        return;
      }
      await apiUpdatePersonById(employeeID, person);
      getEmployee();
      $("#myModal").modal("hide");
    } catch (error) {
      alert("Update employee error");
    }
  }
  if (customerID) {
    try {
      const person = {
        name: getELe("#name").value,
        personId: getELe("#personId").value,
        address: getELe("#address").value,
        email: getELe("#email").value,
        type: getELe("#type").value,
        math: +getELe("#math").value,
        physics: +getELe("#physics").value,
        chemistry: +getELe("#chemistry").value,
        workingDays: +getELe("#workingDays").value,
        salaryPerDay: +getELe("#salaryPerDay").value,
        company: getELe("#company").value,
        billValue: +getELe("#billValue").value,
        evaluate: getELe("#evaluate").value,
      };
      const { data: persons } = await apiGetPersons();
      let isValid = validate(person, persons);
      if (!isValid) {
        return;
      }
      await apiUpdatePersonById(customerID, person);
      getCustomer();
      $("#myModal").modal("hide");
    } catch (error) {
      alert("Update customer error");
    }
  }
});

//Hàm sort name
function sortName(a, b) {
  let nameA = a.name.toLowerCase(),
    nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0; //default return value (no sorting)
}

// Hàm hiển thị danh sách person
function renderPersons(persons) {
  getELe("#tblHead").innerHTML = `
  <th>Full Name</th>
  <th>Address</th>
  <th>ID</th>
  <th>Email</th>
  <th>Action</th>
  `;
  persons.sort(sortName);

  let html = persons.reduce((result, person) => {
    return (
      result +
      `
            <tr>
            <td>${person.name}</td>
            <td>${person.address}</td>
            <td>${person.personId}</td>
            <td>${person.email}</td>
            <td>
                <button class="btn btn-primary" watch-id="${person.id}">Information</button>
                <button class="btn btn-danger" delete-id="${person.id}")">Delete user</button>
            </td>
            </tr>
            `
    );
  }, "");
  getELe("#tblBody").innerHTML = html;
}

//Hàm render students
function renderStudents(persons) {
  getELe("#tblHead").innerHTML = `
    <th>Full Name</th>
    <th>Address</th>
    <th>ID</th>
    <th>Email</th>
    <th>Math</th>
    <th>Physics</th>
    <th>Chemistry</th>
    <th>Average</th>
    <th>Action</th>
    `;
  persons.sort(sortName);
  let html = persons.reduce((result, person) => {
    if (person.type == "Student") {
      return (
        result +
        `
                <tr>
                <td>${person.name}</td>
                <td>${person.address}</td>
                <td>${person.personId}</td>
                <td>${person.email}</td>
                <td>${person.math}</td>
                <td>${person.physics}</td>
                <td>${person.chemistry}</td>
                <td>${person.calcAverage().toLocaleString()}</td>
                <td>
                    <button class="btn btn-primary" watch-id-Student="${
                      person.id
                    }">Information</button>
                    <button class="btn btn-danger" delete-id-student="${
                      person.id
                    }">Delete student</button>
                    <button class="btn btn-warning" >Calc Average</button>
                </td>
                </tr>
            `
      );
    }
    return result + "";
  }, "");
  getELe("#tblBody").innerHTML = html;
}

//Hàm renderEmployees
function renderEmployees(persons) {
  getELe("#tblHead").innerHTML = `
    <th>Full Name</th>
    <th>Address</th>
    <th>ID</th>
    <th>Email</th>
    <th>Number of working days</th>
    <th>Salary per day</th>
    <th>Total salary</th>
    <th>Action</th>
    `;
  persons.sort(sortName);
  let html = persons.reduce((result, person) => {
    if (person.type == "Employee") {
      return (
        result +
        `
                <tr>
                <td>${person.name}</td>
                <td>${person.address}</td>
                <td>${person.personId}</td>
                <td>${person.email}</td>
                <td>${person.workingDays}</td>
                <td>${person.salaryPerDay}</td>
                <td>${person.calcSalary()}</td>
                <td>
                    <button class="btn btn-primary"  watch-id-employee="${
                      person.id
                    }">Information</button>
                    <button class="btn btn-danger"  delete-id-employee="${
                      person.id
                    }">Delete employee</button>
                    <button class="btn btn-dark" >Calc Salary</button>
                </td>
                </tr>
            `
      );
    }
    return result + "";
  }, "");
  getELe("#tblBody").innerHTML = html;
}

//Hàm renderCustomers
function renderCustomers(persons) {
  getELe("#tblHead").innerHTML = `
    <th>Full Name</th>
    <th>Address</th>
    <th>ID</th>
    <th>Email</th>
    <th>Company</th>
    <th>Bill's value</th>
    <th>Evaluate</th>
    <th>Action</th>
    `;
  persons.sort(sortName);
  let html = persons.reduce((result, person) => {
    if (person.type == "Customer") {
      return (
        result +
        `
        <tr>
        <td>${person.name}</td>
        <td>${person.address}</td>
        <td>${person.personId}</td>
        <td>${person.email}</td>
        <td>${person.company}</td>
        <td>${person.billValue}</td>
        <td>${person.evaluate}</td>
        <td>
          <button class="btn btn-primary"  watch-id-customer="${person.id}">Information</button>
          <button class="btn btn-danger"  delete-id-customer="${person.id}">Delete customer</button>
        </tr>
        `
      );
    }
    return result + "";
  }, "");
  getELe("#tblBody").innerHTML = html;
}

//Hàm reset value
export function resetForm() {
  getELe("#type").value = "Person";
  getELe("#name").value = "";
  getELe("#personId").value = "";
  getELe("#address").value = "";
  getELe("#email").value = "";
  getELe("#math").value = "";
  getELe("#physics").value = "";
  getELe("#chemistry").value = "";
  getELe("#workingDays").value = "";
  getELe("#salaryPerDay").value = "";
  getELe("#company").value = "";
  getELe("#billValue").value = "";
  getELe("#evaluate").value = "";
  getELe("#notifiName").innerHTML = "";
  getELe("#notifiPersonId").innerHTML = "";
  getELe("#notifiAddress").innerHTML = "";
  getELe("#notifiEmail").innerHTML = "";
  getELe("#notifiType").innerHTML = "";
  getELe("#notifiMath").innerHTML = "";
  getELe("#notifiPhysics").innerHTML = "";
  getELe("#notifiChemistry").innerHTML = "";
  getELe("#notifiWorkingDays").innerHTML = "";
  getELe("#notifiSalaryPerDay").innerHTML = "";
  getELe("#notifiCompany").innerHTML = "";
  getELe("#notifiBillValue").innerHTML = "";
  getELe("#notifiEvaluate").innerHTML = "";
}

//extend
function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\s/g, "");
  return str;
}
function removeDot(str) {
  if (str === null || str === undefined) return str;
  str = str.replace(/[.,-]/g, "");
  return str;
}

// validate
function validate(person, persons) {
  isValid = true;

  //Validate type
  let type = person.type;
  if (type == "Person") {
    isValid = false;
    getELe("#notifiType").innerHTML = "(*)Please select type of user";
  } else {
    getELe("#notifiType").innerHTML = "";
  }

  //Validate name
  let nameVi = person.name;
  let nameEn = removeAscent(nameVi);
  if (!nameEn) {
    isValid = false;
    getELe("#notifiName").innerHTML = "(*)This field can't be empty";
  } else if (!/^[a-z]+$/.test(nameEn)) {
    isValid = false;
    getELe("#notifiName").innerHTML = "(*)This name is not valid";
  } else {
    getELe("#notifiName").innerHTML = "";
  }

  //Validate personID
  let ID = getELe("#personId").value;
  let existPerson = persons.filter((pp) => {
    return pp.personId == ID;
  });
  let [exist] = existPerson;
  if (!ID.trim()) {
    isValid = false;
    getELe("#notifiPersonId").innerHTML = "(*)This field can't be empty";
  } else if (!/^[0-9]*$/.test(ID)) {
    isValid = false;
    getELe("#notifiPersonId").innerHTML =
      "(*)This field must be a string of number";
  } else {
    if (existPerson && exist.id != person.id) {
      isValid = false;
      getELe("#notifiPersonId").innerHTML = "(*)This userID already exist";
    } else {
      getELe("#notifiPersonId").innerHTML = "";
    }
  }

  //Validate Address
  let address = person.address;
  if (!address.trim()) {
    isValid = false;
    getELe("#notifiAddress").innerHTML = "(*)This field can't be empty";
  } else {
    getELe("#notifiAddress").innerHTML = "";
  }

  //Validate email
  let email = person.email;
  if (!email.trim()) {
    isValid = false;
    getELe("#notifiEmail").innerHTML = "(*)This field can't be empty";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    isValid = false;
    getELe("#notifiEmail").innerHTML = "(*)This email is not valid";
  } else {
    getELe("#notifiEmail").innerHTML = "";
  }

  //Validate math
  let mathScore = getELe("#math").value;
  let math = removeDot(mathScore);
  if (!math.trim()) {
    isValid = false;
    getELe("#notifiMath").innerHTML = "(*)This field can't be empty";
  } else if (!/^[0-9]*$/.test(math)) {
    isValid = false;
    getELe("#notifiMath").innerHTML = "(*)This score must be a number";
  } else if (Number(mathScore) < 0 || Number(mathScore) > 10) {
    isValid = false;
    getELe("#notifiMath").innerHTML = "(*)This score must be from 0 to 10";
  } else {
    getELe("#notifiMath").innerHTML = "";
  }

  // Validate Physics
  let physicsScore = getELe("#physics").value;
  let physics = removeDot(physicsScore);
  if (!physics.trim()) {
    isValid = false;
    getELe("#notifiPhysics").innerHTML = "(*)This field can't be empty";
  } else if (!/^[0-9]*$/.test(physics)) {
    isValid = false;
    getELe("#notifiPhysics").innerHTML = "(*)This score must be a number";
  } else if (Number(physicsScore) < 0 || Number(physicsScore) > 10) {
    isValid = false;
    getELe("#notifiPhysics").innerHTML = "(*)This score must be from 0 to 10";
  } else {
    getELe("#notifiPhysics").innerHTML = "";
  }

  //Valiadate chemistry
  let chemistryScore = getELe("#chemistry").value;
  let chemistry = removeDot(chemistryScore);
  if (!chemistry.trim()) {
    isValid = false;
    getELe("#notifiChemistry").innerHTML = "(*)This field can't be empty";
  } else if (!/^[0-9]*$/.test(chemistry)) {
    isValid = false;
    getELe("#notifiChemistry").innerHTML = "(*)This score must be a number";
  } else if (Number(chemistryScore) < 0 || Number(chemistryScore) > 10) {
    isValid = false;
    getELe("#notifiChemistry").innerHTML = "(*)This score must be from 0 to 10";
  } else {
    getELe("#notifiChemistry").innerHTML = "";
  }

  //Validate workingDays
  let dayNumber = getELe("#workingDays").value;
  if (!dayNumber.trim()) {
    isValid = false;
    getELe("#notifiWorkingDays").innerHTML = "(*)This field can't be empty";
  } else if (!/^[0-9]*$/.test(dayNumber)) {
    isValid = false;
    getELe("#notifiWorkingDays").innerHTML = "(*)This field must be a number";
  } else if (Number(dayNumber) < 0 || Number(dayNumber) > 31) {
    isValid = false;
    getELe("#notifiWorkingDays").innerHTML =
      "(*)This field must be from 0 to 31";
  } else {
    getELe("#notifiWorkingDays").innerHTML = "";
  }

  //Validate salaryPerDay
  let salary = getELe("#salaryPerDay").value;
  if (!salary.trim()) {
    isValid = false;
    getELe("#notifiSalaryPerDay").innerHTML = "(*)This field can't be empty";
  } else if (!/^[0-9]*$/.test(salary)) {
    isValid = false;
    getELe("#notifiSalaryPerDay").innerHTML = "(*)This field must be a number";
  } else {
    getELe("#notifiSalaryPerDay").innerHTML = "";
  }

  //Validate company
  let company = person.company;
  if (!company.trim()) {
    isValid = false;
    getELe("#notifiCompany").innerHTML = "(*)This field can't be empty";
  } else {
    getELe("#notifiCompany").innerHTML = "";
  }

  //Validate billValue
  let bill = getELe("#billValue").value;
  if (!bill.trim()) {
    isValid = false;
    getELe("#notifiBillValue").innerHTML = "(*)This field can't be empty";
  } else if (!/^[0-9]*$/.test(bill)) {
    isValid = false;
    getELe("#notifiBillValue").innerHTML = "(*)This field must be a number";
  } else {
    getELe("#notifiBillValue").innerHTML = "";
  }

  //Validate evaluate
  let evaluate = person.evaluate;
  if (!evaluate.trim()) {
    isValid = false;
    getELe("#notifiEvaluate").innerHTML = "(*)This field can't be empty";
  } else {
    getELe("#notifiEvaluate").innerHTML = "";
  }

  return isValid;
}

getPerson();

//===========DOM==============
getELe("#btnAddPerson").addEventListener("click", (evt) => {
  resetForm();
  getTypeModalShow();
  getELe(".modal-title").innerHTML = "Add person";
  getELe(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    <button class="btn btn-primary" id="createPerson">Add user</button>
  `;
  // console.log(typeAdd);
  // if (typeAdd=="type") {
  //   getELe(".modal-title").innerHTML = "Add person";
  //   getELe(".modal-footer").innerHTML = `
  //     <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
  //     <button class="btn btn-primary" id="createPerson" data-dismiss="modal">Thêm</button>
  //   `;
  // } else {
  //   getELe(".modal-title").innerHTML = "Add person";
  //   getELe(".modal-footer").innerHTML = `
  //     <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
  //     <button class="btn btn-primary" id="createPerson" data-dismiss="modal" typexxx="1">Thêm</button>
  //   `;
  // }
  getELe("#createPerson").addEventListener("click", (evt) => {
    // const type = evt.target.getAttribute("typexxx");
    // if (type) {
    //   createPersonHasType();
    // } else {

    // }
    createPerson();
  });
});
getELe("#display").addEventListener("input", (event) => {
  let type = getELe("#display").value;
  switch (type) {
    case "Student":
      getStudent();
      break;
    case "Employee":
      getEmployee();
      break;
    case "Customer":
      getCustomer();
      break;
    default:
      getPerson();
  }
});
// getELe("#display").addEventListener("input", (event) => {
//   let type = getELe("#display").value;
//   if (type == "Student") {
//     getELe("#btnLayoutAdd").innerHTML = `
//     <div id="btnAddPerson">
//     <button
//                 class="btn btn-success"
//                 data-toggle="modal"
//                 data-target="#myModal"
//                 btn-type="student"
//               >
//                 <i class="fa fa-plus mr-1"></i>
//                 Thêm Mới
//               </button>
//     </div>
//     `;
//   } else if (type == "Employee") {
//     getELe("#btnLayoutAdd").innerHTML = `
//     <div id="btnAddPerson">
//     <button
//                 class="btn btn-success"
//                 data-toggle="modal"
//                 data-target="#myModal"
//                 btn-type="employee"
//               >
//                 <i class="fa fa-plus mr-1"></i>
//                 Thêm Mới
//               </button>
//     </div>
//     `;
//   } else if (type == "Customer") {
//     getELe("#btnLayoutAdd").innerHTML = `
//     <div id="btnAddPerson">
//     <button
//                 class="btn btn-success"
//                 data-toggle="modal"
//                 data-target="#myModal"
//                 btn-type="customer"
//               >
//                 <i class="fa fa-plus mr-1"></i>
//                 Thêm Mới
//               </button>
//     </div>
//     `;
//   } else {
//     getELe("#btnLayoutAdd").innerHTML = `
//     <div id="btnAddPerson">
//     <button
//                 class="btn btn-success"
//                 data-toggle="modal"
//                 data-target="#myModal"
//                 btn-type="type"
//               >
//                 <i class="fa fa-plus mr-1"></i>
//                 Thêm Mới
//               </button>
//     </div>
//     `;
//   }
// });
// getELe("#type").addEventListener("input", (evt) => {
//   console.log(evt.target.value);
//   const Class = evt.target.value;
//   getPerson(Class);
// });
//===========Helpers==========
function getELe(selector) {
  return document.querySelector(selector);
}
