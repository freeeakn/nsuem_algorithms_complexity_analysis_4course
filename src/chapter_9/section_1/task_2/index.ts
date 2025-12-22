/*
9.1.2. Найдите наименьшую стоимость проезда из 1-го города во
все остальные за время 𝑂(n3).
*/

// Алгоритм Форда-Беллмана для поиска кратчайших путей из одной вершины во все остальные
export class Graph {
  private n: number; // Количество вершин
  private adjMatrix: number[][]; // Матрица смежности (a[i][j] - стоимость из i в j)

  constructor(n: number) {
    this.n = n;
    // Инициализируем матрицу смежности
    this.adjMatrix = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
      this.adjMatrix[i] = new Array(n + 1).fill(Infinity);
      this.adjMatrix[i][i] = 0; // Расстояние от вершины до самой себя = 0
    }
  }

  // Добавить ребро от u к v с весом w
  addEdge(u: number, v: number, w: number): void {
    if (u < 1 || u > this.n || v < 1 || v > this.n) {
      throw new Error(`Вершины должны быть в диапазоне 1..${this.n}`);
    }
    this.adjMatrix[u][v] = w;
  }

  // Инициализировать матрицу смежности
  initializeMatrix(matrix: number[][]): void {
    if (matrix.length !== this.n + 1 || matrix[0].length !== this.n + 1) {
      throw new Error("Матрица должна иметь размер (n+1) x (n+1)");
    }
    this.adjMatrix = matrix.map((row) => [...row]);
  }

  // Алгоритм Форда-Беллмана (O(n³))
  fordBellman(start: number = 1): {
    distances: number[];
    predecessors: number[];
  } {
    if (start < 1 || start > this.n) {
      throw new Error(`Стартовая вершина должна быть в диапазоне 1..${this.n}`);
    }

    // Инициализация
    const distances: number[] = new Array(this.n + 1).fill(Infinity);
    const predecessors: number[] = new Array(this.n + 1).fill(-1);

    distances[start] = 0;

    // Основной цикл (k = 1..n-1)
    for (let k = 1; k < this.n; k++) {
      // Создаем копию distances на текущей итерации
      const newDistances = [...distances];

      // Для каждой вершины s
      for (let s = 1; s <= this.n; s++) {
        // Пытаемся улучшить расстояние до s
        for (let i = 1; i <= this.n; i++) {
          // Если есть путь из i в s и мы можем улучшить расстояние до s
          if (distances[i] !== Infinity && this.adjMatrix[i][s] !== Infinity) {
            const newDist = distances[i] + this.adjMatrix[i][s];
            if (newDist < newDistances[s]) {
              newDistances[s] = newDist;
              predecessors[s] = i;
            }
          }
        }
      }

      // Копируем новые расстояния
      for (let i = 1; i <= this.n; i++) {
        distances[i] = newDistances[i];
      }
    }

    // Проверка на отрицательные циклы (дополнительная итерация)
    const hasNegativeCycle = this.checkNegativeCycle(distances);

    return { distances, predecessors };
  }

  // Проверка на наличие отрицательных циклов
  private checkNegativeCycle(distances: number[]): boolean {
    for (let i = 1; i <= this.n; i++) {
      for (let j = 1; j <= this.n; j++) {
        if (distances[i] !== Infinity && this.adjMatrix[i][j] !== Infinity) {
          if (distances[i] + this.adjMatrix[i][j] < distances[j]) {
            console.log("⚠️ Обнаружен отрицательный цикл!");
            return true;
          }
        }
      }
    }
    return false;
  }

  // Восстановление пути из start в end
  reconstructPath(
    start: number,
    end: number,
    predecessors: number[]
  ): number[] {
    if (start < 1 || start > this.n || end < 1 || end > this.n) {
      throw new Error(`Вершины должны быть в диапазоне 1..${this.n}`);
    }

    const path: number[] = [];
    let current = end;

    // Восстанавливаем путь от end к start
    while (current !== -1 && current !== start) {
      path.unshift(current);
      current = predecessors[current];
      if (current === 0) break; // Защита от бесконечного цикла
    }

    if (current === start) {
      path.unshift(start);
      return path;
    } else {
      return []; // Путь не существует
    }
  }

  // Получить матрицу смежности в виде строки
  toString(): string {
    let result = "Матрица смежности графа:\n";
    result += "    ";
    for (let j = 1; j <= this.n; j++) {
      result += j.toString().padStart(4, " ");
    }
    result += "\n";

    for (let i = 1; i <= this.n; i++) {
      result += i.toString().padStart(3, " ") + " |";
      for (let j = 1; j <= this.n; j++) {
        const value = this.adjMatrix[i][j];
        if (value === Infinity) {
          result += " INF";
        } else {
          result += value.toString().padStart(4, " ");
        }
      }
      result += "\n";
    }
    return result;
  }
}

