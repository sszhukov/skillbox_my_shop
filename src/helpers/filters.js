function priceGreaterThen(products, from) {
  let filteredProduct = products;
  if (from > 0) {
    filteredProduct = products.filter((product) => product > from);
  }
  return filteredProduct;
}

function priceLessThen(products, to) {
  let filteredProduct = products;
  if (to > 0) {
    filteredProduct = products.filter((product) => product.price < to);
  }
  return filteredProduct;
}

function priceEqual(products, eq) {
  let filteredProduct = products;
  if (eq > 0) {
    filteredProduct = products.filter((product) => product.price === eq);
  }
  return filteredProduct;
}

function filterPrice(products, from, to) {
  let filteredProduct = products;
  if (to - from > 0) {
    filteredProduct = priceGreaterThen(products, from);
    filteredProduct = priceLessThen(products, to);
  } else if (to - from < 0) {
    filteredProduct = priceGreaterThen(products, to);
    filteredProduct = priceLessThen(products, from);
  } else if (from > 0) {
    filteredProduct = priceEqual(products, from);
  }
  return filteredProduct;
}

function filterCategories(products, categoryId) {
  let filteredProduct = products;
  if (categoryId > 0) {
    filteredProduct = products.filter((product) => product.categoryId === categoryId);
  }
  return filteredProduct;
}

function filterColors(products, colorId) {
  let filteredProduct = products;
  if (colorId > 0) {
    filteredProduct = products.filter((product) => product.colorIds.includes(colorId));
  }
  return filteredProduct;
}

export default {
  filterPrice,
  filterCategories,
  filterColors,
};
