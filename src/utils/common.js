
const convertNumbersToEnglish = string => {
  try {
    return string
      .replace(/[\u0660-\u0669]/g, c => c.charCodeAt(0) - 0x0660)
      .replace(/[\u06f0-\u06f9]/g, c => c.charCodeAt(0) - 0x06f0);
  } catch {
    return string;
  }
};

const replaceSpace = str => str.replace(/\u0020/, '\u00a0');

const getWidth = width => `${(width / 390) * 100}%`;
const getHeight = height => `${(height / 844) * 100}%`;

export {getWidth, getHeight, convertNumbersToEnglish, replaceSpace};
