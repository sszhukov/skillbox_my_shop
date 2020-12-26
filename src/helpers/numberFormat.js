export default function numberFormat(value) {
  if (value && typeof value === 'number') {
    return new Intl.NumberFormat().format(value);
  }
  return value;
}
