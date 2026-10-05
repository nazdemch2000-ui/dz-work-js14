const STORAGE_KEY = "kanban_board_data";
 
export const StorageService = {
  // Завантаження даних із localStorage с захистом від помилок
  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      return null;
    }
  },
 
  // Збереження даних у localStorage
  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  },
};