/*
13.1.2. Напишите программы проверки принадлежности, добавления и удаления. Составьте программу, определяющую, содержится ли элемент t:T в упорядоченном дереве (хранимом так, как только что описано).
Реализация BST: поиск (проверка принадлежности), вставка, удаление. Сложность O(h) = O(log n) в среднем.
*/

/**
 * Узел бинарного дерева поиска
 */
class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(
    val: T,
    left: TreeNode<T> | null = null,
    right: TreeNode<T> | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Класс бинарного дерева поиска
 */
class BinarySearchTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  /**
   * Проверяет, содержится ли элемент в дереве
   * @param val - искомое значение
   * @returns true, если элемент найден
   */
  contains(val: T): boolean {
    return this.searchRecursive(this.root, val);
  }

  private searchRecursive(node: TreeNode<T> | null, val: T): boolean {
    if (node === null) {
      return false;
    }
    if (node.val === val) {
      return true;
    }
    if (val < node.val) {
      return this.searchRecursive(node.left, val);
    }
    return this.searchRecursive(node.right, val);
  }

  /**
   * Добавляет элемент в дерево
   * @param val - значение для добавления
   */
  insert(val: T): void {
    this.root = this.insertRecursive(this.root, val);
  }

  private insertRecursive(node: TreeNode<T> | null, val: T): TreeNode<T> {
    if (node === null) {
      return new TreeNode(val);
    }
    if (val < node.val) {
      node.left = this.insertRecursive(node.left, val);
    } else if (val > node.val) {
      node.right = this.insertRecursive(node.right, val);
    }
    // Если val === node.val, элемент уже существует - ничего не делаем
    return node;
  }

  /**
   * Удаляет элемент из дерева
   * @param val - значение для удаления
   */
  remove(val: T): void {
    this.root = this.removeRecursive(this.root, val);
  }

  private removeRecursive(
    node: TreeNode<T> | null,
    val: T
  ): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    if (val < node.val) {
      node.left = this.removeRecursive(node.left, val);
    } else if (val > node.val) {
      node.right = this.removeRecursive(node.right, val);
    } else {
      // Нашли узел для удаления
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      // У узла есть оба потомка
      // Находим минимальный элемент в правом поддереве
      let minNode = node.right;
      while (minNode.left !== null) {
        minNode = minNode.left;
      }

      // Копируем значение минимального узла
      node.val = minNode.val;

      // Удаляем минимальный узел из правого поддерева
      node.right = this.removeRecursive(node.right, minNode.val);
    }

    return node;
  }

  /**
   * Обход дерева в порядке возрастания (in-order)
   * @returns массив значений в отсортированном порядке
   */
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrderRecursive(this.root, result);
    return result;
  }

  private inOrderRecursive(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrderRecursive(node.left, result);
      result.push(node.val);
      this.inOrderRecursive(node.right, result);
    }
  }

  /**
   * Проверяет, является ли дерево пустым
   */
  isEmpty(): boolean {
    return this.root === null;
  }

  /**
   * Очищает дерево
   */
  clear(): void {
    this.root = null;
  }
}

/**
 * Альтернативная версия с дженериками и компаратором для сложных типов
 */
class ComparableBinarySearchTree<T> {
  private root: TreeNode<T> | null;
  private comparator: (a: T, b: T) => number;

  constructor(
    comparator: (a: T, b: T) => number = (a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
  ) {
    this.root = null;
    this.comparator = comparator;
  }

  search(val: T): boolean {
    return this.searchNode(this.root, val);
  }

  private searchNode(node: TreeNode<T> | null, val: T): boolean {
    if (node === null) return false;

    const cmp = this.comparator(val, node.val);
    if (cmp === 0) return true;
    if (cmp < 0) return this.searchNode(node.left, val);
    return this.searchNode(node.right, val);
  }

  insert(val: T): void {
    this.root = this.insertNode(this.root, val);
  }

  private insertNode(node: TreeNode<T> | null, val: T): TreeNode<T> {
    if (node === null) return new TreeNode(val);

    const cmp = this.comparator(val, node.val);
    if (cmp < 0) {
      node.left = this.insertNode(node.left, val);
    } else if (cmp > 0) {
      node.right = this.insertNode(node.right, val);
    }
    return node;
  }

  delete(val: T): void {
    this.root = this.deleteNode(this.root, val);
  }

  private deleteNode(node: TreeNode<T> | null, val: T): TreeNode<T> | null {
    if (node === null) return null;

    const cmp = this.comparator(val, node.val);
    if (cmp < 0) {
      node.left = this.deleteNode(node.left, val);
    } else if (cmp > 0) {
      node.right = this.deleteNode(node.right, val);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let minNode = node.right;
      while (minNode.left !== null) {
        minNode = minNode.left;
      }
      node.val = minNode.val;
      node.right = this.deleteNode(node.right, minNode.val);
    }
    return node;
  }
}

// Пример использования:
const bst = new BinarySearchTree<number>();

// Добавление элементов
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

// Проверка принадлежности
console.log(bst.contains(7)); // true
console.log(bst.contains(12)); // false

// Обход дерева
console.log(bst.inOrderTraversal()); // [3, 5, 7, 10, 15]

// Удаление элемента
bst.remove(5);
console.log(bst.contains(5)); // false
console.log(bst.inOrderTraversal()); // [3, 7, 10, 15]

// Пример с пользовательским типом
interface Person {
  id: number;
  name: string;
}

const personTree = new ComparableBinarySearchTree<Person>(
  (a, b) => a.id - b.id
);

personTree.insert({ id: 3, name: "Alice" });
personTree.insert({ id: 1, name: "Bob" });
personTree.insert({ id: 2, name: "Charlie" });

console.log(personTree.search({ id: 2, name: "Charlie" })); // true
console.log(personTree.search({ id: 4, name: "David" })); // false
