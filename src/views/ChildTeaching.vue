<template>
  <div>
    <div style="font-size: 2.5rem; text-align: center"><div class="iconfont" style="display: inline-block; font-size: 5rem">&#xe61b;</div>
      <ruby>相談<rt>そうだん</rt></ruby>してほしい人の<ruby>席番号<rt>せきばんごう</rt></ruby>：{{child_learning_seatNum}}
      <ruby>相談<rt>そうだん</rt></ruby>してほしい人の<ruby>名前<rt>なまえ</rt></ruby>：{{child_learning_Name}}
    </div>
    <div class="teaching-feedback-box">
      <button class="teaching-end-btn" @click="finishdiscussion"><ruby>終<rt>お</rt></ruby>わり</button>
    </div>
  </div>
</template>

<script>
import {prevent} from '../util/preventBrowserBack'
export default {
  name: 'ChildTeaching',
  mounted () {
    this.child_learning_Name = this.$route.query.child_learning_Name
    this.child_learning_seatNum = this.$route.query.child_learning_seatNum
    prevent()
  },
  data () {
    return {
      child_learning_Name: '',
      child_learning_seatNum: ''
    }
  },
  methods: {
    finishdiscussion () {
      this.$router.push({path: '/programming'})
    }
  }
}
</script>

<style scoped>
.teaching-feedback-box {
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;
}
.teaching-end-btn {
  margin-top: 2rem;
  font-size: 2rem;
}
</style>
