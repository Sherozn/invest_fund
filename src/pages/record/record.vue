<template>
	 <div>
  	<div v-if='show_record'>
	  	<div class="prompt">还没有任何记录哦~</div>
	 	</div>
	 	<div v-else>
	 		<div class="table th">
        <div class="date">时间</div>
        <div class="busi">分数</div>
        <div class="mark">最后得分</div>
        <div class="net">备注</div>
      </div>

      <RecordList :key='index' v-for='(record,index) in records' :record = 'record'></RecordList>
      
      <p class="text-footer" v-if="!more">
        没有更多数据
      </p>
      <p class="text-footer" v-else-if="records.length < 15">
      </p>
      <p class="text-footer" v-else>
        加载中···
      </p>
	 	</div>
  </div>
</template>

<script>
	import {get} from '@/util'
	import RecordList from '@/components/RecordList'
	export default {
		components: {
	    RecordList
	  },
	  data () {
	    return {
	    	show_record:false,
	      userinfo:{},
	      records:[],
	      page: 0,
	      more: true
	    }
	  },
	  methods:{
		  async getRecords (init) {
	  		wx.showToast({
	        title: '加载中',
	        icon: 'loading'
	      })
	      if(init){
	        this.page = 0
	        this.more = true
	      }
	      if(this.page === 0){
	        this.records = []
	      }
	      const data = {
	        page: this.page,
	        openid: this.userinfo.openId,
	      }
		  	const records = await get('/weapp/getrecords', data)
	      if (records.records.length < 15 && this.page > 0) {
	        this.more = false
	      }
	      this.records = this.records.concat(records.records)
	      if(this.records.length === 0){
	        this.show_record = true
	      }else{
	        this.show_record = false
	      }
	      wx.hideToast()
		  }
	  },
	  onPullDownRefresh () {
	    this.getRecords(true)
	    wx.stopPullDownRefresh()
	  },
	  // 到达底部
	  onReachBottom () {
	    console.log("!this.more",!this.more)
	    if (!this.more) {
	      return false
	    }

	    this.page = this.page + 1
	    console.log("this.page",this.page)
	    this.getRecords()
	  },
	  onShow () {
	  	const userinfo = wx.getStorageSync('userinfo')
	    //如果缓存中有userinfo的信息，说明用户登录了。
	    if(userinfo.openId){
	      //将用户信息储存到data的userinfo字段里面，this.userinfo就是指的这个字段。
	      this.userinfo = userinfo
	    }
	    this.getRecords(true)
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

<style lang='scss' scoped>
	.add{
		margin-top: 20px;
		margin-bottom: 10px;
		text-align:center;
	  p{
	  	font-size: 15px;
	  }
	}
  .th {
    width: 100%;
    height: 30px;
    line-height:30px;
    background: #EA5149;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    display: flex;
  }
  .date{
    width: 23%;
    padding-left: 60px;
  }
  .busi{
    width: 10%;
    margin-left: 5px;
  }
  .mark{
  	width: 20%;
    margin-left: 10px;
  }
  .net{
  	width: 20%;
    margin-left: 20px;
  }
  .text-footer{
    text-align: center;
    font-size: 12px;
    margin-bottom:5px;
    padding-top: 5px;
  }
</style>