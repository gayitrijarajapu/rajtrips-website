export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}
export function isSelectableDate(value: string, today = dateKey(new Date())) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = parseDate(value);
  return (
    !Number.isNaN(parsed.getTime()) &&
    dateKey(parsed) === value &&
    value >= today
  );
}
export function monthDays(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
