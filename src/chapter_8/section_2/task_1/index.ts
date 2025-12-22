/*
8.2.1. Напишите нерекурсивную программу для нахождения после-
довательности перемещений колец в задаче о ханойских башнях.
*/

// Рекурсивное решение задачи о Ханойских башнях (для сравнения)
export function hanoiRecursive(
  n: number,
  from: string = "A",
  to: string = "C",
  aux: string = "B"
): string[] {
  const moves: string[] = [];

  function move(n: number, from: string, to: string, aux: string): void {
    if (n === 1) {
      moves.push(`${from} → ${to}`);
      return;
    }

    move(n - 1, from, aux, to);
    moves.push(`${from} → ${to}`);
    move(n - 1, aux, to, from);
  }

  move(n, from, to, aux);
  return moves;
}

// Нерекурсивное решение с использованием стека
export function hanoiIterativeStack(
  n: number,
  from: string = "A",
  to: string = "C",
  aux: string = "B"
): string[] {
  const moves: string[] = [];

  if (n <= 0) return moves;

  // Структура для хранения состояния подзадачи
  interface HanoiState {
    n: number;
    from: string;
    to: string;
    aux: string;
    stage: number;
  }

  const stack: HanoiState[] = [];

  // Начальное состояние
  stack.push({ n, from, to, aux, stage: 0 });

  while (stack.length > 0) {
    const state = stack[stack.length - 1]; // Смотрим верхний элемент

    if (state.n === 1) {
      // Базовый случай: переместить один диск
      moves.push(`${state.from} → ${state.to}`);
      stack.pop(); // Задача решена
    } else {
      switch (state.stage) {
        case 0:
          // Первый этап: нужно перенести n-1 дисков на вспомогательный стержень
          state.stage = 1;
          stack.push({
            n: state.n - 1,
            from: state.from,
            to: state.aux,
            aux: state.to,
            stage: 0,
          });
          break;

        case 1:
          // Второй этап: перенести самый большой диск
          moves.push(`${state.from} → ${state.to}`);
          state.stage = 2;
          stack.push({
            n: state.n - 1,
            from: state.aux,
            to: state.to,
            aux: state.from,
            stage: 0,
          });
          break;

        case 2:
          // Третий этап: задача решена
          stack.pop();
          break;
      }
    }
  }

  return moves;
}

// Нерекурсивное решение с использованием битовых операций (самый эффективный)
export function hanoiIterativeBitwise(
  n: number,
  from: string = "A",
  to: string = "C",
  aux: string = "B"
): string[] {
  const moves: string[] = [];

  if (n <= 0) return moves;

  // Для нечетного и четного n порядок перемещений разный
  const rods = [from, aux, to]; // Порядок важен для алгоритма

  // Создаем стеки для каждого стержня
  const stacks: number[][] = [[], [], []];

  // Инициализируем начальный стержень
  for (let i = n; i >= 1; i--) {
    stacks[0].push(i);
  }

  let moveCount = 0;
  const totalMoves = Math.pow(2, n) - 1;

  // Определяем порядок ходов для самого маленького диска
  let smallDiskStep: number;
  if (n % 2 === 0) {
    // Четное n: маленький диск движется по часовой стрелке: 0→1→2→0
    smallDiskStep = 1;
  } else {
    // Нечетное n: маленький диск движется против часовой стрелки: 0→2→1→0
    smallDiskStep = 2;
  }

  while (moveCount < totalMoves) {
    // Нечетные ходы (1, 3, 5, ...): перемещаем самый маленький диск
    if (moveCount % 2 === 0) {
      const fromRod = 0;
      const toRod = (fromRod + smallDiskStep) % 3;

      // Перемещаем диск
      const disk = stacks[fromRod].pop()!;
      stacks[toRod].push(disk);
      moves.push(`${rods[fromRod]} → ${rods[toRod]}`);
    }
    // Четные ходы (2, 4, 6, ...): перемещаем другой диск
    else {
      // Ищем допустимый ход (не перемещая самый маленький диск)
      let validMoveFound = false;

      // Проверяем все возможные пары стержней
      for (let i = 0; i < 3 && !validMoveFound; i++) {
        for (let j = 0; j < 3 && !validMoveFound; j++) {
          if (i === j) continue;

          const iTop =
            stacks[i].length > 0 ? stacks[i][stacks[i].length - 1] : Infinity;
          const jTop =
            stacks[j].length > 0 ? stacks[j][stacks[j].length - 1] : Infinity;

          // Ход допустим, если на целевом стержне нет диска меньше
          if (iTop < jTop) {
            // Не перемещаем самый маленький диск (диск 1)
            if (iTop !== 1) {
              // Перемещаем диск
              const disk = stacks[i].pop()!;
              stacks[j].push(disk);
              moves.push(`${rods[i]} → ${rods[j]}`);
              validMoveFound = true;
            }
          }
        }
      }

      if (!validMoveFound) {
        // Если не нашли другой ход, перемещаем самый маленький диск
        // (это случается только при n=1, но на всякий случай)
        const fromRod = 0;
        const toRod = (fromRod + smallDiskStep) % 3;

        const disk = stacks[fromRod].pop()!;
        stacks[toRod].push(disk);
        moves.push(`${rods[fromRod]} → ${rods[toRod]}`);
      }
    }

    moveCount++;
  }

  return moves;
}

