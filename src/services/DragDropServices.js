import { ACTIONS } from "../store/action.js";
 
export function initDragAndDrop(store) {
  let draggedTaskId = null;
 
  // Слухаємо початок перетягування картки (на рівні всього документа через делегування)
  document.addEventListener("dragstart", (e) => {
    const card = e.target.closest(".kanban-card");
    if (!card) return;
 
    draggedTaskId = card.dataset.taskId;
    e.dataTransfer.setData("text/plain", draggedTaskId);
    e.dataTransfer.effectAllowed = "move";
 
    // Додаємо клас для візуального ефекту напівпрозорості
    setTimeout(() => card.classList.add("dragging"), 0);
  });
 
  // Слухаємо закінчення перетягування
  document.addEventListener("dragend", (e) => {
    const card = e.target.closest(".kanban-card");
    if (card) {
      card.classList.remove("dragging");
    }
    draggedTaskId = null;
 
    // Забираємо підсвічування з усіх колонок
    document.querySelectorAll(".kanban-column").forEach((col) => {
      col.classList.remove("drag-over");
    });
  });
 
  // Дозволяємо браузеру перетягування над контейнером колонки
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
 
    const columnContainer = e.target.closest(".column-cards-container");
    if (columnContainer) {
      const column = columnContainer.closest(".kanban-column");
      if (column) column.classList.add("drag-over");
    }
  });
 
  document.addEventListener("dragleave", (e) => {
    const columnContainer = e.target.closest(".column-cards-container");
    if (!columnContainer) {
      const column = e.target.closest(".kanban-column");
      if (column) column.classList.remove("drag-over");
    }
  });
 
  // Обробляємо падіння картки у колонку
  document.addEventListener("drop", (e) => {
    e.preventDefault();
 
    const columnContainer = e.target.closest(".column-cards-container");
    if (!columnContainer) return;
 
    const targetColumnId = columnContainer.dataset.columnDropTarget;
    const taskId = e.dataTransfer.getData("text/plain") || draggedTaskId;
 
    if (taskId && targetColumnId) {
      // Надсилаємо екшен у Store для оновлення columnId у завдання
      store.dispatch({
        type: ACTIONS.UPDATE_TASK_COLUMN,
        payload: { taskId, columnId: targetColumnId },
      });
    }
 
    // Забираємо підсвічування
    document.querySelectorAll(".kanban-column").forEach((col) => {
      col.classList.remove("drag-over");
    });
  });
}




 