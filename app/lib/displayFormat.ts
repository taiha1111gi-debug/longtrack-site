export function formatDisplayDate(value: string) {
  return value.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1/$2/$3");
}

export function formatDisplayTime(value: string) {
  return value;
}
