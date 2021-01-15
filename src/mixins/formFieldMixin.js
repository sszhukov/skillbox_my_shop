import BaseFormField from '@/components/BaseFormField.vue';

export default {
  components: { BaseFormField },
  props: {
    title: String,
    placeholder: String,
    error: String,
    value: String,
  },
  computed: {
    fieldValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