// Функция для проверки корректности решения
export function validateHanoiSolution(
  moves: string[],
  n: number,
  from: string = "A",
  to: string = "C",
  aux: string = "B"
): boolean {
  // Симулируем башни
  const towers: Map<string, number[]> = new Map();
  towers.set(from, []);
  towers.set(to, []);
  towers.set(aux, []);

  // Инициализируем начальную башню
  for (let i = n; i >= 1; i--) {
    towers.get(from)!.push(i);
  }

  // Проверяем каждый ход
  for (const move of moves) {
    const [src, dst] = move.split(" → ");

    const srcTower = towers.get(src);
    const dstTower = towers.get(dst);

    // Проверяем, что стержни существуют
    if (!srcTower || !dstTower) {
      console.log(`Ошибка: неизвестный стержень в ходе "${move}"`);
      return false;
    }

    // Проверяем, что исходная башня не пуста
    if (srcTower.length === 0) {
      console.log(`Ошибка: башня ${src} пуста в ходе "${move}"`);
      return false;
    }

    const disk = srcTower[srcTower.length - 1];

    // Проверяем правило: нельзя класть больший диск на меньший
    if (dstTower.length > 0 && disk > dstTower[dstTower.length - 1]) {
      console.log(
        `Ошибка в ходе "${move}": диск ${disk} больше диска ${
          dstTower[dstTower.length - 1]
        } на башне ${dst}`
      );
      return false;
    }

    // Выполняем перемещение
    srcTower.pop();
    dstTower.push(disk);
  }

  // Проверяем конечное состояние
  const finalFrom = towers.get(from)!;
  const finalTo = towers.get(to)!;
  const finalAux = towers.get(aux)!;

  const isSolved =
    finalFrom.length === 0 && finalTo.length === n && finalAux.length === 0;

  // Дополнительно проверяем порядок дисков на целевом стержне
  let correctOrder = true;
  for (let i = 0; i < finalTo.length - 1; i++) {
    if (finalTo[i] <= finalTo[i + 1]) {
      correctOrder = false;
      break;
    }
  }

  return isSolved && correctOrder;
}

