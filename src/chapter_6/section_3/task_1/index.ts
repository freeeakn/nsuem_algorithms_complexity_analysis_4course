// Реализация 1: Булев массив (битовая маска в виде массива boolean)
export class BooleanSet {
  private size: number;
  private elements: boolean[];

  constructor(n: number) {
    if (n <= 0) {
      throw new Error("Размер множества должен быть положительным");
    }
    this.size = n;
    this.elements = new Array<boolean>(n + 1).fill(false); // Индексы 1..n
  }

  // Добавление элемента
  add(element: number): void {
    if (element < 1 || element > this.size) {
      throw new Error(`Элемент должен быть в диапазоне 1..${this.size}`);
    }
    this.elements[element] = true;
  }

  // Удаление элемента
  remove(element: number): void {
    if (element < 1 || element > this.size) {
      throw new Error(`Элемент должен быть в диапазоне 1..${this.size}`);
    }
    this.elements[element] = false;
  }

  // Проверка наличия элемента
  has(element: number): boolean {
    if (element < 1 || element > this.size) {
      return false;
    }
    return this.elements[element];
  }

  // Получение всех элементов множества
  getAll(): number[] {
    const result: number[] = [];
    for (let i = 1; i <= this.size; i++) {
      if (this.elements[i]) {
        result.push(i);
      }
    }
    return result;
  }

  // Очистка множества
  clear(): void {
    this.elements.fill(false);
  }

  // Проверка на пустоту
  isEmpty(): boolean {
    for (let i = 1; i <= this.size; i++) {
      if (this.elements[i]) {
        return false;
      }
    }
    return true;
  }

  // Мощность множества
  cardinality(): number {
    let count = 0;
    for (let i = 1; i <= this.size; i++) {
      if (this.elements[i]) {
        count++;
      }
    }
    return count;
  }

  // Объединение множеств
  union(other: BooleanSet): BooleanSet {
    if (this.size !== other.size) {
      throw new Error("Множества должны иметь одинаковый размер");
    }

    const result = new BooleanSet(this.size);
    for (let i = 1; i <= this.size; i++) {
      result.elements[i] = this.elements[i] || other.elements[i];
    }
    return result;
  }

  // Пересечение множеств
  intersection(other: BooleanSet): BooleanSet {
    if (this.size !== other.size) {
      throw new Error("Множества должны иметь одинаковый размер");
    }

    const result = new BooleanSet(this.size);
    for (let i = 1; i <= this.size; i++) {
      result.elements[i] = this.elements[i] && other.elements[i];
    }
    return result;
  }

  // Разность множеств
  difference(other: BooleanSet): BooleanSet {
    if (this.size !== other.size) {
      throw new Error("Множества должны иметь одинаковый размер");
    }

    const result = new BooleanSet(this.size);
    for (let i = 1; i <= this.size; i++) {
      result.elements[i] = this.elements[i] && !other.elements[i];
    }
    return result;
  }

  // Проверка на подмножество
  isSubset(other: BooleanSet): boolean {
    if (this.size !== other.size) {
      throw new Error("Множества должны иметь одинаковый размер");
    }

    for (let i = 1; i <= this.size; i++) {
      if (this.elements[i] && !other.elements[i]) {
        return false;
      }
    }
    return true;
  }

  toString(): string {
    const elements = this.getAll();
    return `{${elements.join(", ")}}`;
  }
}

// Реализация 2: Битовый вектор (использует тип number для битовых операций)
export class BitVectorSet {
  private size: number;
  private bits: number[]; // Массив чисел, каждое число хранит 32 бита

  constructor(n: number) {
    if (n <= 0) {
      throw new Error("Размер множества должен быть положительным");
    }
    this.size = n;
    // Вычисляем сколько чисел нужно для хранения n битов
    const arraySize = Math.ceil((n + 1) / 32); // +1 потому что элементы 1..n
    this.bits = new Array<number>(arraySize).fill(0);
  }

