import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/productData/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Cart
    cartProducts: [
      // example
      // { productId: 1, amount: 2 },
    ],

    // ColorSelct
    filterColor: 0,
  },
  mutations: {
    // Cart
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((product) => product.productId !== productId);
    },

    // ColorSelect
    updateFilteredColor(state, colorId) {
      state.filteredColor = colorId;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, product) => (product.product.price * product.amount + acc), 0);
    },
  },
});