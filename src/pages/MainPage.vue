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
import products from '@/productData/products';
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
      productPerPege: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      filteredProducts = filters.filterPrice(filteredProducts, this.filterPriceFrom, this.filterPriceTo);
      filteredProducts = filters.filterCategories(filteredProducts, this.filterCategoryId);
      filteredProducts = filters.filterColors(filteredProducts, this.filterColorId);

      return filteredProducts;
    },

    products() {
      const offset = (this.page - 1) * this.productPerPege;
      return this.filteredProducts.slice(offset, offset + this.productPerPege);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
