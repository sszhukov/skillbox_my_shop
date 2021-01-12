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
    <ProductFitter :price-from.sync="filterPriceFrom"
                   :price-to.sync="filterPriceTo"
                   :category-id.sync="filterCategoryId"
                   :color-id.sync="filterColorId"
    />

    <section class="catalog">
      <ProductList :products="products"/>
      <BasePagination v-model="page" :per-page="productPerPege" :total="countProducts"/>
    </section>
  </div>
</main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import filters from '@/helpers/filters';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFitter from '@/components/ProductFilter.vue';

export default {
  components: { ProductList, BasePagination, ProductFitter },
  data() {
    return {
      // ProductFitter
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: this.$store.state.filterColor,

      // BasePagination
      page: 1,
      productPerPege: 6,

      productsData: null,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = this.productsData;

      filteredProducts = filters.filterPrice(filteredProducts, this.filterPriceFrom, this.filterPriceTo);
      filteredProducts = filters.filterCategories(filteredProducts, this.filterCategoryId);
      filteredProducts = filters.filterColors(filteredProducts, this.filterColorId);

      return filteredProducts;
    },

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
  },
  methods: {
    loadProducts() {
      axios.get(`${API_BASE_URL}/api/products`, {
        params: {
          page: this.page,
          limit: this.productPerPege,
          categoryId: this.filterCategoryId,
          colorId: this.filterColorId,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
        },
      })
        .then((response) => { this.productsData = response.data; });
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
