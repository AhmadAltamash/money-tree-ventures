import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";

type WatermarkDetails = {
  email: string;
  orderNumber: string;
};

// The standard PDF font can only draw simple English letters, so we remove anything else.
function toPlainText(text: string) {
  return text.replace(/[^\x20-\x7E]/g, "");
}

// Stamps the buyer's email and order number on every page. If a copy is shared,
// it can be traced back to the person who bought it.
export async function watermarkPdf(originalBytes: Uint8Array, { email, orderNumber }: WatermarkDetails) {
  const pdf = await PDFDocument.load(originalBytes, { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const safeEmail = toPlainText(email);
  const footerText = `Licensed to ${safeEmail} | Order ${toPlainText(orderNumber)} | MoneyTreeVenture`;

  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();

    // Faint diagonal mark across the page.
    page.drawText(safeEmail, {
      x: width * 0.12,
      y: height * 0.3,
      size: 26,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.08,
      rotate: degrees(35),
    });

    // Small line at the bottom of the page.
    page.drawText(footerText, { x: 24, y: 14, size: 7, font, color: rgb(0.45, 0.45, 0.45), opacity: 0.85 });
  }

  // Hidden tracking detail inside the file information.
  pdf.setKeywords([orderNumber]);
  pdf.setProducer("MoneyTreeVenture");

  return pdf.save();
}
