/*
7.4.2. Предположим, что ориентированный граф без циклов хранится
в такой форме: для каждого i от 1 до n в num[i] хранится число выходящих
из i стрелок, в adr[i][1], . . . , adr[i][num[i]] | номера вер-
шин, куда эти стрелки ведут. Составьте (рекурсивный) алгоритм, кото-
рый производит топологическую сортировку не более чем за 𝐶 ·(n + m)
действий, где m | число рёбер графа (стрелок).
*/

export class DirectedGraph {
  private n: number; // Количество вершин
  private num: number[]; // num[i] = количество исходящих рёбер из вершины i
  private adr: number[][]; // adr[i] = список вершин, куда ведут рёбра из i
  private visited: boolean[]; // Для DFS
  private order: number[]; // Результат топологической сортировки

  /**
   * Создаёт ориентированный граф с n вершинами
   * @param {number} n - Количество вершин
   */
  constructor(n: number) {
    this.n = n;
    this.num = new Array(n + 1).fill(0); // Индексация с 1
    this.adr = new Array(n + 1).fill(null).map(() => []);
    this.visited = new Array(n + 1).fill(false);
    this.order = [];
  }

  // Добавить ребро от u к v
  addEdge(u: number, v: number): void {
    if (u < 1 || u > this.n || v < 1 || v > this.n) {
      throw new Error(`Вершины должны быть в диапазоне 1..${this.n}`);
    }
    this.adr[u].push(v);
    this.num[u]++;
  }

  // Инициализация из массивов num и adr
  initializeFromArrays(num: number[], adr: number[][]): void {
    if (num.length !== this.n + 1 || adr.length !== this.n + 1) {
      throw new Error("Массивы должны иметь размер n+1 (индексация с 1)");
    }
    this.num = [...num];
    this.adr = adr.map((arr) => [...arr]);
  }

  // Рекурсивный DFS с топологической сортировкой
  private dfs(u: number): void {
    this.visited[u] = true;

    // Рекурсивно посещаем все смежные вершины
    for (let i = 0; i < this.num[u]; i++) {
      const v = this.adr[u][i];
      if (!this.visited[v]) {
        this.dfs(v);
      }
    }

    // После обработки всех потомков добавляем вершину в порядок
    this.order.push(u);
  }

  // Топологическая сортировка (рекурсивный алгоритм)
  topologicalSortRecursive(): number[] {
    // Сбрасываем состояние
    this.visited.fill(false);
    this.order = [];

    // Запускаем DFS из всех непосещённых вершин
    for (let i = 1; i <= this.n; i++) {
      if (!this.visited[i]) {
        this.dfs(i);
      }
    }

    // Разворачиваем порядок (так как добавляли в конец)
    return [...this.order.reverse()];
  }

  // Топологическая сортировка (алгоритм Кана - итеративный)
  topologicalSortKahn(): number[] {
    // Вычисляем полустепень захода (indegree) для каждой вершины
    const indegree: number[] = new Array(this.n + 1).fill(0);

    for (let u = 1; u <= this.n; u++) {
      for (const v of this.adr[u]) {
        indegree[v]++;
      }
    }

    // Очередь вершин с нулевой полустепенью захода
    const queue: number[] = [];
    for (let i = 1; i <= this.n; i++) {
      if (indegree[i] === 0) {
        queue.push(i);
      }
    }

    const result: number[] = [];

    // Обрабатываем очередь
    while (queue.length > 0) {
      const u = queue.shift()!;
      result.push(u);

      // Уменьшаем indegree для всех смежных вершин
      for (const v of this.adr[u]) {
        indegree[v]--;
        if (indegree[v] === 0) {
          queue.push(v);
        }
      }
    }

    // Проверка на наличие циклов
    if (result.length !== this.n) {
      throw new Error(
        "Граф содержит циклы, топологическая сортировка невозможна"
      );
    }

    return result;
  }

  // Получить представление графа в виде строки
  toString(): string {
    let result = `Граф (n=${this.n}):\n`;
    for (let i = 1; i <= this.n; i++) {
      result += `  ${i} -> [${this.adr[i].join(", ")}] (num[${i}]=${
        this.num[i]
      })\n`;
    }
    return result;
  }
}

