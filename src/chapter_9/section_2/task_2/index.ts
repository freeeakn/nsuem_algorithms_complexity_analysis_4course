/*
9.2.2. Напишите программу поиска в глубину.
*/

// Класс для представления графа с использованием списка смежности
export class GraphDFS {
  private vertices: number; // Количество вершин
  private adjList: number[][]; // Список смежности
  private directed: boolean; // true - ориентированный, false - неориентированный

  constructor(vertices: number, directed: boolean = false) {
    this.vertices = vertices;
    this.directed = directed;
    this.adjList = new Array(vertices + 1);
    for (let i = 0; i <= vertices; i++) {
      this.adjList[i] = [];
    }
  }

  // Добавить ребро от u к v
  addEdge(u: number, v: number): void {
    if (u < 1 || u > this.vertices || v < 1 || v > this.vertices) {
      throw new Error(`Вершины должны быть в диапазоне 1..${this.vertices}`);
    }

    this.adjList[u].push(v);

    // Для неориентированного графа добавляем обратное ребро
    if (!this.directed && u !== v) {
      this.adjList[v].push(u);
    }
  }

  // Рекурсивная реализация поиска в глубину (DFS)
  dfsRecursive(start: number): {
    visited: boolean[];
    discoveryTime: number[];
    finishTime: number[];
    parent: number[];
    order: number[];
    hasCycle: boolean;
  } {
    const visited: boolean[] = new Array(this.vertices + 1).fill(false);
    const discoveryTime: number[] = new Array(this.vertices + 1).fill(0);
    const finishTime: number[] = new Array(this.vertices + 1).fill(0);
    const parent: number[] = new Array(this.vertices + 1).fill(-1);
    const order: number[] = [];
    let time = 0;
    let hasCycle = false;

    const dfsVisit = (u: number): void => {
      time++;
      discoveryTime[u] = time;
      visited[u] = true;
      order.push(u);

      // Перебираем всех соседей вершины u
      for (const v of this.adjList[u]) {
        if (!visited[v]) {
          parent[v] = u;
          dfsVisit(v);
        } else if (this.directed) {
          // Для ориентированного графа: если v посещена и не родитель u
          // и мы нашли обратное/поперечное ребро - это цикл
          if (discoveryTime[v] > 0 && finishTime[v] === 0) {
            hasCycle = true;
          }
        } else {
          // Для неориентированного графа: если v не родитель u
          if (v !== parent[u]) {
            hasCycle = true;
          }
        }
      }

      time++;
      finishTime[u] = time;
    };

    // Запускаем DFS из стартовой вершины
    dfsVisit(start);

    // Для несвязного графа посещаем все компоненты связности
    for (let i = 1; i <= this.vertices; i++) {
      if (!visited[i]) {
        dfsVisit(i);
      }
    }

    return {
      visited,
      discoveryTime,
      finishTime,
      parent,
      order,
      hasCycle,
    };
  }

  // Итеративная реализация поиска в глубину (с использованием стека)
  dfsIterative(start: number): {
    visited: boolean[];
    parent: number[];
    order: number[];
  } {
    const visited: boolean[] = new Array(this.vertices + 1).fill(false);
    const parent: number[] = new Array(this.vertices + 1).fill(-1);
    const order: number[] = [];

    // Используем стек вместо рекурсии
    const stack: number[] = [];

    // Помещаем стартовую вершину в стек
    stack.push(start);

    while (stack.length > 0) {
      const u = stack.pop()!;

      if (!visited[u]) {
        visited[u] = true;
        order.push(u);

        // Добавляем всех непосещённых соседей в стек
        // Внимание: для сохранения порядка обхода как в рекурсивной версии
        // нужно добавлять соседей в обратном порядке
        for (let i = this.adjList[u].length - 1; i >= 0; i--) {
          const v = this.adjList[u][i];
          if (!visited[v]) {
            parent[v] = u;
            stack.push(v);
          }
        }
      }
    }

    // Для несвязного графа
    for (let i = 1; i <= this.vertices; i++) {
      if (!visited[i]) {
        // Запускаем DFS из непосещённой вершины
        const localStack: number[] = [i];

        while (localStack.length > 0) {
          const u = localStack.pop()!;

          if (!visited[u]) {
            visited[u] = true;
            order.push(u);

            for (let j = this.adjList[u].length - 1; j >= 0; j--) {
              const v = this.adjList[u][j];
              if (!visited[v]) {
                parent[v] = u;
                localStack.push(v);
              }
            }
          }
        }
      }
    }

    return {
      visited,
      parent,
      order,
    };
  }

