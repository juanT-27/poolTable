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
    let db = this.getDataBase();
    let indexFound = db.findIndex((user) => user.userId === id);
    return indexFound;
  }
  addNewUser(userInfo) {
    let userExists = this.findIndexById(userInfo.userId);
    if (userExists !== -1) {
      this.list[userExists].points += 10;
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
      let userToUpdate = this.list[userIdx];
      for (let key in data) {
        if (userToUpdate.hasOwnProperty(key)) {
          userToUpdate[key] = data[key];
        }
      }
      this.setDb();
      console.log("hello");
    }
  }
}

// const playerList = [{ userName: "Juan", userId: 1001186246, points: 10 }];

const dataBase = new UserDb();

export default dataBase;
