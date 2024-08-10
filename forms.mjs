// import playersDB from "./app.mjs";

import {showPositionsList, manageModal} from "./app.mjs";

class Form {
  constructor(formId, inputGroup) {
    this.formId = formId;
    this.inputGroup = inputGroup;
    // this.form= this.createForm()
  }
  createForm() {
    let form = this.createElement("form", {
      class: "row d-flex flex-column align-items-center",
      id: this.formId,
    });

    this.inputGroup.forEach((inputElement) => {
      let group = this.createElement("div", {
        class: "inputGroup col-12 col-md-6",
      });

      let label = this.createElement("label", { for: inputElement.id });
      label.textContent = inputElement.label;

      let input = this.createElement("input", {
        type: inputElement.type,
        id: inputElement.id,
      });

      group.appendChild(label);
      group.appendChild(input);
      form.appendChild(group);
    });
    let submitBtn = this.createElement("input", {
      class: "button",
      type: "submit",
    });
    form.appendChild(submitBtn);

    return form;
  }

  createElement(tag, attributes = {}) {
    let tagElement = document.createElement(tag);
    for (let key in attributes) {
      if (key === "class") {
        attributes[key]
          .split(" ")
          .forEach((className) => tagElement.classList.add(className));
      } else {
        tagElement.setAttribute(key, attributes[key]);
      }
    }
    return tagElement;
  }
  getFormData(form, obj) {
    let inputs = form.querySelectorAll("input");
    let newElement = {};
    inputs.forEach((input) => {
      if (input.type !== "submit") {
        let inputName = input.id;
        if(input.type=== "number"){
        newElement[inputName] = Number(input.value)
        }else{
          newElement[inputName] = input.value;
        }
      }
    });
    newElement["points"]= 10;
    obj.addNewUser(newElement);
    showPositionsList();
    manageModal(null, "hide" )
  }
}

let userRegistInputs = [
  { label: "Nombre", type: "text", id: "userName", classes: [] },
  { label: "Numero de Id", type: "number", id: "userId", classes: [] },
];


const userRegistrationForm = new Form("saveUserForm", userRegistInputs);
const forms = { userRegistrationForm};
export default forms;
