/**
 * The monthly letter's sign-up, in the browser only. No list exists behind
 * it yet; the backend story replaces this module with a real client.
 */
const KEY = "dinguoc.letter";

export async function subscribe(email: string): Promise<{ email: string }> {
  const clean = email.trim().toLowerCase();
  await new Promise((r) => window.setTimeout(r, 240));
  try {
    const held = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as string[];
    if (!held.includes(clean)) window.localStorage.setItem(KEY, JSON.stringify([...held, clean]));
  } catch {
    // A browser refusing storage does not stop the sign-up.
  }
  return { email: clean };
}

export function subscribers(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}
