"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { dateKey, parseDate, monthDays } from "@/lib/calendar";
const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthFormat = new Intl.DateTimeFormat("en-IN", {
  month: "long",
  year: "numeric",
});
const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
export function DatePicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error: string;
}) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const focusPending = useRef(false);
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12),
  );
  const [focused, setFocused] = useState("");
  function show() {
    const now = dateKey(new Date());
    setToday(now);
    const initial = value && value >= now ? value : now;
    const date = parseDate(initial);
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1, 12));
    setFocused(initial);
    focusPending.current = true;
    setOpen(true);
  }
  useEffect(() => {
    if (open) {
      if (!dialog.current?.open) dialog.current?.showModal();
    } else if (dialog.current?.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    if (open && focusPending.current) {
      focusPending.current = false;
      dialog.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`)
        ?.focus();
    }
  }, [open, focused, month]);
  useEffect(() => {
    if (error) trigger.current?.focus();
  }, [error]);
  function choose(day: string) {
    onChange(day);
    setOpen(false);
  }
  function navigate(amount: number) {
    const next = new Date(
      month.getFullYear(),
      month.getMonth() + amount,
      1,
      12,
    );
    const start = dateKey(next);
    setMonth(next);
    setFocused(start < today ? today : start);
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>, day: string) {
    const date = parseDate(day);
    let next: Date | undefined;
    if (event.key === "ArrowRight")
      next = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
        12,
      );
    else if (event.key === "ArrowLeft")
      next = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1,
        12,
      );
    else if (event.key === "ArrowDown")
      next = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 7,
        12,
      );
    else if (event.key === "ArrowUp")
      next = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 7,
        12,
      );
    else if (event.key === "Home")
      next = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay(),
        12,
      );
    else if (event.key === "End")
      next = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 6 - date.getDay(),
        12,
      );
    else if (event.key === "PageDown" || event.key === "PageUp") {
      const m = date.getMonth() + (event.key === "PageDown" ? 1 : -1);
      next = new Date(
        date.getFullYear(),
        m,
        Math.min(date.getDate(), monthDays(date.getFullYear(), m)),
        12,
      );
    }
    if (next) {
      event.preventDefault();
      const key = dateKey(next) < today ? today : dateKey(next);
      const target = parseDate(key);
      focusPending.current = true;
      setMonth(new Date(target.getFullYear(), target.getMonth(), 1, 12));
      setFocused(key);
    }
  }
  const leading = month.getDay();
  const count = monthDays(month.getFullYear(), month.getMonth());
  const cells = Array.from(
    { length: Math.ceil((leading + count) / 7) * 7 },
    (_, index) => index - leading + 1,
  );
  const prev = new Date(month.getFullYear(), month.getMonth() - 1, 1, 12);
  const prevDisabled = today
    ? dateKey(new Date(prev.getFullYear(), prev.getMonth() + 1, 0, 12)) < today
    : false;
  return (
    <div className="date-picker">
      <label id={`${id}-label`} htmlFor={`${id}-trigger`}>
        Pick-up date
      </label>
      <input type="hidden" name="date" value={value} />
      <button
        ref={trigger}
        id={`${id}-trigger`}
        type="button"
        className={`date-picker-trigger${error ? " has-error" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-dialog`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={show}
      >
        <span id={`${id}-value`} className={!value ? "date-placeholder" : ""}>
          {value ? dateFormat.format(parseDate(value)) : "Select date"}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M7 3v4m10-4v4M3 11h18" strokeLinecap="round" />
        </svg>
      </button>
      {error && (
        <p id={`${id}-error`} className="date-error" role="alert">
          {error}
        </p>
      )}
      <dialog
        ref={dialog}
        id={`${id}-dialog`}
        className="date-picker-dialog"
        aria-labelledby={`${id}-title`}
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              setOpen(false);
          }
        }}
      >
        <div className="calendar-heading">
          <div>
            <span className="eyebrow">PLAN YOUR JOURNEY</span>
            <h2 id={`${id}-title`}>Choose your pick-up date</h2>
          </div>
          <button
            type="button"
            className="calendar-close"
            aria-label="Close calendar"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="calendar-month-nav">
          <button
            type="button"
            aria-label="Previous month"
            disabled={prevDisabled}
            onClick={() => navigate(-1)}
          >
            ‹
          </button>
          <h3 id={`${id}-month`} aria-live="polite">
            {monthFormat.format(month)}
          </h3>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => navigate(1)}
          >
            ›
          </button>
        </div>
        <div
          role="grid"
          aria-labelledby={`${id}-month`}
          className="calendar-grid"
        >
          <div role="row" className="calendar-week">
            {weekdays.map((day) => (
              <span key={day} role="columnheader">
                {day}
              </span>
            ))}
          </div>
          {Array.from({ length: cells.length / 7 }, (_, row) => (
            <div role="row" className="calendar-row" key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((day, index) => {
                if (day < 1 || day > count)
                  return <span key={index} role="gridcell" />;
                const key = dateKey(
                  new Date(month.getFullYear(), month.getMonth(), day, 12),
                );
                return (
                  <button
                    type="button"
                    role="gridcell"
                    key={key}
                    data-date={key}
                    tabIndex={key === focused ? 0 : -1}
                    aria-label={dateFormat.format(parseDate(key))}
                    aria-selected={key === value}
                    aria-current={key === today ? "date" : undefined}
                    disabled={key < today}
                    className={`calendar-day${key === value ? " is-selected" : ""}${key === today ? " is-today" : ""}`}
                    onKeyDown={(event) => keyDown(event, key)}
                    onClick={() => choose(key)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="calendar-bottom">
          <span>Today or any future travel date.</span>
          <button type="button" onClick={() => choose(dateKey(new Date()))}>
            Choose today ↗
          </button>
        </div>
      </dialog>
    </div>
  );
}
