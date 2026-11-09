import { LegalPage } from "@/components/legal-page";
import { CONSENT_KEY } from "@/lib/cookie-consent";
export const metadata = {
  title: "Cookie policy",
  description: "Manage essential and optional storage preferences on rajtrips.",
  alternates: { canonical: "/cookies" },
};
export default function Cookies() {
  return (
    <LegalPage
      title="Your choices, remembered."
      intro="How cookies and similar storage work on rajtrips, and how you stay in control."
      sections={[
        {
          title: "Cookies and local storage",
          text: "Cookies are small values stored by a browser and sometimes sent with website requests. Local storage stays in the browser until removed. Our preference controls cover both types of technology, even though the current consent record uses local storage rather than a cookie.",
        },
        {
          title: "Essential preference storage",
          text: `We store your consent choices under ${CONSENT_KEY}, including the enabled categories and the time you saved them. This essential record does not contain your name, phone number or trip itinerary. It remains on this browser until you change it or clear website data.`,
        },
        {
          title: "Optional categories",
          text: "Functional preferences cover optional conveniences such as remembered travel choices. Analytics covers traffic measurement, and marketing covers advertising tools. None of these optional tools is currently installed. Enabling a category records permission; it does not install a tracker or create a booking. Any future optional integration must respect your saved choice before loading.",
        },
        {
          title: "Accept, reject or choose",
          text: "On your first visit, use Accept all, Reject optional, or open Cookie settings to choose categories and Save choices. Essential preference storage remains enabled. The same controls can be reopened using Cookie settings in the footer. Rejecting optional categories does not prevent you from browsing cars or making an enquiry.",
        },
        {
          title: "Changing or withdrawing a choice",
          text: "Reopen Cookie settings, turn off the optional categories you no longer want and select Save choices, or select Reject optional. Your updated choice replaces the old record on that browser. Clearing browser data removes the record and brings the banner back on your next visit. If browser storage is blocked, choices may not persist between visits.",
        },
        {
          title: "External services",
          text: "WhatsApp and email services operate separately when you follow an enquiry link. They may use their own storage under their policies. Accepting optional categories here does not change your settings on those services.",
        },
      ]}
    />
  );
}
