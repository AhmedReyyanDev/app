import quotes, { Quote } from './quotes';

// Returns the number of whole days since the Unix epoch for the given date,
// using the local calendar day (not UTC) so the quote flips at local midnight.
export function dayIndex(date: Date = new Date()): number {
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(startOfDay.getTime() / 86_400_000);
}

// Deterministically picks one quote for a given calendar day. The same day
// always maps to the same quote (so it is stable across app restarts), and
// consecutive days map to different quotes by walking the list with a stride
// that is coprime with the list length.
export function getDailyQuote(date: Date = new Date(), list: Quote[] = quotes): Quote {
  const n = list.length;
  if (n === 0) {
    return { text: 'Add some quotes to get started.', author: 'app' };
  }
  const index = ((dayIndex(date) % n) + n) % n;
  return list[index];
}

export default getDailyQuote;
