// Every customer facing success and error message lives here, so the tone stays
// consistent and you can edit the Hinglish in one place.
export const messages = {
  auth: {
    loginSuccess: "Login ho gaya. Aapka Google account connect ho chuka hai.",
    loginError: "Login nahi ho paya. Kripya dobara try karein.",
    accessDenied:
      "Aapka Google account verify nahi ho paya, ya login ki permission nahi mili. Kripya dobara ya kisi doosre account se try karein.",
    configuration: "Login abhi theek se set nahi hai. Kripya thodi der baad try karein ya hume contact karein.",
    redirecting: "Aapko aage bhej rahe hain...",
  },
  payment: {
    success: "Payment ho gaya. Aapka product ab My Purchases mein available hai.",
    failure: "Payment complete nahi ho paya. Aap dobara try kar sakte hain.",
    pending: "Payment abhi process ho raha hai. Confirm hote hi product aapki library mein aa jayega.",
  },
  library: {
    empty: "Abhi aapki library khali hai. Apna pehla digital kit explore karein.",
    noFiles: "Is kit ki files abhi add ho rahi hain. Zaroorat ho toh hume contact karein.",
    consultation: "Call ki booking ki details aapko jaldi bheji jayengi.",
  },
  downloads: {
    limit: "Aaj ke liye is file ki download limit poori ho gayi. Kal dobara try karein ya hume contact karein.",
    missing: "Yeh file nahi mili. Hume contact karein, hum theek kar denge.",
    error: "Download shuru nahi ho paya. Thodi der baad dobara try karein.",
  },
  cart: {
    empty: "Aapka cart khali hai. Kits dekhne ke liye Explore Kits par jayein.",
  },
  contact: {
    success: "Message bhej diya gaya. Hum aapko jaldi jawab denge.",
    error: "Message bhej nahi paye. Kripya thodi der baad dobara try karein.",
    rateLimited: "Aapne kaafi messages bhej diye hain. Kuch der baad dobara try karein.",
  },
  common: {
    somethingWentWrong: "Kuch galat ho gaya. Thodi der baad dobara try karein.",
    networkError: "Internet connection check karke dobara try karein.",
  },
} as const;
