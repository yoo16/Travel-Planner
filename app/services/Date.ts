export function dateToString(date: Date): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
}

export function dateList(startDate: Date | string, endDate: Date | string): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateList: string[] = [];
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= diffDays; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        dateList.push(dateToString(currentDate));
    }

    return dateList;
}
