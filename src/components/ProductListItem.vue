<template>
<li class="catalog__item" >
  <a class="catalog__pic">
    <img :src="product.image" alt="Название товара">
  </a>

  <h3 class="catalog__title">
    <router-link href="#" :to="{ name: 'product', params:{ id: product.id, colorId: currentColorId } }">
      {{ product.title }}
    </router-link>
  </h3>

  <span class="catalog__price">
    {{ product.price | numberFormat }} ₽
  </span>

  <ColorSelection :colors="product.colors" :color-id.sync="currentColorId"/>

</li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ColorSelection from '@/components/ColorSelection.vue';

export default {
  components: { ColorSelection },
  props: {
    product: Object,
  },
  data() {
    return {
      currentColor: this.currentColorId,
    };
  },
  computed: {
    currentColorId: {
      get() {
        return this.$store.state.filterColor || 0;
      },
      set(value) {
        this.currentColor = value;
      },
    },
  },
  methods: {
    gotoPage,
  },
  filters: {
    numberFormat,
  },
};
</script>
