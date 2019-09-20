<template>
    <div class="safe-money">
        <el-dialog :visible.sync="modalState.state">
            <div class="close-btn" @click="modalState.state = false"></div>
            <div class="firstTime" v-if="modalState.checkPass == false">
                <div class="modal1">
                    <span class="notice1">
                        亲爱的玩家，为了确保您的账户安全，每次使用保险箱需要输入
                    </span>
                    <div class="input-lg">
                        <div class="input-label">请输入资金密码：</div>
                        <input name="" type="password" v-model="formObj.safePassword">
                        <router-link to="/personalSafety"><div class="btn1">忘记密码</div></router-link>
                    </div>
                    <router-link to=""><div class="confirm-btn" @click="openSafeBox()">确定</div></router-link>
                </div>            
            </div> 
            <div class="normal" v-if="modalState.checkPass == true">            
                <div class="modal2-sidebar">
                    <div class="sidebar-btn" :class="{active: (modalState.index ==1)}" @click="modalState.index = 1">取出</div>
                    <div class="sidebar-btn" :class="{active: (modalState.index ==2)}" @click="modalState.index = 2">存入</div>
                    <div class="sidebar-btn" :class="{active: (modalState.index ==3)}" @click="modalState.index = 3">修改密码</div>
                </div>
                <div class="modal2-content" v-if="modalState.index == 1">
                    <div class="input-sm">
                        <div class="label-icon"></div>
                        <input name="" type="text" readonly v-model="userInfo.money">
                        <div class="label-icon" style="margin-left: 80px;"></div>
                        <input name="" type="text" readonly v-model="userInfo.safeMoney">
                    </div>               
                    <div class="input-lg">
                        <div class="input-label">取出金额：</div>
                        <input name="" type="text"  v-model="formObj.withdrawAmount">
                        <router-link to=""><div class="btn2" @click="formObj.withdrawAmount=''">重置</div></router-link>
                    </div>
                    <div class="slider">
                        <el-slider v-model="sliderWithdraw"></el-slider>
                        <router-link to=""><div class="btn" @click="sliderWithdraw = 100">最大</div></router-link>
                    </div>
                    <span class="notice2">
                        提示： 请注意您的个人账户密码安全， 以防泄密， 导致个人损失!
                    </span>
                    <div class="modal-footer">
                        <router-link to=""><div class="confirm-btn"  @click="withdraw()">确定</div> </router-link>
                    </div>
                </div> 
                <div class="modal2-content" v-if="modalState.index == 2">
                    <div class="input-sm">
                        <div class="label-icon"></div>
                        <input name="" type="text" readonly v-model="userInfo.money">
                        <div class="label-icon" style="margin-left: 80px;"></div>
                        <input name="" type="text" readonly v-model="userInfo.safeMoney">
                    </div>               
                    <div class="input-lg">
                        <div class="input-label">存入金额：</div>
                        <input name="" type="text" v-model="formObj.depositAmount">
                        <router-link to=""><div class="btn2" @click="formObj.depositAmount=''">重置</div></router-link>
                    </div>
                    <div class="slider">
                        <el-slider v-model="sliderDeposit"></el-slider>
                        <router-link to=""><div class="btn" @click="sliderDeposit = 100">最大</div></router-link>
                    </div>
                    <span class="notice2">
                        提示： 请注意您的个人账户密码安全， 以防泄密， 导致个人损失!
                    </span>
                    <div class="modal-footer">
                        <router-link to=""><div class="confirm-btn" @click="deposit()">确定</div> </router-link>
                    </div>
                </div> 
                <!-- <div class="modal2-content" v-if="modalState.index == 3">
                    <div class="input-lg" style="margin-top: 72px">
                        <div class="input-label" placeholder="请输入旧密码">旧密码：</div>
                        <input name="" type="text">
                    </div>
                    <div class="input-lg">
                        <div class="input-label" placeholder="请输入6-14 位新密码">新密码：</div>
                        <input name="" type="text">
                    </div>
                    <div class="input-lg">
                        <div class="input-label" placeholder="请输入6-14 位新密码">确认密码：</div>
                        <input name="" type="text">
                    </div>
                    <div class="modal-footer">
                        <router-link to=""><div class="confirm-btn">确定</div> </router-link>
                    </div>
                </div> -->
            </div>
        </el-dialog>   
    </div>
