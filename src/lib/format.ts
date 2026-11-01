import type { Project, WorkExperience } from "@/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** ISO dates are plain "YYYY-MM-DD"; read them as UTC so no timezone shifts a year. */
function parts(iso: string) {
  const [y, m] = iso.split("-").map((n) => Number.parseInt(n, 10));
  return { year: y, month: m };
}

function monthYear(iso: string): string {
  const { year, month } = parts(iso);
  return `${MONTHS[month - 1] ?? ""} ${year}`;
}

export function yearOf(iso: string): string {
  return String(parts(iso).year);
}

export function formatRange(startDate: string, endDate: string): string {
  const start = monthYear(startDate);
  const end = endDate === "Present" ? "Present" : monthYear(endDate);
  return `${start} — ${end}`;
}

/**
 * Latest first, with work that is still running ahead of finished work.
 * Ties fall back to start date, then to the order in the file.
 */
export function byEndDateDesc(a: Project, b: Project): number {
  const runningA = a.endDate === "Present";
  const runningB = b.endDate === "Present";
  if (runningA !== runningB) return runningA ? -1 : 1;

  const byEnd = b.endDate.localeCompare(a.endDate);
  if (byEnd !== 0) return byEnd;

  return b.startDate.localeCompare(a.startDate);
}

export function byStartDesc(a: WorkExperience, b: WorkExperience): number {
  return b.startDate.localeCompare(a.startDate);
}

export const pad = (n: number) => String(n).padStart(2, "0");
