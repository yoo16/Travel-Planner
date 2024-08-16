export function dateToString(date:Date) {
    return date ? new Date(date).toISOString().split('T')[0] : ''
}