  // Восстановить путь от start до end по результатам DFS
  reconstructPath(start: number, end: number, parent: number[]): number[] {
    if (start < 1 || start > this.vertices || end < 1 || end > this.vertices) {
      throw new Error(`Вершины должны быть в диапазоне 1..${this.vertices}`);
    }

    const path: number[] = [];
    let current = end;

    // Восстанавливаем путь от end к start
    while (current !== -1) {
      path.unshift(current);
      if (current === start) break;
      current = parent[current];
    }

    // Если не дошли до старта, значит пути нет
    if (current !== start) {
      return [];
    }

    return path;
  }

  // Классификация рёбер в DFS (только для ориентированных графов)
  classifyEdges(): Map<string, [number, number][]> {
    if (!this.directed) {
      throw new Error(
        "Классификация рёбер возможна только для ориентированных графов"
      );
    }

    const result = this.dfsRecursive(1);
    const classification = new Map<string, [number, number][]>();
    classification.set("tree", []);
    classification.set("back", []);
    classification.set("forward", []);
    classification.set("cross", []);

    for (let u = 1; u <= this.vertices; u++) {
      for (const v of this.adjList[u]) {
        if (result.parent[v] === u) {
          // Древесное ребро
          classification.get("tree")!.push([u, v]);
        } else if (
          result.discoveryTime[u] < result.discoveryTime[v] &&
          result.finishTime[v] < result.finishTime[u]
        ) {
          // Прямое ребро
          classification.get("forward")!.push([u, v]);
        } else if (
          result.discoveryTime[v] < result.discoveryTime[u] &&
          result.finishTime[u] < result.finishTime[v]
        ) {
          // Обратное ребро
          classification.get("back")!.push([u, v]);
        } else {
          // Поперечное ребро
          classification.get("cross")!.push([u, v]);
        }
      }
    }

    return classification;
  }

  // Поиск компонент связности с использованием DFS
  findConnectedComponents(): number[][] {
    const visited: boolean[] = new Array(this.vertices + 1).fill(false);
    const components: number[][] = [];

    for (let i = 1; i <= this.vertices; i++) {
      if (!visited[i]) {
        const component: number[] = [];
        const stack: number[] = [i];

        while (stack.length > 0) {
          const u = stack.pop()!;

          if (!visited[u]) {
            visited[u] = true;
            component.push(u);

            for (const v of this.adjList[u]) {
              if (!visited[v]) {
                stack.push(v);
              }
            }
          }
        }

        components.push(component);
      }
    }

    return components;
  }

  // Проверка на двудольность с использованием DFS
  isBipartite(): { isBipartite: boolean; colors: number[] } {
    const colors: number[] = new Array(this.vertices + 1).fill(-1); // -1 - не окрашена, 0/1 - цвета
    let isBipartite = true;

    // Для каждой вершины (на случай несвязного графа)
    for (let i = 1; i <= this.vertices && isBipartite; i++) {
      if (colors[i] === -1) {
        // Начинаем обход из этой вершины
        const stack: number[] = [i];
        colors[i] = 0; // Начинаем с цвета 0

        while (stack.length > 0 && isBipartite) {
          const u = stack.pop()!;

          // Проверяем всех соседей
          for (const v of this.adjList[u]) {
            if (colors[v] === -1) {
              // Сосед ещё не окрашен - окрашиваем в противоположный цвет
              colors[v] = 1 - colors[u];
              stack.push(v);
            } else if (colors[v] === colors[u]) {
              // Сосед окрашен в тот же цвет - граф не двудольный
              isBipartite = false;
              break;
            }
          }
        }
      }
    }

    return { isBipartite, colors };
  }

