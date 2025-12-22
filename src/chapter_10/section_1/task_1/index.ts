/*
10.1.1. Имеется последовательность символов x[1] . . . x[n]. Опреде-
лите, имеются ли в ней идущие друг за другом символы abcd. (Други-
ми словами, требуется выяснить, есть ли в слове x[1] . . . x[n] подслово
abcd.)
*/

// Простой линейный поиск подстроки "abcd"
export function findSubstringSimple(
  text: string,
  pattern: string = "abcd"
): boolean {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return true; // Пустая подстрока всегда найдена
  if (n < m) return false; // Текст короче шаблона

  for (let i = 0; i <= n - m; i++) {
    let found = true;

    for (let j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        found = false;
        break;
      }
    }

    if (found) {
      return true;
    }
  }

  return false;
}

// Оптимизированный поиск с использованием конечного автомата
export function findSubstringAutomaton(
  text: string,
  pattern: string = "abcd"
): boolean {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return true;
  if (n < m) return false;

  // Строим таблицу переходов для конечного автомата
  const alphabet = new Set<string>();
  for (const char of text + pattern) {
    alphabet.add(char);
  }

  // Таблица переходов: состояние × символ → следующее состояние
  const transitionTable: number[][] = new Array(m + 1);
  for (let i = 0; i <= m; i++) {
    transitionTable[i] = new Array(alphabet.size);
  }

  // Заполняем таблицу переходов
  const alphabetArray = Array.from(alphabet);

  for (let state = 0; state <= m; state++) {
    for (let charIndex = 0; charIndex < alphabetArray.length; charIndex++) {
      const char = alphabetArray[charIndex];

      if (state < m && char === pattern[state]) {
        // Если символ совпадает с ожидаемым, переходим в следующее состояние
        transitionTable[state][charIndex] = state + 1;
      } else {
        // Ищем наибольший префикс шаблона, который является суффиксом pattern[0..state-1] + char
        let nextState = 0;

        // Проверяем все возможные длины префиксов
        for (let k = Math.min(state + 1, m); k > 0; k--) {
          // Проверяем, является ли pattern[0..k-1] суффиксом pattern[0..state-1] + char
          let isSuffix = true;

          // Проверяем последние k символов
          for (let j = 0; j < k - 1; j++) {
            if (pattern[j] !== pattern[state - k + j + 1]) {
              isSuffix = false;
              break;
            }
          }

          // Проверяем последний символ
          if (isSuffix && pattern[k - 1] === char) {
            nextState = k;
            break;
          }
        }

        transitionTable[state][charIndex] = nextState;
      }
    }
  }

  // Запускаем автомат
  let currentState = 0;
  const charToIndex = new Map<string, number>();
  alphabetArray.forEach((char, index) => charToIndex.set(char, index));

  for (let i = 0; i < n; i++) {
    const char = text[i];
    const charIndex = charToIndex.get(char)!;
    currentState = transitionTable[currentState][charIndex];

    if (currentState === m) {
      return true; // Достигнуто конечное состояние
    }
  }

  return false;
}

// Алгоритм Кнута-Морриса-Пратта (KMP)
export function findSubstringKMP(
  text: string,
  pattern: string = "abcd"
): boolean {
  const n = text.length;
  const m = pattern.length;

  if (m === 0) return true;
  if (n < m) return false;

  // Вычисляем префикс-функцию для шаблона
  const lps: number[] = new Array(m).fill(0); // Longest Prefix Suffix

  let length = 0; // Длина текущего префикса-суффикса
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  // Поиск шаблона в тексте
  i = 0; // Индекс в тексте
  let j = 0; // Индекс в шаблоне

  while (i < n) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === m) {
      return true; // Нашли подстроку
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return false;
}

// Специализированная функция для поиска "abcd"
export function findAbcd(text: string): boolean {
  const n = text.length;

  if (n < 4) return false;

  // Простой линейный поиск для конкретного случая "abcd"
  for (let i = 0; i <= n - 4; i++) {
    if (
      text[i] === "a" &&
      text[i + 1] === "b" &&
      text[i + 2] === "c" &&
      text[i + 3] === "d"
    ) {
      return true;
    }
  }

  return false;
}

