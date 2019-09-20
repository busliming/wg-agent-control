<template>
    <div class="gameRecord">
      <div class="search-bar">
      
      </div>
      <el-table :data="tableData.rows" border style="width: 100%;min-height:480px;background: #b3a073;"> 
          <el-table-column prop="gameType" :formatter="displayGameType" label="游戏类型">                
          </el-table-column>

          <el-table-column prop="gameName" label="游戏名称">              
          </el-table-column>

          <el-table-column prop="roomName" label="游戏场次">
          </el-table-column>

          <el-table-column prop="money" label="输赢结果">
          </el-table-column>
      </el-table>
      <div class="custom-pagination pages" id="pages_box">
        <el-pagination
          @current-change="handleCurrentChange"            
          :page-size="tableData.limit"
          background
          layout="prev, pager, next, jumper"
          :total="tableData.total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        totalCount: '',
        limitL:null,
      }
    },
    methods: {
      displayGameType (row) {
        if (row.gameType == 1) {
          return '棋牌游戏'
        }
        if (row.gameType == 2) {
          return '捕鱼游戏'
        }
        if (row.gameType == 3) {
          return '电玩街机'
        }
      },
      getTable(lim,foosets) {
        var vm = this;
        this.$http.post('api/game/getGameRecordList',{
                      account: vm.$store.state.user.account,
                      limit: lim,
                      offset: foosets,
                      queryDate: '',
                      siteId: vm.$store.state.user.siteId,
                      sort: '',
                      sortOrder: '',  
          })
        .then(response =>{        
          vm.tableData = response.data.data;  
        })
      },
        handleCurrentChange(val) { // 这是调取单个数字
            this.getTable(10,val);
        },
    },  
    beforeMount () {
      this.getTable(10,0);
    }
  }
</script>

<style lang="less">
.gameRecord{
  
}
</style>
