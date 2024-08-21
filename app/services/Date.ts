export function dateToString(date:Date) {
    return date ? new Date(date).toISOString().split('T')[0] : ''
}

export function dateList(startDate: Date, endDate: Date): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateList: string[] = [];

    while (start <= end) {
        dateList.push(start.toISOString().split('T')[0]);
        start.setDate(start.getDate() + 1);
    }
    return dateList;
}