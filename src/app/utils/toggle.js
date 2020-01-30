import { timingSafeEqual } from "crypto";

class Toggle {
  constructor() {
    this.toggleBtn = document.querySelector(".toggle-btn");
    this.toggleTodo = document.getElementById("todo");
    this.toggleEvent = document.getElementById("event");
    this.openEvent = document.querySelector(".open-event p");
    this.openTodo = document.querySelector(".open-todo");
    this.listEvent = document.querySelector(".list-event");
    this.listTodo = document.querySelector(".list-todo");
  }
  removeActive() {
    this.toggleTodo.classList.remove("active");
    this.toggleEvent.classList.remove("active");
  }
  addActive(e) {
    this.removeActive();
    e.target.classList.add("active");
  }

  showEvent() {
    this.listEvent.classList.toggle("show");
  }

  showTodo() {
    this.listTodo.classList.toggle("show");
  }
}

export const toggle = new Toggle();
