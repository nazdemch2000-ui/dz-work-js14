import { ACTIONS } from "../store/action.js";
 
 
export class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }
 
 
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
 
 
  // Централізований диспетчер обробки бізнес-дій
  dispatch(action) {
    switch (action.type) {
      case ACTIONS.ADD_TASK:
        this.state = {
          ...this.state,
          tasks: [...this.state.tasks, action.payload],
        };
        break;
        
        case ACTIONS.EDIT_TASK:
  this.state = {
    ...this.state,
    tasks: this.state.tasks.map((task) =>
      task.id === action.payload.id
        ? action.payload
        : task
    ),
  };
  break;
 
      case ACTIONS.UPDATE_TASK_COLUMN:
        this.state = {
          ...this.state,
          tasks: this.state.tasks.map((task) =>
            task.id === action.payload.taskId
              ? { ...task, columnId: action.payload.columnId }
              : task,
          ),
        };
        break;
 
 
      case ACTIONS.DELETE_TASK:
        this.state = {
          ...this.state,
          tasks: this.state.tasks.filter(
            (task) => task.id !== action.payload.taskId,
          ),
        };
        break;
 
 
      default:
        console.warn(`Unknown action type: ${action.type}`);
        return;
    }
 
 
    // Повідомляємо передплатників про зміну стейту
    this.listeners.forEach((listener) => listener(this.state));
  }
 
 
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}