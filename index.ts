import {
  swapWithoutTemp,
  swapWithTemp,
} from "./src/chapter_1/section_1/task_1";
import { fibonacciLogN } from "./src/chapter_1/section_1/task_10";
import { sumInverseFactorials } from "./src/chapter_1/section_1/task_11";
import { sumInverseFactorialsOptimized } from "./src/chapter_1/section_1/task_12";
import { gcdEuclid } from "./src/chapter_1/section_1/task_13";
import { gcdEuclidMod } from "./src/chapter_1/section_1/task_14";
import { extendedEuclid } from "./src/chapter_1/section_1/task_15";
import { swapXOR } from "./src/chapter_1/section_1/task_2";
import { powerLinear } from "./src/chapter_1/section_1/task_3";
import { powerLogN } from "./src/chapter_1/section_1/task_4";
import { multiplyByAddition } from "./src/chapter_1/section_1/task_5";
import { addByIncrement } from "./src/chapter_1/section_1/task_6";
import { divideWithRemainder } from "./src/chapter_1/section_1/task_7";
import { factorial } from "./src/chapter_1/section_1/task_8";
import { fibonacci } from "./src/chapter_1/section_1/task_9";
import { reverseArray } from "./src/chapter_1/section_2/task_10";
import { horner } from "./src/chapter_1/section_2/task_12";
import { intersectionSorted } from "./src/chapter_1/section_2/task_21";
import { binarySearch } from "./src/chapter_1/section_2/task_27";
import { findMax } from "./src/chapter_1/section_2/task_4";
import { countDistinctSorted } from "./src/chapter_1/section_2/task_5";
import { isSubsequence } from "./src/chapter_1/section_3/task_2";
import { longestCommonSubsequence } from "./src/chapter_1/section_3/task_3";
import { allSequences } from "./src/chapter_2/section_1/task_1";
import { permutations } from "./src/chapter_2/section_2/task_1";
import { kSubsets } from "./src/chapter_2/section_3/task_1";
import { partitions } from "./src/chapter_2/section_4/task_1";
import { grayCode } from "./src/chapter_2/section_5/task_1";
import { generateCatalanSequences } from "./src/chapter_2/section_6/task_1";
import { catalanNumber } from "./src/chapter_2/section_7/task_3";
import { solveNQueens } from "./src/chapter_3/section_1/task_1";
import { subsetSum } from "./src/chapter_3/section_2/task_1";
import { selectionSort } from "./src/chapter_4/section_1/task_1";
import { insertionSort } from "./src/chapter_4/section_1/task_2";
import { heapSort, mergeSort } from "./src/chapter_4/section_2/task_1";
import { replaceDoubleAsterisk } from "./src/chapter_5/section_1/task_1";
import { removeAbcSubstrings } from "./src/chapter_5/section_1/task_2";
import {
  Stack,
  testBracketValidation,
  testWithStringInput,
} from "./src/chapter_6/section_1/task_1";
import { MultiStack } from "./src/chapter_6/section_1/task_4";
import {
  demonstrateQueueEfficiency,
  Queue,
  testQueue,
} from "./src/chapter_6/section_2/task_1";
import {
  benchmarkSets,
  BooleanSet,
  demonstrateSetScenarios,
  testSets,
} from "./src/chapter_6/section_3/task_1";
import { MinArray, testMinArray } from "./src/chapter_6/section_4/task_1";
import {
  factorialRecursive,
  testFactorialRecursive,
} from "./src/chapter_7/section_1/task_1";
import {
  buildBinaryTreeFromLR,
  drawTreeASCII,
  testBuildTree,
  testValidTree,
} from "./src/chapter_7/section_2/task_1";
import {
  demonstrateLargeExample,
  generateSequencesRecursive,
  printSequences,
  testSequences,
} from "./src/chapter_7/section_3/task_1";

