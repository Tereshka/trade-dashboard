<template>
  <div>
    <span class="title">Press START button for realtime update price</span >
    <el-button
      @click="handleButtonClick"
      :type="buttonType"
    >
      {{ buttonText }}
    </el-button>
    <el-divider></el-divider>
    <price-table :tableData="tableData" />
    <el-button
      @click="showMoreData"
      type="primary"
    >
      SHOW MORE
    </el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PriceTable from '@/components/PriceTable.vue';

export default {
  components: {
    'price-table': PriceTable,
  },
  data() {
    return {
      isTableOnline: false,
      webSocket: null,
      wsUrl: 'wss://ws.coincap.io/prices?assets=ALL',
      tableData: [],
      tableLimit: 50,
    };
  },
  computed: {
    ...mapState([
      'selectedExchange',
      'selectedMarket',
    ]),
    buttonText() {
      return this.isTableOnline ? 'STOP' : 'START';
    },
    buttonType() {
      return this.isTableOnline ? 'danger' : 'success';
    },
  },
  created() {
    this.loadAssets();
  },
  methods: {
    handleButtonClick() {
      return this.isTableOnline ? this.closeWebsocket() : this.startWebsocket();
    },
    showMoreData() {
      this.tableLimit += 50;
      this.loadAssets();
    },
    loadAssets() {
      this.$http.get('https://api.coincap.io/v2/assets', {
        params: {
          limit: this.tableLimit,
        },
      }).then((res) => {
        this.tableData = res.data.data;
      }).catch((err) => console.log(err));
    },
    startWebsocket() {
      this.isTableOnline = true;
      this.webSocket = new WebSocket(this.wsUrl);

      this.webSocket.onopen = () => {
        console.log('Connected websocket');
      };

      this.webSocket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        this.updateTableData(data);
      };

      this.webSocket.onclose = (e) => {
        console.log('Socket is closed', e.reason);
      };

      this.webSocket.onerror = (err) => {
        console.error(
          'Socket encountered error: ',
          err.message,
          'Closing socket',
        );
        this.isTableOnline = false;
        this.webSocket.close();
      };
    },
    closeWebsocket() {
      if (this.webSocket !== null) {
        this.isTableOnline = false;
        this.webSocket.close();
      }
    },
    updateTableData(data) {
      Object.keys(data).forEach((key) => {
        const row = this.tableData.find((el) => el.id === key);
        if (row) {
          row.priceUsd = data[key];
        }
      });
    },
  },
};
</script>

<style>
.title {
  margin-right: 10px;
}
</style>
