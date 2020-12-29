<template>
<li class="catalog__item" >
  <a class="catalog__pic">
    <img :src="product.imagePuth" alt="Название товара">
  </a>

  <h3 class="catalog__title">
    <a href="#" @click.prevent="gotoPage('product', {id: product.id, colorId: currentColorId})">
      {{ product.title }}
    </a>
  </h3>

  <span class="catalog__price">
    {{ product.price | numberFormat }} ₽
  </span>

  <ColorSelection v-if="product.modificationColorIds.length > 1"
                  :colors="colors(product.modificationColorIds)"
                  :color-id.sync="currentColorId"/>

</li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ColorSelection from '@/components/ColorSelection.vue';
import colors from '@/productData/colors';

export default {
  components: { ColorSelection },
  props: {
    product: Object,
    colorId: Number,
  },
  data() {
    return {
      currentColorId: this.colorId,
    };
  },
  methods: {
    gotoPage,
    colors,
  },
  filters: {
    numberFormat,
  },
};
</script>
