export const truncateText = (text, length) => {
  if (!text) {
    return '';
  }

  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)}...`;
};
