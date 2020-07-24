<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <h1 class="heading" align="left">TRADE DASHBOARD</h1>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <selector
          :list="fullExchangesList"
          title="Select EXCHANGE from the list"
          type="selectedExchange"
        />
      </el-col>
      <el-col :span="12">
        <selector
          :list="marketsList"
          title="Select MARKET from the list"
          type="selectedMarket"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { SET_MARKETS_LIST, SET_EXCHANGES_LIST, SET_SELECTED_ITEM } from '@/store';

import Selector from '@/components/Selector.vue';

export default {
  components: {
    selector: Selector,
  },
  computed: {
    ...mapState([
      'fullExchangesList',
      'selectedExchange',
    ]),
    ...mapGetters([
      // 'exchangesList',
      'marketsList',
    ]),
  },
  watch: {
    selectedExchange() {
      this[SET_SELECTED_ITEM]({ type: 'selectedMarket', value: '' });
      this[SET_MARKETS_LIST]([]);
      if (this.selectedExchange !== '') {
        this.loadMarkets();
      }
    },
  },
  created() {
    this.loadEchanges();
  },
  methods: {
    ...mapMutations([
      SET_EXCHANGES_LIST,
      SET_MARKETS_LIST,
      SET_SELECTED_ITEM,
    ]),
    loadEchanges() {
      this.$http.get('https://api.coincap.io/v2/exchanges')
        .then((res) => {
          this[SET_EXCHANGES_LIST](res.data.data);
        }).catch((err) => console.log(err));
    },
    loadMarkets() {
      this.$http.get('https://api.coincap.io/v2/markets',
        {
          params: {
            exchangeId: this.selectedExchange.toLowerCase(),
            limit: 2000,
          },
        })
        .then((res) => {
          this[SET_MARKETS_LIST](res.data.data);
        }).catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.heading {
  margin-top: 20px!important;
  margin-bottom: 20px!important;
  font-size: 38px;
}
</style>
