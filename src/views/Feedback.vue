<template>
    <div>
      <div class="discussion-container" style="height: 600px">
        <div class="discussion-title">
          <ruby>相談<rt>そうだん</rt></ruby>してどうでしたか？
        </div>
        <div style="text-align: center; margin-top: 10rem">
          <input style="width: 70%" type="range" id="range1" min="-2" max="2" step="1" v-model="feedbackValue"/>
          <div style="width: 85%; margin: auto; display: flex; justify-content: space-between">
            <div style="width: 15%; font-size: 2rem"><ruby>全然分<rt>ぜんぜんわ</rt></ruby>からなかった</div>
            <div style="width: 15%; font-size: 2rem">あまり<ruby>分<rt>わ</rt></ruby>からなかった</div>
            <div style="width: 15%; font-size: 2rem">どちらとも<ruby>言<rt>い</rt></ruby>えない</div>
            <div style="width: 15%; font-size: 2rem">ある<ruby>程度分<rt>ていどわ</rt></ruby>かった</div>
            <div style="width: 15%; font-size: 2rem">とてもよく<ruby>分<rt>わ</rt></ruby>かった</div>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <button type="button" @click.stop="programming" class="button1">ステップの<ruby>画面<rt>がめん</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る</button>
        <button type="button" @click.stop="ta" class="button1">サポーターに<ruby>聞<rt>き</rt></ruby>く</button>
      </div>

      <div class="modal-container"  :class="{'md-show': mdShow}">
        <div style="margin-top: 75px">
          <div class="md-infor">サポーターが<ruby>来<rt>き</rt></ruby>ています．<ruby>少々<rt>しょうしょう</rt></ruby>お<ruby>待<rt>ま</rt></ruby>ちください</div>
          <div class="btn-container">
            <button class="OK-btn" @click="closeModal">OK</button>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import axios from 'axios'
import {prevent} from '../util/preventBrowserBack'

export default {
  name: 'Feedback.vue',
  data () {
    return {
      feedbackValue: 0,
      stepsNum: null,
      seatNum_teaching: '',
      seatNum_learning: '',
      userName: '',
      mdShow: false
    }
  },
  created () {
    this.init()
  },
  mounted () {
    prevent()
  },
  methods: {
    init () {
      this.stepsNum = this.$route.query.stepsNum
      this.seatNum_teaching = this.$route.query.seatNum_teaching
      this.seatNum_learning = this.$route.query.seatNum_learning
      this.userName = this.$route.query.userName
    },
    programming () {
      axios.post('/users/updateDiscussionInfor', {seatNum_learning: this.seatNum_learning, seatNum_teaching: this.seatNum_teaching, stepsNum: this.stepsNum, feedbackValue: this.feedbackValue}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('update success')
        }
      })
      this.$router.push({path: '/programming'})
    },
    ta () {
      axios.post('/users/updateDiscussionInfor', {seatNum_learning: this.seatNum_learning, seatNum_teaching: this.seatNum_teaching, stepsNum: this.stepsNum, feedbackValue: this.feedbackValue}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('update success')
        }
      })
      this.mdShow = true
      axios.post('/users/callTA', {userName: this.$route.query.userName, seatNum: this.seatNum_learning}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('TAOK')
          axios.post('/users/updateDiscussionList', {seatNum_teaching: 'TA', seatNum_learning: this.seatNum_learning}).then((response) => {
            let res = response.data
            if (res.status === '0') {
              console.log('discussionList updated')
            } else {
              console.log('discussionList updated failed')
            }
          })
        } else {
          console.log('すでに呼んだ')
        }
      })
    },
    closeModal () {
      this.$router.push({path: '/programming'})
    }
  }
}
</script>

<style scoped>

</style>
