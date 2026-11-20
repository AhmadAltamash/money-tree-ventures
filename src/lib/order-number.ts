// Creates a short, readable order number such as MTV-LX4K2P9Q.
export function generateOrderNumber() {
  const timePart = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `MTV-${timePart}${randomPart}`;
}
