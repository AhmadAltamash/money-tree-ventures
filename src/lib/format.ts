// Shows a price the Indian way, for example ₹1,499.
export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

// Returns 0 when there is no real discount to show.
export function getDiscountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) {
    return 0;
  }
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

// Always uses Indian time, so the server and the browser show the same date.
export function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
