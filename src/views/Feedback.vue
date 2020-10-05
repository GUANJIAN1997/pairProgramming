<template>
    <div>
      <div class="discussion-container">
        <div class="discussion-title">
          ディスカッションを通じてわからないところの理解度
        </div>
        <div style="text-align: center; margin-top: 10rem">
          <input style="width: 70%" type="range" id="range1" min="0" max="4" step="1" onchange="b.value=this.value"/>
          <output id="b" for="range1" ></output>
          <div style="width: 85%; margin: auto; display: flex; justify-content: space-between">
            <div style="width: 15%; font-size: 2rem">非常に難しかった</div>
            <div style="width: 15%; font-size: 2rem">あまり理解できなかった</div>
            <div style="width: 15%; font-size: 2rem">どちらとも言えない</div>
            <div style="width: 15%; font-size: 2rem">ある程度理解できた</div>
            <div style="width: 15%; font-size: 2rem">十分理解できた</div>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <button type="button" @click.stop="programming" class="button1">課題画面に戻る</button>
        <button type="button" @click.stop="discussionEnd" class="button1">TAに聞く</button>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'Feedback.vue',
    methods: {
      programming () {
        this.$router.push({path:'/programming'})
      }
    }
  }
</script>

<style scoped>

</style>
