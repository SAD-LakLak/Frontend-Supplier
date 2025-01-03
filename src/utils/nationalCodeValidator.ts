export function nationCodeValidator(val: string) {
  let allDigitEqual = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
  const codeMelliPattern = /^([0-9]{10})+$/;
  if (allDigitEqual.indexOf(val) != -1 || !codeMelliPattern.test(val)) {
    return false;
  }
  let chArray = Array.from(val);
  let num0 = parseInt(chArray[0]) * 10;
  let num2 = parseInt(chArray[1]) * 9;
  let num3 = parseInt(chArray[2]) * 8;
  let num4 = parseInt(chArray[3]) * 7;
  let num5 = parseInt(chArray[4]) * 6;
  let num6 = parseInt(chArray[5]) * 5;
  let num7 = parseInt(chArray[6]) * 4;
  let num8 = parseInt(chArray[7]) * 3;
  let num9 = parseInt(chArray[8]) * 2;
  let a = parseInt(chArray[9]);
  let b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9;
  let c = b % 11;
  return (((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)));
}