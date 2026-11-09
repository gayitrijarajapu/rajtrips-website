"use client";

import { useEffect, useRef, useState } from "react";
import { fleet } from "@/lib/fleet";

// Business figures supplied by the rajtrips owner.
const stats = [
  { value: 14367, label: "Happy customers" },
  { value: 24, suffix: "/7", label: "Booking support" },
  { value: 13781, label: "Trips completed" },
  { value: fleet.length, label: "Car models" },
];
const numberFormat = new Intl.NumberFormat("en-IN");

export function StatsBar() {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    let frame = 0;
    const finish = () => {
      setProgress(1);
      setComplete(true);
    };
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      finish();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const animate = (time: number) => {
          const elapsed = Math.min((time - start) / 850, 1);
          setProgress(1 - Math.pow(1 - elapsed, 2));
          if (elapsed < 1) frame = requestAnimationFrame(animate);
          else finish();
        };
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section
      ref={section}
      className="stats-section"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading">Trusted for the journeys that matter.</h2>
      <div className="stats-bar stats-inline">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <p
              className="stat-number"
              aria-label={`${numberFormat.format(stat.value)}${stat.suffix ?? "+"} ${stat.label}`}
            >
              <span aria-hidden="true">
                {numberFormat.format(Math.floor(stat.value * progress))}
                {stat.suffix ? (
                  <span>{stat.suffix}</span>
                ) : (
                  <span className={`stat-plus${complete ? " is-visible" : ""}`}>
                    +
                  </span>
                )}
              </span>
            </p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="stats-coverage">
        Car travel across India <span aria-hidden="true">·</span> Local
        journeys, airport transfers &amp; outstation trips
      </p>
    </section>
  );
}
