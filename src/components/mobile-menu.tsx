"use client";
import { useEffect, useRef, useState } from "react";
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return (
    <div
      className="mobile-menu"
      ref={root}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="mobile-menu-trigger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-site-navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      {open && (
        <nav
          id="mobile-site-navigation"
          className="mobile-menu-panel"
          aria-label="Mobile navigation"
        >
          {[
            { href: "/", text: "Home" },
            { href: "/#services", text: "Our services" },
            { href: "/#fleet", text: "Our cars" },
            { href: "/#about", text: "Why rajtrips" },
            { href: "/#faq", text: "Travel FAQs" },
            { href: "/#enquire", text: "Enquire on WhatsApp" },
          ].map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.text}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
