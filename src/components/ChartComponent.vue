<template>
  <trading-vue :data="chartData" :width="width" :height="height"
    :chart-config="config"
    :title-txt="title"
    :toolbar="true"
    :overlays="overlays"
    :color-back="colors.back"
    :color-grid="colors.grid"
    :color-text="colors.text"
    :color-title="colors.tvTitle"
  >
  </trading-vue>
</template>

<script>
import TradingVue, { DataCube } from 'trading-vue-js';
import ChartOverlay from '@/components/ChartOverlay.vue';

export default {
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    'trading-vue': TradingVue,
  },
  data() {
    return {
      chart: new DataCube(this.chartData),
      overlays: [ChartOverlay],
      width: 1000,
      height: 600,
      colors: ['#5691ce', '#612ff9', '#d50b90', '#ff2316'],
      config: {
        // DEFAULT_LEN: 200,
        // TB_BORDER: 5,
        // CANDLEW: 0.9,
        // GRIDX: 200,
        // VOLSCALE: 0.5,
      },
    };
  },
};
</script>
