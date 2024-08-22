export function dateToString(date:Date) {
    return date ? new Date(date).toISOString().split('T')[0] : ''
}

export function dateList(startDate: Date, endDate: Date): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateList: string[] = [];

    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);
    while (start <= end) {
        dateList.push(dateToString(start));
        start.setDate(start.getDate() + 1);
    }
    console.log(start)
    console.log(end)
    console.log(dateList)
    return dateList;
}