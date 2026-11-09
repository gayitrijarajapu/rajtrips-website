export const CONSENT_KEY = "rajtrips_cookie_preferences_v1";
export const OPEN_PREFERENCES = "rajtrips-open-cookie-preferences";
export const CONSENT_UPDATED = "rajtrips-cookie-preferences-updated";
export type Preferences = {
  essential: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};
export const defaults: Preferences = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
};
export function normalizePreferences(value: unknown): Preferences | null {
  if (!value || typeof value !== "object") return null;
  const p = value as Record<string, unknown>;
  if (
    !["functional", "analytics", "marketing"].every(
      (key) => typeof p[key] === "boolean",
    )
  )
    return null;
  return {
    essential: true,
    functional: p.functional as boolean,
    analytics: p.analytics as boolean,
    marketing: p.marketing as boolean,
  };
}
export function readPreferences(): Preferences | null {
  try {
    return normalizePreferences(
      JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"),
    );
  } catch {
    return null;
  }
}
export function savePreferences(preferences: Preferences) {
  const normalized = normalizePreferences(preferences) || defaults;
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ ...normalized, updatedAt: new Date().toISOString() }),
    );
  } catch {
    /* Choices still apply to the current visit when storage is blocked. */
  }
  window.dispatchEvent(
    new CustomEvent(CONSENT_UPDATED, { detail: normalized }),
  );
}
