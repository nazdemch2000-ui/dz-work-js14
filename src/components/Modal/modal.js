import { Component } from "../../core/component.js";
import { ACTIONS } from "../../store/action.js";
import "./modal.css";

export class Modal extends Component {
  constructor(container, store, onClose, task = null) {
    super(container, store);
    this.onClose = onClose;
    this.task = task;
    this.render();
    this.initEventListeners();
  }

  render() {
    const state = this.store.getState();
    const isEdit = this.task !== null;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modalBackdrop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              ${isEdit ? "Edit Task" : "Create New Task"}
            </h3>

            <button class="modal-close-btn" id="closeModalBtn">&times;</button>
          </div>

          <form id="taskForm">
            <div class="form-group">
              <label class="form-label" for="taskTitle">Task Title</label>

              <input
                type="text"
                id="taskTitle"
                class="form-input"
                placeholder="Enter task title..."
                value="${isEdit ? this.task.title : ""}"
                required
                autocomplete="off"
              >
            </div>

            <div class="form-group">
              <label class="form-label" for="taskDescription">
                Description
              </label>

              <textarea
                id="taskDescription"
                class="form-textarea"
                placeholder="Enter task description..."
              >${isEdit ? this.task.description : ""}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="taskColumn">Column</label>

              <select id="taskColumn" class="form-select">
                ${state.columns.map((col) => `
                  <option
                    value="${col.id}"
                    ${isEdit && this.task.columnId === col.id ? "selected" : ""}
                  >
                    ${col.title}
                  </option>
                `).join("")}
              </select>
              
            </div>
            <div class="form-group">
              <label class="form-label" for="taskPriority">Priority</label>

              <select id="taskPriority" class="form-select">
                ${state.priority.map((prior) => `
                  <option
                    value="${prior.id}"
                    ${isEdit && this.task.priority === prior.id ? "selected" : ""}
                  >
                    ${prior.title}
                  </option>
                `).join("")}
              </select>
              
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="cancelBtn">
                Cancel
              </button>

              <button type="submit" class="btn btn-primary">
                ${isEdit ? "Save Changes" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  initEventListeners() {
    const backdrop = document.getElementById("modalBackdrop");
    const closeBtn = document.getElementById("closeModalBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const form = document.getElementById("taskForm");
 

    const closeModal = () => this.destroy();

    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("taskTitle").value.trim();
      const description = document
        .getElementById("taskDescription")
        .value.trim();

      const columnId = document.getElementById("taskColumn").value;
const priority = document.getElementById("taskPriority").value;

      if (!title) return;

      if (this.task) {
        this.store.dispatch({
          type: ACTIONS.EDIT_TASK,
          payload: {
            ...this.task,
            title,
            description,
            columnId,
             priority,
          },
        });
      } else {
        const newTask = {
          id: "task-" + crypto.randomUUID(),
          columnId,
          title,
          description,
           priority,
        };

        this.store.dispatch({
          type: ACTIONS.ADD_TASK,
          payload: newTask,
        });
      }

      closeModal();

      if (this.onClose) {
        this.onClose();
      }
    });
  }
}