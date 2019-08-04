<template>
  <div class="view-fund">
		<div class="row">
	    <label class="label">基金代码：</label>
	    <input  v-model='code'
	            type="number"
	            class="input"
	            :maxlength='20'
	            placeholder="输入6位基金代码">
	  </div>

	  <div class="row">
	    <label class="label">基金名称：</label>
	    <label class="label-input">自动填充{{name}}</label>
	  </div>

	  <div class="row">
	    <label class="label">基金类型：</label>  
	    <radio-group class="radio-group" @change="radioChange">
	      <label class="radio" v-for="item in items" :key="item.as_type">
	        <radio color='#EA5149' :value="item.as_type" :checked="item.checked"  /> {{item.name}}
	      </label>
	    </radio-group>
	  </div>

	  <div class="row">
	    <label class="label">手续费率：</label>
      <input v-model='commission'
            type="number"
            class="input"
            maxlength='10'>
		</div>

		<div class="annotation">
	    <button class="btn">
	      添加
	    </button>
	  </div>
	</div>
</template>

<script>
import {get} from '@/util'
export default {
	data () {
    return {
    	//基金代码
    	code: '',
    	name: '',
    	as_type: 1,
    	items: [
        {as_type: 1, name: '场内',checked: 'true'},
        {as_type: 2, name: '场外'}
      ],
    	commission:0.0001,
    }
  },
  methods:{
  	radioChange (e) {
  		console.log('点击单选按钮，系统返回当前选中按钮的信息e：',e)
      this.as_type = e.target.value
      //as_type为2时，单选按钮选择的是场外，将data中定义的items数组的第二项，也就是this.items[1]的checked元素变为true，这样场外按钮就会变成选中状态
      if(this.as_type === '2'){
        this.items[1].checked = 'true'
      }else{
        this.items[1].checked = ''
      }
      console.log('this.as_type',this.as_type)
    },
  },
  watch:{
  	async code(){
  		if(this.code.length === 6){
  			const res = await get('/weapp/addfund', {code:this.code})
  			this.name = res.name
  			console.log("name",res.name)
  		}
  	}
  	

  },
}
</script>

<style lang='scss'>
  .view-fund{
    background: #ffffff;
    font-size: 14px;
    .row{
      border-bottom: 1px #E8E8E8 solid;
      height: 50px;
    }
    .input{
      height:50px;
    }
    .radio-group{
      line-height:50px;
    }
    .switch{
      padding-top: 12px;
    }
    .picker{
      line-height:50px;
    }
    .label{
      float: left;
      font-size: 15px;
      line-height:50px;
      margin-left: 6px;
    }
    .label-input{
    	line-height:50px;
      font-size: 14px;
      color: #989898;
    }
    .annotation{
      padding: 5px;
      font-size: 14px;
      color: #888888;
      background: #F0F0F0;
    }
  }
</style>