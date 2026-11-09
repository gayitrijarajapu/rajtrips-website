export const site = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "rajtrips",
  tagline: "A better way to get there.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rajtrips.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+918121287777",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "",
  city: process.env.NEXT_PUBLIC_BUSINESS_CITY || "",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
  postalCode: process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE || "",
  country: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "IN",
};
export const indexable =
  process.env.SITE_INDEXABLE === "true" &&
  !!process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.VERCEL_ENV !== "preview";
export const services = [
  {
    slug: "outstation-trips",
    title: "Outstation trips",
    label: "BEYOND THE CITY",
    icon: "↗",
    description:
      "A weekend escape or a longer adventure. Plan a comfortable journey beyond the city.",
    body: "Choose a one-way journey or a round trip, with time for the stops that matter to you. Share your route, dates and group size so we can discuss the right vehicle and a trip-specific quote.",
    details: [
      "One-way and round-trip enquiries",
      "Flexible stops along your route",
      "Sedan and MPV options for your group",
    ],
  },
  {
    slug: "airport-transfers",
    title: "Airport transfers",
    label: "FROM DOOR TO DEPARTURE",
    icon: "✈",
    description:
      "Start and end your trip with a straightforward airport pickup or drop-off.",
    body: "Tell us your airport, flight time, pickup address and luggage requirements. We will discuss a suitable pickup window and confirm availability before you book. Include your flight number for a more useful enquiry.",
    details: [
      "Airport pickup and drop-off enquiries",
      "Vehicle selection for your luggage",
      "Pickup arrangements confirmed before travel",
    ],
  },
  {
    slug: "local-car-rentals",
    title: "Local car rentals",
    label: "YOUR CITY, YOUR PACE",
    icon: "◎",
    description:
      "Make room for meetings, shopping and city exploring with a car and driver.",
    body: "Build a local itinerary around your day. Share your pickup point, expected travel time and planned stops. Ask for a written quote covering the included hours, distance and any extra charges.",
    details: [
      "Personal and business travel enquiries",
      "Custom itineraries with multiple stops",
      "Discuss hours and distance before booking",
    ],
  },
  {
    slug: "group-travel",
    title: "Group travel",
    label: "BETTER TOGETHER",
    icon: "♧",
    description:
      "Family getaways, celebrations and team outings. Plan the journey together.",
    body: "Help us plan for your whole group by sharing passenger numbers, luggage and the route. Car availability varies, so enquire ahead of your travel dates and confirm the final vehicle before booking.",
    details: [
      "Family and team trip enquiries",
      "Passenger and luggage planning",
      "Availability confirmed for your dates",
    ],
  },
];
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
