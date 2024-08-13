// import playersDB from "./app.mjs";

import { showPositionsList, manageModal, Alert } from "./app.mjs";
import FinalDate from "./countDownTimer";

class Form {
  constructor(formId, inputGroup) {
    this.formId = formId;
    this.inputGroup = inputGroup;
    // this.form= this.createForm()
  }
  createForm() {
    let form = this.createElement("form", {
      class: "row d-flex flex-column align-items-center form",
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
    let db = obj.getDataBase();
    inputs.forEach((input) => {
      if (input.type !== "submit") {
        let inputName = input.id;
        if (input.type === "number") {
          newElement[inputName] = Number(input.value);
        } else {
          newElement[inputName] = input.value;
        }
      }
    });
    newElement["points"] = 10;
    obj.addNewUser(newElement);
    showPositionsList();
    showAlertElement("alertElement")
    manageModal(null, "hide");
  }

  getFormDate(form) {
    let dateInput= form.querySelector("#finalDate").value
    // let date= new FinalDate(dateInput)
    // console.log(date.getDate())
  }
}

let userRegistInputs = [
  { label: "Nombre", type: "text", id: "userName" },
  { label: "Numero de Id", type: "number", id: "userId" },
];

let finalDateinput = [
  {
    label: "selecciona una fecha",
    type: "date",
    id: "finalDate",
    classes: [""],
  },
];

const userRegistrationForm = new Form("saveUserForm", userRegistInputs);
const finalDateForm = new Form("pickDateForm", finalDateinput);

const forms = { userRegistrationForm, finalDateForm };
export default forms;