// Функция для поиска всех вхождений
export function findAllOccurrences(
  text: string,
  pattern: string = "abcd"
): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;

  if (m === 0 || n < m) return positions;

  for (let i = 0; i <= n - m; i++) {
    let found = true;

    for (let j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        found = false;
        break;
      }
    }

    if (found) {
      positions.push(i);
    }
  }

  return positions;
}

// Тестирование алгоритмов поиска подстроки
export function testSubstringSearch(): void {
  console.log("=== Поиск подстроки 'abcd' в тексте ===");

  const testCases = [
    { text: "abcde", expected: true, description: "в начале" },
    { text: "xyzabcd", expected: true, description: "в середине" },
    {
      text: "xyzabcdxyz",
      expected: true,
      description: "в середине с символами вокруг",
    },
    { text: "abcabcabcd", expected: true, description: "повторения" },
    { text: "aaaa", expected: false, description: "только a" },
    { text: "abc", expected: false, description: "слишком коротко" },
    { text: "", expected: false, description: "пустая строка" },
    { text: "ab cd", expected: false, description: "с пробелом" },
    { text: "aabbccdd", expected: false, description: "парные символы" },
    { text: "abcdabcd", expected: true, description: "два вхождения" },
    { text: "AAAABCD", expected: false, description: "заглавные буквы" },
    { text: "abcD", expected: false, description: "последняя заглавная" },
    {
      text: "xabcabcdabc",
      expected: true,
      description: "частичное перекрытие",
    },
  ];

  console.log("\nТестирование простого линейного поиска:");
  testCases.forEach(({ text, expected, description }) => {
    const result = findSubstringSimple(text, "abcd");
    const status = result === expected ? "OK" : "BAD";
    console.log(
      `${status} "${text}" (${description}): ${result}, ожидалось ${expected}`
    );
  });

  console.log("\nТестирование специализированной функции findAbcd:");
  testCases.forEach(({ text, expected, description }) => {
    const result = findAbcd(text);
    const status = result === expected ? "OK" : "BAD";
    console.log(
      `${status} "${text}" (${description}): ${result}, ожидалось ${expected}`
    );
  });

  console.log("\nТестирование алгоритма КМП:");
  testCases.forEach(({ text, expected, description }) => {
    const result = findSubstringKMP(text, "abcd");
    const status = result === expected ? "OK" : "BAD";
    console.log(
      `${status} "${text}" (${description}): ${result}, ожидалось ${expected}`
    );
  });

  // Сравнение производительности
  console.log("\n=== Сравнение производительности ===");

  const longText = "abc".repeat(1000) + "abcd" + "xyz".repeat(1000);
  const pattern = "abcd";

  console.log(`Текст длиной ${longText.length} символов`);

  // Простой поиск
  const startSimple = Date.now();
  const resultSimple = findSubstringSimple(longText, pattern);
  const timeSimple = Date.now() - startSimple;
  console.log(`Простой поиск: ${timeSimple} мс, результат: ${resultSimple}`);

  // Специализированный поиск
  const startAbcd = Date.now();
  const resultAbcd = findAbcd(longText);
  const timeAbcd = Date.now() - startAbcd;
  console.log(
    `Специализированный поиск: ${timeAbcd} мс, результат: ${resultAbcd}`
  );

  // Алгоритм КМП
  const startKMP = Date.now();
  const resultKMP = findSubstringKMP(longText, pattern);
  const timeKMP = Date.now() - startKMP;
  console.log(`Алгоритм КМП: ${timeKMP} мс, результат: ${resultKMP}`);

  // Поиск всех вхождений
  console.log("\n=== Поиск всех вхождений ===");
  const multiOccurrenceText = "abcdxyzabcd123abcd";
  const allPositions = findAllOccurrences(multiOccurrenceText, "abcd");
  console.log(`Текст: "${multiOccurrenceText}"`);
  console.log(
    `Подстрока "abcd" найдена на позициях: [${allPositions.join(", ")}]`
  );
  console.log(`Всего вхождений: ${allPositions.length}`);
}

