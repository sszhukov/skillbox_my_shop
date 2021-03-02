<template>
  <li class="cart__order">
    <h3>{{product.title}}</h3>
    <b>{{product.price | numberFormat}} ₽</b>
    <span>Артикул: {{product.id}}</span>
  </li>
</template>

<script>
import numberFormat from '../helpers/numberFormat';

export default {
  props: {
    product: Object,
  },
  filters: { numberFormat },
};
</script>
