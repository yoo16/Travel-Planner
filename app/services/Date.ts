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

export function stayDuration(plan: Plan): string {
    const departureDate = new Date(plan.departureDate);
    const arrivalDate = new Date(plan.arrivalDate);


    const timeDifference = arrivalDate.getTime() - departureDate.getTime();
    const dayCount = timeDifference / (1000 * 3600 * 24) + 1;

    console.log(departureDate, arrivalDate, dayCount)

    var display = "日帰り";
    if (dayCount > 1) {
        const nightCount = dayCount - 1;
        display = `${nightCount}泊${dayCount}日`;
    }
    return display;
}