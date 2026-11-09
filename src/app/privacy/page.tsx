import { LegalPage } from "@/components/legal-page";
export const metadata = {
  title: "Privacy policy",
  description:
    "How rajtrips handles travel enquiries, contact details and website preferences.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <LegalPage
      title="Your privacy matters."
      intro="A clear look at the information involved when you plan a journey with rajtrips."
      sections={[
        {
          title: "Information you share",
          text: "When you enquire, you may share your name, phone number, pickup and destination, travel date, preferred car and other trip details. Please share only what is needed to arrange your journey. Avoid sending identity documents or payment information through the enquiry form.",
        },
        {
          title: "How enquiries work",
          text: "The enquiry form prepares a message with your route, travel date and chosen car in WhatsApp. You decide whether to send it. Form entries are not submitted to a rajtrips website database. Once sent, the message is handled by the messaging or email provider and the travel team.",
        },
        {
          title: "Why the team uses your details",
          text: "Information received in an enquiry is used to discuss vehicle availability, prepare a quote, confirm arrangements and communicate about your journey. If a booking goes ahead, relevant pickup and contact details may be shared with the driver or service partner arranging that trip.",
        },
        {
          title: "Website data and cookie choices",
          text: "The hosting provider may process technical request information, including IP address and browser data, to deliver and protect the site. Your cookie preference is stored locally on your device. No analytics or advertising trackers are currently installed. See the Cookie policy for details and use Cookie settings in the footer to change your choices.",
        },
        {
          title: "Third-party providers",
          text: "WhatsApp, your email provider and the hosting provider process information under their own policies. Following a third-party link takes you to a service whose practices are outside this website’s controls. The site does not currently collect card payments.",
        },
        {
          title: "Retention and your requests",
          text: "Enquiry information should be kept only for the period needed to handle the request, administer a booking or meet applicable record-keeping obligations. You can ask the travel team about access, correction or deletion of information shared with them, subject to applicable requirements and records needed for an active booking.",
        },
        {
          title: "Security and policy updates",
          text: "Share trip information only through the confirmed business contact channel. No online service can promise absolute security. This policy may be updated when the website or enquiry process changes; the date above identifies the latest version.",
        },
      ]}
    />
  );
}
