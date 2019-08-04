<template>
  <div>
  	<!-- 如果用户登录了，则显示首页信息 -->
  	<div v-if="userinfo.openId">
  		<div class="show">
	  		<div class="button0">清零</div>
  			<div class="mark-text">当前分数</div>
  			<div class="mark">100</div>
  		</div>
  		<!-- <div class="button">
  			<div class="add">
  				<div class="button-text">按钮</div>
  			</div>
  		</div> -->
  		<div class="row">
  			<div class="right button">+ 1</div>
  			<div class="left button">- 1</div>
  		</div>
  		<div class="row">
  			<div class="right button">+ 5</div>
  			<div class="left button">- 5</div>
  		</div>

  		<!-- 
  		<div class="button">- 1</div>
  		<div class="button">- 5</div> -->
  	</div>
  	<!-- 如果用户没有登录，则显示授权登录的页面 -->
    <div v-else>
  		<div class="prompt">您还未登录，请先</div>
  		<!-- 小程序集成的API，通过button来授权登录 -->
      <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">授权登录</button>
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
    	  userinfo:{},
    	  // src就是我们刚刚粘贴的images文件夹中的图标路径
	      src: "../../static/images/plus-circle.png",
    	}
    },
		methods: {
			//登录成功会调用loginSuccess方法
			loginSuccess (res) {
				showSuccess('登录成功')
	      //将res加入到Storage中，wx.setStorageSync是小程序的一个API，用来将用户信息保存到缓存中
	      wx.setStorageSync('userinfo', res)
	      this.userinfo = res
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
          	wx.showTabBar()
            console.log('登录成功', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error('登录失败', err)
          }
        })
	    }
		},
		created () {
			//获取缓存中名为userinfo的信息。
			const userinfo = wx.getStorageSync('userinfo')
			//如果缓存中有userinfo的信息，说明用户登录了。
		  if(userinfo.openId){
		  	//将用户信息储存到data的userinfo字段里面，this.userinfo就是指的这个字段。
		  	this.userinfo = userinfo
		  }else{
		  	//如果当前用户没有缓存信息，则隐藏掉TabBar，从而实现在授权登录的页面不显示TabBar的效果
		  	wx.hideTabBar()
		  }
		}
	}
</script>

<style lang='scss'>
.show{
	text-align:center;
	height:266px;
	background: #EA5149;
	margin-bottom:5px;
	color: #FFFFFF;
	font-weight:bold;
	.mark-text{
  	font-size: 20px;
  	padding:30px;
	}
	.mark{
		font-size: 88px;
	}
	.button0{
		margin:0 2px;
		width: 60px;
		height: 30px;
		line-height:30px;
		border-radius: 15px;
		border: none;
		text-align:center;
		font-size: 15px;
		color:#FFFFFF;
		font-weight:bold;
		background:#EA5149;
	}

}

 .row{
  margin: 40px 56px;
	.button{
		width: 70px;
		height: 70px;
		line-height:70px;
		border-radius: 20%;
		border: none;
		text-align:center;
		font-size: 25px;
		color:#FFFFFF;
		font-weight:bold;
	}
	
  .right{
  	background:#EA5149;
  	float: right;
  }
  .left{
  	background:#feb600;
    margin-right:80px;
  }
}

.button{
	


  .button-text{
  	
  }
}
</style>
