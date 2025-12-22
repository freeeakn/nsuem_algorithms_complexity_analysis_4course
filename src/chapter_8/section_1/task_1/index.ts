/*
8.1.1. Следующая рекурсивная процедура вычисляет числа сочета-
ний (биномиальные коэффициенты). Напишите эквивалентную нере-
курсивную программу.
function C(n,k: integer):integer;
{n >= 0; 0 <= k <=n}
begin
if (k = 0) or (k = n) then begin
C:=1;
end else begin {0<k<n}
C:= C(n-1,k-1)+C(n-1,k)
end;
end;
136 8. Как обойтись без рекурсии
Замечание. 𝐶𝑘 𝑛 | число 𝑘-элементных подмножеств 𝑛-элементного
множества. Соотношение 𝐶𝑘 𝑛 = 𝐶𝑘−1
𝑛−1 + 𝐶𝑘 𝑛−1 получится, если мы фикси-
руем некоторый элемент 𝑛-элементного множества и отдельно подсчи-
таем 𝑘-элементные подмножества, включающие и не включающие этот
элемент. Таблица значений 𝐶𝑘 𝑛
*/

// Рекурсивная версия (из условия)
export function binomialCoefficientRecursive(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  return (
    binomialCoefficientRecursive(n - 1, k - 1) +
    binomialCoefficientRecursive(n - 1, k)
  );
}

// Нерекурсивная версия с использованием динамического программирования (полная таблица)
export function binomialCoefficientDP(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // Создаём таблицу (n+1) x (n+1), но используем только треугольник
  const C: number[][] = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    C[i] = new Array(i + 1); // Нужны только значения до i
  }

  // Заполняем треугольник Паскаля
  for (let i = 0; i <= n; i++) {
    C[i][0] = 1; // C(i,0) = 1
    C[i][i] = 1; // C(i,i) = 1

    for (let j = 1; j < i; j++) {
      C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
    }
  }

  return C[n][k];
}

// Оптимизированная версия с использованием одного массива
export function binomialCoefficientOptimized(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // Минимизируем вычисления: C(n,k) = C(n, n-k)
  k = Math.min(k, n - k);

  // Используем один массив вместо двухмерного
  const C: number[] = new Array(k + 1).fill(0);
  C[0] = 1; // C(0,0) = 1

  // Заполняем построчно
  for (let i = 1; i <= n; i++) {
    // Обновляем массив справа налево, чтобы не портить значения
    for (let j = Math.min(i, k); j > 0; j--) {
      C[j] = C[j] + C[j - 1];
    }
  }

  return C[k];
}

// Нерекурсивная версия с использованием формулы C(n,k) = n!/(k!(n-k)!)
export function binomialCoefficientFormula(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // Минимизируем вычисления
  k = Math.min(k, n - k);

  let result = 1;

  // Вычисляем n!/(n-k)! = n*(n-1)*...*(n-k+1)
  for (let i = 1; i <= k; i++) {
    result = (result * (n - k + i)) / i;
  }

  return Math.round(result); // Всегда целое число
}