  // Получить список смежности в виде строки
  toString(): string {
    let result = `Граф (${this.vertices} вершин, ${
      this.directed ? "ориентированный" : "неориентированный"
    }):\n`;
    for (let i = 1; i <= this.vertices; i++) {
      result += `  ${i}: [${this.adjList[i].join(", ")}]\n`;
    }
    return result;
  }
}

// Функция для тестирования поиска в глубину
export function testDFS(): void {
  console.log("=== Поиск в глубину (DFS) ===");

  // Пример 1: Простой неориентированный граф
  console.log("\n1. Неориентированный граф (n=6):");
  const graph1 = new GraphDFS(6, false);

  // Задаём рёбра
  graph1.addEdge(1, 2);
  graph1.addEdge(1, 3);
  graph1.addEdge(2, 4);
  graph1.addEdge(2, 5);
  graph1.addEdge(3, 6);
  graph1.addEdge(4, 5);

  console.log(graph1.toString());

  console.log("Рекурсивный DFS из вершины 1:");
  const result1Rec = graph1.dfsRecursive(1);
  console.log("  Порядок обхода:", result1Rec.order.join(" → "));
  console.log("  Родители:", result1Rec.parent.slice(1));
  console.log("  Время входа:", result1Rec.discoveryTime.slice(1));
  console.log("  Время выхода:", result1Rec.finishTime.slice(1));
  console.log("  Есть циклы:", result1Rec.hasCycle);

  console.log("\nИтеративный DFS из вершины 1:");
  const result1Iter = graph1.dfsIterative(1);
  console.log("  Порядок обхода:", result1Iter.order.join(" → "));
  console.log("  Родители:", result1Iter.parent.slice(1));

  // Пример 2: Ориентированный граф
  console.log("\n2. Ориентированный граф (n=7):");
  const graph2 = new GraphDFS(7, true);

  // Задаём рёбра
  graph2.addEdge(1, 2);
  graph2.addEdge(1, 3);
  graph2.addEdge(2, 4);
  graph2.addEdge(2, 5);
  graph2.addEdge(3, 6);
  graph2.addEdge(4, 7);
  graph2.addEdge(5, 7);
  graph2.addEdge(6, 3); // Обратное ребро - создаёт цикл

  console.log(graph2.toString());

  console.log("Рекурсивный DFS из вершины 1:");
  const result2Rec = graph2.dfsRecursive(1);
  console.log("  Порядок обхода:", result2Rec.order.join(" → "));
  console.log("  Есть циклы:", result2Rec.hasCycle);

  // Пример 3: Классификация рёбер
  console.log("\n3. Классификация рёбер в ориентированном графе:");
  const graph3 = new GraphDFS(6, true);

  // Классический пример для классификации рёбер
  graph3.addEdge(1, 2);
  graph3.addEdge(1, 4);
  graph3.addEdge(2, 3);
  graph3.addEdge(3, 1); // Обратное ребро
  graph3.addEdge(4, 3); // Поперечное ребро
  graph3.addEdge(5, 3);
  graph3.addEdge(5, 4);
  graph3.addEdge(6, 5);
  graph3.addEdge(6, 6); // Петля

  console.log(graph3.toString());

  try {
    const classification = graph3.classifyEdges();
    console.log("Классификация рёбер:");
    for (const [type, edges] of classification.entries()) {
      if (edges.length > 0) {
        console.log(
          `  ${type}: ${edges.map((e) => `(${e[0]}→${e[1]})`).join(", ")}`
        );
      }
    }
  } catch (error: any) {
    console.log("Ошибка:", error.message);
  }

  // Пример 4: Поиск компонент связности
  console.log("\n4. Поиск компонент связности:");
  const graph4 = new GraphDFS(8, false);

  // Создаём несвязный граф с 3 компонентами
  graph4.addEdge(1, 2);
  graph4.addEdge(1, 3);
  graph4.addEdge(2, 3);

  graph4.addEdge(4, 5);

  graph4.addEdge(6, 7);
  graph4.addEdge(7, 8);

  console.log(graph4.toString());

  const components = graph4.findConnectedComponents();
  console.log("Компоненты связности:");
  components.forEach((comp, i) => {
    console.log(`  Компонента ${i + 1}: [${comp.join(", ")}]`);
  });

  // Пример 5: Проверка на двудольность
  console.log("\n5. Проверка на двудольность:");
  const graph5 = new GraphDFS(4, false);

  // Двудольный граф (K2,2)
  graph5.addEdge(1, 3);
  graph5.addEdge(1, 4);
  graph5.addEdge(2, 3);
  graph5.addEdge(2, 4);

  console.log(graph5.toString());

  const bipartiteResult = graph5.isBipartite();
  console.log("  Граф двудольный:", bipartiteResult.isBipartite);
  if (bipartiteResult.isBipartite) {
    console.log("  Раскраска:", bipartiteResult.colors.slice(1));
  }
}

