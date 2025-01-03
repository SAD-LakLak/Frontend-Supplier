export const replacePersianNumbers = (input: string): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = input;

  for (let i = 0; i < persianNumbers.length; i++) {
    const regex = new RegExp(persianNumbers[i], "g");
    result = result.replace(regex, englishNumbers[i]);
  }

  return result;
};
