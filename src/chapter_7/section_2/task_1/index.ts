export class BinaryTreeNode {
  value: number;
  left: BinaryTreeNode | null = null;
  right: BinaryTreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export function buildBinaryTreeFromLR(
  N: number,
  root: number,
  L: number[],
  R: number[]
): BinaryTreeNode | null {
  // Проверка входных данных
  if (N <= 0 || root < 1 || root > N) {
    throw new Error("Некорректные параметры");
  }

  if (L.length !== N + 1 || R.length !== N + 1) {
    throw new Error("Массивы L и R должны иметь размер N+1 (индексация с 1)");
  }

  // Создаем массив для хранения узлов
  const nodes: (BinaryTreeNode | null)[] = new Array(N + 1).fill(null);

  // Создаем все узлы
  for (let i = 1; i <= N; i++) {
    nodes[i] = new BinaryTreeNode(i);
  }

  // Строим связи между узлами
  for (let i = 1; i <= N; i++) {
    const node = nodes[i]!;

    if (L[i] !== 0) {
      if (L[i] < 1 || L[i] > N) {
        throw new Error(`Некорректный индекс левого ребенка: ${L[i]}`);
      }
      node.left = nodes[L[i]];
    }

    if (R[i] !== 0) {
      if (R[i] < 1 || R[i] > N) {
        throw new Error(`Некорректный индекс правого ребенка: ${R[i]}`);
      }
      node.right = nodes[R[i]];
    }
  }

  return nodes[root];
}

export function drawTreeASCII(root: BinaryTreeNode | null): string {
  if (!root) {
    return "(пустое дерево)";
  }

  const lines: string[] = [];

  function buildTreeStructure(
    node: BinaryTreeNode | null,
    prefix: string = "",
    isLeft: boolean = false
  ): void {
    if (!node) return;

    lines.push(prefix + (isLeft ? "├── " : "└── ") + node.value);

    const newPrefix = prefix + (isLeft ? "│   " : "    ");

    // Сначала правый, потом левый для правильной ориентации
    if (node.right) {
      buildTreeStructure(node.right, newPrefix, false);
    }
    if (node.left) {
      buildTreeStructure(node.left, newPrefix, true);
    }
  }

  buildTreeStructure(root);
  return lines.join("\n");
}

export function drawTreeVertical(root: BinaryTreeNode | null): string {
  if (!root) {
    return "(пустое дерево)";
  }

  const lines: string[][] = [];
  const WIDTH = 3;

  function getHeight(node: BinaryTreeNode | null): number {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }

  function fill(
    node: BinaryTreeNode | null,
    level: number,
    left: number,
    right: number
  ): void {
    if (!node) return;

    const mid = Math.floor((left + right) / 2);

    if (!lines[level]) {
      lines[level] = new Array(right + 1).fill("   ");
    }

    lines[level][mid] = node.value.toString().padStart(WIDTH, " ");

    fill(node.left, level + 1, left, mid - 1);
    fill(node.right, level + 1, mid + 1, right);
  }

  const height = getHeight(root);
  const width = Math.pow(2, height) - 1;

  for (let i = 0; i < height; i++) {
    lines[i] = new Array(width).fill("   ");
  }

  fill(root, 0, 0, width - 1);

  return lines.map((line) => line.join("")).join("\n");
}

export function treeToObject(node: BinaryTreeNode | null): any {
  if (!node) return null;

  return {
    value: node.value,
    left: treeToObject(node.left),
    right: treeToObject(node.right),
  };
}

export function testBuildTree(): void {
  console.log("=== Построение дерева из массивов L и R ===");

  const N = 7;
  const root = 3;
  const L = [0, 0, 0, 1, 0, 6, 0, 7]; // Индексация с 1: L[1]=0, L[2]=0, L[3]=1, ...
  const R = [0, 0, 0, 5, 3, 2, 0, 7]; // Индексация с 1: R[1]=0, R[2]=0, R[3]=5, ...

  console.log("Параметры:");
  console.log(`N = ${N}, root = ${root}`);
  console.log("L массив (индексы левых детей):", L.slice(1));
  console.log("R массив (индексы правых детей):", R.slice(1));

  console.log("\nМассивы в виде таблицы:");
  console.log("i  | 1 | 2 | 3 | 4 | 5 | 6 | 7");
  console.log("L[i]| 0 | 0 | 1 | 0 | 6 | 0 | 7");
  console.log("R[i]| 0 | 0 | 5 | 3 | 2 | 0 | 7");

  try {
    const tree = buildBinaryTreeFromLR(N, root, L, R);

    console.log("\nДерево в ASCII формате:");
    console.log(drawTreeASCII(tree));

    console.log("\nДерево в вертикальном формате:");
    console.log(drawTreeVertical(tree));

    console.log("\nСтруктура дерева в формате JSON:");
    console.log(JSON.stringify(treeToObject(tree), null, 2));

    console.log("\nПояснение структуры:");
    console.log("Корень: 3");
    console.log("Левый ребенок 3: 1 (L[3] = 1)");
    console.log("Правый ребенок 3: 5 (R[3] = 5)");
    console.log("Левый ребенок 5: 6 (L[5] = 6)");
    console.log("Правый ребенок 5: 2 (R[5] = 2)");
    console.log("Левый ребенок 6: 7 (L[6] = 7)");
    console.log("Правый ребенок 6: 0 (нет ребенка)");
    console.log("Левый ребенок 7: 0 (нет ребенка)");
    console.log("Правый ребенок 7: 7 (R[7] = 7) - цикл!");

    console.log("\n⚠️ ВНИМАНИЕ: В дереве обнаружен цикл!");
    console.log("Узел 7 ссылается сам на себя (R[7] = 7)");
    console.log("Это делает дерево некорректным (не ацикличным)");
  } catch (error: any) {
    console.log("Ошибка:", error.message);
  }
}

export function testValidTree(): void {
  console.log("\n=== Пример корректного дерева ===");

  // Корректное бинарное дерево без циклов
  const N = 7;
  const root = 1;
  const L = [0, 2, 4, 6, 0, 0, 0, 0]; // L[1]=2, L[2]=4, L[3]=6, остальные 0
  const R = [0, 3, 5, 7, 0, 0, 0, 0]; // R[1]=3, R[2]=5, R[3]=7, остальные 0

  console.log("Корректное бинарное дерево:");
  console.log("L:", L.slice(1));
  console.log("R:", R.slice(1));

  const tree = buildBinaryTreeFromLR(N, root, L, R);
  console.log("\nДерево:");
  console.log(drawTreeASCII(tree));
}
