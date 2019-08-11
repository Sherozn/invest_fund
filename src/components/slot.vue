<template>
  <popup 
    id="popup" 
    cancelText="保存二维码"
    confirmText="好的"
    title="温馨提示"
    imgUrl="../static/images/add.png"
    :content="popupContent"
    :cancelEvent="popupCancel"
    :confirmEvent="popupConfirm">
    
    <view slot="content" style='color: red;'>
      插槽测试部分
    </view>
  </popup>
</template>

<script>
export default {
  data () {
    return {
      popupContent:"你好"
    }
  },
  methods: {
  	popupCancel(){
  		console.log("nihao")
  	},
  	popupConfirm () {
  		console.log("nihao")
  	}
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
