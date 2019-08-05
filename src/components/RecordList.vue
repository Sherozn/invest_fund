<template>
  <div class="book-card">
    <div class="table" width="98%">
      <div class="tr" @click='ellipsi'>
        <div class="date">{{create_time}}</div>
        <div class="busi">
          <label v-if="record.add > 0">+</label>{{record.add}}
        </div>
        <div class="mark">{{record.mark}}</div>
        <div class="net">
          <label v-if="record.note">{{record.note}}</label>
          <label v-else class="no-note">点击添加</label>
        </div>
        <div class="image"><image class='img' :src="ellipsis?'/static/images/right.png':'/static/images/down.png'"></image></div>
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
import {get,post} from '@/util'
import {formatTime} from '../utils/index.js'
export default {
  props: ['record'],
  data () {
    var util = require('../utils/index.js')
    return {
      amount:0.0,
      busi_code:"",
      cost:0.0,
      ellipsis: false,
      create_time:"",
      note:""
    }
  },
  methods: {
    ellipsi(){  
      this.ellipsis = !this.ellipsis
      console.log("this.index",this.index)
    },
    async addNote () {
      const data = {
        id: this.record.id,
        note:this.note
      }
      const res = await post('/weapp/updatenote', data)
    }
  },
  mounted () {
    this.create_time = formatTime(new Date(this.record.create_time))
  }
}
</script>

<style lang='scss' scoped>
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
      width: 45%;
      margin-left: 5px;
    }
    .busi{
      width: 10%;
      margin-left: 5px;
      font-weight:bold;
    }
    .mark{
      width: 15%;
      margin-left: 20px;
      font-weight:bold;
    }
    .net{
      width: 20%;
      text-align:center;
      width:90px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 14px;
      .no-note{
        text-decoration:underline;
        color:#C0C0C0;
        font-size: 13px;
      }
    }
    .image{
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
</style>