const main = () => {
  // ! Тестирование всех заданий
  console.log("Печёнкин Артур Фи202");

  const testNumbers_b = {
    a: 2,
    b: 5,
  };
  const testNumbers_n = {
    a: 2,
    n: 5,
  };

  // ! Глава 1, Раздел 1
  console.log("=== Глава 1, Раздел 1 ===");
  console.log("Задание 1.1.1");
  console.log(
    "swapWithTemp\na = 2, b = 5, result = ",
    swapWithTemp(testNumbers_b)
  );
  console.log(
    "swapWithoutTemp\na = 2, b = 5, result = ",
    swapWithoutTemp(testNumbers_b)
  );

  console.log("Задание 1.1.2");
  console.log("swapXOR\na = 2, b = 5, result = ", swapXOR(testNumbers_b));

  console.log("Задание 1.1.3");
  console.log(
    "powerLinear\na = 2, n = 5, result = ",
    powerLinear(testNumbers_n)
  );

  console.log("Задание 1.1.4");
  console.log("powerLogN\na = 2, n = 5, result = ", powerLogN(testNumbers_n));

  console.log("Задание 1.1.5");
  console.log(
    "multiplyByAddition\na = 2, b = 5, result = ",
    multiplyByAddition(testNumbers_b)
  );

  console.log("Задание 1.1.6");
  console.log(
    "addByIncrement\na = 2, b = 5, result = ",
    addByIncrement(testNumbers_b)
  );

  console.log("Задание 1.1.7");
  console.log(
    "divideWithRemainder\na = 2, b = 5, result = ",
    divideWithRemainder(testNumbers_b)
  );

  console.log("Задание 1.1.8");
  console.log("factorial\nn = 5, result = ", factorial(5));

  console.log("Задание 1.1.9");
  console.log("fibonacci\nn = 10, result = ", fibonacci(10));

  console.log("Задание 1.1.10");
  console.log("fibonacciLogN\nn = 10, result = ", fibonacciLogN(10));

  console.log("Задание 1.1.11");
  console.log(
    "sumInverseFactorials\nn = 17, result =",
    sumInverseFactorials(17)
  );

  console.log("Задание 1.1.12");
  console.log(
    "sumInverseFactorialsOptimized\nn = 17, result =",
    sumInverseFactorialsOptimized(17)
  );

  console.log("Задание 1.1.13");
  console.log("gcdEuclid\na = 2, b = 5, result =", gcdEuclid(testNumbers_b));

  console.log("Задание 1.1.14");
  console.log(
    "gcdEuclidMod\na = 2, b = 5, result: ",
    gcdEuclidMod(testNumbers_b)
  );

  console.log("Задание 1.1.15");
  console.log("extendedEuclid\na = 2, b = 5: ", extendedEuclid(testNumbers_b));

  // ! Глава 1, Раздел 2
  console.log("\n=== Глава 1, Раздел 2 ===");
  const testArray = [1, 3, 5, 7, 9, 11, 13];
  const unsortedArray = [64, 34, 25, 12, 22, 11, 90];

  console.log("Задание 1.2.4");
  console.log("findMax([1,3,5,7,9,11,13]): ", findMax(testArray));

  console.log("Задание 1.2.5");
  console.log(
    "countDistinctSorted([1,3,5,7,9,11,13]): ",
    countDistinctSorted(testArray)
  );

  console.log("Задание 1.2.10 - Реверс массива");
  const arrayForReverse = [...unsortedArray];
  console.log("reverseArray до: ", unsortedArray);
  console.log("reverseArray после: ", reverseArray(arrayForReverse));

  console.log("Задание 1.2.12 - Cхема Горнера");
  console.log(
    "Схема Горнера\ncoeffs = [1,3,5,7,9,11,13], x = 2: ",
    horner({ coeffs: testArray, x: 2 })
  );

  console.log("Задание 1.2.21 - Перечисление двух отсортированных массивов");
  console.log(
    "intersectionSorted\narr1 = [64, 34, 25, 12, 22, 11, 90], arr2 = [1, 3, 5, 7, 9, 11, 13]: ",
    intersectionSorted(unsortedArray, testArray)
  );

  console.log("Задание 1.2.27 - Бинарный поиск");
  console.log(
    "binarySearch\narr = [1, 3, 5, 7, 9, 11, 13], x = 13: ",
    binarySearch(testArray, 13)
  );

  // ! Глава 1, Раздел 3
  console.log("\n=== Глава 1, Раздел 3 ===");
  console.log("Задание 1.3.2 - Проверка последовательности");
  console.log(
    "isSubsequence\nsub = [1, 2, 3], arr = [1, 2, 3, 4, 5]: ",
    isSubsequence([1, 2, 3], [1, 2, 3, 4, 5])
  );

  console.log("Задание 1.3.3 - Длина наибольшей общей подпоследовательности");
  console.log(
    "longestCommonSubsequence\narr1 = [1, 2, 3], arr2 = [1, 2, 3, 4, 5]: ",
    longestCommonSubsequence([1, 2, 3], [1, 2, 3, 4, 5])
  );

  // ! Глава 2
  console.log("\n=== Глава 2");
  console.log("Задание 2.1.1 - Все последовательности длины k");
  console.log("allSequences\nk = 2, n = 3: ", allSequences(2, 3));

  console.log("Задание 2.2.1 - Все перестановки");
  console.log("permutations\nn = 5: ", permutations(5));

  console.log("Задание 2.3.1 - Все k-элементные подмножества");
  console.log("kSubsets\nk = 2, n = 5: ", kSubsets(2, 5));

  console.log("Задание 2.4.1 - Все разбиения числа");
  console.log("partitions\nn = 5: ", partitions(5));

  console.log("Задание 2.5.1 - Код Грея");
  console.log("grayCode\nn = 3: ", grayCode(3));

  console.log("Задание 2.6.1 - Числа Каталана (последовательности)");
  console.log("generateCatalanSequences\nn = 5: ", generateCatalanSequences(5));

  console.log("Задание 2.7.3 - Вычисление числа Каталана");
  console.log("catalanNumber\nn = 5: ", catalanNumber(5));

  // ! Глава 3
  console.log("\n=== Глава 3 ===");
  console.log(
    "Задание 3.1.1 - Задача о ферзях Перечислите все способы расстановки 𝑛 ферзей на шахматной доске 𝑛 ×𝑛, при которых они не бьют друг друга."
  );
  console.log("solveNQueens\nn = 4: ", solveNQueens(4));

  console.log("Задание 3.2.1 - Задача о рюкзаке (проверка суммы)");
  console.log(
    "subsetSum\nitems = [2, 3, 4, 7], capacity = 9: ",
    subsetSum([2, 3, 4, 7], 9)
  );

  // ! Глава 4
  console.log("\n=== Глава 4 ===");
  console.log("Задание 4.1.1 - Сортировка выбором");
  console.log(
    "selectionSort\narr = [64, 34, 25, 12, 22, 11, 90]: ",
    selectionSort(unsortedArray)
  );

  console.log("Задание 4.1.2 - Сортировка вставками");
  console.log(
    "insertionSort\narr = [64, 34, 25, 12, 22, 11, 90]: ",
    insertionSort(unsortedArray)
  );

  console.log("Задание 4.2.1 - Сортировка слиянием");
  console.log(
    "mergeSort\narr = [64, 34, 25, 12, 22, 11, 90]: ",
    mergeSort(unsortedArray)
  );

  console.log("Задание 4.2.1 - Сортировка кучей");
  console.log(
    "heapSort\narr = [64, 34, 25, 12, 22, 11, 90]: ",
    heapSort(unsortedArray)
  );

  // ! Глава 5
  console.log("\n=== Глава 5 ===");
  console.log("Задание 5.1.1 - Замена в тексте");
  const input = "a**b**c**";
  console.log(
    "replaceDoubleAsterisk\ninput = a**b**c**:",
    replaceDoubleAsterisk(input, "$")
  );
  console.log("Задание 5.1.2 - Удаление abc из текста");
  const testCases = [
    "abc", // => ""
    "aabcbc", // => ""
    "abcabc", // => ""
    "abcdabc", // => "d"
    "aabbcc", // => "aabbcc"
    "abcaabcbc", // => ""
    "xabcyz", // => "xyz"
    "hello abc world abc!", // => "hello  world !"
    "abcabcabc", // => ""
  ];
  testCases.forEach((item) => {
    console.log(`${item} =>`, removeAbcSubstrings(item));
  });

  // ! Глава 6
  console.log("\n=== Глава 6 CTEKN ===");
  console.log("Задание 6.1.1");
  testBracketValidation();
  testWithStringInput();

  // Демонстрация работы стека
  console.log("\nДемонстрация работы класса Stack:");
  const stack = new Stack<number>();
  console.log("Создали пустой стек:", stack.toString());
  console.log("isEmpty:", stack.isEmpty());

  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log("После push(1), push(2), push(3):", stack.toString());
  console.log("peek():", stack.peek());
  console.log("size():", stack.size());

  const popped = stack.pop();
  console.log("pop():", popped, "Стек теперь:", stack.toString());
  console.log("isEmpty:", stack.isEmpty());

  stack.clear();
  console.log("После clear():", stack.toString());
  console.log("isEmpty:", stack.isEmpty());
  console.log("Задание 6.1.4");
  const testMultiStack = () => {
    console.log("=== Тестирование MultiStack ===");

    // Создаем 3 стека общей емкостью 10
    const multiStack = new MultiStack<number>(3, 10);

    console.log("Создали 3 стека общей емкостью 10");
    console.log(`Свободно: ${multiStack.freeSpace()}`);

    // Тестируем стек 0
    console.log("\n--- Тестируем стек 0 ---");
    multiStack.push(0, 10);
    multiStack.push(0, 20);
    multiStack.push(0, 30);
    console.log(`После push(0,10), push(0,20), push(0,30):`);
    console.log(`peek(0) = ${multiStack.peek(0)}`);
    console.log(`pop(0) = ${multiStack.pop(0)}`);
    console.log(`peek(0) = ${multiStack.peek(0)}`);

    // Тестируем стек 1
    console.log("\n--- Тестируем стек 1 ---");
    multiStack.push(1, 100);
    multiStack.push(1, 200);
    console.log(`После push(1,100), push(1,200):`);
    console.log(`peek(1) = ${multiStack.peek(1)}`);

    // Тестируем стек 2
    console.log("\n--- Тестируем стек 2 ---");
    multiStack.push(2, 1000);
    multiStack.push(2, 2000);
    multiStack.push(2, 3000);
    console.log(`После push(2,1000), push(2,2000), push(2,3000):`);
    console.log(`peek(2) = ${multiStack.peek(2)}`);

    console.log(`\nОбщее занято: ${multiStack.totalUsed()}`);
    console.log(`Свободно: ${multiStack.freeSpace()}`);

    // Освобождаем все стеки
    console.log("\n--- Освобождаем все стеки ---");
    while (!multiStack.isEmpty(0)) {
      console.log(`pop(0) = ${multiStack.pop(0)}`);
    }
    while (!multiStack.isEmpty(1)) {
      console.log(`pop(1) = ${multiStack.pop(1)}`);
    }
    while (!multiStack.isEmpty(2)) {
      console.log(`pop(2) = ${multiStack.pop(2)}`);
    }

    console.log(`\nПосле очистки: свободно = ${multiStack.freeSpace()}`);

    // Тестируем гибкое распределение
    console.log("\n--- Тестируем гибкое распределение ---");

    // Заполняем стек 0 почти полностью
    for (let i = 0; i < 7; i++) {
      multiStack.push(0, i * 10);
    }
    console.log(
      `После заполнения стека 0: свободно = ${multiStack.freeSpace()}`
    );

    // Заполняем стек 1
    multiStack.push(1, 999);
    multiStack.push(1, 888);
    console.log(
      `После заполнения стека 1: свободно = ${multiStack.freeSpace()}`
    );

    // Пытаемся добавить больше, чем есть места
    try {
      multiStack.push(1, 777);
      multiStack.push(1, 666);
      multiStack.push(1, 555);
    } catch (e: any) {
      console.log(`Ошибка (ожидаемо): ${e.message}`);
    }

    multiStack.debug();
  };
  testMultiStack();

  console.log("\n=== Задание 6.2.1 ===");
  // Тестирование очереди
  testQueue();

  // Демонстрация работы очереди
  console.log("\nДемонстрация работы класса Queue:");
  const queue = new Queue<number>(5);
  console.log("Создали очередь емкостью 5");
  console.log("isEmpty:", queue.isEmpty());

  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);
  console.log("После enqueue(10), enqueue(20), enqueue(30):");
  console.log("toArray:", queue.toArray());
  console.log("peek:", queue.peek());
  console.log("size:", queue.getSize());

  const dequeued = queue.dequeue();
  console.log("dequeue:", dequeued);
  console.log("toArray после dequeue:", queue.toArray());
  console.log("peek после dequeue:", queue.peek());

  queue.clear();
  console.log("После clear:");
  console.log("isEmpty:", queue.isEmpty());
  console.log("size:", queue.getSize());

  // Демонстрация эффективности
  demonstrateQueueEfficiency();

  console.log("\n=== Задание 6.3.1 ===");
  // Тестирование множеств
  testSets();
  demonstrateSetScenarios();
  benchmarkSets();

  // Демонстрация работы BooleanSet
  console.log("\nДемонстрация работы BooleanSet:");
  const boolSet = new BooleanSet(10);
  console.log("Создали множество для элементов 1..10");
  console.log("Начальное состояние:", boolSet.toString());
  console.log("isEmpty:", boolSet.isEmpty());

  boolSet.add(3);
  boolSet.add(5);
  boolSet.add(7);
  console.log("После add(3), add(5), add(7):", boolSet.toString());
  console.log("has(5):", boolSet.has(5));
  console.log("has(6):", boolSet.has(6));
  console.log("cardinality:", boolSet.cardinality());

  boolSet.remove(5);
  console.log("После remove(5):", boolSet.toString());
  console.log("has(5):", boolSet.has(5));

  // Демонстрация операций над множествами
  console.log("\nОперации над множествами:");
  const setA = new BooleanSet(10);
  setA.add(1);
  setA.add(2);
  setA.add(3);
  setA.add(4);

  const setB = new BooleanSet(10);
  setB.add(3);
  setB.add(4);
  setB.add(5);
  setB.add(6);

  console.log("A =", setA.toString());
  console.log("B =", setB.toString());
  console.log("A u B =", setA.union(setB).toString());
  console.log("A n B =", setA.intersection(setB).toString());
  console.log("A \\ B =", setA.difference(setB).toString());
  console.log("A C B:", setA.isSubset(setB));

  console.log("\n=== Задание 6.4.1 ===");
  testMinArray();

  // Демонстрация работы MinArray
  console.log("\nДемонстрация работы MinArray:");
  const minArray = new MinArray(10, Infinity);
  console.log(`Создан массив размера ${minArray.getSize()}`);
  console.log("Начальное состояние:", minArray.toArray());

  minArray.set(0, 5);
  minArray.set(1, 3);
  minArray.set(2, 7);
  minArray.set(3, 2);
  minArray.set(4, 8);
  console.log("После set операций:", minArray.toArray());
  console.log("get(3):", minArray.get(3));
  console.log("Индекс минимального элемента:", minArray.getMinIndex());
  console.log("Значение минимального элемента:", minArray.getMinValue());

  minArray.set(1, 1);
  console.log("После arr[1] = 1:", minArray.toArray());
  console.log("Новый индекс минимального элемента:", minArray.getMinIndex());

  console.log("\n=== Глава 7: Рекурсия ===");
  console.log("Задание 7.1.1");
  testFactorialRecursive();

  // Демонстрация работы
  console.log("\nДемонстрация рекурсивного вычисления факториала:");
  console.log("factorialRecursive(5) =", factorialRecursive(5));
  console.log("factorialRecursive(7) =", factorialRecursive(7));
  console.log("factorialRecursive(10) =", factorialRecursive(10));

  // Сравнение с итеративной версией
  console.log("\nСравнение с итеративной версией из главы 1:");
  console.log("Итеративная: factorial(5) =", factorial(5));
  console.log("Рекурсивная: factorialRecursive(5) =", factorialRecursive(5));
  console.log("Результаты совпадают:", factorial(5) === factorialRecursive(5));

  console.log("\n=== Задание 7.2.1 ===");
  testBuildTree();
  testValidTree();

  // Демонстрация построения дерева для конкретных данных из задания
  console.log("\n=== Решение задания 7.2.1 ===");
  const N = 7;
  const root = 3;
  const L = [0, 0, 0, 1, 0, 6, 0, 7]; // Индексация с 1
  const R = [0, 0, 0, 5, 3, 2, 0, 7]; // Индексация с 1

  console.log("Дано: N = 7, root = 3");
  console.log("L[i]: [0, 0, 1, 0, 6, 0, 7]");
  console.log("R[i]: [0, 0, 5, 3, 2, 0, 7]");

  const tree = buildBinaryTreeFromLR(N, root, L, R);
  console.log("\nПолученное дерево:");
  console.log(drawTreeASCII(tree));

  console.log("\nТекстовая интерпретация структуры:");
  console.log("    3");
  console.log("   / \\");
  console.log("  1   5");
  console.log("     / \\");
  console.log("    6   2");
  console.log("   /");
  console.log("  7 → 7 (цикл)");

  console.log(
    "\n⚠️ Ответ: Дерево содержит цикл (узел 7 ссылается сам на себя)!"
  );
  console.log(
    "Это делает дерево некорректным с точки зрения классического определения дерева."
  );

  console.log("\n=== Задание 7.3.1 ===");
  testSequences();
  demonstrateLargeExample();

  // Демонстрация работы
  console.log("\n=== Демонстрация задания 7.3.1 ===");

  console.log("1. Последовательности длины 2 из чисел {1, 2}:");
  printSequences(2, 2);

  console.log("\n2. Последовательности длины 3 из чисел {1, 2}:");
  printSequences(3, 2);

  console.log("\n3. Последовательности длины 2 из чисел {1, 2, 3}:");
  printSequences(2, 3);

  // Сравнение с итеративной версией из главы 2
  console.log("\n=== Сравнение с аналогичным заданием из Главы 2 ===");
  console.log("В Главе 2, задание 2.1.1: allSequences(2, 3)");
  console.log("Результат из Главы 2:", allSequences(2, 3));
  console.log("Результат из Главы 7:", generateSequencesRecursive(2, 3));
  console.log(
    "Результаты совпадают:",
    JSON.stringify(allSequences(2, 3)) ===
      JSON.stringify(generateSequencesRecursive(2, 3))
  );
};

main();
