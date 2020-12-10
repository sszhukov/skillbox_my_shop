<template>
  <a class="catalog__pic" href="#">
    <img :src="product.imagePuth" alt="Название товара">
  </a>

  <h3 class="catalog__title">
    <a href="#">
      {{ product.title }}
    </a>
  </h3>

  <span class="catalog__price">
    {{ product.price }}
  </span>

  <!-- <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1"
          value="#73B6EA" checked="">
          <span class="colors__value" style="background-color: #73B6EA;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#8BE000">
          <span class="colors__value" style="background-color: #8BE000;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#222">
          <span class="colors__value" style="background-color: #222;">
          </span>
        </label>
      </li>
    </ul> -->
</template>

<script>
export default {
  props: ['product'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