</template>

<script>
export default {
  data() {
    return {
      sliderWithdraw: 0,
      sliderDeposit: 0,
      modalState: "",
      userInfo: "",
      formObj: {
        safePassword: "",
        withdrawAmount: "",
        depositAmount: ""
      }
    };
  },
  watch: {
    "modalState.state"(value) {
      if (value == false) {
        this.formObj.safePassword = "";
        this.$store.commit("safeMoneyModal/reset");
      }
    },
    sliderWithdraw(value) {
      this.formObj.withdrawAmount = (value * this.userInfo.safeMoney) / 100;
    },
    sliderDeposit(value) {
      this.formObj.depositAmount = (value * this.userInfo.money) / 100;
    },
    "formObj.withdrawAmount"(value) {
      if (this.userInfo.safeMoney != 0) this.sliderWithdraw = (value / this.userInfo.safeMoney) * 100;
      else this.sliderWithdraw = 0;
    },
    "formObj.depositAmount"(value) {
      if (this.userInfo.money != 0) this.sliderDeposit = (value / this.userInfo.money) * 100;
      else this.sliderDeposit = 0;
    }
  },
  methods: {
    openSafeBox() {
      var vm = this;
      var params = {
        account: this.userInfo.account,
        safePassword: this.formObj.safePassword
      };     
      this.$http.post("api/safe/openSafe", params).then(response => {
        if (response.data.code == 200) {
          vm.modalState.checkPass = true;
        } else {
          vm.modalState.checkPass = false;
        }
      });      
    },
    withdraw() {
      var vm = this;
      var params = {
        account: this.userInfo.account,
        amount: this.formObj.withdrawAmount,
        token: this.userInfo.token
      };
      this.$http.post("api/safe/getMoney", params).then(response => {
        this.$Message({ message: response.data.msg, type: "success" });
        vm.userInfo.money += params.amount;
        vm.userInfo.safeMoney -= params.amount;
        this.$store.commit("getUser", vm.userInfo);
      });
    },
    deposit() {
      var vm = this;
      var params = {
        account: this.userInfo.account,
        amount: this.formObj.depositAmount,
        token: this.userInfo.token
      };
      this.$http.post("api/safe/saveMoney", params).then(response => {
        if (response.data.code == 200) {
          this.$Message({ message: response.data.msg, type: "success" });
          vm.userInfo.money -= params.amount;
          vm.userInfo.safeMoney += params.amount;
          this.$store.commit("getUser", vm.userInfo);
        }
      });
    }
  },
  beforeMount() {
    this.modalState = this.$store.state.safeMoneyModal;
    this.userInfo = this.$store.state.user;
    this.formObj.money = this.$store.state.user.money;
    this.formObj.safeMoney = this.$store.state.user.safeMoney;
  }
};
</script>

