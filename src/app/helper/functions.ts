export function getCurrentMonthId() {
  const date = new Date();
  const incomeForTheMonth = 'i-' + (date.getMonth() + 1)  + '-' + date.getFullYear();

  return incomeForTheMonth;
}