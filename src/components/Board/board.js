import { Component } from "../../core/component.js";
import { createColumnElement } from "../Column/column.js";
import { Modal } from "../Modal/modal.js";
import { ACTIONS } from "../../store/action.js";
import "./board.css";
 
export class Board extends Component {
  constructor(container, store) {
    super(container, store);
    this.render();
    this.initEventListeners();
  }
 
  render() {
    const state = this.store.getState();
 
    this.container.innerHTML = `
      <div class="kanban-board-container">
        <header class="board-header" style="display: flex; justify-content: space-between; align-items: center;">
          <h1 class="board-title">Kanban Project Board</h1>
          <button class="btn btn-primary" id="openModalBtn">+ Add Task</button>
        </header>
       
        <div class="board-columns">
          ${state.columns
            .map((column) => {
              const columnTasks = state.tasks.filter(
                (task) => task.columnId === column.id,
              );
              return createColumnElement(column, columnTasks,);
            })
            .join("")}
        </div>
      </div>
      <div id="modalContainer"></div>
    `;
  }
 
  initEventListeners() {
   this.container.addEventListener("click", (event) => {
  if (event.target.id !== "openModalBtn") {
    return;
  }

  const modalContainer = document.getElementById("modalContainer");

  new Modal(modalContainer, this.store);
});
    this.container.addEventListener("click", (event) => {
  if (!event.target.classList.contains("edit-btn")) {
    return;
  }

  const card = event.target.closest(".kanban-card");
  const taskId = card.dataset.taskId;

  const state = this.store.getState();

  const task = state.tasks.find((task) => task.id === taskId);

  const modalContainer = document.getElementById("modalContainer");

  new Modal(modalContainer, this.store, null, task);
});


    this.container.addEventListener('dblclick', (e) => {
      const card = e.target.closest('.kanban-card');
      if (!card) return;
 
      const taskId = card.dataset.taskId;
      if (confirm('Are you sure you want to delete this task?')) {
        this.store.dispatch({
          type: ACTIONS.DELETE_TASK,
          payload: { taskId }
        });
      }
    });
  }
}