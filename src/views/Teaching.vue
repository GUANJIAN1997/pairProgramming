<template>
  <div>
    <div style="font-size: 3rem; text-align: center"><div class="iconfont" style="display: inline-block; font-size: 5rem">&#xe61b;</div>指導中．．．</div>
    <div class="teaching-feedback-box">
      <div>指導したステップと指導した内容を入力</div>
      <span>ステップ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="text" class="teaching-feedback-content" v-model="stepsNum">
      <br>
      <span>指導した内容</span><input type="text" class="teaching-feedback-content" v-model="feedback">
      <br>
      <button class="teaching-end-btn" @click="finishTeaching">指導完了</button>
    </div>
  </div>

</template>

<script>
import {prevent} from '../util/preventBrowserBack'
import axios from 'axios'
import {getTime} from '../util/getTime'

export default {
  name: 'Teaching',
  data () {
    return {
      stepsNum: '',
      feedback: '',
      startTime: '',
      endTime: ''
    }
  },
  mounted () {
    prevent()
    this.startTime = getTime()
  },
  methods: {
    finishTeaching () {
      this.endTime = getTime()
      if (this.feedback) {
        axios.post('/users/deleteDiscussionList', {seatNum_teaching: 'TA', seatNum_learning: this.$route.query.seatNum}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('deleted')
          }
        })
        axios.post('/users/updateDiscussionInfor', {seatNum_teaching: 'TA', stepsNum: this.stepsNum, feedbackValue: this.feedback, seatNum_learning: this.$route.query.seatNum, startTime: this.startTime, endTime: this.endTime}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('updated discussion information(TA)')
          }
        })
        this.$router.push({path: '/TA'})
      } else {
        alert('入力してください')
      }
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
.teaching-feedback-content {
  font-size: 2rem;
  margin-top: 2rem;
  width: 50%;
  height: 2rem;
}
.teaching-end-btn {
  margin-top: 2rem;
  font-size: 2rem;
}
</style>
