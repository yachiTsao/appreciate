try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
// import CryptoJS from 'crypto-js'

export const singleEmailValidator = function (
  value: string,
  errorMessage?: string,
): boolean | string {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return errorMessage
    ? emailPattern.test(value) || errorMessage
    : emailPattern.test(value);
};
export const passwordValidator = function (
  value: string,
  errorMessage?: string,
): boolean | string {
  const passwordPattern =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2d\x2f\x3a-\x40\x5b-\x60\x7b-\x7e])(?!.*[\s.]).{8,20}$/;
  return errorMessage
    ? passwordPattern.test(value) || errorMessage
    : passwordPattern.test(value);
};
export const getRandomNumber = function (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const fixLinkedAccountLength = function (rawString: string): string {
  const fixLength = 12;
  const diffLength = fixLength - rawString.length;

  if (diffLength > 0) {
    let formattedString = "";
    for (let i = 0; i < diffLength; i++) {
      formattedString += "0";
    }
    formattedString += rawString;
    return formattedString;
  } else {
    return rawString;
  }
};
// export const aesEncrypt = function (text: string): string {
//   const KEY = CryptoJS.enc.Utf8.parse('l#4@IUSX%UWS8HLGl#4@IUSX%UWS8HLG')
//   const IV = CryptoJS.enc.Utf8.parse('YpST0NOlF^zDsNy3')
//   const encryptText = CryptoJS.AES.encrypt(text, KEY, {
//     mode: CryptoJS.mode.CBC,
//     iv: IV
//   }).toString()
//   return encryptText
// }
// export const aesDecrypt = function (text: string): string {
//   const KEY = CryptoJS.enc.Utf8.parse('l#4@IUSX%UWS8HLGl#4@IUSX%UWS8HLG')
//   const IV = CryptoJS.enc.Utf8.parse('YpST0NOlF^zDsNy3')
//   const decryptText = CryptoJS.AES.decrypt(text, KEY, {
//     mode: CryptoJS.mode.CBC,
//     iv: IV
//   }).toString(CryptoJS.enc.Utf8)
//   return decryptText
// }
// export const sha256 = function (text: string): string {
//   const result = CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex) // Hash the string using SHA-256
//   return result
// }
export const generateTraceID = function (): string {
  const str = Math.random().toString(36).substring(2, 22); // Generate a random string
  const result = sha256(str);
  return result;
};
export function transformToCamelCase(text: string): string {
  return text.replace(/_./g, (match) => match.charAt(1).toUpperCase());
}
export function transformToSnakeCase(text: string): string {
  // 將大寫字母前加上底線，然後轉換為小寫
  return text.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
}
export function convertCamelCaseToSpaceSeparated(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .replace(/(^|\s)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
}
export function multipleSelectionValidator(
  value: string[],
  errorMessage: string,
) {
  return value.length === 0 ? errorMessage : true;
}
export function singleSelectionValidator(
  value: string | null,
  errorMessage: string,
) {
  return !!value || errorMessage;
}
export function getPageReq(currentPage: number, totalPage: number) {
  // To get which page should be put in request
  if (currentPage <= 0) {
    return 1;
  } else if (currentPage < totalPage) {
    return currentPage + 1;
  } else {
    return currentPage;
  }
}
export function htmlEncode(text: string): string {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}
export function htmlDecode(text: string): string {
  const div = document.createElement("div");
  div.innerHTML = text;
  return div.innerText;
}