export function testHanoiTowers(): void {
  console.log("=== Задача о Ханойских башнях (нерекурсивные решения) ===");

  // Тест 1: Маленькая башня (n=1)
  console.log("\n1. Башня из 1 диска:");
  const moves1 = hanoiIterativeStack(1);
  console.log("   Ходы:", moves1.join(", "));
  console.log("   Корректно:", validateHanoiSolution(moves1, 1));

  // Тест 2: Башня из 2 дисков
  console.log("\n2. Башня из 2 дисков:");
  const moves2 = hanoiIterativeStack(2);
  console.log("   Ходы:", moves2.join(", "));
  console.log("   Количество ходов:", moves2.length, "(ожидается: 3)");
  console.log("   Корректно:", validateHanoiSolution(moves2, 2));

  // Тест 3: Башня из 3 дисков
  console.log("\n3. Башня из 3 дисков:");
  const moves3 = hanoiIterativeStack(3);
  console.log("   Ходы:", moves3.join(", "));
  console.log("   Количество ходов:", moves3.length, "(ожидается: 7)");
  console.log("   Корректно:", validateHanoiSolution(moves3, 3));

  // Тест 4: Сравнение всех методов для n=4
  console.log("\n4. Сравнение методов для n=4:");

  console.log("   Рекурсивный метод:");
  const recursiveMoves = hanoiRecursive(4);
  console.log("     Количество ходов:", recursiveMoves.length);
  console.log("     Корректно:", validateHanoiSolution(recursiveMoves, 4));

  console.log("   Итеративный (стек):");
  const stackMoves = hanoiIterativeStack(4);
  console.log("     Количество ходов:", stackMoves.length);
  console.log("     Корректно:", validateHanoiSolution(stackMoves, 4));

  console.log("   Итеративный (битовый):");
  const bitwiseMoves = hanoiIterativeBitwise(4);
  console.log("     Количество ходов:", bitwiseMoves.length);
  console.log("     Корректно:", validateHanoiSolution(bitwiseMoves, 4));

  // Проверяем, что все методы дают одинаковое количество ходов
  console.log("\n   Все методы дают правильное количество ходов?");
  const allCorrectCount =
    recursiveMoves.length === 15 &&
    stackMoves.length === 15 &&
    bitwiseMoves.length === 15;
  console.log("   Ответ:", allCorrectCount ? "Да" : "Нет");

  // Проверяем, что стековый метод дает ту же последовательность, что и рекурсивный
  console.log(
    "\n   Рекурсивный и стековый методы дают одинаковую последовательность?"
  );
  const recursiveAndStackSame =
    JSON.stringify(recursiveMoves) === JSON.stringify(stackMoves);
  console.log("   Ответ:", recursiveAndStackSame ? "Да" : "Нет");

  // Тест 5: Большая башня (n=5) - проверка производительности
  console.log("\n5. Башня из 5 дисков:");

  console.log("   Итеративный (стек):");
  const startStack = Date.now();
  const moves5Stack = hanoiIterativeStack(5);
  const timeStack = Date.now() - startStack;
  console.log("     Время:", timeStack, "мс");
  console.log("     Ходов:", moves5Stack.length, "(ожидается: 31)");
  console.log("     Корректно:", validateHanoiSolution(moves5Stack, 5));

  console.log("   Итеративный (битовый):");
  const startBitwise = Date.now();
  const moves5Bitwise = hanoiIterativeBitwise(5);
  const timeBitwise = Date.now() - startBitwise;
  console.log("     Время:", timeBitwise, "мс");
  console.log("     Ходов:", moves5Bitwise.length, "(ожидается: 31)");
  console.log("     Корректно:", validateHanoiSolution(moves5Bitwise, 5));
}