  // Добавление элемента
  add(element: number): void {
    if (element < 1 || element > this.size) {
      throw new Error(`Элемент должен быть в диапазоне 1..${this.size}`);
    }
    const index = Math.floor(element / 32);
    const bit = element % 32;
    this.bits[index] |= 1 << bit;
  }

  // Удаление элемента
  remove(element: number): void {
    if (element < 1 || element > this.size) {
      throw new Error(`Элемент должен быть в диапазоне 1..${this.size}`);
    }
    const index = Math.floor(element / 32);
    const bit = element % 32;
    this.bits[index] &= ~(1 << bit);
  }

  // Проверка наличия элемента
  has(element: number): boolean {
    if (element < 1 || element > this.size) {
      return false;
    }
    const index = Math.floor(element / 32);
    const bit = element % 32;
    return (this.bits[index] & (1 << bit)) !== 0;
  }

  // Получение всех элементов множества
  getAll(): number[] {
    const result: number[] = [];
    for (let i = 1; i <= this.size; i++) {
      if (this.has(i)) {
        result.push(i);
      }
    }
    return result;
  }

  // Очистка множества
  clear(): void {
    this.bits.fill(0);
  }

  // Проверка на пустоту
  isEmpty(): boolean {
    for (const num of this.bits) {
      if (num !== 0) {
        return false;
      }
    }
    return true;
  }

  // Мощность множества (подсчет битов)
  cardinality(): number {
    let count = 0;
    for (const num of this.bits) {
      // Быстрый подсчет установленных битов в числе
      let n = num;
      while (n !== 0) {
        n &= n - 1; // Убираем младший установленный бит
        count++;
      }
    }
    return count;
  }

  toString(): string {
    const elements = this.getAll();
    return `{${elements.join(", ")}}`;
  }
}

// Реализация 3: Список элементов (эффективен для разреженных множеств)
export class ListSet {
  private size: number;
  private elements: number[];

  constructor(n: number) {
    if (n <= 0) {
      throw new Error("Размер множества должен быть положительным");
    }
    this.size = n;
    this.elements = [];
  }

  // Добавление элемента (сохраняем отсортированность)
  add(element: number): void {
    if (element < 1 || element > this.size) {
      throw new Error(`Элемент должен быть в диапазоне 1..${this.size}`);
    }

    if (!this.has(element)) {
      // Вставляем в отсортированном порядке
      let i = 0;
      while (i < this.elements.length && this.elements[i] < element) {
        i++;
      }
      this.elements.splice(i, 0, element);
    }
  }

  // Удаление элемента
  remove(element: number): void {
    if (element < 1 || element > this.size) {
      throw new Error(`Элемент должен быть в диапазоне 1..${this.size}`);
    }

    const index = this.elements.indexOf(element);
    if (index !== -1) {
      this.elements.splice(index, 1);
    }
  }

  // Проверка наличия элемента (бинарный поиск)
  has(element: number): boolean {
    if (element < 1 || element > this.size) {
      return false;
    }

    let left = 0;
    let right = this.elements.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.elements[mid] === element) {
        return true;
      } else if (this.elements[mid] < element) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return false;
  }

  // Получение всех элементов множества
  getAll(): number[] {
    return [...this.elements];
  }

  // Очистка множества
  clear(): void {
    this.elements = [];
  }

  // Проверка на пустоту
  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  // Мощность множества
  cardinality(): number {
    return this.elements.length;
  }

  // Объединение множеств
  union(other: ListSet): ListSet {
    if (this.size !== other.size) {
      throw new Error("Множества должны иметь одинаковый размер");
    }

    const result = new ListSet(this.size);
    let i = 0,
      j = 0;

    while (i < this.elements.length && j < other.elements.length) {
      if (this.elements[i] < other.elements[j]) {
        result.add(this.elements[i]);
        i++;
      } else if (this.elements[i] > other.elements[j]) {
        result.add(other.elements[j]);
        j++;
      } else {
        result.add(this.elements[i]);
        i++;
        j++;
      }
    }

    while (i < this.elements.length) {
      result.add(this.elements[i]);
      i++;
    }

    while (j < other.elements.length) {
      result.add(other.elements[j]);
      j++;
    }

    return result;
  }

  // Пересечение множеств
  intersection(other: ListSet): ListSet {
    if (this.size !== other.size) {
      throw new Error("Множества должны иметь одинаковый размер");
    }

    const result = new ListSet(this.size);
    let i = 0,
      j = 0;

    while (i < this.elements.length && j < other.elements.length) {
      if (this.elements[i] < other.elements[j]) {
        i++;
      } else if (this.elements[i] > other.elements[j]) {
        j++;
      } else {
        result.add(this.elements[i]);
        i++;
        j++;
      }
    }

    return result;
  }

  toString(): string {
    return `{${this.elements.join(", ")}}`;
  }
}

