<template>
    <div>
      <div class="discussion-container">
        <div class="discussion-title">
          <ruby>相談<rt>そうだん</rt></ruby>してどうでしたか？
        </div>
        <div style="text-align: center; margin-top: 10rem">
<!--          <input style="width: 70%" type="range" id="range1" min="-2" max="2" step="1" v-model="feedbackValue"/>-->
          <div style="width: 85%; margin: auto; display: flex; justify-content: space-between; font-size: 1.5rem">
            <div ><input type="radio" value="1" v-model="feedbackValue"><ruby>全然分<rt>ぜんぜんわ</rt></ruby>からなかった</div>
            <div><input type="radio" value="2" v-model="feedbackValue">あまり<ruby>分<rt>わ</rt></ruby>からなかった</div>
            <div><input type="radio" value="3" v-model="feedbackValue">どちらとも<ruby>言<rt>い</rt></ruby>えない</div>
            <div><input type="radio" value="4" v-model="feedbackValue">ある<ruby>程度分<rt>ていどわ</rt></ruby>かった</div>
            <div><input type="radio" value="5" v-model="feedbackValue">とてもよく<ruby>分<rt>わ</rt></ruby>かった</div>
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
      <div class="modal-container"  :class="{'md-show': mdShow2}">
        <div style="margin-top: 75px">
          <div class="md-infor">どれかひとつを<ruby>選<rt>えら</rt></ruby>んでください</div>
          <div class="btn-container">
            <button class="OK-btn" @click="mdShow2=false">OK</button>
          </div>
        </div>

      </div>
      <div class="modal-container"  :class="{'md-show': mdShow3}">
        <div style="margin-top: 75px">
          <div class="md-infor">わからないところをサポーターに<ruby>聞<rt>き</rt></ruby>きませんか</div>
          <div class="btn-container">
            <button class="OK-btn" @click="programming2" style="font-size: 1.5rem">いいえ、ステップの<ruby>画面<rt>がめん</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る</button>
            <button class="OK-btn" @click="ta" style="font-size: 1.5rem">サポーターに<ruby>聞<rt>き</rt></ruby>く</button>
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
      feedbackValue: '',
      stepsNum: null,
      seatNum_teaching: '',
      seatNum_learning: '',
      userName: '',
      mdShow: false,
      mdShow2: false,
      mdShow3: false,
      startTime: '',
      endTime: ''
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
      this.startTime = this.$route.query.startTime
      this.endTime = this.$route.query.endTime
    },
    programming () {
      if (!this.feedbackValue) {
        this.mdShow2 = true
        return
      }
      if (this.feedbackValue < 3) {
        this.mdShow3 = true
        return
      }
      axios.post('/users/updateDiscussionInfor', {seatNum_learning: this.seatNum_learning, seatNum_teaching: this.seatNum_teaching, stepsNum: this.stepsNum, feedbackValue: this.feedbackValue, startTime: this.startTime, endTime: this.endTime}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('update success')
        }
      })
      this.$router.push({path: '/programming'})
    },
    programming2 () {
      this.mdShow3 = false
      axios.post('/users/updateDiscussionInfor', {seatNum_learning: this.seatNum_learning, seatNum_teaching: this.seatNum_teaching, stepsNum: this.stepsNum, feedbackValue: this.feedbackValue, startTime: this.startTime, endTime: this.endTime}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('update success')
        }
      })
      this.$router.push({path: '/programming'})
    },
    ta () {
      this.mdShow3 = false
      if (!this.feedbackValue) {
        this.mdShow2 = true
        return
      }
      axios.post('/users/updateDiscussionInfor', {seatNum_learning: this.seatNum_learning, seatNum_teaching: this.seatNum_teaching, stepsNum: this.stepsNum, feedbackValue: this.feedbackValue, startTime: this.startTime, endTime: this.endTime}).then((response) => {
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
