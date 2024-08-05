class UserDb {
  constructor(list) {
    this.list = list;
    this.setDb();
  }
  setDb() {
    localStorage.setItem("playersDb", JSON.stringify(this.list));
  }
  getDb() {
    let db = localStorage.getItem("playersDb");
    return db ? JSON.parse(db) : null;
  }
  findUserById(id) {
    let db = this.getDb();
    let userFound = db.find((user) => user.userId === id);
    return userFound;
  }
  addNewUser(userInfo) {
    let userExists = this.findUserById(userInfo.userId);
    if (userExists) {
      console.log({ err: "undefined", errMessage: "user already Exists " });
      return
    }
    this.list.push(userInfo);
    this.setDb();
  }
  updateDb(id, data) {
    let userToUpdate = this.findUserById(id);
    if (userToUpdate) {
      for (let key in userToUpdate) {
        userToUpdate[key] = data[key];
      }
      this.setDb();
      console.log("hello");
    }
  }
}

const playerList = [{ userName: "Juan", userId: 1001186246, points: 10 }];

const db = new UserDb(playerList);

export default db;
