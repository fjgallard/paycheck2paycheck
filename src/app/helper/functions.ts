import { MONTHLY_BUDGET_PREFIX } from './constants';

export function getCurrentMonthPrefix() {
  const date = new Date();
  const prefix = (date.getMonth() + 1)  + '-' + date.getFullYear();

  return prefix;
}

export function getCurrentMonthBudgetId() {
  return MONTHLY_BUDGET_PREFIX + '-' + getCurrentMonthPrefix()
}

export function getCustomMonthBudgetId(mmyyyy: string) {
  return `${MONTHLY_BUDGET_PREFIX}-${mmyyyy}`;
}

// Categories