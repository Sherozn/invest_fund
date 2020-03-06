<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <img class="img" :src="src">
        <div class="content-text">
          <p class="key-bold">真自律是一款自律神器。</p>
          <p class="key-bold">将生活想象成通关打怪，打败自己的心魔加分，被心魔打败减分。</p>
          <p class="little-tip">举个例子：</p>
          <p class="little-content">
            午饭忍住没有吃麻辣烫，吃的绿色蔬菜，加5分；
          </p>
          <p class="little-content">
            但是晚饭还是没有忍住T_T，罪恶罪恶，减10分。
          </p>
        </div>
      </div>
      <div class="modal-footer">
         <!-- 小程序集成的API，通过button来授权登录 -->
         <!-- <div class="btnCancel" @tap="tapCancel">取消</div> -->
         <!-- <div class="btnConfirm"> -->
           <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">授权登录</button>
         <!-- </div> -->
         <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import {showSuccess} from '@/util'
export default {
  data () {
    return {
      src: "../../static/images/littleTip-huang.jpg",
    }
  },
  methods: {
    //登录成功会调用loginSuccess方法
    loginSuccess (res) {
      showSuccess('登录成功')
      //将res加入到Storage中，wx.setStorageSync是小程序的一个API，用来将用户信息保存到缓存中
      wx.setStorageSync('userinfo', res)
      this.$emit('change',false,res)
    },
    login () {
      //wx.showToast是小程序的消息提示框API
      wx.showToast({
        title: '登录中',
        icon: 'loading'
      })
      //通过SDK插件，请求config.js中配置的loginUrl路径（http://localhost:5757/weapp/login）
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: res => {
          // wx.showTabBar()
          console.log('登录成功', res)
          this.loginSuccess(res)
        },
        fail: err => {
          console.error('登录失败', err)
        }
      })
    },
    tapCancel () {
      this.$emit('change',false,{})
    }
  }
}
</script>

<style scoped>
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
.content-tip {
  text-align: center;
  font-size: 36rpx;
  color: #333333;
}
.content-text {
  height:130px;
  padding:10px 0px 50px 0px;
  font-size:14px;
}
.modal-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight:bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background:#feb600;
}
.btnCancel {
  width: 50%;
  font-size: 32rpx;
  background:#ffffff;
  text-align: center;
  border-right: 1px solid #e5e5e5;
 }
.btnConfirm {
  font-size: 32rpx;
  width: 50%;
  text-align: center;
}
button {
  background:#feb600;
  color: #ffffff;
}
.img {
  width: 280px;
  height:90px;
}
.little-tip {
  padding-top:15px;
  padding-bottom:3px;
  font-size: 14px;
  font-weight:bold;
  color: #feb600;
}
.little-content {
  padding-top:5px;
  font-size: 13px;
  color:#606060;
}
.key-bold {
  padding-top:5px;
  font-size: 14px;
  font-weight:bold;
}
</style>