export function testTopologicalSort(): void {
  console.log(
    "=== Топологическая сортировка ориентированного ациклического графа ==="
  );

  // Пример 1: Простой граф
  console.log("\n1. Простой граф (n=5):");
  const graph1 = new DirectedGraph(5);
  graph1.addEdge(1, 2);
  graph1.addEdge(1, 3);
  graph1.addEdge(2, 4);
  graph1.addEdge(3, 4);
  graph1.addEdge(4, 5);

  console.log(graph1.toString());

  console.log("Топологическая сортировка (рекурсивный DFS):");
  const order1 = graph1.topologicalSortRecursive();
  console.log(order1.join(" => "));

  console.log("Топологическая сортировка (алгоритм Кана):");
  const order1k = graph1.topologicalSortKahn();
  console.log(order1k.join(" => "));

  // Пример 2: Более сложный граф
  console.log("\n2. Граф зависимостей (n=6):");
  const graph2 = new DirectedGraph(6);
  graph2.addEdge(1, 2);
  graph2.addEdge(1, 3);
  graph2.addEdge(2, 4);
  graph2.addEdge(2, 5);
  graph2.addEdge(3, 5);
  graph2.addEdge(4, 6);
  graph2.addEdge(5, 6);

  console.log(graph2.toString());

  console.log("Топологическая сортировка (рекурсивный DFS):");
  const order2 = graph2.topologicalSortRecursive();
  console.log(order2.join(" => "));

  console.log("Топологическая сортировка (алгоритм Кана):");
  const order2k = graph2.topologicalSortKahn();
  console.log(order2k.join(" => "));

  // Пример 3: Граф с циклом (должен выдать ошибку)
  console.log("\n3. Граф с циклом (n=4):");
  const graph3 = new DirectedGraph(4);
  graph3.addEdge(1, 2);
  graph3.addEdge(2, 3);
  graph3.addEdge(3, 4);
  graph3.addEdge(4, 2); // Цикл 2=>3=>4=>2

  console.log(graph3.toString());

  try {
    console.log("Попытка топологической сортировки (рекурсивный):");
    const order3 = graph3.topologicalSortRecursive();
    console.log(order3.join(" => "));
  } catch (error: any) {
    console.log("Ошибка (ожидаемо):", error.message);
  }

  try {
    console.log("Попытка топологической сортировки (алгоритм Кана):");
    const order3k = graph3.topologicalSortKahn();
    console.log(order3k.join(" => "));
  } catch (error: any) {
    console.log("Ошибка (ожидаемо):", error.message);
  }

  // Пример 4: Граф без рёбер
  console.log("\n4. Граф без рёбер (n=4):");
  const graph4 = new DirectedGraph(4);
  console.log(graph4.toString());

  console.log("Топологическая сортировка:");
  const order4 = graph4.topologicalSortRecursive();
  console.log(order4.join(" => "));
}

export function demonstrateComplexity(): void {
  console.log("\n=== Анализ сложности алгоритма ===");

  const n = 1000;
  const m = 5000;
  console.log(`Параметры: n=${n} вершин, m=${m} рёбер`);

  // Создаём случайный DAG
  const graph = new DirectedGraph(n);
  let edgesAdded = 0;

  // Создаём случайный DAG (гарантируем ацикличность, добавляя рёбра только от меньших вершин к большим)
  for (let i = 0; i < m; i++) {
    const u = Math.floor(Math.random() * n) + 1;
    const v = Math.floor(Math.random() * n) + 1;

    // Гарантируем ацикличность: только рёбра от меньших к большим вершинам
    if (u < v) {
      graph.addEdge(u, v);
      edgesAdded++;
    }
  }

  console.log(`Создан DAG с ${edgesAdded} рёбрами`);

  const startTime = Date.now();
  const order = graph.topologicalSortRecursive();
  const endTime = Date.now();

  console.log(
    `Топологическая сортировка выполнена за ${endTime - startTime} мс`
  );
  console.log(
    `Сложность: O(n + m) = O(${n} + ${edgesAdded}) = O(${n + edgesAdded})`
  );

  // Проверка корректности топологической сортировки
  console.log(
    "\nПроверка корректности (первые 10 вершин):",
    order.slice(0, 10).join(" => ")
  );

  // Проверяем, что для каждого ребра u=>v вершина u идёт перед v
  let correct = true;
  for (let u = 1; u <= n; u++) {
    const posU = order.indexOf(u);
    for (const v of graph["adr"][u]) {
      const posV = order.indexOf(v);
      if (posU > posV) {
        console.log(`Найдено некорректное ребро: ${u}=>${v} (${u} после ${v})`);
        correct = false;
        break;
      }
    }
    if (!correct) break;
  }

  if (correct) {
    console.log("Топологическая сортировка корректна!");
  }
}

export function testWithGivenFormat(): void {
  console.log("\n=== Тест с заданным форматом хранения ===");

  // Пример из условия: для каждого i от 1 до n:
  // num[i] - число выходящих стрелок
  // adr[i][1..num[i]] - номера вершин, куда ведут стрелки

  const n = 6;
  const num = [0, 2, 2, 1, 1, 0, 0]; // num[1]=2, num[2]=2, num[3]=1, ...
  const adr: number[][] = [
    [], // adr[0] не используется
    [2, 3], // adr[1] = [2, 3]
    [4, 5], // adr[2] = [4, 5]
    [5], // adr[3] = [5]
    [6], // adr[4] = [6]
    [6], // adr[5] = [6]
    [], // adr[6] = []
  ];

  console.log("Данные графа:");
  console.log("Вершины: 1..6");
  console.log("num:", num.slice(1));
  for (let i = 1; i <= n; i++) {
    console.log(`  adr[${i}] = [${adr[i].join(", ")}]`);
  }

  const graph = new DirectedGraph(n);
  graph.initializeFromArrays(num, adr);

  console.log("\nТопологическая сортировка:");
  const order = graph.topologicalSortRecursive();
  console.log(order.join(" => "));

  // Визуализация графа
  console.log("\nГраф:");
  for (let i = 1; i <= n; i++) {
    const arrows = adr[i].map((v) => `${i}=>${v}`).join(", ");
    console.log(`  ${i}: ${arrows || "(нет исходящих)"}`);
  }
}