// Упрощенная версия алгоритма Форда-Беллмана (как в условии задачи)
export function fordBellmanSimple(
  n: number,
  start: number,
  a: number[][]
): number[] {
  // Инициализация
  const x: number[] = new Array(n + 1).fill(Infinity);
  const y: number[] = new Array(n + 1).fill(Infinity);

  x[start] = 0;

  let k = 1;
  // Инициализируем x[i] = a[start][i] (прямые рёбра из start)
  for (let i = 1; i <= n; i++) {
    x[i] = a[start][i];
  }

  // Основной цикл
  while (k < n) {
    for (let s = 1; s <= n; s++) {
      y[s] = x[s];

      // Пытаемся улучшить путь через промежуточную вершину i
      for (let i = 1; i <= n; i++) {
        if (x[i] !== Infinity && a[i][s] !== Infinity) {
          const candidate = x[i] + a[i][s];
          if (candidate < y[s]) {
            y[s] = candidate;
          }
        }
      }
    }

    // Копируем y в x
    for (let i = 1; i <= n; i++) {
      x[i] = y[i];
    }

    k++;
  }

  return x.slice(1); // Возвращаем без нулевого элемента
}

// Функция для тестирования
export function testFordBellman(): void {
  console.log("=== Алгоритм Форда-Беллмана для кратчайших путей ===");

  // Пример 1: Простой граф без отрицательных циклов
  console.log("\n1. Простой граф (n=4):");
  const graph1 = new Graph(4);

  // Задаём рёбра
  graph1.addEdge(1, 2, 1);
  graph1.addEdge(1, 3, 4);
  graph1.addEdge(2, 3, 2);
  graph1.addEdge(2, 4, 6);
  graph1.addEdge(3, 4, 3);
  graph1.addEdge(4, 1, 7);

  console.log(graph1.toString());

  const result1 = graph1.fordBellman(1);
  console.log("Кратчайшие расстояния из вершины 1:");
  for (let i = 1; i <= 4; i++) {
    const path = graph1.reconstructPath(1, i, result1.predecessors);
    console.log(
      `  До ${i}: ${result1.distances[i]}, путь: ${path.join(" → ")}`
    );
  }

  // Пример 2: Граф с отрицательными весами, но без отрицательных циклов
  console.log("\n2. Граф с отрицательными весами (n=5):");
  const graph2 = new Graph(5);

  // Задаём матрицу смежности (с отрицательными весами)
  const matrix2: number[][] = [
    [0, Infinity, Infinity, Infinity, Infinity, Infinity], // 0-я строка (не используется)
    [Infinity, 0, -1, 4, Infinity, Infinity], // 1 → 2: -1, 1 → 3: 4
    [Infinity, Infinity, 0, 3, 2, 2], // 2 → 3: 3, 2 → 4: 2, 2 → 5: 2
    [Infinity, Infinity, Infinity, 0, Infinity, Infinity], // 3 → ...
    [Infinity, Infinity, Infinity, 1, 0, 3], // 4 → 3: 1, 4 → 5: 3
    [Infinity, Infinity, Infinity, Infinity, -1, 0], // 5 → 4: -1
  ];

  graph2.initializeMatrix(matrix2);
  console.log(graph2.toString());

  const result2 = graph2.fordBellman(1);
  console.log("Кратчайшие расстояния из вершины 1:");
  for (let i = 1; i <= 5; i++) {
    const path = graph2.reconstructPath(1, i, result2.predecessors);
    console.log(
      `  До ${i}: ${result2.distances[i]}, путь: ${
        path.length > 0 ? path.join(" → ") : "нет пути"
      }`
    );
  }

  // Пример 3: Граф с отрицательным циклом
  console.log("\n3. Граф с отрицательным циклом (n=3):");
  const graph3 = new Graph(3);

  // Граф с отрицательным циклом 1→2→3→1
  graph3.addEdge(1, 2, 1);
  graph3.addEdge(2, 3, 1);
  graph3.addEdge(3, 1, -3); // Отрицательное ребро создаёт отрицательный цикл

  console.log(graph3.toString());

  try {
    const result3 = graph3.fordBellman(1);
    console.log("Кратчайшие расстояния из вершины 1:");
    for (let i = 1; i <= 3; i++) {
      console.log(`  До ${i}: ${result3.distances[i]}`);
    }
  } catch (error: any) {
    console.log("Ошибка:", error.message);
  }

  // Пример 4: Использование упрощенной версии алгоритма
  console.log("\n4. Упрощенная версия алгоритма (n=4):");
  const n = 4;
  const a: number[][] = [
    [0, Infinity, Infinity, Infinity, Infinity],
    [Infinity, 0, 1, 4, Infinity],
    [Infinity, Infinity, 0, 2, 6],
    [Infinity, Infinity, Infinity, 0, 3],
    [Infinity, 7, Infinity, Infinity, 0],
  ];

  const distances = fordBellmanSimple(n, 1, a);
  console.log("Кратчайшие расстояния из вершины 1:");
  for (let i = 0; i < n; i++) {
    console.log(
      `  До ${i + 1}: ${distances[i] === Infinity ? "∞" : distances[i]}`
    );
  }
}

