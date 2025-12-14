export class MultiStack<T> {
  private capacity: number; // Общее максимальное количество элементов (n)
  private numStacks: number; // Количество стеков (k)

  private values: (T | undefined)[]; // Основной массив для хранения значений
  private next: number[]; // Массив указателей на следующий элемент
  private top: number[]; // Индексы вершин каждого стека (-1 если пусто)
  private free: number; // Индекс первого свободного элемента

  constructor(k: number, n: number) {
    if (k <= 0 || n <= 0) {
      throw new Error(
        "Количество стеков и емкость должны быть положительными числами"
      );
    }

    this.capacity = n;
    this.numStacks = k;

    // Инициализируем массивы
    this.values = new Array<T | undefined>(n);
    this.next = new Array<number>(n);
    this.top = new Array<number>(k);

    // Инициализация: все стеки пусты
    for (let i = 0; i < k; i++) {
      this.top[i] = -1;
    }

    // Инициализация свободного списка
    // Все ячейки изначально свободны и связаны в список
    for (let i = 0; i < n - 1; i++) {
      this.next[i] = i + 1;
    }
    this.next[n - 1] = -1; // Последняя ячейка указывает на -1 (конец списка)
    this.free = 0; // Первая свободная ячейка
  }

  // Проверка, есть ли свободное место
  private isFull(): boolean {
    return this.free === -1;
  }

  // Проверка, пуст ли конкретный стек
  isEmpty(stackNum: number): boolean {
    if (stackNum < 0 || stackNum >= this.numStacks) {
      throw new Error(`Номер стека должен быть от 0 до ${this.numStacks - 1}`);
    }
    return this.top[stackNum] === -1;
  }

  // Добавление элемента в стек
  push(stackNum: number, value: T): void {
    if (stackNum < 0 || stackNum >= this.numStacks) {
      throw new Error(`Номер стека должен быть от 0 до ${this.numStacks - 1}`);
    }

    if (this.isFull()) {
      throw new Error("Общая емкость стеков исчерпана");
    }

    // Берем первую свободную ячейку
    const index = this.free;

    // Обновляем список свободных ячеек
    this.free = this.next[index];

    // Записываем значение
    this.values[index] = value;

    // Обновляем указатель на следующий элемент в стеке
    this.next[index] = this.top[stackNum];

    // Обновляем вершину стека
    this.top[stackNum] = index;
  }

  // Удаление и возврат элемента из стека
  pop(stackNum: number): T | undefined {
    if (stackNum < 0 || stackNum >= this.numStacks) {
      throw new Error(`Номер стека должен быть от 0 до ${this.numStacks - 1}`);
    }

    if (this.isEmpty(stackNum)) {
      return undefined; // Или можно бросить ошибку
    }

    // Получаем индекс вершины стека
    const index = this.top[stackNum];

    // Перемещаем вершину на следующий элемент
    this.top[stackNum] = this.next[index];

    // Возвращаем ячейку в список свободных
    this.next[index] = this.free;
    this.free = index;

    // Сохраняем значение перед очисткой
    const value = this.values[index];
    this.values[index] = undefined;

    return value;
  }

  // Просмотр вершины стека без удаления
  peek(stackNum: number): T | undefined {
    if (stackNum < 0 || stackNum >= this.numStacks) {
      throw new Error(`Номер стека должен быть от 0 до ${this.numStacks - 1}`);
    }

    if (this.isEmpty(stackNum)) {
      return undefined;
    }

    return this.values[this.top[stackNum]];
  }

  // Получение размера конкретного стека (не O(1), но иногда полезно)
  size(stackNum: number): number {
    if (stackNum < 0 || stackNum >= this.numStacks) {
      throw new Error(`Номер стека должен быть от 0 до ${this.numStacks - 1}`);
    }

    let count = 0;
    let current = this.top[stackNum];

    while (current !== -1) {
      count++;
      current = this.next[current];
    }

    return count;
  }

  // Общее количество занятых ячеек
  totalUsed(): number {
    let used = 0;
    for (let i = 0; i < this.numStacks; i++) {
      used += this.size(i);
    }
    return used;
  }

  // Количество свободных ячеек
  freeSpace(): number {
    return this.capacity - this.totalUsed();
  }

  // Визуализация состояния (для отладки)
  debug(): void {
    console.log("=== Отладочная информация о MultiStack ===");
    console.log(`Емкость: ${this.capacity}, Стеков: ${this.numStacks}`);
    console.log(`Свободная ячейка: ${this.free}`);

    console.log("\nВершины стеков:");
    for (let i = 0; i < this.numStacks; i++) {
      console.log(
        `  Стек ${i}: вершина = ${this.top[i]}, пуст = ${this.isEmpty(
          i
        )}, размер = ${this.size(i)}`
      );
    }

    console.log("\nМассив значений:");
    for (let i = 0; i < this.capacity; i++) {
      console.log(
        `  [${i}]: значение = ${this.values[i]}, next = ${this.next[i]}`
      );
    }

    console.log("===========================================");
  }
}
