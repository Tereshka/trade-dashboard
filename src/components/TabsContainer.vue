<template>
  <el-tabs type="border-card">
    <el-tab-pane label="OHLC CHART">
      <chart-tab />
    </el-tab-pane>
    <el-tab-pane label="REAL TIME PRICES">
      <price-tab />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import ChartTab from '@/components/ChartTab.vue';
import PriceTab from '@/components/PriceTab.vue';

export default {
  components: {
    'chart-tab': ChartTab,
    'price-tab': PriceTab,
  },
};
</script>