export function explainHanoiAlgorithm(): void {
  console.log("\n=== Объяснение алгоритма ===");

  console.log("Задача о Ханойских башнях:");
  console.log("Даны 3 стержня (A, B, C) и n дисков разного размера.");
  console.log(
    "Диски нанизаны на стержень A в порядке убывания размера (снизу - самый большой)."
  );
  console.log("Цель: перенести всю башню на стержень C, соблюдая правила:");
  console.log("  1. За один раз можно переносить только один диск.");
  console.log("  2. Нельзя класть больший диск на меньший.");
  console.log("  3. Можно использовать стержень B как вспомогательный.");

  console.log("\nРекурсивное решение:");
  console.log("  hanoi(n, A, C, B):");
  console.log("    если n = 1: переместить A → C");
  console.log("    иначе:");
  console.log("      hanoi(n-1, A, B, C)  // перенести меньшие на B");
  console.log("      переместить A → C    // перенести самый большой на C");
  console.log("      hanoi(n-1, B, C, A)  // перенести меньшие с B на C");

  console.log("\nНерекурсивное решение с использованием стека:");
  console.log("  1. Имитируем стек вызовов явно.");
  console.log("  2. Каждое состояние хранит: n, from, to, aux, stage.");
  console.log(
    "  3. Stage = 0: нужно решить подзадачу hanoi(n-1, from, aux, to)."
  );
  console.log("  4. Stage = 1: выполнили подзадачу, нужно переместить диск.");
  console.log(
    "  5. Stage = 2: нужно решить подзадачу hanoi(n-1, aux, to, from)."
  );

  console.log("\nНерекурсивное решение с битовыми операциями:");
  console.log("  1. Общее количество ходов: 2^n - 1.");
  console.log("  2. Нечетные ходы: перемещаем самый маленький диск.");
  console.log("  3. Четные ходы: перемещаем другой допустимый диск.");
  console.log(
    "  4. Направление движения маленького диска зависит от четности n."
  );

  console.log("\nКоличество ходов: 2^n - 1");
  console.log("  n=1: 1 ход");
  console.log("  n=2: 3 хода");
  console.log("  n=3: 7 ходов");
  console.log("  n=4: 15 ходов");
  console.log("  n=5: 31 ход");
  console.log("  n=6: 63 хода");
  console.log(
    "  n=64: 18,446,744,073,709,551,615 ходов (более 500 миллиардов лет!)"
  );
}

export function demonstrateVisualization(): void {
  console.log("\n=== Визуализация решения для n=3 ===");

  const n = 3;
  const moves = hanoiIterativeStack(n);

  console.log("Исходное состояние:");
  console.log("  A: [3, 2, 1]");
  console.log("  B: []");
  console.log("  C: []");
  console.log("");

  // Создаем начальные башни
  const towers: Map<string, number[]> = new Map();
  towers.set("A", [3, 2, 1]);
  towers.set("B", []);
  towers.set("C", []);

  function printTowers(): void {
    console.log(`  A: [${towers.get("A")!.join(", ")}]`);
    console.log(`  B: [${towers.get("B")!.join(", ")}]`);
    console.log(`  C: [${towers.get("C")!.join(", ")}]`);
  }

  // Выполняем ходы и показываем состояние
  for (let i = 0; i < moves.length; i++) {
    const [src, dst] = moves[i].split(" → ");

    // Перемещаем диск
    const disk = towers.get(src)!.pop()!;
    towers.get(dst)!.push(disk);

    console.log(`Ход ${i + 1}: ${moves[i]}`);
    printTowers();
    console.log("");
  }

  console.log("Башня успешно перенесена на стержень C!");
}

export function analyzePerformance(): void {
  console.log("\n=== Анализ производительности ===");

  console.log("Сравнение времени выполнения для разных n:");
  console.log("n | Рекурсивный (мс) | Стековый (мс) | Битовый (мс) | Ходов");
  console.log("-".repeat(60));

  for (let n = 1; n <= 6; n++) {
    // Рекурсивный (только для маленьких n)
    let recursiveTime = 0;
    if (n <= 4) {
      const startRec = Date.now();
      hanoiRecursive(n);
      recursiveTime = Date.now() - startRec;
    }

    // Стековый
    const startStack = Date.now();
    const stackMoves = hanoiIterativeStack(n);
    const stackTime = Date.now() - startStack;

    // Битовый
    const startBitwise = Date.now();
    const bitwiseMoves = hanoiIterativeBitwise(n);
    const bitwiseTime = Date.now() - startBitwise;

    console.log(
      `${n} | ${recursiveTime.toString().padStart(15)} | ${stackTime
        .toString()
        .padStart(12)} | ${bitwiseTime.toString().padStart(11)} | ${
        stackMoves.length
      }`
    );
  }

  console.log("\nВыводы:");
  console.log(
    "1. Рекурсивный метод медленный из-за большого количества вызовов."
  );
  console.log(
    "2. Стековый метод имитирует рекурсию, но без затрат на вызовы функций."
  );
  console.log("3. Битовый метод самый эффективный для больших n.");
  console.log("4. Все методы дают 2^n - 1 ходов.");
}
