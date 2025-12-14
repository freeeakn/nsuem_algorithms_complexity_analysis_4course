export function factorialRecursive(n: number): number {
  // Базовый случай: факториал 0 и 1 равен 1
  if (n <= 1) {
    return 1;
  }

  // Рекурсивный случай: n! = n * (n-1)!
  return n * factorialRecursive(n - 1);
}

// Вспомогательная функция с проверкой входных данных
export function safeFactorialRecursive(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error(
      "Факториал определен только для целых неотрицательных чисел"
    );
  }

  if (n > 20) {
    throw new Error(
      "Для n > 20 результат может превышать максимальное целое число в JavaScript"
    );
  }

  return factorialRecursive(n);
}

export function testFactorialRecursive(): void {
  console.log("=== Тестирование рекурсивного вычисления факториала ===");

  const testCases = [
    { n: 0, expected: 1 },
    { n: 1, expected: 1 },
    { n: 2, expected: 2 },
    { n: 3, expected: 6 },
    { n: 4, expected: 24 },
    { n: 5, expected: 120 },
    { n: 6, expected: 720 },
    { n: 7, expected: 5040 },
    { n: 8, expected: 40320 },
    { n: 9, expected: 362880 },
    { n: 10, expected: 3628800 },
  ];

  testCases.forEach(({ n, expected }) => {
    const result = safeFactorialRecursive(n);
    const status = result === expected ? "✓" : "✗";
    console.log(`${status} factorialRecursive(${n}) = ${result}`);
    if (result !== expected) {
      console.log(`   Ожидалось: ${expected}`);
    }
  });

  // Проверка обработки ошибок
  console.log("\n--- Проверка обработки ошибок ---");

  const errorCases = [
    { n: -1, description: "отрицательное число" },
    { n: 3.5, description: "нецелое число" },
    {
      n: 25,
      description: "слишком большое число (может вызвать переполнение стека)",
    },
  ];

  errorCases.forEach(({ n, description }) => {
    try {
      safeFactorialRecursive(n);
      console.log(`✗ Не сгенерирована ошибка для ${description} (n = ${n})`);
    } catch (error: any) {
      console.log(
        `✓ Правильно обработана ошибка для ${description}: ${error.message}`
      );
    }
  });

  // Анализ рекурсивных вызовов
  console.log("\n--- Анализ рекурсии ---");
  console.log("Для factorialRecursive(n) происходит n рекурсивных вызовов");
  console.log("Глубина рекурсии: O(n)");
  console.log("При n > ~10000 может произойти переполнение стека вызовов");
}
