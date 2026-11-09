"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_KEY,
  OPEN_PREFERENCES,
  defaults,
  readPreferences,
  savePreferences,
  type Preferences,
} from "@/lib/cookie-consent";
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="cookie-reopen"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES))}
    >
      Cookie settings
    </button>
  );
}
const categories = [
  {
    key: "functional",
    title: "Functional",
    text: "Optional conveniences such as remembering travel preferences. No optional functional storage is currently used.",
  },
  {
    key: "analytics",
    title: "Analytics",
    text: "Website traffic and performance measurement. No analytics tools are currently installed.",
  },
  {
    key: "marketing",
    title: "Marketing",
    text: "Advertising and campaign measurement. No advertising trackers are currently installed.",
  },
] as const;
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  useEffect(() => {
    const stored = readPreferences();
    // Read device-only consent after hydration to keep server and client markup consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferences(stored || defaults);
    setVisible(!stored);
    const open = () => {
      setPreferences((current) => readPreferences() || current);
      setSettings(true);
      setVisible(true);
    };
    const sync = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY) {
        const next = readPreferences();
        setPreferences(next || defaults);
        setVisible(!next);
        setSettings(false);
      }
    };
    window.addEventListener(OPEN_PREFERENCES, open);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES, open);
      window.removeEventListener("storage", sync);
    };
  }, []);
  function choose(next: Preferences) {
    setPreferences(next);
    savePreferences(next);
    setVisible(false);
    setSettings(false);
  }
  if (!visible) return null;
  return (
    <aside
      className="cookie-banner"
      role="dialog"
      aria-label="Cookie preferences"
      onKeyDown={(e) => {
        if (e.key === "Escape") setSettings(false);
      }}
    >
      <div className="cookie-intro">
        <span className="eyebrow">YOUR JOURNEY. YOUR CHOICES.</span>
        <h2>Cookie preferences</h2>
        <p>
          We remember your cookie choices so you stay in control. Optional
          features stay off unless you allow them. We currently use no analytics
          or advertising trackers.
        </p>
        <p className="cookie-policy-links">
          Read our <Link href="/cookies">Cookie policy</Link> and{" "}
          <Link href="/privacy">Privacy policy</Link>.
        </p>
      </div>
      <div className="cookie-actions">
        <button
          type="button"
          className="cookie-secondary"
          aria-expanded={settings}
          aria-controls="cookie-categories"
          onClick={() => setSettings(!settings)}
        >
          {settings ? "Hide settings" : "Cookie settings"}
        </button>
        <button
          type="button"
          className="cookie-secondary"
          onClick={() => choose(defaults)}
        >
          Reject optional
        </button>
        <button
          type="button"
          className="cookie-primary"
          onClick={() => choose(preferences)}
        >
          Save choices
        </button>
        <button
          type="button"
          className="cookie-primary"
          onClick={() =>
            choose({
              essential: true,
              functional: true,
              analytics: true,
              marketing: true,
            })
          }
        >
          Accept all
        </button>
      </div>
      {settings && (
        <div id="cookie-categories" className="cookie-categories">
          <label>
            <input type="checkbox" checked disabled />
            <span>
              <b>Essential</b>
              <small>
                Always active. Stores your consent choice on this device so we
                can respect it.
              </small>
            </span>
          </label>
          {categories.map((c) => (
            <label key={c.key}>
              <input
                type="checkbox"
                checked={preferences[c.key]}
                onChange={() =>
                  setPreferences((p) => ({ ...p, [c.key]: !p[c.key] }))
                }
              />
              <span>
                <b>{c.title}</b>
                <small>{c.text}</small>
              </span>
            </label>
          ))}
        </div>
      )}
    </aside>
  );
}