// Тестирование различных реализаций множеств
export function testSets(): void {
  console.log(
    "=== Тестирование способов хранения подмножеств множества {1..n} ==="
  );

  const n = 10;

  // Тестирование BooleanSet
  console.log("\n1. BooleanSet (булев массив):");
  const boolSet = new BooleanSet(n);

  boolSet.add(3);
  boolSet.add(5);
  boolSet.add(7);

  console.log(`   Добавили 3, 5, 7: ${boolSet.toString()}`);
  console.log(`   Имеет 5: ${boolSet.has(5)}`);
  console.log(`   Имеет 6: ${boolSet.has(6)}`);
  console.log(`   Мощность: ${boolSet.cardinality()}`);

  boolSet.remove(5);
  console.log(`   Удалили 5: ${boolSet.toString()}`);

  // Тестирование BitVectorSet
  console.log("\n2. BitVectorSet (битовый вектор):");
  const bitSet = new BitVectorSet(n);

  bitSet.add(2);
  bitSet.add(4);
  bitSet.add(6);
  bitSet.add(8);

  console.log(`   Добавили 2, 4, 6, 8: ${bitSet.toString()}`);
  console.log(`   Имеет 4: ${bitSet.has(4)}`);
  console.log(`   Имеет 5: ${bitSet.has(5)}`);
  console.log(`   Мощность: ${bitSet.cardinality()}`);

  bitSet.remove(4);
  console.log(`   Удалили 4: ${bitSet.toString()}`);

  // Тестирование ListSet
  console.log("\n3. ListSet (список элементов):");
  const listSet = new ListSet(n);

  listSet.add(1);
  listSet.add(3);
  listSet.add(5);
  listSet.add(7);
  listSet.add(9);

  console.log(`   Добавили 1, 3, 5, 7, 9: ${listSet.toString()}`);
  console.log(`   Имеет 5: ${listSet.has(5)}`);
  console.log(`   Имеет 6: ${listSet.has(6)}`);
  console.log(`   Мощность: ${listSet.cardinality()}`);

  listSet.remove(5);
  console.log(`   Удалили 5: ${listSet.toString()}`);

  // Сравнение операций над множествами
  console.log("\n4. Операции над множествами:");

  const setA = new BooleanSet(n);
  setA.add(1);
  setA.add(2);
  setA.add(3);
  setA.add(4);

  const setB = new BooleanSet(n);
  setB.add(3);
  setB.add(4);
  setB.add(5);
  setB.add(6);

  console.log(`   A = ${setA.toString()}`);
  console.log(`   B = ${setB.toString()}`);
  console.log(`   A ∪ B = ${setA.union(setB).toString()}`);
  console.log(`   A ∩ B = ${setA.intersection(setB).toString()}`);
  console.log(`   A \\ B = ${setA.difference(setB).toString()}`);
  console.log(`   A ⊆ B: ${setA.isSubset(setB)}`);

  // Анализ использования памяти
  console.log("\n5. Анализ использования памяти при n = 1000:");
  console.log("   BooleanSet: массив из 1001 boolean ≈ 1KB");
  console.log(
    "   BitVectorSet: массив из 32 чисел (32*32=1024 бита) ≈ 128 байт"
  );
  console.log("   ListSet: зависит от количества элементов в множестве");

  // Производительность основных операций
  console.log("\n6. Сложность операций:");
  console.log(
    "   BooleanSet: has/add/remove = O(1), union/intersection = O(n)"
  );
  console.log(
    "   BitVectorSet: has/add/remove = O(1), но с битовыми операциями"
  );
  console.log(
    "   ListSet: has = O(log m), add/remove = O(m), где m = мощность множества"
  );
}

