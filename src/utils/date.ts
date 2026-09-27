// One date style for the whole site: "11 August 2026", or "August 2026"
// where a summary only needs the month. Dates are calendar dates, so format
// in UTC to keep them from shifting a day.

const toDate = (value: Date | string) =>
  typeof value === 'string' ? new Date(value.length === 10 ? `${value}T00:00:00Z` : value) : value;

export function formatDate(value: Date | string): string {
  return toDate(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatMonthYear(value: Date | string): string {
  return toDate(value).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}
