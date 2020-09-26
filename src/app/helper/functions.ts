export function getCurrentMonthPrefix() {
  const date = new Date();
  return convertToPrefixFormat(date);
}

export function convertToPrefixFormat(date: Date) {
  const prefix = (date.getMonth() + 1)  + '-' + date.getFullYear();

  return prefix;
}
