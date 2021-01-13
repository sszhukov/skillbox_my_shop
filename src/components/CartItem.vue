<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info">
      Объем: <span>128GB</span>
    </p>
    <span class="product__code">
      Артикул: {{ item.productId }}
    </span>

    <AmountSelection :amount.sync="amount"/>

    <b class="product__price">
      {{ item.product.price * item.amount | numberFormat }} ₽
    </b>

    <button class="product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
            @click="deleteCartProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import AmountSelection from '@/components/AmountSelection.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  components: {
    AmountSelection,
  },
  props: {
    item: Object,
  },
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({ productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),
  },
};
</script>
