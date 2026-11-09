"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { fleet } from "@/lib/fleet";
const options = [
  { name: "Any car", category: "Help me choose" },
  ...fleet.map((car) => ({
    name: car.name,
    category: car.category.toLowerCase(),
  })),
];

export function CarSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [above, setAbove] = useState(false);
  const [menuHeight, setMenuHeight] = useState(280);
  const search = useRef("");
  const searchTime = useRef(0);
  const selected = options.findIndex((option) => option.name === value);
  function show(index = selected) {
    const box = root.current?.getBoundingClientRect();
    if (box) {
      const below = window.innerHeight - box.bottom - 16;
      const top = box.top - 16;
      const up = below < 265 && top > below;
      setAbove(up);
      setMenuHeight(Math.max(100, Math.min(280, up ? top : below)));
    }
    setActive(Math.max(0, index));
    setOpen(true);
  }
  function choose(index: number) {
    onChange(options[index].name);
    setOpen(false);
    button.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const focusOutside = (event: FocusEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", focusOutside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", focusOutside);
    };
  }, [open]);
  useEffect(() => {
    if (open)
      document
        .getElementById(`${id}-option-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);
  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) show();
      else
        setActive(
          (index) =>
            (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
            options.length,
        );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else show();
    } else if (event.key === "Escape") {
      if (open) event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab") setOpen(false);
    else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const index = event.key === "Home" ? 0 : options.length - 1;
      if (!open) show(index);
      else setActive(index);
    } else if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      const now = Date.now();
      search.current =
        (now - searchTime.current > 700 ? "" : search.current) +
        event.key.toLowerCase();
      searchTime.current = now;
      const match = options.findIndex((option) =>
        option.name.toLowerCase().startsWith(search.current),
      );
      if (match >= 0) {
        event.preventDefault();
        if (open) setActive(match);
        else show(match);
      }
    }
  }
  return (
    <div className="car-select" ref={root}>
      <label id={`${id}-label`} htmlFor={`${id}-trigger`}>
        Car type
      </label>
      <input type="hidden" name="car" value={value} />
      <button
        ref={button}
        id={`${id}-trigger`}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        className={`car-select-trigger${open ? " is-open" : ""}`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={keyDown}
      >
        <svg
          className="car-select-car"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            d="m5 7-2 7v6h3v-3h12v3h3v-6l-2-7Zm-2 6h18M6 15h2m8 0h2"
            strokeLinejoin="round"
          />
        </svg>
        <span>{value}</span>
        <svg
          className="car-select-chevron"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className={`car-select-menu${above ? " opens-above" : ""}`}
          style={{ maxHeight: menuHeight }}
        >
          {options.map((option, index) => (
            <div
              id={`${id}-option-${index}`}
              key={option.name}
              role="option"
              aria-selected={value === option.name}
              className={`car-select-option${active === index ? " is-active" : ""}`}
              onPointerMove={() => setActive(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>
                <b>{option.name}</b>
                <small>{option.category}</small>
              </span>
              {value === option.name && (
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="m4 10 4 4 8-8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
