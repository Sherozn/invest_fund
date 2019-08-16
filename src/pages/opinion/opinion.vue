<template>
  <div>
    <div class="container">
      <div class="row">
        <label class="name">意见与反馈</label>
      </div>
      <div class="row text">
        <div>
          <textarea
            v-model='opinion'
            class = "input"
            maxlength='200'
            placeholder="点击这里填写你的建议、问题反馈、合作等信息，我会认真对待每一条信息~"
          ></textarea> 

          <label class="word-count">{{word_count}}/200</label>
        </div>
      </div>
      <div class="row">
        <div>
          <label class="name">相关截图（选填）</label>
          <label class="img-count">{{img_count}}/2</label>
        </div>
        
        <label v-for="(item, index) in src" :key="index">
          <img class="img" :src="item" >
        </label>
        <label v-if="img_count < 2" @click="uploadPicture">
          <img class="add-img" :src="addimage">
        </label>
      </div>
      <div class="row">
        <div class="name">微信号（选填）</div>
        <input
          v-model='wechat'
          class = "wechat-input"
          maxlength='20'
          placeholder="如果想要详细交流，可以点击这里留下微信号哦~"
        ></input> 
      </div>
  	</div>
    <button @click="summit">提交</button>
    <OpiWindow @change="getModel" v-if="changeModel"></OpiWindow>

  </div>
</template>

<script>
import {showSuccess,showModal,post} from '@/util'
import OpiWindow from '@/components/OpiWindow'
export default {
  components: {
    OpiWindow
  },
	data () {
    return {
      userinfo: wx.getStorageSync('userinfo')? wx.getStorageSync('userinfo') : {},
    	opinion:"",
      src:[],
      wechat:"",
      addimage:"../../static/images/addimage.png",
      word_count:0,
      img_count:0,
      changeModel:false,
      style:""
    }
  },
  methods: {
    uploadPicture () {
      let that = this
      wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.src.push(tempFilePaths)
          console.log('that.src',that.src)
        }
      })
    },
    async summit() {
      if(this.word_count > 0){
        const data = {
          openid: this.userinfo.openId,
          opinion:this.opinion,
          src:this.src.join(","),
          wechat:this.wechat
        }
        const res = await post('/weapp/createopinion', data)
        console.log("res",res)
        this.changeModel = true
      }else{
        showModal("提交失败","反馈内容不能为空哦~")
      }
    },
    getModel (val) {
      this.changeModel = val
    }
  },
  watch: {
    opinion () {
      this.word_count = this.opinion.length
    },
    src () {
      this.img_count = this.src.length
    }
  }
}
</script>

<style lang='scss'>
.container{
  background:#FFFFFF;
  font-size:15px;
  .text {
    height: 110px;
  }
  .row{
    border-bottom: 1px #E8E8E8 solid;
    padding: 5px 15px;
    .name {
      width:80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width:100%;
      height:85px;
      font-size:14px;
      padding-top:5px;
    }
    .word-count {
      float:right;
      color: #808080;
    }
    .img-count {
      float:right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width:80px;
      height:80px;
    }
    .img {
      width:66px;
      height:66px;
      margin-bottom:7px;
      margin-right: 10px;
    }
    .wechat-input{
      font-size:14px;
    }
  }
}  
button {
  margin:20px auto;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;

}
</style>
