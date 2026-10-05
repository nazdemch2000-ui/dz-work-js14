export class Component {
  constructor(container, store) {
    if (!container) {
      throw new Error("Component container element is required!");
    }
 
    this.container = container;
    this.store = store;
 
    // Автоматично підписуємось на оновлення стора
    // За будь-якої зміни стейту буде викликатися метод render()
    this.unsubscribe = this.store.subscribe(() => {
      this.render();
    });
  }
 
  // Метод, який кожен дочірній компонент повинен перевизначити для генерації HTML
  render() {
    throw new Error("Method render() must be implemented in child component");
  }
 
  // Метод безпечного знищення компонента (очищення пам'яті)
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.container.innerHTML = "";
  }
}