// Анализ алгоритма DFS
export function analyzeDFS(): void {
  console.log("\n=== Анализ алгоритма поиска в глубину ===");

  console.log("Основные понятия:");
  console.log("  1. Древесные рёбра (tree edges) - рёбра DFS-дерева");
  console.log(
    "  2. Обратные рёбра (back edges) - ведут к предкам в DFS-дереве"
  );
  console.log(
    "  3. Прямые рёбра (forward edges) - ведут к потомкам не по дереву"
  );
  console.log("  4. Поперечные рёбра (cross edges) - все остальные рёбра");

  console.log("\nСвойства DFS:");
  console.log("  1. Порядок обхода: LIFO (последний вошёл - первый вышел)");
  console.log("  2. Время входа/выхода: позволяет классифицировать рёбра");
  console.log("  3. Обнаружение циклов: обратные рёбра указывают на циклы");
  console.log("  4. Топологическая сортировка: возможна для DAG");

  console.log("\nПсевдокод рекурсивного DFS:");
  console.log("  DFS(G):");
  console.log("    для каждой вершины u ∈ G.V:");
  console.log("      цвет[u] = БЕЛЫЙ");
  console.log("      π[u] = NIL");
  console.log("    время = 0");
  console.log("    для каждой вершины u ∈ G.V:");
  console.log("      если цвет[u] == БЕЛЫЙ:");
  console.log("        DFS-VISIT(u)");
  console.log("");
  console.log("  DFS-VISIT(u):");
  console.log("    время = время + 1");
  console.log("    d[u] = время  // время входа");
  console.log("    цвет[u] = СЕРЫЙ");
  console.log("    для каждой v ∈ G.Adj[u]:");
  console.log("      если цвет[v] == БЕЛЫЙ:");
  console.log("        π[v] = u");
  console.log("        DFS-VISIT(v)");
  console.log("    цвет[u] = ЧЁРНЫЙ");
  console.log("    время = время + 1");
  console.log("    f[u] = время  // время выхода");

  console.log("\nСложность алгоритма:");
  console.log("  Каждая вершина посещается один раз: O(V)");
  console.log("  Каждое ребро проверяется один раз: O(E)");
  console.log("  Итоговая сложность: O(V + E)");
}

