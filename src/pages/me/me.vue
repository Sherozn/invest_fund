<template>
  <div>
	  <div class="top">
	    <div class="userinfo" >
        <!-- 取userinfo变量中的avatarUrl字段，也就是微信头像的链接 -->
	      <img :src="userinfo.avatarUrl" alt="">
	    </div>
	    <div class="name">
        <!-- 取userinfo变量中的nickName字段，也就是微信昵称 -->
	      <label>{{userinfo.nickName}}</label>
	      <p class="notice">{{quote}}</p>
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
      <div class="row" @click='confirm'>
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
	  </div>
	</div>
</template>

<script>
import {post,showModal,showSuccess} from '@/util'
export default {
	data () {
    return {
    	// 用户信息
      userinfo: {},
      // 随机语句
      quote: "",
      src1: "../../static/images/homework.png",
      src2: "../../static/images/classroom.png",
      src3: "../../static/images/delete.png",
      src4: "../../static/images/approval.png"
    }
  },
  methods: {
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
      wx.navigateTo({
        url:'/pages/opinion/main'
      })
    },
    //生成随机语句
    rankArray () {
      var a = Math.random() + ""
      var rand1 = a.charAt(5)
      var quotes = new Array
      quotes[1] = '不奋发，则心日颓靡；不检束，则心日恣肆'
      quotes[2] = '自制是一种秩序，一种对于快乐与欲望的控制'
      quotes[3] = '哪怕一点小小的克制，也会使人变得强而有力'
      quotes[4] = '做一个自律的人，像优秀的人学习，然后做好自己​'
      quotes[5] = '真正的自由是在所有时候都能控制自己'
      quotes[6] = '每天爱自己多一点！！！'
      quotes[7] = '如果连自己都不能控制，有什么资格去谈自己想要的'
      quotes[8] = '登峰造极的成就源于自律'
      quotes[9] = '自我控制是最强者的本能'
      quotes[0] = '立志言为本，修身行乃先'
      this.quote = quotes[rand1]
    },
    confirm () {
      var that = this
      wx.showModal({
        content: `清空之后不能恢复哦~确定要清空吗？`,
        success: function (res) {
          if (res.confirm) {
            that.deleteRecords()
          }
        }
      })
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
    this.rankArray()
  },
  mounted () {
    const userinfo = wx.getStorageSync('userinfo')
    this.userinfo = userinfo
    this.rankArray()
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
      border-radius: 50%;
      border: 1px #D0D0D0 solid;
    }
  }
  .name{
    padding-top: 30px;
    padding-left: 5px;
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    .notice{
      color: #D8D8D8;
      font-size: 12px;
      .number{
        font-size: 15px;
        color: #FFFFFF;
        font-weight: bold;
      }
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
