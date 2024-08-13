class FinalDate {
  constructor(date) {
    this.date = date;
    this.counter= document.querySelector("#counter")
    this.set = this.setDate();
    this.dateSaved = this.getDate() || "";
  }
  setDate() {
    localStorage.setItem("date",JSON.stringify(this.date));
  }
  getDate() {
    return JSON.parse(localStorage.getItem("date"));
  }
  countDownInterval() {
    return setInverval(this.updatingCountDown, 1000);
  }
  displayResultInTimer(days){
    this.counter.forEach(child => console.log(child))
  }

  updatingCountDown() {
    let now = new Date().getTime();
    let timeRemaining = this.date - now;
    if (timeRemaining <= 0) {
      this.counter.innerHTML = "Time is done";
      clearInterval(this.countDownInterval);
      return;
    }

    const days= Math.floor(timeRemaining / (1000*60*60*24))
    const hours= Math.floor((timeRemaining %(1000* 60 *60 *24))/(1000*60*60))
    const minutes=Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds=Math.floor((timeRemaining % (1000 * 60)) / 1000);
    let time= [days, hours, minutes, seconds]
    displayResultInTimer(time)
}
}
export default FinalDate