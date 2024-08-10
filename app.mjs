import forms from "./forms.mjs";
import dataBase from "./localStorage.mjs";

const $modal = document.querySelector("#modal");
const $modalContainer= document.querySelector("#modalContainer");
const $positionsTable= document.querySelector("#positionsTable");
const $positionTemplate= document.querySelector("#positionsTemplate");

const manageModal = (formSelected,classAction)=>{
    if(classAction=== "show"){
      $modal.classList.remove("hidden")
      $modalContainer.appendChild(formSelected.createForm())
    }
    else if(classAction==="hide" && formSelected===null ){
      $modal.classList.add("hidden")
      $modalContainer.innerHTML=""
    }
}

const createPositionNode= (user, idx)=>{
  const template= document.importNode($positionTemplate.content, true)
  template.querySelector(".playerPosition").textContent= `#${idx +1}`;
  template.querySelector(".playerName").textContent= user["userName"];
  template.querySelector(".playerPoints").textContent= `${user["points"]} points`
  return template
}
const sortByPoints = (db)=>{
 return  db.sort((a,b)=> b.points- a.points)
}

const showPositionsList = ()=>{
  let db= dataBase.getDataBase();
  let sortedUsers= sortByPoints(db);
  $positionsTable.innerHTML=""
  sortedUsers.forEach((user, idx) => {
    let element= createPositionNode(user, idx)
    $positionsTable.appendChild(element);
  })
}

document.addEventListener("DOMContentLoaded", () => {
  dataBase.setDb()
  showPositionsList()

  document.addEventListener("click", (e) => {
    let elem = e.target;
    let elemId = elem.getAttribute("id");
    switch (elemId) {
      case "saveUser":
        manageModal(forms.userRegistrationForm, "show")
        break;
      case "reserveBtn":
        manageModal(forms.reserveTableForm, "show")
        break;
      case "closeModal":
        manageModal(null, "hide")
        break;
      
    }
  });

  document.addEventListener("submit", (e) => {
    let form = e.target;
    e.preventDefault();
    if (form.id === "saveUserForm"){
      forms.userRegistrationForm.getFormData(form, dataBase);}

      else if(form.id=== "reserveTableForm"){
        
      }
  });
});

export {showPositionsList, manageModal}


