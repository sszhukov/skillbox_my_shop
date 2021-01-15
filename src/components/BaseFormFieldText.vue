<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" :type="type" v-model="fieldValue" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>
