<template>
  <div>
	  <div class="top">
	    <div class="userinfo" >
	      <img :src="userinfo.avatarUrl" alt="">
	    </div>
	    <div class="name">
	      <label>{{userinfo.nickName}}</label>
	      <p class="notice">您已记录了&nbsp;<label class="number">{{sum_count}}</label>&nbsp;次，继续加油哦~</p>
	    </div> 
	  </div>
	  <div class="container">
	    <button @click='addFund' class='btn'>使用指南</button>
	  </div>
	</div>
</template>

<script>
export default {
	data () {
    return {
    	// 用户信息
      userinfo: wx.getStorageSync('userinfo')? wx.getStorageSync('userinfo') : {},
      // 定投次数
      sum_count:0
    }
  },
  methods: {
    async addFund () {
    	// 小程序API，保留当前页面，跳转到应用内的某个页面
      wx.navigateTo({
        url:'/pages/instruction/main'
      })
    },
    // async showIns () {
    //   wx.navigateTo({
    //     url:'/pages/showins/main'
    //   })
    // }
  },

}
</script>

<style lang='scss'>
.container{
  padding-top: 10px;

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
