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

  console.log("Задание 2.3.1");
  // TODO

  console.log("Задание 2.4.1");
  // TODO

  console.log("Задание 2.5.1");
  // TODO

  console.log("Задание 2.6.1");
  // TODO

  console.log("Задание 2.7.3");
  // TODO

  // ! Глава 3
  console.log("\n=== Глава 3 ===");
  console.log("Задание 3.1.1");
  // TODO

  console.log("Задание 3.2.1");
  // TODO

  // ! Глава 4
  console.log("\n=== Глава 4 ===");
  console.log("Задание 4.1.1");
  // TODO

  console.log("Задание 4.1.2");
  // TODO

  console.log("Задание 4.2.1");
  // TODO
};

main();
