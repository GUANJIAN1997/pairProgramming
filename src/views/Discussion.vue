<template>
  <div>
    <div class="discussion-container">
      <div class="discussion-title">
        {{this.discussionPartner}}と{{this.userName}}が<ruby>相談中<rt>そうだんちゅう</rt></ruby>
      </div>

      <img class="img" :src="'static/' + imgAddr">
    </div>
    <div class="btn-container">
      <button type="button" @click.stop="discussionEnd" class="button1"><ruby>終<rt>お</rt></ruby>わり</button>
      <button type="button" @click.stop="writingBoardShow = true" class="button1">テキストを<ruby>書<rt>か</rt></ruby>く</button>
    </div>

    <hand-writing-board v-show="writingBoardShow" @showWritingBoard="writingBoardShow = false"></hand-writing-board>
  </div>

</template>

<script>
import '../assets/css/discussion.css'
import axios from 'axios'
import {prevent} from '../util/preventBrowserBack'
import handWritingBoard from '../components/HandwritingBoard'
export default {
  name: 'Discussion.vue',
  data () {
    return {
      imgAddr: '',
      userName: '',
      discussionPartner: '',
      stepsNum: null,
      seatNum_teaching: '',
      seatNum_learning: '',
      writingBoardShow: false
    }
  },
  components: {
    handWritingBoard
  },
  mounted () {
    this.init()
    prevent()
  },
  methods: {
    init () {
      this.imgAddr = this.$route.query.imgAddr
      this.userName = this.$route.query.userName
      this.discussionPartner = this.$route.query.discussionPartner
      this.stepsNum = this.$route.query.stepsNum
      this.seatNum_teaching = this.$route.query.seatNum_teaching
      this.seatNum_learning = this.$route.query.seatNum_learning
    },
    discussionEnd () {
      axios.post('/users/deleteDiscussionList', {seatNum_teaching: this.seatNum_teaching, seatNum_learning: this.seatNum_learning}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('deleted')
        }
      })
      axios.post('/users/updateDiscussionTimes', {discussionPartner: this.discussionPartner, userName: this.userName}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('update success')
        }
      })
      this.$router.push({path: '/feedback', query: {stepsNum: this.stepsNum, discussionPartner: this.discussionPartner, userName: this.userName}})
    }
  }
}
</script>

<style  scoped>

</style>
