export type Faq = {
  question: string;
  answer: string;
};

// General questions shown on the homepage and the FAQs page.
// Later these will move to the database so the admin can edit them.
export const generalFaqs: Faq[] = [
  {
    question: "MoneyTreeVenture kya hai?",
    answer:
      "Yeh digital kits ka platform hai. Yahan aap simple Hinglish mein bane guides, videos aur checklists khareed kar nayi online skills seekh sakte hain.",
  },
  {
    question: "Kya mujhe login karna padega?",
    answer:
      "Kits dekhne ke liye login zaroori nahi. Kharidne ke liye Google se login karna hota hai, taki aapki purchases aapki library mein safe rahein.",
  },
  {
    question: "Kya yeh kits beginners ke liye hain?",
    answer: "Haan. Kits simple Hinglish mein banaye gaye hain, aur koi advanced English ya technical knowledge zaroori nahi.",
  },
  {
    question: "Payment kaise hota hai?",
    answer:
      "Payment Cashfree ke secure checkout se hota hai, jahan aap available payment options mein se chun sakte hain. Aapki card ya UPI ki details hamare paas save nahi hoti.",
  },
  {
    question: "Kharidne ke baad kit kab milta hai?",
    answer:
      "Payment confirm hote hi kit aapki library mein aa jata hai. Wahan se aap kabhi bhi download ya dekh sakte hain.",
  },
  {
    question: "Kya income ki guarantee milti hai?",
    answer:
      "Nahi. Hamare kits seekhne ke liye hain. Aapka result aapki mehnat, skill, samay aur halaat par nirbhar karta hai, isliye hum kisi income ya result ki guarantee nahi dete.",
  },
  {
    question: "Access kitne time tak rahega?",
    answer:
      "Lifetime. Ek baar kharidne ke baad kit aapki library mein rehta hai. Yeh access Terms and Conditions ke hisaab se hai.",
  },
  {
    question: "Kya main kit doosron ke saath share kar sakta hoon?",
    answer: "Nahi. Kits sirf aapke apne personal use ke liye hain. Poori details Terms and Conditions mein di gayi hain.",
  },
  {
    question: "Kisi sawal ke liye kaise sampark karein?",
    answer: "Contact page par form bharein. Hum aapko jaldi se jaldi jawab dene ki koshish karenge.",
  },
];
