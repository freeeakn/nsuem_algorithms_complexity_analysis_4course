export class MinArray {
  private size: number;
  private data: number[];
  private tree: number[]; // Дерево отрезков для хранения минимумов

  constructor(size: number, initialValue: number = Infinity) {
    if (size <= 0) {
      throw new Error("Размер массива должен быть положительным");
    }

    this.size = size;
    this.data = new Array<number>(size).fill(initialValue);

    // Инициализируем дерево отрезков
    const treeSize = 4 * size; // Достаточно для хранения дерева
    this.tree = new Array<number>(treeSize).fill(Infinity);

    // Построение дерева отрезков
    this.buildTree(0, 0, size - 1);
  }

  // Рекурсивное построение дерева отрезков
  private buildTree(node: number, left: number, right: number): void {
    if (left === right) {
      this.tree[node] = this.data[left];
      return;
    }

    const mid = Math.floor((left + right) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    this.buildTree(leftChild, left, mid);
    this.buildTree(rightChild, mid + 1, right);

    this.tree[node] = Math.min(this.tree[leftChild], this.tree[rightChild]);
  }

  // Обновление значения в дереве отрезков
  private updateTree(
    node: number,
    left: number,
    right: number,
    index: number,
    value: number
  ): void {
    if (left === right) {
      this.tree[node] = value;
      return;
    }

    const mid = Math.floor((left + right) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    if (index <= mid) {
      this.updateTree(leftChild, left, mid, index, value);
    } else {
      this.updateTree(rightChild, mid + 1, right, index, value);
    }

    this.tree[node] = Math.min(this.tree[leftChild], this.tree[rightChild]);
  }

  // Поиск индекса минимального элемента в дереве отрезков
  private findMinIndexTree(node: number, left: number, right: number): number {
    if (left === right) {
      return left;
    }

    const mid = Math.floor((left + right) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    if (this.tree[node] === this.tree[leftChild]) {
      // Минимум находится в левом поддереве
      return this.findMinIndexTree(leftChild, left, mid);
    } else {
      // Минимум находится в правом поддереве
      return this.findMinIndexTree(rightChild, mid + 1, right);
    }
  }

  // Положить в i-ю ячейку число x
  set(i: number, x: number): void {
    if (i < 0 || i >= this.size) {
      throw new Error(`Индекс должен быть в диапазоне 0..${this.size - 1}`);
    }

    this.data[i] = x;
    this.updateTree(0, 0, this.size - 1, i, x);
  }

  // Узнать, что лежит в i-й ячейке
  get(i: number): number {
    if (i < 0 || i >= this.size) {
      throw new Error(`Индекс должен быть в диапазоне 0..${this.size - 1}`);
    }

    return this.data[i];
  }

  // Указать номер минимального элемента (одного из минимальных)
  getMinIndex(): number {
    if (this.tree[0] === Infinity) {
      throw new Error("Массив пуст");
    }

    return this.findMinIndexTree(0, 0, this.size - 1);
  }

  // Получить минимальное значение
  getMinValue(): number {
    return this.tree[0];
  }

  // Получить размер массива
  getSize(): number {
    return this.size;
  }

  // Получить копию данных массива
  toArray(): number[] {
    return [...this.data];
  }

  // Визуализация дерева (для отладки)
  debugTree(): void {
    console.log("Дерево отрезков (минимумы):");
    let level = 0;
    let nodesInLevel = 1;
    let index = 0;

    while (index < this.tree.length && this.tree[index] !== Infinity) {
      const nodes: number[] = [];
      for (let i = 0; i < nodesInLevel && index < this.tree.length; i++) {
        if (this.tree[index] !== Infinity) {
          nodes.push(this.tree[index]);
        }
        index++;
      }

      console.log(`Уровень ${level}: ${nodes.join(" ")}`);
      level++;
      nodesInLevel *= 2;
    }
  }
}

// Функция для тестирования структуры данных
export function testMinArray(): void {
  console.log("=== Тестирование MinArray (массив с поиском минимума) ===");

  // Создаем массив размера 8
  const arr = new MinArray(8, Infinity);
  console.log(`Создан массив размера ${arr.getSize()}`);
  console.log("Начальное состояние:", arr.toArray());

  // Добавляем элементы
  console.log("\n--- Добавляем элементы ---");
  arr.set(0, 5);
  arr.set(1, 3);
  arr.set(2, 7);
  arr.set(3, 2);
  arr.set(4, 8);
  arr.set(5, 1);
  arr.set(6, 4);
  arr.set(7, 6);

  console.log("После заполнения:", arr.toArray());
  console.log(`Минимальный элемент находится на позиции: ${arr.getMinIndex()}`);
  console.log(`Значение минимального элемента: ${arr.getMinValue()}`);
  console.log(
    `Проверка: arr[${arr.getMinIndex()}] = ${arr.get(arr.getMinIndex())}`
  );

  // Изменяем элементы
  console.log("\n--- Изменяем элементы ---");
  console.log("Меняем arr[2] с 7 на 0:");
  arr.set(2, 0);
  console.log("Массив после изменения:", arr.toArray());
  console.log(`Новый минимальный элемент на позиции: ${arr.getMinIndex()}`);
  console.log(`Значение: ${arr.getMinValue()}`);

  // Тестируем несколько минимумов
  console.log("\n--- Тестируем несколько одинаковых минимумов ---");
  arr.set(4, 0); // Устанавливаем еще один 0
  console.log("Массив после arr[4] = 0:", arr.toArray());
  console.log(
    `Минимальный элемент на позиции: ${arr.getMinIndex()} (один из минимумов)`
  );
  console.log(`Значение: ${arr.getMinValue()}`);

  // Производительность операций
  console.log("\n--- Проверка сложности операций ---");
  console.log("set(i, x): O(log n) - обновление в дереве отрезков");
  console.log("get(i): O(1) - доступ к массиву");
  console.log("getMinIndex(): O(log n) - поиск в дереве отрезков");

  // Демонстрация работы с большим массивом
  console.log("\n--- Работа с большим массивом (n=1000) ---");
  const bigArr = new MinArray(1000, 1000);

  // Устанавливаем случайные значения
  const startTime = Date.now();
  for (let i = 0; i < 1000; i++) {
    const value = Math.floor(Math.random() * 1000);
    bigArr.set(i, value);

    if (i % 200 === 0) {
      // Периодически проверяем минимум
      bigArr.getMinIndex();
    }
  }
  const endTime = Date.now();

  console.log(
    `1000 операций set и 5 операций getMinIndex выполнено за ${
      endTime - startTime
    } мс`
  );
  console.log(
    `Минимальный элемент: ${bigArr.getMinValue()} на позиции ${bigArr.getMinIndex()}`
  );
}
