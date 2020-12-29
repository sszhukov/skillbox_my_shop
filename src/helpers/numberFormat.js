export default function numberFormat(value) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat().format(value.toFixed(2));
  }

  return '';
}
