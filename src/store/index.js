import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Cart
    cartProducts: [],

    // ColorSelct
    filterColor: 0,

    modalLoader: {
      active: false,
      message: '',
    },

    // Cart from API
    userAccessKey: null,
    cartProductData: [],

    orderInfo: {},
  },
  mutations: {
    // Cart
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
    updateFilterColor(state, colorId) {
      state.filterColor = colorId;
    },

    openModalLoader(state, message) {
      state.modalLoader.active = true;
      state.modalLoader.message = message;
    },
    closeModalLoader(state) {
      state.modalLoader.active = false;
      state.modalLoader.message = '';
    },

    // Cart from API
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductData(state, items) {
      state.cartProductData = items;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductData = [];
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductData.find((element) => element.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, product) => (product.product.price * product.amount + acc), 0);
    },
    inCart: (state) => (productId) => {
      if (state.cartProducts.find((item) => item.productId === productId)) {
        return true;
      }
      return false;
    },
    getModalLoader(state) {
      return state.modalLoader;
    },
  },
  actions: {
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return new Promise();
      }

      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId);

      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: {
          productId,
        },
      })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    createOrder(context, orderData) {
      return axios.post(`${API_BASE_URL}/api/orders`, orderData, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
          return response.data.id;
        })
        .catch((error) => { throw error.response.data.error; });
    },
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => { context.commit('updateOrderInfo', response.data); });
    },
  },
});