// Анализ сложности алгоритма
export function analyzeComplexity(): void {
  console.log("\n=== Анализ сложности алгоритма Форда-Беллмана ===");

  console.log("Псевдокод из условия задачи:");
  console.log("  k := 1;");
  console.log("  for i := 1 to n do x[i] := a[1][i];");
  console.log("  while k <> n do begin");
  console.log("    for s := 1 to n do begin");
  console.log("      y[s] := x[s];");
  console.log("      for i := 1 to n do begin");
  console.log("        if y[s] > x[i] + a[i][s] then y[s] := x[i] + a[i][s];");
  console.log("      end");
  console.log("    end");
  console.log("    for i := 1 to n do x[s] := y[s];");
  console.log("    k := k + 1;");
  console.log("  end;");

  console.log("\nАнализ сложности:");
  console.log("  1. Внешний цикл: while k <> n → выполняется n-1 раз");
  console.log("  2. Внутренний цикл: for s := 1 to n → выполняется n раз");
  console.log(
    "  3. Самый внутренний цикл: for i := 1 to n → выполняется n раз"
  );
  console.log("  Итого: (n-1) * n * n = O(n³) операций");

  console.log("\nПояснение формулы МинСт(1,s,k+1):");
  console.log(
    "  МинСт(1,s,k+1) = min(МинСт(1,s,k), min_{i=1..n}(МинСт(1,i,k) + a[i][s]))"
  );
  console.log("  Где:");
  console.log(
    "    - МинСт(1,s,k) - кратчайший путь из 1 в s не более чем с k рёбрами"
  );
  console.log(
    "    - МинСт(1,i,k) + a[i][s] - путь через промежуточную вершину i"
  );
  console.log("    - min берётся по всем возможным промежуточным вершинам i");

  console.log("\nИнвариант цикла:");
  console.log("  После k итераций: x[i] = МинСт(1,i,k)");
  console.log("  В начале: x[i] = a[1][i] = МинСт(1,i,1) (прямые рёбра)");
  console.log("  После n-1 итераций: x[i] = МинСт(1,i,n) (искомый ответ)");
}

// Демонстрация работы алгоритма по шагам
export function demonstrateStepByStep(): void {
  console.log("\n=== Пошаговая демонстрация алгоритма (n=3) ===");

  const n = 3;
  const start = 1;

  // Матрица смежности
  const a: number[][] = [
    [0, Infinity, Infinity, Infinity], // 0-я строка
    [Infinity, 0, 2, 4], // 1 → 2: 2, 1 → 3: 4
    [Infinity, Infinity, 0, 1], // 2 → 3: 1
    [Infinity, 3, Infinity, 0], // 3 → 1: 3
  ];

  console.log("Матрица смежности:");
  console.log("    1   2   3");
  for (let i = 1; i <= n; i++) {
    let row = `${i} |`;
    for (let j = 1; j <= n; j++) {
      row += a[i][j] === Infinity ? " ∞ " : a[i][j].toString().padStart(3, " ");
    }
    console.log(row);
  }

  console.log("\nШаг 1: Инициализация (k=1)");
  const x: number[] = new Array(n + 1).fill(Infinity);
  x[start] = 0;

  // x[i] = a[1][i]
  for (let i = 1; i <= n; i++) {
    x[i] = a[1][i];
  }

  console.log(
    "x =",
    x.slice(1).map((v) => (v === Infinity ? "∞" : v))
  );

  console.log("\nШаг 2: Итерация k=2");
  const y: number[] = new Array(n + 1).fill(Infinity);

  for (let s = 1; s <= n; s++) {
    y[s] = x[s];

    for (let i = 1; i <= n; i++) {
      if (x[i] !== Infinity && a[i][s] !== Infinity) {
        const candidate = x[i] + a[i][s];
        if (candidate < y[s]) {
          y[s] = candidate;
          console.log(`  Улучшили путь до ${s} через ${i}: ${candidate}`);
        }
      }
    }
  }

  // Копируем y в x
  for (let i = 1; i <= n; i++) {
    x[i] = y[i];
  }

  console.log(
    "x =",
    x.slice(1).map((v) => (v === Infinity ? "∞" : v))
  );

  console.log("\nШаг 3: Итерация k=3 (n=3, значит последняя)");
  for (let s = 1; s <= n; s++) {
    y[s] = x[s];

    for (let i = 1; i <= n; i++) {
      if (x[i] !== Infinity && a[i][s] !== Infinity) {
        const candidate = x[i] + a[i][s];
        if (candidate < y[s]) {
          y[s] = candidate;
          console.log(`  Улучшили путь до ${s} через ${i}: ${candidate}`);
        }
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    x[i] = y[i];
  }

  console.log(
    "x =",
    x.slice(1).map((v) => (v === Infinity ? "∞" : v))
  );
  console.log("\nРезультат - кратчайшие расстояния из вершины 1:");
  for (let i = 1; i <= n; i++) {
    console.log(`  До ${i}: ${x[i] === Infinity ? "∞" : x[i]}`);
  }
}
