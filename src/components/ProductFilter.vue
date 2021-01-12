<template>
<aside class="filter">
  <h2 class="filter__title">Фильтры</h2>

  <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
        <span class="form__value">От</span>
      </label>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категория</legend>
      <label class="form__label form__label--select">
        <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
          <option value="0">Все категории</option>
          <option v-for="category in categoriesData"
                  :value="category.id"
                  :key="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </label>
    </fieldset>

    <ColorSelection v-if="colorsData" :colors="colorsData" :color-id.sync="currentColorId" :inFilter="true"/>

    <!-- <fieldset class="form__block">
      <legend class="form__legend">Объемб в ГБ</legend>
      <ul class="check-list">
        <li class="check-list__item">
          <label class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox"
                    name="volume" value="8" checked=""
            >
            <span class="check-list__desc">
              8
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
            <span class="check-list__desc">
              16
              <span>(461)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
            <span class="check-list__desc">
              32
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
            <span class="check-list__desc">
              64
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
            <span class="check-list__desc">
              128
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label class="check-list__label">
            <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
            <span class="check-list__desc">
              264
              <span>(313)</span>
            </span>
          </label>
        </li>
      </ul>
    </fieldset> -->

    <button class="filter__submit button button--primery" type="submit">
      Применить
    </button>
    <button class="filter__reset button button--second" type="button" @click.prevent="reset">
      Сбросить
    </button>
  </form>
</aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ColorSelection from '@/components/ColorSelection.vue';

export default {
  components: { ColorSelection },
  props: {
    priceFrom: Number,
    priceTo: Number,
    categoryId: Number,
    colorId: Number,
  },
  data() {
    return {
      currentPriceFrom: this.priceFrom,
      currentPriceTo: this.priceTo,
      currentCategoryId: this.categoryId,
      currentColorId: this.colorId,

      categoriesData: null,
      colorsData: null,
    };
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom < 0 ? 0 : this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo < 0 ? 0 : this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId < 0 ? 0 : this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId < 0 ? 0 : this.currentColorId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => { this.categoriesData = response.data.items; })
        .catch();
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => { this.colorsData = response.data.items; })
        .catch();
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
