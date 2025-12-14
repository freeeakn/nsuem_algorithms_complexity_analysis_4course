/*
6.1.1. Проверьте правильность последовательности за время, не
превосходящее константы, умноженной на её длину. Предполагается,
что члены последовательности закодированы числами:
( 1
[ 2
) −1
] −2
*/

export class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // Добавление элемента на вершину стека
  push(element: T): void {
    this.items.push(element);
  }

  // Удаление и возврат элемента с вершины стека
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  // Просмотр элемента на вершине стека без удаления
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // Проверка на пустоту стека
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Размер стека
  size(): number {
    return this.items.length;
  }

  // Очистка стека
  clear(): void {
    this.items = [];
  }

  // Преобразование в строку для отладки
  toString(): string {
    return `Stack [${this.items.join(", ")}]`;
  }
}

// Функция проверки правильности скобочной последовательности
export const validateBracketSequence = (sequence: number[]): boolean => {
  const stack = new Stack<number>();

  // Определяем пары скобок
  const bracketPairs = new Map<number, number>([
    [1, -1], // ( => )
    [2, -2], // [ => ]
    [-1, 1], // ) => (
    [-2, 2], // ] => [
  ]);

  for (const bracket of sequence) {
    // Если это открывающая скобка (положительное число)
    if (bracket > 0) {
      stack.push(bracket);
    }
    // Если это закрывающая скобка (отрицательное число)
    else {
      // Проверяем, соответствует ли она последней открывающей
      const lastOpenBracket = stack.peek();

      if (
        lastOpenBracket !== undefined &&
        bracketPairs.get(lastOpenBracket) === bracket
      ) {
        // Нашли пару - удаляем открывающую скобку из стека
        stack.pop();
      } else {
        // Несоответствие скобок
        return false;
      }
    }
  }

  // Если стек пуст - все скобки нашли свои пары
  return stack.isEmpty();
};

// Тестирование
export const testBracketValidation = () => {
  const testCases = [
    { sequence: [1, -1], expected: true, description: "Простые скобки ()" },
    { sequence: [2, -2], expected: true, description: "Простые скобки []" },
    {
      sequence: [1, 2, -2, -1],
      expected: true,
      description: "Вложенные скобки ([ ])",
    },
    {
      sequence: [1, 2, -1, -2],
      expected: false,
      description: "Неправильная вложенность ([ ) ]",
    },
    {
      sequence: [1, -1, 2, -2],
      expected: true,
      description: "Последовательные скобки () []",
    },
    {
      sequence: [1, 1, -1, -1],
      expected: true,
      description: "Много круглых скобок (())",
    },
    {
      sequence: [1, -1, -1],
      expected: false,
      description: "Лишняя закрывающая",
    },
    {
      sequence: [1, 2, 2, -2, -2, -1],
      expected: true,
      description: "Сложная вложенность ([[]])",
    },
    { sequence: [], expected: true, description: "Пустая последовательность" },
    { sequence: [1], expected: false, description: "Только открывающая" },
    { sequence: [-1], expected: false, description: "Только закрывающая" },
  ];

  console.log("Тестирование validateBracketSequence:");
  testCases.forEach((test, index) => {
    const result = validateBracketSequence(test.sequence);
    const status = result === test.expected ? "OK" : "BAD";
    console.log(`${status} ${index + 1}. ${test.description}`);
    console.log(`   Последовательность: [${test.sequence.join(", ")}]`);
    console.log(`   Ожидалось: ${test.expected}, Получено: ${result}`);
    if (result !== test.expected) {
      console.log(`   ОШИБКА!`);
    }
  });
};

// Функция для преобразования строки в числовую последовательность
function stringToBracketSequence(str: string): number[] {
  const mapping: { [key: string]: number } = {
    "(": 1,
    "[": 2,
    ")": -1,
    "]": -2,
  };

  const result: number[] = [];
  for (const char of str) {
    if (mapping[char] !== undefined) {
      result.push(mapping[char]);
    }
  }
  return result;
}

// Тестирование со строковым вводом
export const testWithStringInput = () => {
  console.log("\nТестирование со строковым вводом:");

  const testStrings = [
    "()",
    "[]",
    "([])",
    "([)]",
    "()[]",
    "(())",
    "([[]])",
    "(",
    ")",
    "",
    "([)",
  ];

  testStrings.forEach((str) => {
    const sequence = stringToBracketSequence(str);
    const isValid = validateBracketSequence(sequence);
    console.log(
      `"${str}" => [${sequence.join(", ")}] => ${
        isValid ? "валидно" : "невалидно"
      }`
    );
  });
};
