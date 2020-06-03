import { decorate, observable, action } from "mobx";
import uniqid from "uniqid";

class TodoListStore {
  List = [];

  addItem(text) {
    text = text.trim();
    if (text !== "" && !this.checkForLongWords(text)) {
      this.List.push({
        id: uniqid(),
        content: text,
        done: false,
      });
      this.saveList();
    }
  }

  checkForLongWords(text) {
    let longWord = false;
    text.split(" ").map((i) => {
      if (i.length >= 20) longWord = true;
      return i;
    });
    return longWord;
  }

  toggleItemDone(key) {
    this.List = this.List.map((i) => {
      if (i.id === key) {
        i.done = i.done ? false : true;
      }
      return i;
    });
    this.saveList();
  }

  removeItem(key) {
    this.List = this.List.filter((i) => i.id !== key);
    this.saveList();
  }

  loadList() {
    if (localStorage.getItem("List") !== null)
      this.List = JSON.parse(localStorage.getItem("List"));
  }

  saveList() {
    localStorage.setItem("List", JSON.stringify(this.List));
  }

  clearList() {
    if (window.confirm("Are you sure you want to clear all the list ?")) {
      this.List = [];
      localStorage.removeItem("List");
    }
  }
}

decorate(TodoListStore, {
  List: observable,
  addItem: action,
  toggleDoneItem: action,
  removeItem: action,
  loadList: action,
  saveList: action,
  clearList: action,
});

export default new TodoListStore();
