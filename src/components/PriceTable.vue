<template>
  <el-table
    :data="filterData"
    fit
    height="60vh"
    style="width: 100%">
    <el-table-column prop="rank">
      <template slot="header" slot-scope="scopeRank">
        <div @click="handleClickHeader('rank')">
          <span>Rank</span>
          <i class="el-icon-d-caret" ></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name">
      <template slot="header" slot-scope="scopeName">
        <div @click="handleClickHeader('name')">
          <span>Name</span>
          <i class="el-icon-d-caret" ></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="symbol">
      <template slot="header" slot-scope="scopeSymbol">
        <div @click="handleClickHeader('symbol')">
          <span>Symbol</span>
          <i class="el-icon-d-caret" ></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="priceUsd">
      <template slot="header" slot-scope="scopePrice">
        <el-input
          v-model="searchValue"
          size="mini"
          placeholder="Type name to search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="clearSearchField"></i>
        </el-input>
        <div @click="handleClickHeader('priceUsd')">
          <span>Price</span>
          <i class="el-icon-d-caret" ></i>
        </div>
      </template>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ `$${(+scope.row.priceUsd).toFixed(8)}` }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      orderBy: 'rank',
      orderDirection: 'asc',
      searchValue: '',
    };
  },
  computed: {
    filterData() {
      const newArray = this.tableData.filter((el) =>
        el.name.toLowerCase().includes(this.searchValue.toLowerCase()));
      return newArray;
    },
  },
  methods: {
    handleClickHeader(value) {
      this.handleSortData(value);
      this.orderBy = value;
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    },
    handleSortData(value) {
      if (value === 'name' || value === 'symbol') {
        this.tableData.sort((a, b) => {
          if (this.orderDirection === 'asc') {
            if (a[value] < b[value]) {
              return -1;
            }
            if (a[value] > b[value]) {
              return 1;
            }
          } else {
            if (a[value] > b[value]) {
              return -1;
            }
            if (a[value] < b[value]) {
              return 1;
            }
          }
          return 0;
        });
      }

      if (value === 'rank' || value === 'priceUsd') {
        this.tableData.sort((a, b) => {
          if (this.orderDirection === 'asc') {
            return +a[value] - +b[value];
          }
          return +b[value] - +a[value];
        });
      }
    },
    clearSearchField() {
      this.searchValue = '';
    },
  },
};
</script>
