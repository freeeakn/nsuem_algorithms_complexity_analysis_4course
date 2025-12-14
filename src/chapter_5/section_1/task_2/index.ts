// ================================
// 5.1.2. Напишите программу, удаляющую из текста все подслова вида abc
// ================================

export const removeAbcSubstrings = (input: string): string => {
  let result = "";
  let i = 0;

  while (i < input.length) {
    // Проверяем, является ли текущая позиция началом подстроки "abc"
    if (
      i + 2 < input.length &&
      input[i] === "a" &&
      input[i + 1] === "b" &&
      input[i + 2] === "c"
    ) {
      i += 3; // Пропускаем всю подстроку "abc"
    } else {
      result += input[i];
      i++;
    }
  }

  return result;
};
