import { business } from "@/config/business";
import type { LegalDocument } from "./types";

// DRAFT. The refund rules below are a safe starting point for digital products.
// Decide the final rules with your lawyer and fill the numbers in src/config/business.ts.
export const refundPolicy: LegalDocument = {
  title: "Refund and Cancellation Policy",
  description: "MoneyTreeVenture par cancellation, refund aur digital delivery ke niyam.",
  intro:
    "Hamare kits digital products hain, jo payment ke baad turant aapki library mein aa jate hain. Isliye cancellation aur refund ke niyam alag hain. Kripya kharidne se pehle yeh page padh lein.",
  sections: [
    {
      heading: "Digital delivery",
      paragraphs: [
        "Payment confirm hote hi kit aapki library mein aa jata hai. Koi physical shipping nahi hoti.",
        `Agar payment ke baad ${business.accessIssueHours} ghante tak kit library mein na dikhe, toh kripya hume batayein.`,
      ],
    },
    {
      heading: "Cancellation",
      paragraphs: [
        "Payment karne se pehle aap cart se kisi bhi kit ko hata sakte hain.",
        "Payment hone aur kit library mein aane ke baad order cancel nahi kiya ja sakta, kyunki digital content turant access ho jata hai.",
      ],
    },
    {
      heading: "Kab refund mil sakta hai",
      items: [
        "Ek hi kit ke liye do baar payment ho gaya ho.",
        "Payment kat gaya ho lekin kit aapki library mein nahi aaya aur hum use theek nahi kar paaye.",
        "Kit ki files kharab hon ya khul nahi rahi hon aur hum unhe theek nahi kar paaye.",
        "Kit ka content uske description se bahut alag ho.",
      ],
    },
    {
      heading: "Kab refund nahi milega",
      items: [
        "Aapne kit dekh ya download kar liya hai aur ab sirf man badalne ki wajah se refund chahiye.",
        "Aapko income ya result nahi mila. Hum kisi result ki guarantee nahi dete.",
        "Kit ya account ka misuse ya sharing hui hai.",
        `Request payment ke ${business.refundRequestDays} din ke baad ki gayi hai.`,
      ],
    },
    {
      heading: "Refund kaise maangein",
      paragraphs: [
        `Contact page ke form ya ${business.supportEmail} par apna registered email, order id aur refund ka kaaran likhein. Request payment ke ${business.refundRequestDays} din ke andar bhejein.`,
        `Hum aapki request ka jawab ${business.refundResponseDays} working days mein dene ki koshish karenge.`,
      ],
    },
    {
      heading: "Refund kaise aur kab milta hai",
      paragraphs: [
        `Approved refund usi payment method mein wapas bheja jata hai jisse aapne payment kiya tha. Aam taur par ismein ${business.refundProcessingDays} working days lagte hain, lekin bank aur payment gateway ke hisaab se thoda zyada time lag sakta hai.`,
      ],
    },
    {
      heading: "Failed ya double payment",
      paragraphs: [
        "Agar payment fail ho gaya lekin paise kat gaye, toh aam taur par payment gateway aur bank ke niyam ke hisaab se paise apne aap wapas aa jate hain. Agar aisa na ho, toh hume order ki details ke saath batayein.",
      ],
    },
    {
      heading: "Live call ka cancellation",
      paragraphs: [
        `Agar aap call se ${business.callCancellationHours} ghante pehle batate hain, toh hum call ko dusre time par rakh denge ya refund ki request dekhenge. Bina bataye call miss karne par refund nahi hoga.`,
      ],
    },
  ],
};