// Функция для демонстрации различных сценариев использования
export function demonstrateSetScenarios(): void {
  console.log("\n=== Демонстрация различных сценариев использования ===");

  // Сценарий 1: Плотное множество (большинство элементов присутствует)
  console.log(
    "\nСценарий 1: Плотное множество (n=100, заполнено 80 элементов)"
  );

  const denseSet = new BooleanSet(100);
  for (let i = 1; i <= 80; i++) {
    denseSet.add(i);
  }
  console.log(`   BooleanSet: эффективно, память O(n) = 101 boolean`);
  console.log(`   BitVectorSet: эффективно, память ~32 байта`);
  console.log(`   ListSet: неэффективно, хранит 80 элементов`);

  // Сценарий 2: Разреженное множество (немного элементов)
  console.log(
    "\nСценарий 2: Разреженное множество (n=1000, всего 5 элементов)"
  );

  const sparseSet = new ListSet(1000);
  sparseSet.add(100);
  sparseSet.add(200);
  sparseSet.add(300);
  sparseSet.add(400);
  sparseSet.add(500);

  console.log(
    `   BooleanSet: неэффективно, память 1001 boolean, но только 5 true`
  );
  console.log(`   BitVectorSet: умеренно, память ~128 байт`);
  console.log(`   ListSet: эффективно, хранит только 5 элементов`);

  // Сценарий 3: Частые операции проверки принадлежности
  console.log("\nСценарий 3: Частые операции has()");
  console.log(`   BooleanSet: O(1) - лучший выбор`);
  console.log(`   BitVectorSet: O(1) - хороший выбор`);
  console.log(`   ListSet: O(log m) - медленнее при больших m`);
}

// Сравнение производительности
export function benchmarkSets(): void {
  console.log("\n=== Сравнение производительности ===");

  const n = 10000;
  const iterations = 100000;

  console.log(`Параметры: n=${n}, итераций=${iterations}`);

  // BooleanSet
  console.log("\nBooleanSet:");
  const boolSet = new BooleanSet(n);
  let start = Date.now();

  for (let i = 0; i < iterations; i++) {
    const element = Math.floor(Math.random() * n) + 1;
    if (Math.random() > 0.5) {
      boolSet.add(element);
    } else {
      boolSet.has(element);
    }
  }

  let end = Date.now();
  console.log(`   Время: ${end - start} мс`);

  // BitVectorSet
  console.log("\nBitVectorSet:");
  const bitSet = new BitVectorSet(n);
  start = Date.now();

  for (let i = 0; i < iterations; i++) {
    const element = Math.floor(Math.random() * n) + 1;
    if (Math.random() > 0.5) {
      bitSet.add(element);
    } else {
      bitSet.has(element);
    }
  }

  end = Date.now();
  console.log(`   Время: ${end - start} мс`);

  // ListSet (только для малых мощностей)
  console.log("\nListSet (разреженное множество, m≈100):");
  const listSet = new ListSet(n);
  start = Date.now();

  for (let i = 0; i < iterations; i++) {
    const element = Math.floor(Math.random() * n) + 1;
    if (Math.random() > 0.01) {
      // Только 1% добавлений для разреженности
      listSet.has(element);
    } else {
      listSet.add(element);
    }
  }

  end = Date.now();
  console.log(`   Время: ${end - start} мс`);
}
