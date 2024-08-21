import { Alert } from "./app.mjs";
let countDownInterval = null;
let goalDate= null
let $counter = document.querySelector(".counter");

const checkDate = () => {
  let date = localStorage.getItem("date")
  if (!date) {
    console.log("no date added yet");
    return null
  }
  let parsedData= new Date(date).getTime();
  if(isNaN(parsedData)){
    console.log("Invalid date in localStorage")
    return null
  }
  goalDate= parsedData
  return parsedData
};

const displayResultInTimer = (time) => {
  let list = $counter.querySelectorAll("li");
  list.forEach((el, idx) => {
    let span = el.querySelector("span");
    span.innerHTML = time[idx];
  });
};

const timerInitialize = () => {
  if(!goalDate){
    clearInterval(countDownInterval)
    displayResultInTimer([0,0,0,0])
    return;
  }

  let actualDate = new Date().getTime();
  let timeRemaining = goalDate - actualDate;

  if (timeRemaining <= 0) {
    clearInterval(countDownInterval);
    let noDaysLeft = new Alert("Hoy es el día de la entrega de premio");
    noDaysLeft.addAlertText();
    noDaysLeft.changeState();
    noDaysLeft.closeEvent();
    displayResultInTimer([0, 0, 0, 0]);
    return;
  }
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  let time = [days, hours, minutes, seconds];
  displayResultInTimer(time);
};

const setCountDownInterval = () => {
  if(!goalDate){
   goalDate= checkDate()
  }
  if (countDownInterval) {
    clearInterval(countDownInterval);
  }
  countDownInterval = setInterval(timerInitialize, 1000);
};

export  {timerInitialize, setCountDownInterval,checkDate, $counter}
