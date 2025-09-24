export const STORAGE_KEY = "my-notepad";
export const RECENT_NOTES_KEY = "recent-notes";

export function loadNote(): string {
  return localStorage.getItem(STORAGE_KEY) || "";
}

export function saveNote(text: string): void {
  localStorage.setItem(STORAGE_KEY, text);
}

export function deleteNote(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveNoteAs(name: string, text: string): void {
  localStorage.setItem(`note-${name}`, text);

  const recent = JSON.parse(localStorage.getItem(RECENT_NOTES_KEY) || "[]") as string[];
  if (!recent.includes(name)) recent.push(name);
  localStorage.setItem(RECENT_NOTES_KEY, JSON.stringify(recent));
}

export function loadRecentNotes(): string[] {
  return JSON.parse(localStorage.getItem(RECENT_NOTES_KEY) || "[]");
}

export function loadNoteByName(name: string): string {
  return localStorage.getItem(`note-${name}`) || "";
}

//  Download note as TXT
export function downloadNoteAsTXT(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
