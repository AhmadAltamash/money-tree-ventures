import { z } from "zod";

// Used by the form in the browser and again on the server, so the rules always match.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Kripya apna naam likhein (kam se kam 2 akshar).")
    .max(80, "Naam 80 akshar se chhota rakhein."),
  email: z.string().trim().email("Sahi email address likhein.").max(120, "Email bahut lamba hai."),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || /^[0-9+\s]{10,15}$/.test(value), "Phone number mein 10 se 15 digits hone chahiye."),
  message: z
    .string()
    .trim()
    .min(10, "Message kam se kam 10 akshar ka hona chahiye.")
    .max(1000, "Message 1000 akshar se chhota rakhein."),
  // Hidden field. Real visitors never fill it, spam bots usually do.
  website: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
