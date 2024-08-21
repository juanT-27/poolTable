import { Alert } from "./app.mjs";

class UserDb {
  constructor() {
    this.list = this.getDataBase() || [];
    this.setDb();
  }
  setDb() {
   localStorage.setItem("playersDb", JSON.stringify(this.list));
  }
  getDataBase() {
  return JSON.parse(localStorage.getItem("playersDb"))
  }
  findIndexById(id) {
    
    let indexFound = this.list.findIndex((user) => user.userId === id);
    return indexFound;
  }
  addNewUser(userInfo) {
    let userIndex = this.findIndexById(userInfo.userId);
    if (userIndex !== -1) {
      this.list[userIndex].points += 10;
      this.setDb();
      let pointsAddedAlert= new Alert("puntos añadidos a jugador existente")
      pointsAddedAlert.addAlertText();
      pointsAddedAlert.changeState();
      pointsAddedAlert.closeEvent();
      return;
    }
    this.list.push(userInfo);
    this.setDb();
    let playerAddedAlert= new Alert("Jugador añadido")
    playerAddedAlert.addAlertText();
    playerAddedAlert.changeState();
    playerAddedAlert.closeEvent();
  }
  updateDb(id, data) {
    let userIdx = this.findIndexById(id);
    if (userIdx !== -1) {
      Object.assign(this.list[userIdx], data)
      this.setDb();
      console.log("userData updated");
    }
  }

  showAlert(message){
    let alert= new Alert(message)
    alert.addAlertText();
    alert.changeState();
    alert.closeEvent();
  }
}

// const playerList = [{ userName: "Juan", userId: 1001186246, points: 10 }];

const dataBase = new UserDb();

export default dataBase;
