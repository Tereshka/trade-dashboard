import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const SET_EXCHANGES_LIST = 'SET_EXCHANGES_LIST';
export const SET_MARKETS_LIST = 'SET_MARKETS_LIST';
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';

export default new Vuex.Store({
  state: {
    fullExchangesList: [],
    fullMarketsList: [],
    selectedExchange: '',
    selectedMarket: '',
  },
  getters: {
    marketsList: (state) => state.fullMarketsList.map((el) => ({
      exchangeId: el.exchangeId,
      baseId: el.baseId,
      baseSymbol: el.baseSymbol,
      quoteId: el.quoteId,
      quoteSymbol: el.quoteSymbol,
      name: `${el.baseId}/${el.quoteId}`,
    })),
  },
  mutations: {
    [SET_EXCHANGES_LIST](state, value) {
      state.fullExchangesList = value;
    },
    [SET_MARKETS_LIST](state, value) {
      state.fullMarketsList = value;
    },
    [SET_SELECTED_ITEM](state, { type, value }) {
      state[type] = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
