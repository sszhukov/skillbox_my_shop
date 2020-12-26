export default function (price) {
  const newPrice = parseInt(price, 10);

  if (!Number.isNaN(newPrice)) {
    return newPrice;
  }
  return null;
}
