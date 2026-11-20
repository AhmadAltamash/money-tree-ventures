type ClassValue = string | false | null | undefined;

// Joins class names and skips empty values, so we can write conditional classes easily.
export function joinClasses(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

// Makes visitor text safe to use inside a search pattern.
export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
