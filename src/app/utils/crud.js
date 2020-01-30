class Crud {
  constructor() {
    this.ulEvent = document.querySelector(".ul-event");
    this.ulTodo = document.querySelector(".ul-todo");
    this.addForm = document.getElementById("text-form");
    this.eventForm = document.getElementById("edit-event");
    this.todoForm = document.getElementById("edit-todo");
    this.input = document.getElementById("text-input");
    this.eventInput = document.getElementById("edit-event-input");
    this.todoInput = document.getElementById("edit-todo-input");
    this.ul = document.querySelectorAll("ul");
    this.toggleBtn = document.querySelector(".toggle-btn");
    this.texts = document.querySelectorAll(".text");
    this.output = "";
    this.type = "";
  }

  renderList(doc, loc) {
    const li = document.createElement("li");
    li.setAttribute("data-id", doc.id);
    li.innerHTML = `
        <span class='text'>${doc.data().body}</span>
        <span> <i class="far fa-edit edit"></i><i class="far fa-trash-alt trash"></i
        ></span>
     `;
    loc.appendChild(li);
  }

  strike(doc) {
    const texts = document.querySelectorAll(".text");

    texts.forEach(text => {
      if (text.parentElement.getAttribute("data-id") === doc.id) {
        text.classList.add("line");
      }
    });
  }

  noStrike(doc) {
    const texts = document.querySelectorAll(".text");

    texts.forEach(text => {
      if (text.parentElement.getAttribute("data-id") === doc.id) {
        text.classList.remove("line");
      }
    });
  }

  run() {
    // Realtime Listner - Event -
    db.collection("event").onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        // Decide if task's done.
        if (change.doc.data().done) {
          this.strike(change.doc);
        } else {
          this.noStrike(change.doc);
        }
        // rendering list
        if (change.type === "added") {
          this.renderList(change.doc, this.ulEvent);
        } else if (change.type === "removed") {
          let li = this.ulEvent.querySelector(`[data-id='${change.doc.id}']`);
          this.ulEvent.removeChild(li);
        } else if (change.type === "modified") {
          let li = this.ulEvent.querySelector(`[data-id='${change.doc.id}']`);
          let text = change.doc.data().body;
          li.querySelector(".text").textContent = text;
        }
      });
    });

    // Realtime Listner - Todo -
    db.collection("todo").onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        // Decide if task's done.
        if (change.doc.data().done) {
          this.strike(change.doc);
        } else {
          this.noStrike(change.doc);
        }
        // rendering list
        if (change.type === "added") {
          this.renderList(change.doc, this.ulTodo);
          if (change.doc.data().done) {
            this.strike(change.doc);
          }
        } else if (change.type === "removed") {
          let li = this.ulTodo.querySelector(`[data-id='${change.doc.id}']`);
          this.ulTodo.removeChild(li);
        } else if (change.type === "modified") {
          let li = this.ulTodo.querySelector(`[data-id='${change.doc.id}']`);
          let text = change.doc.data().body;
          li.querySelector(".text").textContent = text;
        }
      });
    });

    // Add Data
    this.addForm.addEventListener("submit", e => {
      e.preventDefault();
      const id = document.querySelector(".active").id;

      if (id === "event") {
        db.collection("event").add({
          body: this.input.value,
          done: false
        });
        this.input.value = "";
      } else if (id === "todo") {
        db.collection("todo").add({
          body: this.input.value,
          done: false
        });
        this.input.value = "";
      }
    });

    // Delete Data
    this.ul.forEach(li => {
      li.addEventListener("click", e => {
        if (e.target.classList.contains("trash")) {
          let type =
            e.target.parentElement.parentElement.parentElement.className;
          let id = e.target.parentElement.parentElement.getAttribute("data-id");

          if (type === "ul-event") {
            db.collection("event")
              .doc(id)
              .delete();
          } else {
            db.collection("todo")
              .doc(id)
              .delete();
          }
        }
      });
    });

    // Toggling
    this.ulEvent.addEventListener("click", e => {
      if (e.target.classList.contains("text")) {
        let id = e.target.parentElement.getAttribute("data-id");
        if (e.target.classList.contains("line")) {
          db.collection("event")
            .doc(id)
            .update({
              done: false
            });
        } else {
          db.collection("event")
            .doc(id)
            .update({
              done: true
            });
        }
      }
    });

    this.ulTodo.addEventListener("click", e => {
      if (e.target.classList.contains("text")) {
        let id = e.target.parentElement.getAttribute("data-id");
        if (e.target.classList.contains("line")) {
          db.collection("todo")
            .doc(id)
            .update({
              done: false
            });
        } else {
          db.collection("todo")
            .doc(id)
            .update({
              done: true
            });
        }
      }
    });

    // Edit Data
    this.ul.forEach(list => {
      list.addEventListener("click", e => {
        if (e.target.classList.contains("edit")) {
          let type =
            e.target.parentElement.parentElement.parentElement.className;
          let id = e.target.parentElement.parentElement.getAttribute("data-id");
          let text = e.target.parentElement.parentElement.querySelector(".text")
            .textContent;
          this.addForm.classList.add("hidden");
          this.toggleBtn.style.display = "none";

          if (type === "ul-event") {
            this.eventInput.placeholder = text;
            this.eventForm.classList.remove("hidden");
            this.eventInput.focus();

            // Update to Firestore
            this.eventForm.addEventListener("submit", e => {
              e.preventDefault();

              db.collection("event")
                .doc(id)
                .update({
                  body: this.eventInput.value
                })
                .then(() => (this.eventInput.value = ""))
                .catch(err => console.log(err));

              this.addForm.classList.remove("hidden");
              this.eventForm.classList.add("hidden");
              this.toggleBtn.style.display = "block";
            });
          } else if (type === "ul-todo") {
            this.todoInput.placeholder = text;
            this.todoForm.classList.remove("hidden");
            this.todoInput.focus();

            this.todoForm.addEventListener("submit", e => {
              e.preventDefault();

              db.collection("todo")
                .doc(id)
                .update({
                  body: this.todoInput.value
                })
                .then(() => (this.todoInput.value = ""))
                .catch(err => console.log(err));

              this.addForm.classList.remove("hidden");
              this.todoForm.classList.add("hidden");
              this.toggleBtn.style.display = "block";
            });
          }
        }
      });
    });
  }
}

export const crud = new Crud();
