<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{cartProductCount}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormFieldText title="ФИО"
                               v-model="formData.name"
                               :error="formError.name"
                               placeholder="Введите ваше полное имя"/>

            <BaseFormFieldText title="Адрес доставки"
                               v-model="formData.address"
                               :error="formError.address"
                               placeholder="Введите ваш адрес"/>

            <BaseFormFieldText title="Телефон"
                               type="tel"
                               v-model="formData.phone"
                               :error="formError.phone"
                               placeholder="Введите ваш телефон"/>

            <BaseFormFieldText title="Email"
                               type="email"
                               v-model="formData.email"
                               :error="formError.email"
                               placeholder="Введи ваш Email"/>

            <BaseFormFieldTextarea title="Комментарий к заказу"
                                   v-model="formData.comment"
                                   :error="formError.comment"
                                   placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderDetailItem v-for="item in products" :product="item.product" :key="item.product.id"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{cartProductCount}}</b> товара на сумму <b>{{totalPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" @click="order">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormFieldText from '@/components/BaseFormFieldText.vue';
import BaseFormFieldTextarea from '@/components/BaseFormFieldTextarea.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import OrderDetailItem from '@/components/OrderDetailItem.vue';

export default {
  components: { BaseFormFieldText, BaseFormFieldTextarea, OrderDetailItem },
  filters: { numberFormat },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),

    cartProductCount() {
      return this.$store.state.cartProducts.length;
    },
  },
  methods: {
    ...mapActions(['createOrder']),
    ...mapMutations(['resetCart']),

    order() {
      this.formError = {};
      this.formErrorMessage = '';

      this.createOrder(this.formData)
        .then(() => {
          this.resetCart();
        })
        .catch((error) => {
          this.formError = error.request || {};
          this.formErrorMessage = error.message;
        });
    },
  },
};
</script>
