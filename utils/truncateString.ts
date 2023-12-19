export function truncateString(str: string, len: number): string {
  if (str.length <= len) {
    return str
  }
  return str.slice(0, len) + '...'
}
