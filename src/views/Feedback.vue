<template>
    <div>
      <div class="discussion-container" style="height: 600px">
        <div class="discussion-title">
          ディスカッションを通じてわからないところの理解度
        </div>
        <div style="text-align: center; margin-top: 10rem">
          <input style="width: 70%" type="range" id="range1" min="-2" max="2" step="1" v-model="feedbackValue"/>
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
import axios from 'axios'

export default {
  name: 'Feedback.vue',
  data () {
    return {
      feedbackValue: 0,
      stepsNum: null,
      discussionPartner: '',
      userName: ''
    }
  },
  methods: {
    programming () {
      this.stepsNum = this.$route.query.stepsNum
      this.discussionPartner = this.$route.query.discussionPartner
      this.userName = this.$route.query.userName
      axios.post('/users/updateDiscussionInfor', {userName: this.userName, discussionPartner: this.discussionPartner, stepsNum: this.stepsNum, feedbackValue: this.feedbackValue}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('update success')
        }
      })
      this.$router.push({path: '/programming'})
    }
  }
}
</script>

<style scoped>

</style>
