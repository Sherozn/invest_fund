<template>
  <div class="title">
		<img class="img" :src="src">
    <p class="content">游戏人生是一款自律神器，将分数作为奖励惩罚手段，提醒对良好行为的关注和强化。</p>
    <p class="content">我们可以将自己的人生想象成通关打怪，打败自己的心魔加分，被心魔打败减分。</p>
    <p class="little-tip">给大家分享一下我一天的记录：</p>
    <p class="content tip"><label class="point">◉</label> 早上7点没有按时起床，减1分，目前-1分；</p>
    <p class="content tip"><label class="point">◉</label> 起床看了10页书，加2分，目前1分；</p>
    <p class="content tip"><label class="point">◉</label> 在地铁上做了一个超难的算法题，加5分，目前6分；</p>
    <p class="content tip"><label class="point">◉</label> 工作刷微博，又分心了，扣2分，目前4分；</p>
    <p class="content tip"><label class="point">◉</label> 午饭吃的绿色蔬菜，忍住没有吃麻辣烫，奖励自己5分，目前9分；</p>
    <p class="content tip"><label class="point">◉</label> 下午煞笔同事又找事，但是控制住了自己的情绪，没有生气，必须表扬一下自己，加5分，目前14分；</p>
    <p class="content tip"><label class="point">◉</label> 晚饭没有忍住T_T，还是吃了麻辣烫，罪恶罪恶，减10分，目前4分；</p>
    <p class="content tip"><label class="point">◉</label> 晚饭在Keep上面运动了30分钟，加5分，目前9分；</p>
    <p class="content">加减多少分没有具体指标，主要看心魔给自己带来的影响。</p>
    <p class="content">有时候分数变为负数也没有关系，督促自己做点有益的事情，努力将分数变为正数。</p>
    <p class="content">如果实在压力太大，可以将分数清零，重新开始。</p>
    <p class="content">每满100分，或者满足任意分数，可以给自己心态上面的奖励。比如分数越多就会越幸运；凑足3个100分，就能招来桃花运等等</p>
    <p class="content">也可以给自己实际的物质奖励。比如凑足3个100分，奖励自己一顿海底捞~</p>
    
    
    
    
    



    

    

    

    

	</div>
</template>

<script>
export default {
	data () {
    return {
      src: "../../static/images/littleTip-huang.jpg"
    }
  },
  methods:{
  	
  }
}
</script>

<style lang='scss'>
.img {
  width:100%;
  height:120px;
  padding-bottom:5px;
}
.content {
  padding:3px 15px;
  font-size: 15px;
  font-weight:bold;
}
.little-tip {
  padding:5px 15px 3px 15px;
  font-size: 15px;
  font-weight:bold;
  color: #EA5149;
}
.tip {
  font-size: 14px;
} 
.point{
  color: #feb600;
}
</style>