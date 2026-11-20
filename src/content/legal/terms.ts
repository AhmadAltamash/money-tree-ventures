import { business } from "@/config/business";
import type { LegalDocument } from "./types";

// DRAFT. Have a lawyer review this before the site goes live.
export const terms: LegalDocument = {
  title: "Terms and Conditions",
  description: "MoneyTreeVenture use karne aur kits kharidne ke niyam aur shartein.",
  intro: `Yeh niyam moneytreeventure.com par lagu hote hain, jo ${business.legalName} (aage "hum" ya "MoneyTreeVenture") chalata hai. Website use karke ya kuch kharid kar aap in niyamon se sehmat hote hain. Agar aap sehmat nahi hain, toh kripya website use na karein.`,
  sections: [
    {
      heading: "Hamari service",
      paragraphs: [
        "MoneyTreeVenture digital kits bechta hai, jaise PDF guides, videos, templates, checklists aur live call jaisi services. Yeh kits seekhne ke liye hain.",
      ],
    },
    {
      heading: "Account aur login",
      items: [
        "Kharidne aur apni library dekhne ke liye aapko Google se login karna hota hai.",
        "Aap apne account ki surakshit rakhwali ke zimmedar hain. Apna account kisi ke saath share na karein.",
        "Aapki umar 18 saal ya usse zyada honi chahiye, ya aap kisi mata pita ya guardian ki dekhrekh mein use karein.",
      ],
    },
    {
      heading: "Orders aur payment",
      items: [
        "Sabhi prices Indian rupees (INR) mein hain.",
        "Payment Cashfree ke secure checkout se hota hai.",
        "Aapka order tab confirm hota hai jab hum payment ko verify kar lete hain. Sirf screen par payment ka message dikhne se order confirm nahi mana jata.",
        "Hum prices badal sakte hain, lekin jo order pehle ho chuka hai uski price par asar nahi padta.",
      ],
    },
    {
      heading: "Kits ka use",
      paragraphs: [
        "Kharidne ke baad aapko kit ka personal, non transferable use ka adhikar milta hai. Iska matlab hai ki kit sirf aapke apne seekhne ke liye hai.",
        "Aap yeh nahi kar sakte:",
      ],
      items: [
        "Kit ya uski files kisi aur ko dena, bhejna ya bechna.",
        "Kit ko doosre websites, apps, groups ya cloud folders par upload ya share karna.",
        "Video ya PDF ki copy bana kar baantna.",
        "Kit ka use apni khud ki product ya course banane mein karna.",
        "Apna login kisi aur ko dena.",
      ],
    },
    {
      heading: "Lifetime access",
      paragraphs: [
        "Lifetime access ka matlab hai ki jab tak MoneyTreeVenture platform chal raha hai, aap apna kharida hua kit apni library mein dekh aur download kar sakte hain.",
        `Agar hum platform band karte hain, toh aapko kam se kam ${business.platformClosureNoticeDays} din pehle notice diya jayega, aur us dauran aap apne kits download kar sakenge.`,
      ],
    },
    {
      heading: "Live calls",
      paragraphs: [
        "1:1 Clarity Call jaise live sessions ki booking ki details payment ke baad di jati hain. Call ko badalne ya cancel karne ke niyam Refund and Cancellation Policy mein diye gaye hain.",
      ],
    },
    {
      heading: "Income ki guarantee nahi",
      paragraphs: [
        "Hamare kits sirf jaankari aur seekhne ke liye hain. Hum kisi bhi income, kamai ya result ki guarantee nahi dete. Aapka result aapki mehnat, skill, samay aur halaat par nirbhar karta hai.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "Website aur kits ka content, design aur naam MoneyTreeVenture ya uske creators ka hai. Bina likhit anumati ke kisi ko bhi isse copy ya use karne ka adhikar nahi hai.",
      ],
    },
    {
      heading: "Hamari zimmedari ki seema",
      paragraphs: [
        "Hum kits sahi aur upyogi banane ki koshish karte hain, lekin kanoon ki seema mein, kisi bhi nuksan, jaise kamai ka nuksan ya indirect nuksan, ke liye hum zimmedar nahi honge. Kisi bhi halat mein hamari zimmedari us kit ke liye aapke diye gaye amount tak hi hogi.",
      ],
    },
    {
      heading: "Doosre websites aur services",
      paragraphs: [
        "Website par Google, Cashfree ya doosri services ke links ya features ho sakte hain. Unke apne niyam hote hain, aur unke liye hum zimmedar nahi hain.",
      ],
    },
    {
      heading: "Account band karna",
      paragraphs: [
        "Agar in niyamon ka ulanghan hota hai, jaise kit share karna ya payment mein dhokha, toh hum aapka access rok sakte hain ya account band kar sakte hain.",
      ],
    },
    {
      heading: "Kanoon aur adalat",
      paragraphs: [
        `Yeh niyam Bharat ke kanoon ke tehat chalte hain. Kisi bhi vivad ke liye ${business.governingCity} ki adalatein adhikar kshetra mein hongi.`,
      ],
    },
    {
      heading: "Niyamon mein badlav",
      paragraphs: [
        "Hum in niyamon ko kabhi bhi badal sakte hain. Naya version is page par dikhega, aur uske baad website use karne ka matlab hai ki aap badlav se sehmat hain.",
      ],
    },
    {
      heading: "Sampark",
      paragraphs: [
        `${business.legalName}`,
        `Address: ${business.registeredAddress}`,
        `Email: ${business.supportEmail}`,
      ],
    },
  ],
};