// Демонстрация пошагового выполнения DFS
export function demonstrateStepByStepDFS(): void {
  console.log("\n=== Пошаговая демонстрация DFS ===");

  const graph = new GraphDFS(5, false);

  // Простой граф
  graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 4);
  graph.addEdge(2, 5);
  graph.addEdge(3, 5);

  console.log("Граф:");
  console.log(graph.toString());

  console.log("Рекурсивный DFS из вершины 1 (пошагово):");

  const visited: boolean[] = new Array(6).fill(false);
  const stackTrace: string[] = [];
  let step = 1;

  const dfsStepByStep = (u: number, depth: number): void => {
    const indent = "  ".repeat(depth);
    stackTrace.push(`${indent}Шаг ${step++}: Посещаем вершину ${u}`);
    visited[u] = true;

    for (const v of graph["adjList"][u]) {
      if (!visited[v]) {
        stackTrace.push(`${indent}  Переходим из ${u} в ${v}`);
        dfsStepByStep(v, depth + 1);
        stackTrace.push(`${indent}  Возвращаемся в ${u}`);
      } else {
        stackTrace.push(
          `${indent}  Вершина ${v} уже посещена (ребро ${u}→${v})`
        );
      }
    }

    stackTrace.push(`${indent}Завершаем обработку вершины ${u}`);
  };

  dfsStepByStep(1, 0);

  // Выводим стек вызовов
  stackTrace.forEach((line) => console.log(line));

  console.log("\nИтеративный DFS из вершины 1 (пошагово):");

  const visitedIter: boolean[] = new Array(6).fill(false);
  const stack: number[] = [1];
  const order: number[] = [];
  step = 1;

  console.log("  Инициализация: stack = [1]");

  while (stack.length > 0) {
    const u = stack.pop()!;
    console.log(`  Шаг ${step++}: Извлекаем вершину ${u} из стека`);

    if (!visitedIter[u]) {
      visitedIter[u] = true;
      order.push(u);
      console.log(`    Посещаем вершину ${u}, order = [${order.join(", ")}]`);

      // Добавляем соседей в обратном порядке для сохранения порядка обхода
      const neighbors = graph["adjList"][u];
      const toPush: number[] = [];
      for (const v of neighbors) {
        if (!visitedIter[v]) {
          toPush.push(v);
        }
      }

      // Добавляем в обратном порядке
      for (let i = toPush.length - 1; i >= 0; i--) {
        stack.push(toPush[i]);
      }

      if (toPush.length > 0) {
        console.log(
          `    Добавляем соседей в стек: [${toPush.reverse().join(", ")}]`
        );
        console.log(`    Текущий стек: [${stack.join(", ")}]`);
      } else {
        console.log(`    Нет непосещённых соседей`);
      }
    } else {
      console.log(`    Вершина ${u} уже посещена, пропускаем`);
    }
  }

  console.log(`\n  Итоговый порядок обхода: [${order.join(" → ")}]`);
}

// Сравнение рекурсивной и итеративной реализаций
export function compareDFSImplementations(): void {
  console.log("\n=== Сравнение рекурсивной и итеративной реализаций DFS ===");

  const n = 1000;
  const m = 5000;

  console.log(`Тест на графе с ${n} вершинами и ${m} рёбрами:`);

  // Создаём случайный граф
  const graph = new GraphDFS(n, false);

  // Добавляем случайные рёбра
  for (let i = 0; i < m; i++) {
    const u = Math.floor(Math.random() * n) + 1;
    const v = Math.floor(Math.random() * n) + 1;
    if (u !== v) {
      graph.addEdge(u, v);
    }
  }

  // Тестируем рекурсивную версию
  console.log("\nРекурсивный DFS:");
  const startRec = Date.now();
  const resultRec = graph.dfsRecursive(1);
  const timeRec = Date.now() - startRec;
  console.log(`  Время: ${timeRec} мс`);
  console.log(`  Посещено вершин: ${resultRec.order.length}`);

  // Тестируем итеративную версию
  console.log("\nИтеративный DFS:");
  const startIter = Date.now();
  const resultIter = graph.dfsIterative(1);
  const timeIter = Date.now() - startIter;
  console.log(`  Время: ${timeIter} мс`);
  console.log(`  Посещено вершин: ${resultIter.order.length}`);

  console.log("\nСравнение:");
  console.log(`  Разница во времени: ${Math.abs(timeRec - timeIter)} мс`);
  console.log(
    `  Посещено одинаковое количество вершин: ${
      resultRec.order.length === resultIter.order.length ? "OK" : "BAD"
    }`
  );

  console.log("\nПреимущества и недостатки:");
  console.log("  Рекурсивный DFS:");
  console.log("    + Проще для понимания и реализации");
  console.log("    + Легко получить времена входа/выхода");
  console.log("    - Может вызвать переполнение стека на глубоких графах");
  console.log("");
  console.log("  Итеративный DFS:");
  console.log("    + Нет риска переполнения стека");
  console.log("    + Позволяет лучше контролировать процесс");
  console.log("    - Требует явного управления стеком");
  console.log("    - Сложнее получить времена входа/выхода");
}
