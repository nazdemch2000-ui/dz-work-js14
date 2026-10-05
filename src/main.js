import "./style.css";
import { Store } from "./core/store.js";
import { initialState } from "./store/state.js";
import { StorageService } from "./services/StorageServices.js";
import { Board } from "./components/Board/board.js";
import { initDragAndDrop } from "./services/DragDropServices.js";
 
// 1. Завантажуємо дані з localStorage або беремо дефолтні
const savedState = StorageService.load();
const appState = savedState || initialState;
 
// 2. Ініціалізуємо глобальний Store
const store = new Store(appState);
 
// 3. Підписуємось на збереження стейту за будь-яких змін
store.subscribe((state) => {
  StorageService.save(state);
});
 
initDragAndDrop(store);
// 4. Знаходимо кореневий елемент та монтуємо дошку
const appContainer = document.querySelector("#app");
const board = new Board(appContainer, store);
 
console.log("Kanban Board application successfully started!");