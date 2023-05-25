
export class User {
  constructor(id) {
    this.userId = id
    this.chatId = '#'
  }
  newChat() {
    this.chatId = '#'
  }
  getChatId() {
    return this.chatId
  }
}
