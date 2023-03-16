export default function validate(person) {
    isValid = true;
    //Validate name
    // debugger;
    let nameVi = getELe("#name").value;
    let nameEn = removeAscent(nameVi);
    if (!nameEn.trim()) {
      isValid = false;
      getELe("notifiName").innerHTML = "(*)This field can't be empty";
    } else if (!/\d/.test(nameEn)) {
      isValid = false;
      getELe("#notifiName").innerHTML = "(*)This name is not valid";
    } else {
      getELe("#notifiName").innerHTML = "";
    }
    return isValid;
  }