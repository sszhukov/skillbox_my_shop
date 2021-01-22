<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFitter v-bind.sync="filters"/>

      <section class="catalog">
        <div v-if="productsDataError">
          <h1>Произошла ошибка</h1>
          <button class="button button--primery" @click="loadProducts">Попробовать ещё раз</button>
        </div>
        <ProductList v-if="products.length" :products="products"/>
        <div v-else class="products-not-found">Товары не найдены</div>
        <BasePagination v-model="page" :per-page="productPerPege" :total="countProducts"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFitter from '@/components/ProductFilter.vue';
import { mapActions } from 'vuex';

export default {
  components: { ProductList, BasePagination, ProductFitter },
  data() {
    return {
      // ProductsFitter
      filters: {
        minPrice: 0,
        maxPrice: 0,
        categoryId: 0,
        colorId: 0,
      },

      // BasePagination
      page: 1,
      productPerPege: 6,

      // ProducstData
      productsData: null,
      productsDataError: '',
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData
        ? this.productsData.pagination.total
        : 0;
    },
    loadData() {
      return {
        page: this.page,
        limit: this.productPerPege,
        categoryId: this.filters.categoryId,
        colorId: this.filters.colorId,
        minPrice: this.filters.minPrice,
        maxPrice: this.filters.maxPrice,
      };
    },
    filterColorId() {
      return this.$store.getters.getFilterColor;
    },
  },
  methods: {
    ...mapActions({ load: 'loadProducts' }),

    loadProducts() {
      this.productsDataError = '';

      this.load(this.loadData)
        .then((response) => {
          this.productsData = response;
        })
        .catch((error) => {
          this.productsDataError = error;
        });
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filters: {
      handler() {
        this.loadProducts();
      },
      deep: true,
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style>
  .products-not-found {
    text-align: center;
    font-family: "PressStart";
  }
</style>
