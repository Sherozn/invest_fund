<template>
  <div>
	  <div class="top">
	    <div class="userinfo" >
        <!-- 取userinfo变量中的avatarUrl字段，也就是微信头像的链接 -->
	      <img :src="userinfo.avatarUrl" alt="" v-if="userinfo.openId"> 
        <img :src="avatarUrl" v-else>
	    </div>
	    <div class="name">
        <!-- 取userinfo变量中的nickName字段，也就是微信昵称 -->
	      <label v-if="userinfo.openId">{{userinfo.nickName}}</label>
        <div class="underline" @click="loginMe" v-else>点击登录</div>
	      <p class="notice">{{quote}}</p>
	    </div> 
      <div class="row">
        <LoginWindow @change="getModel(arguments)" v-if="showLogin"></LoginWindow>
      </div>
	  </div>
	  <div class="container">
      <div class="row" @click='showInstruction'>
        <label class="left">
          <img class="img" :src="src1">
        </label>
        <label class="name">&nbsp;&nbsp;操作指引</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row" @click='showCourse'>
        <label class="left">
          <img class="img" :src="src2">
        </label>
        <label class="name">&nbsp;&nbsp;小程序开发实战课程</label>
        <label class="right">
          >
        </label>
      </div>
    </div>
    <div class="container">
      <div class="row" @click='deleteConfirm'>
        <label class="left">
          <img class="img" :src="src3">
        </label>
        <label class="name">&nbsp;&nbsp;清空记录</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row" @click='showOpinion'>
        <label class="left">
          <img class="img" :src="src4">
        </label>
        <label class="name">&nbsp;&nbsp;意见反馈</label>
        <label class="right">
          >
        </label>
      </div>
       <div class="row">
        <label class="left">
          <img class="img" :src="src2">
        </label>
        <button class="button name" open-type='contact'>&nbsp;&nbsp;联系客服</button>
        <label class="right">
          >
        </label>
      </div>
	  </div>
    <div style="margin-top: 20rpx;">
     <ad unit-id="adunit-6953ea933382fe7a" ad-type="video" ad-theme="white"></ad>
    </div>
    
	</div>
</template>

<script>
import {post,showModal,showSuccess} from '@/util'
import LoginWindow from '@/components/LoginWindow'
export default {
  components: {
    LoginWindow
  },
	data () {
    return {
    	// 用户信息
      userinfo: {},
      showLogin:false,
      avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
      // 随机语句
      quote: "",
      src1: "../../static/images/homework.png",
      src2: "../../static/images/classroom.png",
      src3: "../../static/images/delete.png",
      src4: "../../static/images/approval.png"
    }
  },
  methods: {
    loginMe () {
      this.showLogin = true
    },
    getModel (val) {
      console.log("val",val)
      this.showLogin = val[0]
      this.userinfo = val[1]
      console.log("this.userinfo",this.userinfo)
    },
    //跳转到说明书页面
    showInstruction () {
    	// 小程序API，保留当前页面，跳转到应用内的某个页面
      wx.navigateTo({
        url:'/pages/instruction/main'
      })
    },
    //跳转到小程序页面
    showCourse () {
      showModal('敬请期待~', "大约10月份上线")
    },
    //跳转到意见反馈页面
    showOpinion () {
      // 小程序API，保留当前页面，跳转到应用内的某个页面
      if(this.userinfo.openId){
        wx.navigateTo({
          url:'/pages/opinion/main'
        })
      }else{
        this.showLogin = true
      }
    },
    //生成随机语句
    rankArray () {
      var a = Math.random() + ""
      var rand1 = a.charAt(5)
      var quotes = []
      quotes = ['不奋发，则心日颓靡；不检束，则心日恣肆','自制是一种秩序，一种对于快乐与欲望的控制','哪怕一点小小的克制，也会使人变得强而有力','做一个自律的人，像优秀的人学习，然后做好自己​','真正的自由是在所有时候都能控制自己','每天爱自己多一点！！！','每天爱自己多一点！！！','如果连自己都不能控制，有什么资格去谈自己想要的','登峰造极的成就源于自律','自我控制是最强者的本能','立志言为本，修身行乃先']
      this.quote = quotes[rand1]
    },
    deleteConfirm () {
      if(this.userinfo.openId){
        var that = this
        wx.showModal({
          content: `清空之后不能恢复哦~确定要清空吗？`,
          success: function (res) {
            if (res.confirm) {
              that.deleteRecords()
            }
          }
        })
      }else{
        this.showLogin = true
      }
      
    },
    //删除记录
    async deleteRecords () {
      try{
        const res = await post('/weapp/deleterecords', {openid:this.userinfo.openId})
        console.log("res",res)
        showSuccess("记录已清空~")
      }catch(e){
        showModal('清空失败', "请重试哦~")
        console.log("e deleteRecords",e)
      }
    }
  },
  onShow () {
    const userinfo = wx.getStorageSync('userinfo')
    //如果缓存中有userinfo的信息，说明用户登录了。
    if(userinfo.openId){
      //将用户信息储存到data的userinfo字段里面，this.userinfo就是指的这个字段。
      this.userinfo = userinfo
      this.rankArray()
    }
  },
  onShareAppMessage(e) {
    return {
      title: "真自律",
      path: "/pages/index/main",
      imageUrl: ""
    }
  }
}
</script>

<style lang='scss'>
.container{
  margin-top: 10px;
  background:#FFFFFF;
  font-size:15px;
  .row{
    padding: 0px 18px;
    border-bottom: 1px #E8E8E8 solid;
    height: 55px;
    line-height: 55px;
    .img {
      float:left;
      width: 20px;
      height: 20px;
      padding-top:16px;
    }
    .name {
      float:left;
    }
  }
  .right {
    float: right;
    color: #C8C8C8;
    line-height:55px;
  }
  .left {
    width:80%;
  }
  button::after {
    border: none;
  }
  button {
    background-color: transparent;
    padding-left: 0;
    padding-right: 0;
    line-height:inherit;
    font-size:15px;
  }
}  

.top{
  height: 80px;
  width: 100%;
  background:#EA5149;
  padding-top: 30px;
  display: block;
  .userinfo{
    padding-bottom: 5px;
    float: left;
    img{
      width: 120rpx;
      height:120rpx;
      margin: 10rpx;
      border-radius: 1px;
      border: 1px #D0D0D0 solid;
    }
  }
  .name{
    padding-top: 30px;
    padding-left: 5px;
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    .underline{
      border: 1px solid #ffffff;
      border-radius:5px;
      text-align:center;
    }
    .notice{
      color: #D8D8D8;
      font-size: 12px;
    }
    .a-line{
      background:#EA5149;
      border: none;
      display: inline;
      font-size: 16px;
      color: #FFFFFF;
      text-decoration:underline;
    }
  }
}
</style>