// Функция для построения треугольника Паскаля
export function generatePascalTriangle(rows: number): number[][] {
  const triangle: number[][] = [];

  for (let i = 0; i < rows; i++) {
    triangle[i] = new Array(i + 1);
    triangle[i][0] = 1;
    triangle[i][i] = 1;

    for (let j = 1; j < i; j++) {
      triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
  }

  return triangle;
}

// Функция для печати треугольника Паскаля
export function printPascalTriangle(rows: number): void {
  const triangle = generatePascalTriangle(rows);

  console.log(`Треугольник Паскаля (${rows} строк):`);
  console.log("=".repeat(rows * 4));

  for (let i = 0; i < triangle.length; i++) {
    // Центрируем строку
    const padding = " ".repeat((rows - i - 1) * 2);
    const numbers = triangle[i]
      .map((num) => num.toString().padStart(3, " "))
      .join(" ");
    console.log(padding + numbers);
  }

  console.log("=".repeat(rows * 4));
}

export function testBinomialCoefficients(): void {
  console.log("=== Вычисление биномиальных коэффициентов C(n,k) ===");

  // Тест 1: Базовые случаи
  console.log("\n1. Базовые случаи:");
  const testCases1 = [
    { n: 0, k: 0, expected: 1 },
    { n: 5, k: 0, expected: 1 },
    { n: 5, k: 5, expected: 1 },
    { n: 10, k: 10, expected: 1 },
  ];

  testCases1.forEach(({ n, k, expected }) => {
    const result = binomialCoefficientOptimized(n, k);
    const status = result === expected ? "OK" : "BAD";
    console.log(`${status} C(${n},${k}) = ${result} (ожидалось ${expected})`);
  });

  // Тест 2: Стандартные значения
  console.log("\n2. Стандартные значения:");
  const testCases2 = [
    { n: 4, k: 2, expected: 6 }, // C(4,2) = 6
    { n: 5, k: 2, expected: 10 }, // C(5,2) = 10
    { n: 6, k: 3, expected: 20 }, // C(6,3) = 20
    { n: 7, k: 4, expected: 35 }, // C(7,4) = 35
    { n: 8, k: 4, expected: 70 }, // C(8,4) = 70
  ];

  testCases2.forEach(({ n, k, expected }) => {
    const result = binomialCoefficientOptimized(n, k);
    const status = result === expected ? "OK" : "BAD";
    console.log(`${status} C(${n},${k}) = ${result} (ожидалось ${expected})`);
  });

  // Тест 3: Сравнение всех методов
  console.log("\n3. Сравнение всех методов вычисления:");
  const n = 10,
    k = 4;

  console.log(`Вычисление C(${n},${k}):`);
  console.log(`  Рекурсивный: ${binomialCoefficientRecursive(n, k)}`);
  console.log(
    `  Динамическое программирование: ${binomialCoefficientDP(n, k)}`
  );
  console.log(`  Оптимизированный DP: ${binomialCoefficientOptimized(n, k)}`);
  console.log(`  По формуле: ${binomialCoefficientFormula(n, k)}`);

  // Проверяем, что все методы дают одинаковый результат
  const results = [
    binomialCoefficientRecursive(n, k),
    binomialCoefficientDP(n, k),
    binomialCoefficientOptimized(n, k),
    binomialCoefficientFormula(n, k),
  ];

  const allEqual = results.every((val) => val === results[0]);
  console.log(`  Все результаты совпадают: ${allEqual ? "OK" : "BAD"}`);

  // Тест 4: Большие значения
  console.log("\n4. Большие значения (рекурсивный метод будет медленным):");
  const largeN = 20,
    largeK = 10;

  console.log(`Вычисление C(${largeN},${largeK}):`);

  const startDP = Date.now();
  const resultDP = binomialCoefficientDP(largeN, largeK);
  const timeDP = Date.now() - startDP;
  console.log(`  DP метод: ${resultDP} (${timeDP} мс)`);

  const startOpt = Date.now();
  const resultOpt = binomialCoefficientOptimized(largeN, largeK);
  const timeOpt = Date.now() - startOpt;
  console.log(`  Оптимизированный DP: ${resultOpt} (${timeOpt} мс)`);

  const startFormula = Date.now();
  const resultFormula = binomialCoefficientFormula(largeN, largeK);
  const timeFormula = Date.now() - startFormula;
  console.log(`  По формуле: ${resultFormula} (${timeFormula} мс)`);

  console.log(
    `  Результаты совпадают: ${
      resultDP === resultOpt && resultOpt === resultFormula ? "OK" : "BAD"
    }`
  );

  // Тест 5: Проверка симметрии C(n,k) = C(n, n-k)
  console.log("\n5. Проверка симметрии C(n,k) = C(n, n-k):");
  const testCases5 = [
    { n: 7, k: 2 },
    { n: 8, k: 3 },
    { n: 9, k: 4 },
  ];

  testCases5.forEach(({ n, k }) => {
    const c1 = binomialCoefficientOptimized(n, k);
    const c2 = binomialCoefficientOptimized(n, n - k);
    console.log(
      `  C(${n},${k}) = ${c1}, C(${n},${n - k}) = ${c2}, совпадают: ${
        c1 === c2 ? "OK" : "BAD"
      }`
    );
  });
}

export function demonstrateRecursionProblem(): void {
  console.log("\n=== Проблема рекурсивного вычисления ===");

  console.log("Рекурсивная функция вычисляет одно значение много раз:");
  console.log("C(5,2) = C(4,1) + C(4,2)");
  console.log("        = [C(3,0) + C(3,1)] + [C(3,1) + C(3,2)]");
  console.log(
    "        = [1 + [C(2,0) + C(2,1)]] + [[C(2,0) + C(2,1)] + [C(2,1) + C(2,2)]]"
  );
  console.log("        = ... и так далее");

  console.log("\nДерево рекурсивных вызовов для C(4,2):");
  console.log("C(4,2)");
  console.log("├── C(3,1)");
  console.log("│   ├── C(2,0) = 1");
  console.log("│   └── C(2,1)");
  console.log("│       ├── C(1,0) = 1");
  console.log("│       └── C(1,1) = 1");
  console.log("└── C(3,2)");
  console.log("    ├── C(2,1) <- вычисляется повторно!");
  console.log("    │   ├── C(1,0) = 1");
  console.log("    │   └── C(1,1) = 1");
  console.log("    └── C(2,2) = 1");

  console.log("\nПроблема: многие значения вычисляются многократно!");
  console.log(
    "Решение: динамическое программирование (запоминание результатов)"
  );
}

export function printTriangleAndExamples(): void {
  console.log("\n=== Треугольник Паскаля и примеры ===");

  // Печатаем треугольник Паскаля
  printPascalTriangle(8);

  console.log("\nПримеры вычислений из треугольника:");
  console.log("C(5,2) = 10 (строка 5, позиция 2)");
  console.log("C(6,3) = 20 (строка 6, позиция 3)");
  console.log("C(7,4) = 35 (строка 7, позиция 4)");

  console.log("\nСвойства треугольника Паскаля:");
  console.log("1. Каждое число = сумме двух чисел над ним");
  console.log("2. Симметрия: C(n,k) = C(n, n-k)");
  console.log("3. Сумма чисел в строке n = 2^n");
  console.log("4. Числа в строке соответствуют коэффициентам (a+b)^n");
}
