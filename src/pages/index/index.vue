<template>
  <div>
  	<!-- 如果用户登录了，则显示首页信息 -->
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

  	<!-- 如果用户没有登录，则显示授权登录的页面 -->
  	<div class="row">
			<LoginWindow @change="getModel(arguments)" v-if="showLogin"></LoginWindow>
		</div>
  </div>

</template>

<script>
	import {showSuccess,showModal,post,get} from '@/util'
	import LoginWindow from '@/components/LoginWindow'
	export default {
		components: {
	    LoginWindow
	  },
		data () {
      return {
    	  userinfo:{},
	      mark:0,
	      add:1,
	      showLogin:false,
        val: ""
    	}
    },
		methods: {
	    async addMark (add) {
	    	console.log("userinfo=======",this.userinfo)
	    	if(this.userinfo.openId){
	    		try{
		    		const data = {
				  		openid: this.userinfo.openId,
				  		add:add
				  	}
		        const res = await post('/weapp/createrecord', data)
		        console.log("addMark返回的数据",res)
		        this.mark = this.mark + add
		      }catch(e){
		        showModal('失败',"请重试哦~")
		        console.log("e createrecord",e)
	      	}
	    	}else{
	    		this.showLogin = true
	    	}
	    },
			async recall () {
				if(this.userinfo.openId){
					try{
				    const res = await post('/weapp/deleterecord', {openid:this.userinfo.openId})
				    console.log("recall返回的数据",res)
				    var add = res.add
				    this.mark = this.mark - add
				    showSuccess("撤销成功")
				  }catch(e){
				    showModal('失败', e.data.msg)
				  }
				}else{
					this.showLogin = true
				}
			},
	    reset () {
	    	if(this.userinfo.openId){
	    		var that = this
		      wx.showModal({
		        content: `确定要清零吗？`,
		        success: function (res) {
		          if (res.confirm) {
		            that.resetMart()
		          }
		        }
		      })
	    	}else{
	    		this.showLogin = true
	    	}
	    },
	    async resetMart () {
	    	if(this.mark != 0){
	    		try{
		    		const res = await post('/weapp/resetmart', {openid:this.userinfo.openId})
		    		console.log("resetMart返回的数据",res)
		    		this.mark = 0
		    	}catch(e){
		    		showModal('失败', "请重试哦~")
		    		console.log("e resetmart",e)
		    	}
	    	}
	    },
	    async getCurrentMark () {
	    	if(this.userinfo.openId){
	    		try{
		    		const res = await get('/weapp/getmark', {openid:this.userinfo.openId})
		    		console.log("getCurrentMark返回的数据",res)
		    		this.mark = res.mark
		    	}catch(e){
		    		showModal('失败', "页面加载失败，请下拉页面重试哦~")
		    		console.log("e resetmart",e)
		    	}
	    	}
	    },
      getModel (val) {
      	console.log("val",val)
	      this.showLogin = val[0]
	      this.userinfo = val[1]
	      this.getCurrentMark()
	      console.log("this.userinfo",this.userinfo)
	    }
		},
		onShow () {
			const userinfo = wx.getStorageSync('userinfo')
			//如果缓存中有userinfo的信息，说明用户登录了。
		  if(userinfo.openId){
		  	//将用户信息储存到data的userinfo字段里面，this.userinfo就是指的这个字段。
		  	this.userinfo = userinfo
		  	this.getCurrentMark()
		  }
	  },
	  onPullDownRefresh () {
	    this.getCurrentMark()
	    wx.stopPullDownRefresh()
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
