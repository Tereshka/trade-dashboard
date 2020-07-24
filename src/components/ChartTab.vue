<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          Please, select EXCHANGE and MARKET above for loading data
          <el-divider></el-divider>
        </div>
      </el-col>
    </el-row>
    <el-row id="chart-row">
      <el-col :span="24" align="center">
        <chart-component :chartData="chartData" :title="selectedMarket" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { Loading } from 'element-ui';
import ChartComponent from '@/components/ChartComponent.vue';

export default {
  components: {
    'chart-component': ChartComponent,
  },
  data() {
    return {
      chartData: {},
      loadingInstance: null,
    };
  },
  computed: {
    ...mapState([
      'selectedExchange',
      'selectedMarket',
    ]),
  },
  watch: {
    selectedExchange() {
      if (this.selectedExchange !== '' && this.selectedMarket !== '') {
        this.loadChartData();
      } else {
        this.chartData = {};
      }
    },
    selectedMarket() {
      if (this.selectedExchange !== '' && this.selectedMarket !== '') {
        this.loadChartData();
      } else {
        this.chartData = {};
      }
    },
  },
  methods: {
    loadChartData() {
      this.loadingInstance = Loading.service({
        text: 'Loading data',
        background: 'rgba(0, 0, 0, 0.8)',
        spinner: 'el-icon-loading',
        target: '#chart-row',
      });
      const [baseId, quoteId] = this.selectedMarket.split('/');
      this.$http.get('https://api.coincap.io/v2/candles', {
        params: {
          exchange: this.selectedExchange.toLowerCase(),
          interval: 'h8',
          baseId,
          quoteId,
        },
      })
        .then((res) => {
          this.makeChartData(res.data.data);
        }).catch((err) => console.log(err));
    },
    makeChartData(dirtyData) {
      const clearData = dirtyData.map((el) => ([
        el.period,
        +el.open,
        +el.high,
        +el.low,
        +el.close,
        +el.volume,
      ]));

      this.chartData = {
        chart: {
          data: clearData,
          settings: {
            color: '#1baddd',
          },
          grid: {},
        },
      };

      this.loadingInstance.close();
    },
  },
};
</script>
