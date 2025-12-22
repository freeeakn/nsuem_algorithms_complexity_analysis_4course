/*
14.1.2. Составьте программу, определяющую, содержится ли эле-
мент t:T в упорядоченном дереве (хранимом так, как только что опи-
сано).
*/

class ArrayBinaryTree<T> {
  private val: T[] = []; // массив значений
  private left: number[] = []; // массив индексов левых потомков
  private right: number[] = []; // массив индексов правых потомков
  private root: number | null = null; // индекс корня или null если дерево пустое

  /**
   * Проверяет, содержится ли элемент в дереве (итеративная версия)
   * @param t - искомый элемент
   * @returns true, если элемент найден
   */
  containsIterative(t: T): boolean {
    if (this.root === null) {
      return false; // дерево пустое
    }

    let x: number = this.root; // начинаем с корня

    // Инвариант: остаётся проверить наличие t в непустом поддереве с корнем x
    while (
      (this.compare(t, this.val[x]) < 0 && this.left[x] !== null) ||
      (this.compare(t, this.val[x]) > 0 && this.right[x] !== null)
    ) {
      if (this.compare(t, this.val[x]) < 0) {
        // left[x] !== null гарантируется условием цикла
        x = this.left[x]!;
      } else {
        // t > val[x], right[x] !== null гарантируется условием цикла
        x = this.right[x]!;
      }
    }

    // Либо t = val[x], либо t отсутствует в дереве
    return this.compare(t, this.val[x]) === 0;
  }

  /**
   * Упрощённая версия поиска
   */
  contains(t: T): boolean {
    if (this.root === null) return false;

    let current = this.root;

    while (true) {
      const cmp = this.compare(t, this.val[current]);

      if (cmp === 0) {
        return true; // нашли элемент
      } else if (cmp < 0) {
        if (this.left[current] === null) {
          return false; // элемента нет
        }
        current = this.left[current]!;
      } else {
        if (this.right[current] === null) {
          return false; // элемента нет
        }
        current = this.right[current]!;
      }
    }
  }

  /**
   * Добавляет элемент в дерево
   * @param t - элемент для добавления
   */
  insert(t: T): void {
    const newNodeIndex = this.val.length;
    this.val.push(t);
    this.left.push(null);
    this.right.push(null);

    if (this.root === null) {
      this.root = newNodeIndex;
      return;
    }

    let current = this.root;
    while (true) {
      const cmp = this.compare(t, this.val[current]);

      if (cmp === 0) {
        // Элемент уже существует - ничего не делаем
        return;
      } else if (cmp < 0) {
        if (this.left[current] === null) {
          this.left[current] = newNodeIndex;
          break;
        }
        current = this.left[current]!;
      } else {
        if (this.right[current] === null) {
          this.right[current] = newNodeIndex;
          break;
        }
        current = this.right[current]!;
      }
    }
  }

  /**
   * Рекурсивная версия поиска для сравнения
   */
  containsRecursive(t: T): boolean {
    return this.searchRecursive(this.root, t);
  }

  private searchRecursive(node: number | null, t: T): boolean {
    if (node === null) return false;

    const cmp = this.compare(t, this.val[node]);
    if (cmp === 0) return true;

    if (cmp < 0) {
      return this.searchRecursive(this.left[node], t);
    } else {
      return this.searchRecursive(this.right[node], t);
    }
  }

  /**
   * Обход дерева в порядке возрастания
   */
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: number | null, result: T[]): void {
    if (node !== null) {
      this.inOrder(this.left[node], result);
      result.push(this.val[node]);
      this.inOrder(this.right[node], result);
    }
  }

  /**
   * Сравнивает два элемента
   * Для чисел работает как обычное сравнение
   * Для строк - лексикографическое сравнение
   * Можно переопределить для других типов
   */
  private compare(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  /**
   * Возвращает размер дерева
   */
  get size(): number {
    return this.val.length;
  }

  /**
   * Проверяет, пусто ли дерево
   */
  isEmpty(): boolean {
    return this.root === null;
  }
}

// Пример использования с числами
console.log("=== Пример с числами ===");
const tree = new ArrayBinaryTree<number>();

tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

console.log("Обход дерева:", tree.inOrderTraversal());
console.log("Содержит 7?", tree.contains(7)); // true
console.log("Содержит 12?", tree.contains(12)); // true
console.log("Содержит 20?", tree.contains(20)); // false
console.log("Итеративный поиск 7?", tree.containsIterative(7)); // true
console.log("Рекурсивный поиск 7?", tree.containsRecursive(7)); // true

// Пример со строками
console.log("\n=== Пример со строками ===");
const stringTree = new ArrayBinaryTree<string>();
stringTree.insert("apple");
stringTree.insert("banana");
stringTree.insert("cherry");
stringTree.insert("date");

console.log("Обход строкового дерева:", stringTree.inOrderTraversal());
console.log("Содержит 'banana'?", stringTree.contains("banana")); // true
console.log("Содержит 'grape'?", stringTree.contains("grape")); // false
