<template>
<aside class="filter">
  <h2 class="filter__title">Фильтры</h2>

  <form class="filter__form form" action="#" method="get">
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" v-model.number="filters.minPrice">
        <span class="form__value">От</span>
      </label>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price" v-model.number="filters.maxPrice">
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категория</legend>
      <label class="form__label form__label--select">
        <select class="form__select" type="text" name="category" v-model.number="filters.categoryId">
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

    <ColorSelection v-if="colorsData" :colors="colorsData" :color-id.sync="filters.colorId" :inFilter="true"/>

    <button class="filter__submit button button--primery" @click.prevent="submit">
      Применить
    </button>
    <button class="filter__reset button button--second" type="button" @click.prevent="reset">
      Сбросить
    </button>
  </form>
</aside>
</template>

<script>
import ColorSelection from '@/components/ColorSelection.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: { ColorSelection },
  props: {
    minPrice: Number,
    maxPrice: Number,
    categoryId: Number,
    colorId: Number,
  },
  data() {
    return {
      categoriesData: null,
      colorsData: null,
    };
  },
  computed: {
    filters() {
      return {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        categoryId: this.categoryId,
        colorId: this.colorId,
      };
    },
  },
  methods: {
    ...mapActions(['loadFilterCategories', 'loadFilterColors']),
    ...mapMutations(['updateFilterColor']),

    submit() {
      this.$emit('update:minPrice', this.filters.minPrice < 0 ? 0 : this.filters.minPrice);
      this.$emit('update:maxPrice', this.filters.maxPrice < 0 ? 0 : this.filters.maxPrice);
      this.$emit('update:categoryId', this.filters.categoryId < 0 ? 0 : this.filters.categoryId);
      this.$emit('update:colorId', this.filters.colorId < 0 ? 0 : this.filters.colorId);
      this.updateFilterColor(this.filters.colorId < 0 ? 0 : this.filters.colorId);
    },
    reset() {
      this.$emit('update:minPrice', 0);
      this.$emit('update:maxPrice', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
      this.updateFilterColor(0);
    },
    loadCategories() {
      this.loadFilterCategories()
        .then((categories) => { this.categoriesData = categories || []; })
        .catch(() => {});
    },
    loadColors() {
      this.loadFilterColors()
        .then((colors) => { this.colorsData = colors || []; })
        .catch(() => {});
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
