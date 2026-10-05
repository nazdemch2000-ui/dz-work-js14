import { createCardElement } from "../Card/card.js";
import "./column.css";
 
export function createColumnElement(column, tasks) {
  return `
    <div class="kanban-column" data-column-id="${column.id}">
      <div class="column-header">
        <div class="column-title-wrapper">
          <h3 class="column-title">${column.title}</h3>
          <span class="column-counter">${tasks.length}</span>
        </div>
      </div>
      
      <div class="column-cards-container" data-column-drop-target="${column.id}">
        ${
          tasks.length > 0
            ? tasks.map((task) => createCardElement(task)).join("")
            : '<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">No tasks yet</div>'
        }
      </div>
    </div>
  `;
}