import priceToNum from '@/helpers/priceToNum';

export default function (price) {
  if (priceToNum(price) !== null) {
    return true;
  }
  return false;
}
