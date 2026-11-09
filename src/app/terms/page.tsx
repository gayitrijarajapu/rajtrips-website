import { LegalPage } from "@/components/legal-page";
export const metadata = {
  title: "Terms & conditions",
  description:
    "Information about rajtrips enquiries, booking confirmation, itinerary changes and travel responsibilities.",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <LegalPage
      title="A little clarity. A better journey."
      intro="Please review these terms when exploring our cars or requesting travel arrangements."
      sections={[
        {
          title: "Enquiries and booking confirmation",
          text: "Submitting a trip request or opening a WhatsApp message is an enquiry, not a confirmed reservation. A booking is confirmed only when the travel team has agreed availability, itinerary, vehicle arrangements, payment requirements and booking-specific terms with you in writing.",
        },
        {
          title: "Your itinerary and quote",
          text: "Provide accurate pickup and destination details, date, passenger count, luggage needs and planned stops. No fares are published on this website. Request a written quote that identifies the agreed journey, inclusions, exclusions, tolls, parking, permits, extra time or distance and any other applicable charges before accepting a booking.",
        },
        {
          title: "Vehicle arrangements",
          text: "The fleet cards identify the models available to enquire about. Photographs are representative and do not guarantee a particular registration, model year, trim or seating configuration. Vehicle, passenger capacity, luggage space and any special requirements must be confirmed for your trip. Any proposed substitution should be discussed with you.",
        },
        {
          title: "Changes, cancellations and refunds",
          text: "Ask for the cancellation, rescheduling, waiting-time and refund terms with your quote. These depend on the confirmed booking and must be agreed before payment. Notify the team promptly if your travel plans change. This website does not promise a standard refund period or a cancellation fee.",
        },
        {
          title: "Payments",
          text: "No payment is collected through this website. Confirm payment instructions directly with the authorised business contact before sending money. Keep the written confirmation and receipt for any booking payment. Do not share card details or one-time passwords through an enquiry.",
        },
        {
          title: "Passenger responsibilities",
          text: "Arrive at the agreed pickup point on time, share a reachable contact number and use seat belts where provided. Do not exceed the confirmed vehicle capacity. Child seats, accessibility needs, unusually large luggage and other special requirements should be discussed before booking and are subject to availability.",
        },
        {
          title: "Delays and unforeseen changes",
          text: "Traffic, weather, road restrictions, flight changes and other circumstances can affect journey times. Allow a suitable buffer for flights and appointments. Contact the team promptly if a delay or disruption affects your pickup so that available alternatives can be discussed.",
        },
        {
          title: "Website use and your rights",
          text: "Use the website for genuine travel enquiries and do not misuse its forms or content. Information may be updated to reflect availability or service changes. Nothing in these terms removes rights or remedies that cannot be excluded under applicable law. Any additional terms for your booking should be supplied before you confirm it.",
        },
      ]}
    />
  );
}
