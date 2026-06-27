export function formatBudget(budget?: number | null): string {
    if (budget === null || typeof budget === 'undefined') {
        return '未設定';
    }

    return `${budget.toLocaleString()}円`;
}
