<template>
  <div class="book-card">
    <div class="table" width="98%">
      <div class="tr">
        <div class="date">{{create_time}}</div>
        <div class="busi">
          <label v-if="record.add > 0">+{{record.add}}</label>
          <label v-else-if="record.add == 0">&nbsp;0</label>
          <label v-else>{{record.add}}</label>
        </div>
        <div class="mark">
          <label v-if="record.mark >= 0">&nbsp;{{record.mark}}</label>
          <label v-else>{{record.mark}}</label>
        </div>
        <template v-if='name'>
          <div class="net" @click='changeEllipsis'>
            <label v-if="note">{{note}}</label>
            <label v-else class="no-note">点击添加</label>
          </div>
          <label v-if="ellipsis">
            <div class="image" @click='cancel'><image class='img' src='/static/images/quxiao.png'></image></div>
          </label>
          <label v-else>
            <div class="image" @click='changeEllipsis'><image class='img' :src="note? src : ''"></image></div>
          </label>
        </template>
        
      </div>
    </div>

    <div class="hide" v-if="ellipsis">
      <button class="btn" @click='addNote'>
        <label v-if="record.note">修改</label>
        <label v-else>添加</label>
      </button>
      <input v-model='note'
            class="input"
            maxlength='10'
            placeholder="最多输入10个字">
    </div>
  </div>
</template>

<script>
import {post,showModal} from '@/util'
import {formatTime} from '../utils/index.js'
export default {
  props: ['record','name'],
  data () {
    return {
      create_time:formatTime(new Date(this.record.create_time)),
      ellipsis: false,
      note:this.record.note,
      src:"/static/images/bianji.png"
    }
  },
  methods: {
    changeEllipsis () {  
      // if(this.ellipsis){
        // this.note = this.record.note
      // }
      this.ellipsis = !this.ellipsis
    },
    cancel () {
      this.ellipsis = !this.ellipsis
      this.note = this.record.note
    },
    async addNote () {
      const data = {
        id: this.record.id,
        note:this.note
      }
      try{
        const res = await post('/weapp/updatenote', data)
        console.log("res recordList",res)
        this.ellipsis = false
        this.record.note = this.note
        // this.src = '/static/images/bianji.png'
      }catch(e){
        showModal('失败', "请重新提交哦~")
      }
    }
  }
}
</script>

<style lang='scss'>
.book-card{
  background: #FFFFFF;
  margin-bottom:6px;
  .table {
    border: 0px solid darkgray;
    font-size: 15px;
    height: 42px;
    line-height:42px;
    .tr {
      display: flex;
      width: 100%;
    }
    .date{
      width: 40%;
      margin-left: 10px;
    }
    .busi{
      width: 10%;
      font-weight:bold;
    }
    .mark{
      width: 15%;
      margin-left: 20px;
      font-weight:bold;
    }
    .net{
      width: 16%;
      text-align:center;
      width:60px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 14px;
      margin-left: 5px;
      line-height:42px;
      .no-note{
        text-decoration:underline;
        color:#C0C0C0;
        font-size: 13px;
      }
    }
    .image{
      padding-top:1px;
      float: right;
      margin-left: 5px;
    }
  }
  .hide{
    background: #F0F0F0;
    font-size: 15px;
    padding: 10px 10px 3px 30px;
    .input{
      width:60%;
      height:30px;
      background:#FFFFFF;
      border:1px solid black;
      border-radius: 5px;
      text-align:center;
    }
    .btn{
      color:white;
      background:#EA5A49;
      padding-left: 15px;
      margin-right:20px;
      border-radius: 5px;
      font-size: 13px;
      line-height: 30px;
      height: 30px;
      width: 18%;
      float:right;
    }
  }
  .img{
    width: 13px;
    height: 13px;
    margin-right: 5px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