// Анализ сложности алгоритмов
export function analyzeAlgorithms(): void {
  console.log("\n=== Анализ сложности алгоритмов поиска подстроки ===");

  console.log("1. Простой линейный поиск:");
  console.log("   - Время: O(n*m) в худшем случае");
  console.log("   - Память: O(1)");
  console.log("   - Где: n - длина текста, m - длина шаблона");
  console.log(
    "   - Пример худшего случая: текст = 'aaaaaaaa', шаблон = 'aaaab'"
  );

  console.log("\n2. Алгоритм Кнута-Морриса-Пратта (KMP):");
  console.log("   - Время: O(n + m)");
  console.log("   - Память: O(m) для префикс-функции");
  console.log("   - Препроцессинг шаблона: O(m)");
  console.log("   - Поиск в тексте: O(n)");
  console.log("   - Не возвращается назад в тексте");

  console.log("\n3. Конечный автомат:");
  console.log("   - Время: O(n) после построения автомата");
  console.log("   - Память: O(m*|Σ|), где |Σ| - размер алфавита");
  console.log("   - Препроцессинг: O(m*|Σ|)");
  console.log("   - Эффективен при многократном поиске одного шаблона");

  console.log("\n4. Для конкретного случая 'abcd':");
  console.log("   - Можно использовать специализированную функцию");
  console.log("   - Время: O(n) в худшем случае");
  console.log("   - Память: O(1)");
  console.log("   - Константа перед O(n) меньше, чем у общего алгоритма");

  console.log("\nРекомендации по выбору алгоритма:");
  console.log("   - Если шаблон короткий и фиксированный → простой поиск");
  console.log(
    "   - Если нужно искать много раз в одном тексте → построить индекс"
  );
  console.log(
    "   - Если шаблон длинный или поиск многократный → KMP или автомат"
  );
  console.log("   - Если алфавит большой → KMP предпочтительнее автомата");
}

// Демонстрация пошагового выполнения
export function demonstrateStepByStep3(): void {
  console.log("\n=== Пошаговая демонстрация простого поиска ===");

  const text = "xyzabcdef";
  const pattern = "abcd";

  console.log(`Текст: "${text}"`);
  console.log(`Ищем подстроку: "${pattern}"`);
  console.log("\nШаги поиска:");

  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    console.log(
      `\nПозиция ${i}: сравниваем "${text.substring(i, i + m)}" с "${pattern}"`
    );

    let match = true;
    for (let j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        console.log(
          `  Не совпадает на позиции ${j}: '${text[i + j]}' != '${pattern[j]}'`
        );
        match = false;
        break;
      }
    }

    if (match) {
      console.log(`OK Найдено на позиции ${i}!`);
      return;
    }
  }

  console.log("\nBAD Подстрока не найдена");
}

// Примеры из реальной жизни
export function demonstrateRealWorldExamples(): void {
  console.log("\n=== Примеры из реальной жизни ===");

  console.log("1. Поиск ключевых слов в тексте:");
  const document =
    "В этом документе содержится важная информация abcd о проекте.";
  console.log(`   Документ: "${document}"`);
  console.log(`   Содержит 'abcd': ${findAbcd(document) ? "Да" : "Нет"}`);

  console.log("\n2. Валидация ввода пользователя:");
  const userInput = "my_password_abcd_123";
  console.log(`   Ввод пользователя: "${userInput}"`);
  console.log(
    `   Содержит запрещённую последовательность 'abcd': ${
      findAbcd(userInput) ? "Да" : "Нет OK"
    }`
  );

  console.log("\n3. Анализ DNA-последовательностей:");
  const dnaSequence = "ATCGABCDATCG";
  console.log(`   DNA-последовательность: "${dnaSequence}"`);
  console.log(
    `   Содержит маркер 'ABCD': ${
      findSubstringSimple(dnaSequence, "ABCD") ? "Да" : "Нет"
    }`
  );

  console.log("\n4. Поиск в лог-файлах:");
  const logEntry = " ERROR: abcd exception occurred at module XYZ";
  console.log(`   Лог-запись: "${logEntry}"`);
  console.log(
    `   Содержит 'abcd': ${findAbcd(logEntry) ? "Да, возможно ошибка" : "Нет"}`
  );

  console.log("\n5. Проверка сложности пароля:");
  const password = "passabcd123";
  console.log(`   Пароль: "${password}"`);
  console.log(
    `   Содержит простую последовательность 'abcd': ${
      findAbcd(password) ? "Да  (слишком просто)" : "Нет OK"
    }`
  );
}
