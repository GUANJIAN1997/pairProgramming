<template>
  <div>
    <div style="font-size: 3rem; text-align: center"><div class="iconfont" style="display: inline-block; font-size: 5rem">&#xe61b;</div>{{child_learning_Name}}さんと<ruby>相談<rt>そうだん</rt></ruby>しています</div>
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
    prevent()
  },
  data () {
    return {
      child_learning_Name: ''
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
