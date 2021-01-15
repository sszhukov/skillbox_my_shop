<template>
  <main class="content container" v-if="productLoadingError">
    <h1>Произошла ошибка</h1>
    <button class="button button--restart" @click="loadProductData">Попробовать ещё раз</button>
  </main>
  <main class="content container" v-else-if="!productData"></main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title">
        </div>
        <ul class="pics__list" v-if="product.additionalImages">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/phone-square-1.jpg" srcset="img/phone-square-1@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-2.jpg" srcset="img/phone-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-3.jpg" srcset="img/phone-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img width="98" height="98" src="img/phone-square-4.jpg" srcset="img/phone-square-4@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <ColorSelection :colors="colors" :color-id.sync="colorId"/>

            <div class="item__row">
              <AmountSelection :amount.sync="productAmount"/>

              <router-link :to="{name: 'cart'}" v-if="productInCart(this.product.id)">
                <button class="button button--primery">
                  Уже в корзине
                </button>
              </router-link>
              <button id="processing" class="button button--primery" v-else-if="addingProductToCart && !addingProductToCartError">
                Добавление...
              </button>
              <div v-else-if="addingProductToCartError">Что-то пошло не так, и товар не был добавлен в корзину. Попробуйте ещё раз</div>
              <button class="button button--primery" :disabled="addingProductToCart" v-else>
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки,
            сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+,
            объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне.
            При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков.
            Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников.
            Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона.
            Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
            На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки).
            Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли,
            а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ColorSelection from '@/components/ColorSelection.vue';
import AmountSelection from '@/components/AmountSelection.vue';
import { API_BASE_URL } from '@/config';
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  components: { ColorSelection, AmountSelection },
  data() {
    return {
      currentColorId: +this.$route.params.colorId,
      productAmount: 1,

      productData: null,
      productCategories: null,
      productColors: null,

      productLoadingError: false,

      addingProductToCart: false,
      addingProductToCartError: false,
    };
  },
  computed: {
    product() {
      return this.productData || {};
    },
    category() {
      return this.productCategories || {};
    },
    colors() {
      return this.productColors || [];
    },
    colorId: {
      get() {
        return this.currentColorId || null;
      },
      set(val) {
        this.currentColorId = val;
      },
    },
    productInCart() {
      return this.inCart(this.product.id);
    },
  },
  methods: {
    gotoPage,
    ...mapMutations(['openModalLoader', 'closeModalLoader']),
    ...mapActions(['addProductToCart']),
    ...mapGetters(['inCart']),

    addToCart() {
      this.addingProductToCart = true;
      this.addingProductToCartError = false;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .catch(() => { this.addingProductToCartError = true; })
        .then(() => { this.addingProductToCart = false; });
    },
    loadProductData() {
      this.openModalLoader('Загрузка товара');
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productLoadingError = false;
          this.productCategories = response.data.category;
          this.productColors = response.data.colors;
          this.productData = {
            ...response.data,
            image: response.data.image.file.url,
          };
        })
        .catch(() => { this.productLoadingError = true; })
        .then(() => { this.closeModalLoader(); });
    },
  },
  filters: {
    numberFormat,
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProductData();
      },
      immediate: true,
    },
  },
};
</script>

<style>
  #processing {
    animation: processing 3s linear infinite;
    border: 10px solid rgb(158, 255, 0);
  }
  @keyframes processing {
    0% { border: 10px solid rgb(158, 255, 0); }
    25% { border: 10px solid rgb(255, 0, 0); }
    50% { border: 10px solid rgb(0, 0, 255); }
    75% { border: 10px solid rgb(255, 0, 0); }
    100% { border: 10px solid rgb(158, 255, 0); }
  }

  .button.button--restart {
    background: rgb(158, 255, 0);
  }
</style>
