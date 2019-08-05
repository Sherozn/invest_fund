<template>
  <div>
  	<!-- 如果用户登录了，则显示首页信息 -->
  	<div v-if="userinfo.openId">
  		<div class="show">
  			<div class="button">
  				<div class="btn1 right" @click='recall'>撤销</div>
  				<div class="btn0" @click='reset'>清零</div>
	  			
  			</div>
	  		
  			<div class="mark-text">当前分数</div>
  			<div class="mark">{{mark}}</div>
  		</div>
  		<div class="row">
  			<div class="right button" @click='addMark(1)'>+ 1</div>
  			<div class="left button" @click='addMark(-1)'>- 1</div>
  		</div>
  		<div class="row">
  			<div class="right button" @click='addMark(5)'>+ 5</div>
  			<div class="left button" @click='addMark(-5)'>- 5</div>
  		</div>
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
	import {showSuccess,post,get} from '@/util'
	export default {
		data () {
      return {
    	  userinfo:{},
    	  // src就是我们刚刚粘贴的images文件夹中的图标路径
	      src: "../../static/images/plus-circle.png",
	      mark:0,
	      add:1,
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
	    },
	    async addMark (add) {
	    	try{
	    		const data = {
			  		openid: this.userinfo.openId,
			  		add:add
			  	}
			  	console.log("data",data)
	        const res = await post('/weapp/createrecord', data)
	        console.log("res",res)
	        this.mark = this.mark + add
	      }catch(e){
	        showModal('失败',"请重试哦~")
	        console.log("e createrecord",e)
	      }
	    },
	    async recall () {
	    	try{
	        const res = await post('/weapp/deleterecord', {openid:this.userinfo.openId})
	        console.log("res",res)
	        var add = res.add
	        this.mark = this.mark - add
	      }catch(e){
	        showModal('失败', e.data.msg)
	      }
	    },
	    reset () {
	    	var that = this
	      wx.showModal({
	        content: `确定要清零吗？`,
	        success: function (res) {
	          if (res.confirm) {
	            that.resetMart()
	          }
	        }
	      })
	    },
	    async resetMart () {
	    	if(this.mark != 0){
	    		try{
		    		const res = await post('/weapp/resetmart', {openid:this.userinfo.openId})
		    		console.log("res",res)
		    		this.mark = 0
		    	}catch(e){
		    		showModal('失败', "请重试哦~")
		    		console.log("e resetmart",e)
		    	}
	    	}
	    },
	    async getCurrentMark () {
	    	console.log("获取数据")
	    	try{
	    		const res = await get('/weapp/getmark', {openid:this.userinfo.openId})
	    		console.log("res",res)
	    		this.mark = res.mark
	    	}catch(e){
	    		showModal('失败', "页面加载失败，请下拉页面重试哦~")
	    		console.log("e resetmart",e)
	    	}
	    }
		},
		mounted () {
			//获取缓存中名为userinfo的信息。
			const userinfo = wx.getStorageSync('userinfo')
			//如果缓存中有userinfo的信息，说明用户登录了。
		  if(userinfo.openId){
		  	//将用户信息储存到data的userinfo字段里面，this.userinfo就是指的这个字段。
		  	this.userinfo = userinfo
		  	this.getCurrentMark()
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
  	padding:28px;
	}
	.mark{
		font-size: 88px;
	}
	.button{
		margin:0 10px;
		height: 30px;
		line-height:30px;
		text-align:center;
		font-size: 15px;
		font-weight:bold;
		background:#EA5149;
		.btn0{
			width: 60px;
			border-radius: 15px;
			border:1px dashed #feb600;
		}
		.btn1{
			width: 60px;
			border-radius: 15px;
			border:1px dashed #feb600;
		}
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
}
.right{
	background:#EA5149;
	float: right;
}
.left{
	background:#feb600;
  margin-right:80px;
}
</style>
