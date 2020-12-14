<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         aria-label="Предыдущая страница"
         href="#"
         :class="{'pagination__link--disabled' : this.page === 1}"
         @click.prevent="previous"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#"
         class="pagination__link"
         :class="{'pagination__link--current' : pageNumber === page}"
         @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         aria-label="Следующая страница"
         href="#"
         :class="{'pagination__link--disabled' : this.page === this.pages}"
         @click.prevent="next"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: {
    page: Number,
    perPage: Number,
    total: Number,
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    next() {
      if (this.page !== this.pages) {
        this.$emit('paginate', this.page += 1);
      }
    },
    previous() {
      if (this.page !== 1) {
        this.$emit('paginate', this.page -= 1);
      }
    },
  },
};
</script>
