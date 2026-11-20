import { business } from "@/config/business";
import type { LegalDocument } from "./types";

// DRAFT. Have a lawyer review this before the site goes live.
export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: "MoneyTreeVenture aapki personal jaankari kaise use karta hai aur kaise surakshit rakhta hai.",
  intro: `${business.legalName} (aage "hum" ya "MoneyTreeVenture") moneytreeventure.com chalata hai. Yeh policy batati hai ki hum aapki kaun si jaankari lete hain, kyun lete hain aur uska kya karte hain. Website use karke aap is policy se sehmat hote hain.`,
  sections: [
    {
      heading: "Hum kaun si jaankari lete hain",
      items: [
        "Google login se: aapka naam, email address aur profile photo.",
        "Order ki jaankari: kharide gaye kits, order id, amount aur payment status.",
        "Contact form se: aapka naam, email, phone number (agar aap dein) aur aapka message.",
        "Technical jaankari: device, browser aur website par aapke actions, jab aap cookies ke liye sahmati dete hain.",
      ],
      paragraphs: [
        "Aapki card, UPI ya netbanking ki details hum nahi dekhte aur na hi save karte. Payment Cashfree ke secure checkout par hota hai.",
      ],
    },
    {
      heading: "Hum jaankari ka use kyun karte hain",
      items: [
        "Aapka account banane aur login karwane ke liye.",
        "Order process karne, payment verify karne aur kit aapki library mein dene ke liye.",
        "Aapke sawalon aur support requests ka jawab dene ke liye.",
        "Website ko behtar banane ke liye, jab aap analytics ke liye sahmati dete hain.",
        "Fraud aur misuse rokne ke liye.",
        "Kanooni zarooratein poori karne ke liye.",
      ],
    },
    {
      heading: "Cookies aur analytics",
      paragraphs: [
        "Hum zaroori cookies use karte hain, jaise login session aur cart ke liye. Analytics cookies sirf tab chalti hain jab aap cookie banner par sahmati dete hain.",
        "Aap apni sahmati kabhi bhi cookie banner ya browser settings se badal sakte hain.",
      ],
    },
    {
      heading: "Jaankari kinke saath share hoti hai",
      paragraphs: [
        "Hum aapki jaankari bechte nahi. Apna kaam poora karne ke liye hum in service providers ke saath zaroori jaankari share karte hain:",
      ],
      items: [
        "Cashfree, payment lene ke liye.",
        "Google, login ke liye.",
        "Hosting aur database providers, website chalane ke liye.",
        "Email service provider, order aur support emails bhejne ke liye.",
        "Analytics provider, sirf aapki sahmati ke baad.",
        "Kanoon ya sarkari aadesh ke tehat bhi jaankari dena pad sakta hai.",
      ],
    },
    {
      heading: "Jaankari kitne time tak rakhi jati hai",
      paragraphs: [
        "Account aur order ki jaankari hum tab tak rakhte hain jab tak aapka account hai, aur kanooni aur accounting zarooraton ke liye jitne time tak zaroori ho. Contact messages zaroorat khatam hone par hata diye jate hain.",
      ],
    },
    {
      heading: "Aapke adhikar",
      items: [
        "Apni jaankari dekhna aur sahi karwana.",
        "Apni jaankari hatane ki request karna.",
        "Apni di hui sahmati wapas lena.",
        "Hamare paas shikayat darj karna.",
      ],
      paragraphs: [`In mein se kisi ke liye ${business.supportEmail} par likhein.`],
    },
    {
      heading: "Jaankari ki suraksha",
      paragraphs: [
        "Hum aapki jaankari surakshit rakhne ke liye secure connection (HTTPS) aur limited access jaise upay karte hain. Lekin internet par koi bhi system 100 percent surakshit nahi hota.",
      ],
    },
    {
      heading: "Bachchon ki privacy",
      paragraphs: [
        "Hamari website 18 saal se kam umar ke logon ke liye nahi hai. Agar aapko lagta hai ki kisi bachche ne hume jaankari di hai, toh hume batayein. Hum use hata denge.",
      ],
    },
    {
      heading: "Policy mein badlav",
      paragraphs: [
        "Hum yeh policy kabhi bhi badal sakte hain. Naya version is page par upar likhi tarikh ke saath dikhega.",
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
