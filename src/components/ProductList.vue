<template>
  <ul class="catalog__list">
    <ProductListItem v-for="product in products" :product="product" :color-id="colorId" :key="product.id"/>
  </ul>
</template>

<script>
import ProductListItem from '@/components/ProductListItem.vue';

export default {
  components: { ProductListItem },
  props: {
    products: Array,
    colorId: Number,
  },
};
</script>
