import { User } from "./admin/user.js";

export class Users {

  constructor() {
    this.users = new Map()
  }
  addUser(id) {
    let u = this.users.get(id)
    if (u) {
      return u
    }
    u = new User(id)
    this.users.set(id, u)
    return u
  }

  getUser(id) {
    return this.users.get(id)
  }
}