<style lang="less">
/* 保险箱弹框 */
.safe-money {
  a {
    color: inherit;
  }
  input {
    outline: none;
  }
  .el-dialog {
    width: 699px;
    height: 442px;
    background: none;
  }
  .firstTime {
    background: url(../../../resource/images/safeMoney/baox.png) no-repeat;
    width: 699px;
    height: 442px;
  }
  .normal {
    background: url(../../../resource/images/safeMoney/dikuang.png) no-repeat;
    width: 699px;
    height: 442px;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    display: none;
  }
  .close-btn {
    background: url(../../../resource/images/safeMoney/chu.png) no-repeat;
    width: 37px;
    height: 37px;
    position: absolute;
    top: 30px;
    right: 9px;
  }
  .modal2-sidebar {
    position: absolute;
    width: 123px;
    top: 55px;
    left: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sidebar-btn {
    background: #d3b219;
    width: 117px;
    height: 37px;
    margin-top: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #703803;
    border-radius: 6px;
  }
  .sidebar-btn:hover,
  .active {
    background-image: linear-gradient(0deg,#fbe779 1%, #ffb72c 13%, #ffb41a 35%, #ffb007 61%, #ffff00 100%), 
    linear-gradient(#d3b219, #d3b219);
    background-blend-mode: normal, normal;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.35);    
  }
  .modal1,
  .modal2-content {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    font-size: 16px;
    color: #783803;
  }
  .modal1 {
    width: 635px;
    height: 375px;
    position: absolute;
    top: 55px;
    left: 32px;
  }
  .modal2-content {
    width: 528px;
    height: 373px;
    position: absolute;
    top: 55px;
    right: 33px;
  }
  .input-lg,
  .slider,
  .notice,
  .modal-footer,
  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  .input-sm {
    padding-top: 35px;
    padding-left: 45px;
    display: flex;
  }
  .input-sm .label-icon {
    background: url(../../../resource/images/safeMoney/bi.png) no-repeat;
    width: 27px;
    height: 27px;
  }
  .input-sm input {
    background: url(../../../resource/images/safeMoney/bik.png) no-repeat;
    width: 144px;
    height: 23px;
    border: none;
    margin-left: 2px;
    padding-left: 10px;
    font-size: 14px;
    color: #fffbca;
    font-weight: bold;
  }
  .input-lg {
    margin-top: 30px;
  }
  .modal1 .input-lg {
    margin-top: 50px;
  }
  .input-lg .input-label {
    min-width: 90px;
    text-align: right;
  }
  .input-lg input {
    background: url(../../../resource/images/safeMoney/kuang.png) no-repeat;
    width: 251px;
    height: 35px;
    border: none;
    padding-left: 10px;
    color: #fffbca;
    font-weight: bold;
  }
  .input-lg .btn1 {
    background: url(../../../resource/images/safeMoney/ann.png) no-repeat;
    width: 112px;
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-lg .btn2 {
    background: url(../../../resource/images/safeMoney/k0.png) no-repeat;
    width: 85px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-lg .btn2 {
    background: url(../../../resource/images/safeMoney/k0.png) no-repeat;
    width: 85px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slider {
    margin-top: 25px;
  }
  .slider .el-slider {
    background: url(../../../resource/images/safeMoney/tiao.png) no-repeat;
    width: 322px;
    height: 56px;
    background-position: bottom;
  }
  .el-slider__button-wrapper .el-tooltip {
    background: url(../../../resource/images/safeMoney/niu.png) no-repeat;
    width: 30px;
    height: 30px;
    border: none;
  }
  .el-slider__runway {
    width: 308px;
    background: none;
    margin: 15px 2px 15px 3px;
  }
  .el-slider__bar {
    background: linear-gradient(90deg, #fffb07, #ffb00f, #fffb07);
    background-color: #ffb00f;
  }
  .slider .btn {
    background: url(../../../resource/images/safeMoney/k1.png) no-repeat;
    width: 78px;
    height: 29px;
    margin-left: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer {
    margin-bottom: 30px;
  }
  .notice1,
  .notice2 {
    font-size: 12px;
    font-weight: bold;
    color: #fff3b3;
  }
  .notice1 {
    margin-top: 100px;
    font-size: 18px;
  }
  .notice2 {
    margin-top: 34px;
  }
  .modal-footer {
    margin-top: 50px;
  }
  .modal1 .confirm-btn {
    margin-top: 50px;
  }
  .confirm-btn {
    background: url(../../../resource/images/safeMoney/17.png) no-repeat;
    width: 115px;
    height: 36px;
  }
}
</style>
