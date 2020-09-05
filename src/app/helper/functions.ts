export function getCurrentMonthId() {
  const date = new Date();
  const incomeForTheMonth = (date.getMonth() + 1)  + '-' + date.getFullYear();

  return incomeForTheMonth;
}