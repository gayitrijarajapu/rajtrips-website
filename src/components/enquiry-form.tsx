"use client";
import { useState, useEffect, type FormEvent } from "react";
import { DatePicker } from "@/components/date-picker";
import { isSelectableDate } from "@/lib/calendar";
import { CarSelect } from "@/components/car-select";
import { ButtonArrow } from "@/components/button-arrow";
import { fleet } from "@/lib/fleet";
import { site } from "@/lib/site";
import { whatsappEnquiryUrl } from "@/lib/enquiry";

export function EnquiryForm() {
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [car, setCar] = useState("Any car");
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("car");
    // Hydrate the optional URL selection after the server-rendered default.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fleet.some((car) => car.name === selected)) setCar(selected!);
  }, []);
  function enquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSelectableDate(date)) {
      setDateError("Choose today or a future pick-up date.");
      return;
    }
    const data = new FormData(event.currentTarget);
    window.location.assign(
      whatsappEnquiryUrl(
        {
          from: String(data.get("from")),
          to: String(data.get("to")),
          date: String(data.get("date")),
          car,
        },
        site.phone,
      ),
    );
  }
  return (
    <section
      id="enquire"
      className="enquiry trip-search"
      aria-label="Enquire about your car trip"
    >
      <form className="search-fields" onSubmit={enquire}>
        <label>
          Pick-up city
          <input
            required
            name="from"
            maxLength={160}
            placeholder="Where from?"
            autoComplete="off"
            pattern={".*\\S.*"}
            title="Enter your pickup city"
          />
        </label>
        <label>
          Destination
          <input
            required
            name="to"
            maxLength={160}
            placeholder="Where to?"
            autoComplete="off"
            pattern={".*\\S.*"}
            title="Enter your destination"
          />
        </label>
        <DatePicker
          value={date}
          onChange={(value) => {
            setDate(value);
            setDateError("");
          }}
          error={dateError}
        />
        <CarSelect value={car} onChange={setCar} />
        <button className="button search-button" type="submit">
          Enquire <ButtonArrow />
        </button>
      </form>
      <p className="enquiry-hint">
        <span aria-hidden="true">↗</span> Opens WhatsApp with your trip details.
        Review and send your enquiry to our team.{" "}
        <a href="/privacy">Privacy policy</a>
      </p>
    </section>
  );
}
