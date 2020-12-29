<template>
<fieldset class="form__block">
  <legend class="form__legend">Цвет</legend>
  <ul class="colors">
    <li class="colors__item" v-for="color in this.colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :name="radioButtonName"
                :value="color.id" v-model.number="currentColorId"
        >
        <span class="colors__value" v-if="color.code" :style="{ backgroundColor: `${color.code}` }"></span>
        <span class="colors__value" v-else-if="color.codes"
              :style="{ background: `linear-gradient(${gradientDigree}, ${color.codes.join(', ')})` }"></span>
      </label>
    </li>
    <li class="colors__item" v-if="reset">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio"
               value="-1" v-model.number="currentColorId"
        >
        <span class="colors__value" style="background-color: none">❌</span>
      </label>
    </li>
  </ul>
</fieldset>
</template>

<script>

export default {
  props: {
    colorId: Number,
    colors: Array,
    reset: Boolean,
  },
  data() {
    return {
      gradientDigree: '45deg',
      radioButtonName: `color-${Math.round(0 + Math.random() * 100)}`,
    };
  },
  computed: {
    currentColorId: {
      get() {
        return this.colorId;
      },
      set(value) {
        this.$emit('update:colorId', value);
      },
    },
  },
};
</script>
