/**
 * Format phone number
 * @param inputString
 * @returns {string}
 */
export const TrimRouting = (inputString: string) => {
  // Chuyển chuỗi về dạng viết thường và thay thế khoảng trắng bằng '-'
  const transformedString = inputString.toLowerCase().replace(/\s+/g, "-");
  return transformedString;
};

export const TruncateString = (str: string, maxLength: number): string => {
  if (str?.length > maxLength) {
    return `${str.slice(0, maxLength)}...`;
  }
  return str;
};

export const convertNewLineToBr = (text: string): string => {
  return text
    .split("\n")
    .map((line, index, array) =>
      index === array.length - 1 ? line : line + "<br>"
    )
    .join("");
};

export const randomString = (length = 15): any => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
