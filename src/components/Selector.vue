<template>
  <el-select
    v-model='selectedItem'
    :disabled="list.length === 0"
    clearable
    filterable
    :placeholder="placeholder"
    style="width: 100%"
    @change="handleChange"
  >
    <el-option
      v-for="(item, i) in list"
      :key="`option-${item.name}-${i}`"
      :value="item.name"
      :label="item.name"
    />
  </el-select>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_SELECTED_ITEM } from '@/store';

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'Select item from the list',
    },
    type: {
      type: String,
      default: null,
    },
  },
  computed: {
    placeholder() {
      return this.list.length === 0 ? 'Sorry, no available data' : this.title;
    },
  },
  data() {
    return {
      selectedItem: '',
    };
  },
  watch: {
    list() {
      if (this.list.length === 0) {
        this.selectedItem = '';
      }
    },
  },
  methods: {
    ...mapMutations([
      SET_SELECTED_ITEM,
    ]),
    handleChange(value) {
      this[SET_SELECTED_ITEM]({ type: this.type, value });
    },
  },
};
</script>
