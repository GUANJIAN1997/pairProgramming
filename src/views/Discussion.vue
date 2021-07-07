<template>
  <div>
    <div class="discussion-container">
      <div class="discussion-title">
        {{this.discussionPartner}}と{{this.userName}}が<ruby>相談中<rt>そうだんちゅう</rt></ruby>
      </div>

      <img class="img-discussion" :src="'static/' + imgAddr">
      <div style="text-align: center">
        <video ref="video" width="35%" controls autoplay>
          <!--          <source  type="video/mp4">-->
        </video>
      </div>
    </div>
    <div class="discussion-end-btn-container">
      <button type="button" @click.stop="discussionEnd" class="discussion-end-btn"><ruby>終<rt>お</rt></ruby>わり</button>
<!--      <button type="button" @click.stop="writingBoardShow = true" class="button1"><ruby>筆記<rt>ひっき</rt></ruby>ボード</button>-->
    </div>

<!--    <hand-writing-board v-show="writingBoardShow" @showWritingBoard="writingBoardShow = false"></hand-writing-board>-->
  </div>

</template>

<script>
import '../assets/css/discussion.css'
import axios from 'axios'
import {prevent} from '../util/preventBrowserBack'
import handWritingBoard from '../components/HandwritingBoard'
import {getTime} from '../util/getTime'
export default {
  name: 'Discussion.vue',
  data () {
    return {
      imgAddr: '',
      userName: '',
      discussionPartner: '',
      progress: null,
      seatNum_teaching: '',
      seatNum_learning: '',
      writingBoardShow: false,
      startTime: '',
      endTime:''
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
      this.userName = this.$route.query.userName
      this.discussionPartner = this.$route.query.discussionPartner
      this.progress = this.$route.query.progress
      this.seatNum_teaching = this.$route.query.seatNum_teaching
      this.seatNum_learning = this.$route.query.seatNum_learning
      this.imgAddr = this.progress + '.png'
      if (this.progress !== '1') {
        this.$refs.video.style.display = 'inline'
        this.$refs.video.src = 'static/crane-step' + this.progress + '.mp4'
      }else {
        this.$refs.video.style.display = 'none'
      }
      this.startTime = getTime()
    },
    discussionEnd () {
      this.endTime = getTime()
      axios.post('/users/deleteDiscussionList', {seatNum_teaching: this.seatNum_teaching, seatNum_learning: this.seatNum_learning}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('deleted')
        }
      })
      this.$router.push({path: '/feedback', query: {progress: this.progress, seatNum_teaching: this.seatNum_teaching, seatNum_learning: this.seatNum_learning, userName: this.userName, startTime: this.startTime, endTime: this.endTime}})
    }
  }
}
</script>

<style  scoped>
.discussion-end-btn-container {
  text-align: center;
}
.discussion-end-btn {
  font-size: 2rem;
}
</style>
