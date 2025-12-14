export class Queue<T> {
  private capacity: number;
  private elements: (T | undefined)[];
  private front: number;
  private rear: number;
  private size: number;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Емкость очереди должна быть положительным числом");
    }

    this.capacity = capacity;
    this.elements = new Array<T | undefined>(capacity);
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }

  // Проверка на пустоту
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Проверка на переполнение
  isFull(): boolean {
    return this.size === this.capacity;
  }

  // Получение текущего размера
  getSize(): number {
    return this.size;
  }

  // Получение максимальной емкости
  getCapacity(): number {
    return this.capacity;
  }

  // Добавление элемента в конец очереди (enqueue)
  enqueue(element: T): void {
    if (this.isFull()) {
      throw new Error("Очередь переполнена");
    }

    // Циклическое перемещение указателя rear
    this.rear = (this.rear + 1) % this.capacity;
    this.elements[this.rear] = element;
    this.size++;
  }

  // Удаление элемента из начала очереди (dequeue)
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const element = this.elements[this.front];
    this.elements[this.front] = undefined;

    // Циклическое перемещение указателя front
    this.front = (this.front + 1) % this.capacity;
    this.size--;

    return element;
  }

  // Просмотр элемента в начале очереди без удаления
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.elements[this.front];
  }

  // Очистка очереди
  clear(): void {
    this.front = 0;
    this.rear = -1;
    this.size = 0;
    // Очищаем массив
    for (let i = 0; i < this.capacity; i++) {
      this.elements[i] = undefined;
    }
  }

  // Преобразование в массив (для отладки)
  toArray(): T[] {
    const result: T[] = [];

    if (this.isEmpty()) {
      return result;
    }

    let index = this.front;
    for (let i = 0; i < this.size; i++) {
      const element = this.elements[index];
      if (element !== undefined) {
        result.push(element);
      }
      index = (index + 1) % this.capacity;
    }

    return result;
  }
}

// Функция для тестирования очереди
export const testQueue = (): void => {
  console.log("=== Тестирование очереди ограниченной длины ===");

  // Создаем очередь емкостью 5
  const queue = new Queue<number>(5);

  console.log(`Создали очередь емкостью ${queue.getCapacity()}`);
  console.log(
    `Начальное состояние: пуста = ${queue.isEmpty()}, размер = ${queue.getSize()}`
  );

  // Добавляем элементы
  console.log("\n--- Добавляем элементы ---");
  for (let i = 1; i <= 5; i++) {
    queue.enqueue(i * 10);
    console.log(`enqueue(${i * 10})`);
    console.log(`  Размер: ${queue.getSize()}, peek: ${queue.peek()}`);
  }

  console.log(`\nОчередь полна: ${queue.isFull()}`);
  console.log(`Элементы в порядке очереди: ${queue.toArray().join(" -> ")}`);

  // Пытаемся добавить в полную очередь
  console.log("\n--- Пытаемся добавить в полную очередь ---");
  try {
    queue.enqueue(60);
  } catch (e: any) {
    console.log(`Ошибка (ожидаемо): ${e.message}`);
  }

  // Удаляем элементы
  console.log("\n--- Удаляем элементы ---");
  for (let i = 0; i < 3; i++) {
    console.log(`dequeue() = ${queue.dequeue()}`);
    console.log(`  Размер: ${queue.getSize()}, peek: ${queue.peek()}`);
  }

  console.log(`Элементы в порядке очереди: ${queue.toArray().join(" -> ")}`);

  // Добавляем еще элементы (тестируем циклический буфер)
  console.log("\n--- Добавляем снова (тест циклического буфера) ---");
  queue.enqueue(60);
  queue.enqueue(70);
  console.log(`enqueue(60), enqueue(70)`);
  console.log(`  Размер: ${queue.getSize()}, peek: ${queue.peek()}`);
  console.log(`Элементы в порядке очереди: ${queue.toArray().join(" -> ")}`);

  // Очищаем очередь
  console.log("\n--- Очищаем очередь ---");
  queue.clear();
  console.log(
    `После clear(): размер = ${queue.getSize()}, пуста = ${queue.isEmpty()}`
  );
  console.log(`peek() = ${queue.peek()}, dequeue() = ${queue.dequeue()}`);
};

// Функция для демонстрации эффективности операций O(1)
export const demonstrateQueueEfficiency = (): void => {
  console.log("\n=== Демонстрация эффективности операций O(1) ===");

  const queue = new Queue<number>(100000);
  const startTime = Date.now();

  // 100000 операций enqueue и dequeue
  for (let i = 0; i < 100000; i++) {
    queue.enqueue(i);
    if (i % 2 === 0) {
      queue.dequeue();
    }
  }

  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log(`100000 операций выполнено за ${duration} мс`);
  console.log(
    `Среднее время на операцию: ${(duration / 100000).toFixed(6)} мс`
  );
  console.log(`Это доказывает, что каждая операция выполняется за O(1)`);
};
