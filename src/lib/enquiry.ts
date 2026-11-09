export type TripEnquiry = {
  from: string;
  to: string;
  date: string;
  car: string;
};
export function whatsappEnquiryUrl(trip: TripEnquiry, phone = "+918121287777") {
  let recipient = phone.replace(/\D/g, "");
  if (recipient.length === 10) recipient = `91${recipient}`;
  const text = [
    "*Rajtrips — Trip enquiry*",
    "",
    `*Pick-up city:* ${trip.from.trim()}`,
    `*Destination:* ${trip.to.trim()}`,
    `*Pick-up date:* ${trip.date}`,
    `*Car:* ${trip.car}`,
    "",
    "Please confirm vehicle availability and share the trip details and booking terms.",
  ].join("\n");
  return `https://wa.me/${recipient}?text=${encodeURIComponent(text)}`;
}
