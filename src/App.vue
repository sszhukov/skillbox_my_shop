<template>
  <div>
    <div class="overlay" :class="modalLoager.active ? 'active' : ''">
      <header class="header">
        <div class="header__wrapper container">
          <router-link class="header__info" :to="{ name: 'main' }">Каталог</router-link>

          <router-link class="header__logo" :to="{ name: 'main' }">
            <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
          </router-link>

          <a class="header__tel" href="tel:8 800 600 90 09">
            8 800 600 90 09
          </a>

          <CartIndicator :class="loadingCart ? 'cartLoad' : ''"/>
        </div>
      </header>

      <router-view/>

      <footer class="footer">
        <div class="footer__wrapper container">
          <ul class="footer__links">
            <li>
              <a class="footer__link" href="#">
                Каталог
              </a>
            </li>
            <li>
              <a class="footer__link" href="tel:88006009009">
                8 800 600 90 09
              </a>
            </li>
            <li>
              <a class="footer__link" href="mailto:hi@technozavrrr.com">
                hi@technozavrrr.com
              </a>
            </li>
            <li>
              <a class="footer__link" href="#">
                Распродажа
              </a>
            </li>
            <li>
              <a class="footer__link footer__link--medium" href="#">
                Заказать звонок
              </a>
            </li>
          </ul>

          <ul class="footer__social social">
            <li class="social__item">
              <a class="social__link" href="#" aria-label="Вконтакте">
                <svg width="20" height="11" fill="currentColor">
                  <use xlink:href="#icon-vk"></use>
                </svg>
              </a>
            </li>
            <li class="social__item">
              <a class="social__link" href="#" aria-label="Инстаграм">
                <svg width="17" height="17" fill="currentColor">
                  <use xlink:href="#icon-insta"></use>
                </svg>
              </a>
            </li>
            <li class="social__item">
              <a class="social__link" href="#" aria-label="Facebook">
                <svg width="17" height="17" fill="currentColor">
                  <use xlink:href="#icon-facebook"></use>
                </svg>
              </a>
            </li>
            <li class="social__item">
              <a class="social__link" href="#" aria-label="Twitter">
                <svg width="17" height="14" fill="currentColor">
                  <use xlink:href="#icon-twitter"></use>
                </svg>
              </a>
            </li>
            <li class="social__item">
              <a class="social__link" href="#" aria-label="Telegram">
                <svg width="19" height="17" fill="currentColor">
                  <use xlink:href="#icon-telegram"></use>
                </svg>
              </a>
            </li>
          </ul>

          <p class="footer__desc">
            Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ,
            в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
          </p>

          <ul class="footer__data">
            <li>
              <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
                Политика конфиденциальности
              </a>
            </li>
            <li>
              <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
                Публичная оферта
              </a>
            </li>
          </ul>

          <span class="footer__copyright">
            © 2020 Технозавррр
          </span>
        </div>
      </footer>
    </div>

    <div class="modal" :class="modalLoager.active ? 'active' : ''" data-modal="1">
        <div class="modal-message">{{modalLoager.message}}</div>
        <Loader/>
      </div>

      <!-- Подложка под модальным окном -->
      <div class="overlay" id="overlay-modal"></div>
  </div>
</template>

<script>
import CartIndicator from '@/components/CartIndicator.vue';
import Loader from '@/components/Loader.vue';
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  components: { CartIndicator, Loader },
  data() {
    return {
      loadingCart: false,
    };
  },
  methods: {
    ...mapMutations(['updateUserAccessKey']),
    ...mapActions(['loadCart']),
    ...mapGetters(['getModalLoader']),
  },
  computed: {
    modalLoager() {
      return this.getModalLoader();
    },
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }

    this.loadingCart = true;
    this.loadCart()
      .then(() => {
        this.loadingCart = false;
      });
  },
};
</script>

<style>
.overlay {
  transition: 0.3s all;
}
.modal {
  opacity: 0;
  visibility: hidden;
  height: 450px;
  width: 450px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  text-align: center;
  border-radius: 100px;
  background-color: #fff;
  opacity: 0.5;
  transition: 0.3s all;
}
.modal-message {
  font: 2em sans-serif;
  position: absolute;
  width: 100%;
  top: 60%
}
.modal.active {
   opacity: 1;
   visibility: visible;
}
.overlay.active {
  background-color: rgba(0, 0, 0, .5);
  filter: blur(10px) brightness(.5);
}

.cartLoad {
  animation-name: rotation;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes rotation {
    0% {
        transform:rotate(0deg);
    }
    100% {
        transform:rotate(360deg);
    }
}
</style>
