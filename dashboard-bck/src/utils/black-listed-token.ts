const blacklist: string[] = [];

export function addToBlacklist(token: string): void {
  blacklist.push(token);
}

export function isBlacklisted(token: string): boolean {
  return blacklist.includes(token);
}
