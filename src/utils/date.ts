export function diffDays(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
export function getYesterday() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return {
    date: yesterday,
    month: yesterday.getMonth() + 1,
    day: yesterday.getDate()
  };
}
export function getDateAgo(targetDate: Date, ago: number) {
  const resultDate = new Date(targetDate.getTime());
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysAgoMilliseconds = ago * millisecondsPerDay;
  resultDate.setTime(resultDate.getTime() - daysAgoMilliseconds);
  return {
    date: resultDate,
    month: resultDate.getMonth() + 1,
    day: resultDate.getDate()
  };
}
export function getYesterdayAndAgo(ago: number) {
  const yesterday = getYesterday();
  const target = getDateAgo(yesterday.date, ago);
  return { yesterday, target };
}
export function getDatesBetween(startDate: Date, endDate: Date) {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    dates.push(`${month}/${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
