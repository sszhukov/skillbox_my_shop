<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="(product, index) in products" :key="index">
      <ProductItem :product="product"/>
    </li>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  comments: { ProductItem },
  props: ['products'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
