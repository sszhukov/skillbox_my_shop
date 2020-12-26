import numberFormat from '@/helpers/numberFormat';
import priceToNum from '@/helpers/priceToNum';

export default function (price, currency, message) {
  const newCurrency = currency === '' || currency ? currency : '₽';
  const newMessage = message === '' || message ? message : 'Нет в наличии';
  const newPrice = priceToNum(price);

  if (newPrice !== null) {
    return `${numberFormat(newPrice)} ${newCurrency}`;
  }
  return newMessage;
}
