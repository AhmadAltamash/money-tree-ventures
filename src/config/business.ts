// Fill in your real business details here. The legal pages and the contact page read from this file.
// Anything still written as {{like this}} shows up on the site as an unfinished placeholder.
// Contact page details and the WhatsApp button stay hidden until you replace them.
export const business = {
  legalName: "{{Business legal name}}",
  registeredAddress: "{{Registered business address}}",
  supportEmail: "{{Support email}}",
  supportPhone: "{{Support phone}}",

  // Digits only with country code, for example 919876543210. Leave empty to hide the WhatsApp button.
  whatsappNumber: "",

  // Terms and policies. Decide these with your lawyer.
  governingCity: "{{City for legal disputes}}",
  accessIssueHours: "{{Hours to report a missing kit}}",
  refundRequestDays: "{{Refund request days}}",
  refundResponseDays: "{{Refund response days}}",
  refundProcessingDays: "{{Refund processing days}}",
  callCancellationHours: "{{Call cancellation hours}}",
  platformClosureNoticeDays: "{{Notice days before closing the platform}}",

  lastUpdated: "17 November 2026",
};

export function isFilled(value: string) {
  return value !== "" && !value.startsWith("{{");
}
