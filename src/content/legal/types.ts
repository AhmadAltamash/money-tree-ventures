export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};
