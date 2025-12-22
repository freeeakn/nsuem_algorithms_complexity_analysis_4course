/*
7.3.1. Напишите программу, которая печатает по одному разу все
последовательности длины n, составленные из чисел 1 . . . k (их количе-
ство равно kn).
*/

export function generateSequencesRecursive(n: number, k: number): number[][] {
  if (n <= 0 || k <= 0) {
    return [[]]; // Одна пустая последовательность
  }

  const result: number[][] = [];

  // Рекурсивная функция для генерации последовательностей
  function backtrack(current: number[]): void {
    // Базовый случай: достигли нужной длины
    if (current.length === n) {
      result.push([...current]); // Сохраняем копию
      return;
    }

    // Рекурсивный случай: добавляем все возможные числа
    for (let i = 1; i <= k; i++) {
      current.push(i); // Добавляем число
      backtrack(current); // Рекурсивно продолжаем
      current.pop(); // Убираем число (backtrack)
    }
  }

  backtrack([]); // Начинаем с пустой последовательности
  return result;
}

export function generateSequencesIterative(n: number, k: number): number[][] {
  if (n <= 0 || k <= 0) {
    return [[]];
  }

  const result: number[][] = [];
  const total = Math.pow(k, n);

  // Используем числа от 0 до k^n-1, интерпретируя их в k-ичной системе
  for (let i = 0; i < total; i++) {
    const sequence: number[] = [];
    let num = i;

    // Преобразуем число в k-ичную систему
    for (let j = 0; j < n; j++) {
      // Получаем цифру (от 0 до k-1) и преобразуем в 1..k
      const digit = (num % k) + 1;
      sequence.unshift(digit); // Добавляем в начало
      num = Math.floor(num / k);
    }

    result.push(sequence);
  }

  return result;
}

export function printSequences(n: number, k: number): void {
  console.log(`\nВсе последовательности длины ${n} из чисел 1..${k}:`);

  const sequences = generateSequencesRecursive(n, k);

  // Выводим по 5 последовательностей в строку для удобства чтения
  const perLine = 5;
  for (let i = 0; i < sequences.length; i += perLine) {
    const lineSequences = sequences.slice(i, i + perLine);
    const line = lineSequences.map((seq) => `[${seq.join(",")}]`).join("  ");
    console.log(line);
  }

  console.log(`\nВсего последовательностей: ${sequences.length}`);
  console.log(`Ожидаемое количество: k^n = ${k}^${n} = ${Math.pow(k, n)}`);
}

export function testSequences(): void {
  console.log(
    "=== Генерация всех последовательностей длины n из чисел 1..k ==="
  );

  // Тест 1: Маленькие значения
  console.log("\n1. n=2, k=2:");
  const sequences1 = generateSequencesRecursive(2, 2);
  console.log(
    "Последовательности:",
    sequences1.map((s) => `[${s.join(",")}]`).join(" ")
  );
  console.log("Количество:", sequences1.length, "Ожидалось: 4");

  // Тест 2: n=1, k=3
  console.log("\n2. n=1, k=3:");
  const sequences2 = generateSequencesRecursive(1, 3);
  console.log(
    "Последовательности:",
    sequences2.map((s) => `[${s.join(",")}]`).join(" ")
  );
  console.log("Количество:", sequences2.length, "Ожидалось: 3");

  // Тест 3: n=3, k=1
  console.log("\n3. n=3, k=1:");
  const sequences3 = generateSequencesRecursive(3, 1);
  console.log(
    "Последовательности:",
    sequences3.map((s) => `[${s.join(",")}]`).join(" ")
  );
  console.log("Количество:", sequences3.length, "Ожидалось: 1");

  // Тест 4: Сравнение рекурсивного и итеративного подходов
  console.log("\n4. Сравнение подходов (n=3, k=2):");
  const recursiveResult = generateSequencesRecursive(3, 2);
  const iterativeResult = generateSequencesIterative(3, 2);

  console.log("Рекурсивный метод:");
  console.log("  Количество:", recursiveResult.length);
  console.log(
    "  Первые 5:",
    recursiveResult
      .slice(0, 5)
      .map((s) => `[${s.join(",")}]`)
      .join(" ")
  );

  console.log("Итеративный метод:");
  console.log("  Количество:", iterativeResult.length);
  console.log(
    "  Первые 5:",
    iterativeResult
      .slice(0, 5)
      .map((s) => `[${s.join(",")}]`)
      .join(" ")
  );

  console.log(
    "Результаты совпадают:",
    recursiveResult.length === iterativeResult.length &&
      recursiveResult.every(
        (seq, i) =>
          seq.length === iterativeResult[i].length &&
          seq.every((val, j) => val === iterativeResult[i][j])
      )
  );

  // Тест 5: Граничные случаи
  console.log("\n5. Граничные случаи:");
  console.log("n=0, k=3:", generateSequencesRecursive(0, 3)); // [[]]
  console.log("n=2, k=0:", generateSequencesRecursive(2, 0)); // [[]]

  // Анализ сложности
  console.log("\n6. Анализ сложности:");
  console.log("Количество последовательностей: k^n");
  console.log("Время генерации: O(k^n)");
  console.log("Память для хранения всех последовательностей: O(n * k^n)");
  console.log(
    "Для больших n и k генерация всех последовательностей невозможна"
  );
}

export function demonstrateLargeExample(): void {
  console.log("\n=== Демонстрация для бóльших значений (частичный вывод) ===");

  const n = 3;
  const k = 3;
  console.log(`\nn=${n}, k=${k}:`);
  console.log(`Всего последовательностей: ${k}^${n} = ${Math.pow(k, n)}`);

  const sequences = generateSequencesRecursive(n, k);
  console.log("Первые 10 последовательностей:");
  for (let i = 0; i < Math.min(10, sequences.length); i++) {
    console.log(`  ${i + 1}. [${sequences[i].join(", ")}]`);
  }

  // Вывод последовательностей в порядке генерации
  console.log("\nПорядок генерации (дерево рекурсии):");
  console.log("Начинаем с пустой последовательности []");
  console.log("Для каждой позиции перебираем числа от 1 до k");
  console.log("Пример для n=2, k=2:");
  console.log("  []");
  console.log("  ├── [1]");
  console.log("  │   ├── [1,1]");
  console.log("  │   └── [1,2]");
  console.log("  └── [2]");
  console.log("      ├── [2,1]");
  console.log("      └── [2,2]");
}
