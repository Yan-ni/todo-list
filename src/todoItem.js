import uniqid from "uniqid";

class todoItem {
  constructor(text) {
    this.id = uniqid();
    this.content = text;
    this.done = false;
  }
}

export default todoItem;
