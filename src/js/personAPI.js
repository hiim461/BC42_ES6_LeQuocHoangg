const URL = "https://640acb7a65d3a01f98076160.mockapi.io/persons";

import axios from "axios";

export function apiGetPersons() {
  return axios({
    method: "GET",
    url: URL,
  });
}

export function apiCreatePerson(person) {
  return axios({
    method: "POST",
    url: URL,
    data: person,
  });
}
export function apiDeletePerson(personID) {
  return axios({
    method: "DELETE",
    url: `${URL}/${personID}`,
  });
}

export function apiGetPersonById(personID) {
  return axios({
    method: "GET",
    url: `${URL}/${personID}`,
  });
}

export function apiUpdatePersonById(personID, person) {
  return axios({
    method: "PUT",
    url: `${URL}/${personID}`,
    data: person,
  });
}
