<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="currentAmount--">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentAmount" name="count">

    <button type="button" aria-label="Добавить один товар" @click="currentAmount++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    amount: Number,
  },
  computed: {
    currentAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        this.$emit('update:amount', value || 1);
      },
    },
  },
};
</script>
