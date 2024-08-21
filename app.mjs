import {timerInitialize, setCountDownInterval, $counter} from "./countDownTimer.mjs";
import forms from "./forms.mjs";
import dataBase from "./localStorage.mjs";

const $modal = document.querySelector("#modal");
const $modalContainer = document.querySelector("#modalContainer");
const $positionsTable = document.querySelector("#positionsTable");
const $positionTemplate = document.querySelector("#positionsTemplate");
const $alert = document.querySelector("#alertElement");

const showElement = (el) => {
  el.classList.remove("hidden");
};
const hideElement = (el) => {
  el.classList.add("hidden");
};

class Alert {
  constructor(alertText) {
    this.nodeEl = $alert;
    this.alertText = alertText;
    this.alert = false;
  }
  changeState() {
    if (!this.alert) {
      this.alert = true;
      showElement(this.nodeEl);
      this.nodeEl.classList.add("alertTransition");
    } else {
      this.alert = false;
      hideElement(this.nodeEl);
      this.nodeEl.classList.remove("alertTransition");
    }
  }
  addAlertText() {
    let title = this.nodeEl.querySelector("h3");
    title.textContent = this.alertText;
  }
  closeEvent() {
    let closeBtn = document.querySelector("#closeAlert");
    closeBtn.addEventListener("click", () => {
      this.changeState();
    });
  }
}

const manageModal = (formSelected, classAction) => {
  if (classAction === "show") {
    showElement($modal);
    $modalContainer.appendChild(formSelected.createForm());
  } else if (classAction === "hide" && formSelected === null) {
    hideElement($modal);
    $modalContainer.innerHTML = "";
  }
};

const createPositionNode = (user, idx) => {
  const template = document.importNode($positionTemplate.content, true);
  template.querySelector(".playerPosition").textContent = `#${idx + 1}`;
  template.querySelector(".playerName").textContent = user["userName"];
  template.querySelector(
    ".playerPoints"
  ).textContent = `${user["points"]} points`;
  return template;
};
const sortByPoints = (db) => {
  return db.sort((a, b) => b.points - a.points);
};

const showPositionsList = () => {
  let db = dataBase.getDataBase();
  let sortedUsers = sortByPoints(db);
  $positionsTable.innerHTML = "";
  sortedUsers.forEach((user, idx) => {
    let element = createPositionNode(user, idx);
    $positionsTable.appendChild(element);
  });
};
const initializeAndStartTimer = () => {
  // Ensure the countdown element exists and is ready
  if ($counter) {
    timerInitialize(); // Set the initial state
    setCountDownInterval(); // Start the countdown
  } else {
    console.error("Counter element not found in the DOM.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  dataBase.setDb();
  showPositionsList();
  initializeAndStartTimer();
 

  document.addEventListener("click", (e) => {
    let elem = e.target;
    let elemId = elem.getAttribute("id");
    switch (elemId) {
      case "saveUser":
        manageModal(forms.userRegistrationForm, "show");
        break;
      case "reserveBtn":
        manageModal(forms.reserveTableForm, "show");
        break;
      case "closeModal":
        manageModal(null, "hide");
        break;
      case "editDateBtn":
        manageModal(forms.dateForm, "show");
    }
  });

  document.addEventListener("submit", (e) => {
    let form = e.target;
    e.preventDefault();
    if (form.id === "saveUserForm") {
      forms.userRegistrationForm.getFormData(form, dataBase);
    } else if (form.id === "pickDateForm") {
      forms.dateForm.getDateValue(form);
    }
  });
});

export { showPositionsList, manageModal, Alert, initializeAndStartTimer };
