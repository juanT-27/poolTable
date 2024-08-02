import forms from "./forms.mjs"
const $modal= document.querySelector("#modal")
const $reserveBtn= document.querySelector("#reserveBtn")
const $saveUser= document.querySelector("#saveUser")

const playersDB= []

document.addEventListener("DOMContentLoaded", ()=>{
    document.addEventListener("click", (e)=>{
        let elem= e.target
        let elemId= elem.getAttribute("id")
        if( elemId=== "saveUser"){
            $modal.classList.remove("hidden")
            $modal.innerHTML=""
            $modal.appendChild(forms.userRegistrationForm.createForm())
        }
        if(elemId=== "reserveBtn"){
            $modal.classList.remove("hidden")
            $modal.innerHTML="";
            $modal.appendChild(forms.reserveTableForm.createForm())
        }
    })

    document.addEventListener("submit", (e)=>{
    let form= e.target;
    e.preventDefault()
    if(form.id=== "saveUser")
        forms.userRegistrationForm.getFormData(form,playersDB)
    })
})

export default playersDB