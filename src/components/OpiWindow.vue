<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <img class="img" :src="src1">
        <p class="little-tip">反馈已提交</p>
        <p class="little-content">已将你的反馈提交给了开发者~</p>
      </div>
      <button @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src1:"../../static/images/success.png"
    }
  },
  methods: {
    close() {
      console.log("关闭")
      //给父组件传参
      this.$emit('change',false)
      wx.switchTab({
        url: '/pages/me/main'
      })
    }
  }
}
</script>

<style>
button {
  margin-top:20px;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;
}
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 560rpx;
  overflow: hidden;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -150rpx 95rpx;
  border-radius: 16rpx;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding: 0rpx 53rpx 50rpx 53rpx;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.img {
  width:80px;
  height:80px;
  padding-top: 40px;
}
.little-tip {
  padding-top:20px;
  padding-bottom:10px;
  font-size: 15px;
  font-weight:bold;
  text-align: center;
}
.little-content {
  font-size: 13px;
  color:#606060;
  text-align: center;
}
.key-bold {
  font-size: 14px;
  font-weight:bold;
}
</style>
