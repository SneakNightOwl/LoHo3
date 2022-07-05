<template>
  <div class="wrapper-con">
    <form class="wrapper-section form">
      <div class="form-search form-search-articl clearfix">
        <div class="form-search-item">
          <el-input placeholder="订单编号" v-model.trim="orderNum" v-number-input clearable></el-input>
        </div>
        <div class="form-search-item">
          <el-input placeholder="买家手机" v-model.trim="buyerPhone" v-number-input clearable></el-input>
        </div>
        <div class="form-search-item">
          <el-select v-model="orderStatus" clearable placeholder="订单状态">
            <el-option label="已支付" value="1"></el-option>
            <el-option label="未支付" value="0"></el-option>
          </el-select>
        </div>
        <div class="form-search-item">
          <el-date-picker v-model="orderTime" type="daterange" range-separator="-" start-placeholder="下单时间" end-placeholder="下单时间" value-format="timestamp" clearable></el-date-picker>
        </div>
        <div class="form-search-item form-search-item-submit">
          <el-button type="primary" icon="el-icon-search" class="form-btn-submit" @click="search">搜索</el-button>
        </div>
      </div>
    </form>
    <el-table class="table-autoheight" :max-height="tableMaxHeight" :data="tableData" v-loading="isloading">
      <el-table-column prop="orderNo" label="总订单编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buyerName" label="买家姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buyerMobile" label="买家手机" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createtime" label="下单时间" :formatter="formatTime" show-overflow-tooltip></el-table-column>
      <el-table-column prop="amount" label="订单金额(￥)" show-overflow-tooltip></el-table-column>
      <el-table-column prop="freightAmount" label="运费金额(￥)" show-overflow-tooltip></el-table-column>
      <el-table-column prop="payType" label="支付方式" :formatter="formatType" show-overflow-tooltip></el-table-column>
      <el-table-column prop="payStatus" label="订单状态" :formatter="formatStatus" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buyerAddr" label="买家地区" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <button type="button" class="table-btn-textbtn table-btn-green" @click="goPage(scope.row)">
            查看
          </button>
        </template>
      </el-table-column>
      <template slot="empty">
        <div class="table-nodata">
          <img src="../../assets/images/icon-nodata.png" class="table-nodata-img" />
          对不起，没有找到匹配结果
        </div>
      </template>
    </el-table>
    <div class="table-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" background layout="total, sizes, prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tableAutoheight from '@/mixin/table-autoheight';
export default {
  name: 'order-list',
  mixins: [tableAutoheight],
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      isloading: true,
      tableData: [],
      id: '',
      orderNum: '',
      buyerPhone: '',
      orderStatus: '',
      orderTime: '',
      orderInfo: '',
      currentPage: 1,
      pageSize: 100,
      totalCount: 0,
    };
  },
  methods: {
    //获取列表数据
    async getDataList() {
      let params = {
        payOrderNo: this.orderNum,
        buyerMobile: this.buyerPhone,
        payStatus: this.orderStatus,
        createTimeStart: this.orderTime ? this.orderTime[0] : '',
        createTimeEnd: this.orderTime ? this.orderTime[1] : '',
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.isloading = true;
      let res = await this.$axios({
        url: '/order/payOrderList',
        method: 'post',
        data: params,
      });
      this.isloading = false;
      if (res.code !== '0000') return false;
      if (res.data) {
        this.tableData = res.data.pageInfo.records || [];
        this.totalCount = res.data.pageInfo.totalCount;
        this.tableData.map((item, i) => {
          if (item.freightAmount === '' || item.freightAmount === null) {
            item.freightAmount = 0;
          }
          return item;
        });
      } else {
        this.tableData = [];
        this.totalCount = 0;
      }
    },
    //表格改变每页数据数量
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getDataList();
    },
    //表格翻页
    handleCurrentChange(val) {
      this.getDataList();
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.getDataList();
    },
    // 格式化时间
    formatTime(row, col, val) {
      if (val) {
        const date = new Date(val);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
      } else {
        return '- -';
      }
    },
    formatType(row, col, val) {
      if (val === 1) {
        return '微信支付';
      }
      if (val === 2) {
        return '支付宝支付';
      }
    },
    formatStatus(row, col, val) {
      if (val === 0) {
        return '未支付';
      }
      return '已支付';
    },
    // 跳转到查看详情页
    goPage({ id }) {
      this.$router.push({
        name: 'order-list-detail',
        query: { id },
      });
    },
  },
  created() {
    this.getDataList();
  },
};
</script>

<style scoped lang="less">
.form-search-articl {
  .form-search-item {
    width: 22.5%;
  }

  .form-search-item-submit {
    width: 10%;
  }
}
</style>