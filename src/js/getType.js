import { apiGetPersons } from "./personAPI.js";
import Person from "./Person.js";
import { Student } from "./ListPerson.js";
import { Employee } from "./ListPerson.js";
import { renderPersons } from "./index.js";
import { resetForm } from "./index.js";
export function getType() {
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
  };
}
function getELe(selector) {
  return document.querySelector(selector);
}
