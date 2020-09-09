export function getCurrentMonthPrefix() {
  const date = new Date();
  const prefix = (date.getMonth() + 1)  + '-' + date.getFullYear();

  return prefix;
}

export function getCurrentMonthId() {
  const date = new Date();
  const incomeForTheMonth = (date.getMonth() + 1)  + '-' + date.getFullYear();

  return incomeForTheMonth;
}

// Categories