<template>
  <div class="check-container">
    <div class="checkPartnerinfor">
      チェックしてもらう<ruby>児童<rt>じどう</rt>の</ruby><ruby>名前<rt>なまえ</rt>：{{checkPartnerName}}</ruby><br>
      チェックしてもらう<ruby>児童<rt>じどう</rt>の</ruby><ruby>席番号<rt>せきばんごう</rt>：{{checkPartnerSeatNum}}</ruby>
    </div>
    <div class="checkContainer">
      <div class="checkContent">{{checkContent}}</div>

      <div class="checkContent"> チェックパスワード: {{checkPwd}}</div>

      <div ><img ref="img" width="40%" :src="'static/' + url"></div>

      <div style="text-align: center">
        <video ref="video" width="40%" controls autoplay>
          <!--          <source  type="video/mp4">-->
        </video>
      </div>

    </div>
    <div class="btn-container">

      <button type="button" ref="kakibtn" @click.stop="kakinaoshi" class="button_kakinaoshi"><ruby>書<rt>か</rt></ruby>き<ruby>直<rt>なお</rt></ruby>し</button>

    </div>
    <div class="modal-container" :class="{'md-show': mdShow}">
      <div class="md-infor"><ruby>完成<rt>かんせい</rt></ruby>できました<br><ruby>課<rt>か</rt></ruby><ruby>題<rt>だい</rt></ruby><ruby>画<rt>が</rt></ruby><ruby>面<rt>めん</rt></ruby>にもどって、ほかの<ruby>友達<rt>ともだち</rt></ruby>を<ruby>助<rt>たす</rt></ruby>けましょう</div>
      <div class="btn-container">
        <button class="OK-btn" @click="end">はい</button>
      </div>
    </div>
    <div class="modal-container" :class="{'md-show': mdShow2}">
      <div class="md-infor">チェックできました！<br><ruby>次<rt>つぎ</rt></ruby>のステップ<ruby>行<rt>い</rt></ruby>きましょう</div>
      <div class="btn-container">
        <button class="OK-btn" @click="gotonext">はい</button>
      </div>
    </div>
  </div>

</template>

<script>
import '../assets/css/check.css'
import axios from 'axios'
import {getTime} from '../util/getTime'
import {prevent} from '../util/preventBrowserBack'
export default {
  name: 'Check.vue',
  data () {
    return {
      seatNum: '',
      checkPartnerName: '',
      checkPartnerSeatNum: '',
      checkContent: '',
      checkPwd: '',
      stepsNum: '',
      progress: '',
      mdShow: false,
      mdShow2: false,
      startTime: '',
      endTime: '',
      url: ''
    }
  },
  mounted () {
    this.init()
    this.getContent()
    this.test()
    this.InitSetInterval = setInterval(this.test, 1000)
    this.$refs.video.src = this.url
    this.startTime = getTime()
    prevent()
  },
  destroyed () {
    clearInterval(this.InitSetInterval)
  },
  methods: {
    init () {
      this.checkPartnerSeatNum = this.$route.query.checkPartnerSeatNum
      this.checkPartnerName = this.$route.query.checkPartnerName
      this.checkPwd = this.$route.query.checkPwd
      this.stepsNum = this.$route.query.stepsNum
      this.seatNum = this.$route.query.seatNum
      this.progress = this.$route.query.progress
      this.url = this.$route.query.url
      if (!this.url) {
        this.$refs.video.style.display = 'none'
        this.url = '1.png'

      } else {
        this.$refs.img.style.display = 'none'
      }
    },
    test () {
      axios.post('/users/checkPwdListConfirm', {checkPwd: this.checkPwd}).then((result) => {
        let res = result.data
        if (res.status === '0') {
          if (this.progress < 9) {
            this.endTime = getTime()
            axios.post('/users/updateCheckInfor', {seatNum: this.seatNum, stepsNum: this.stepsNum, result: 'passed', checkPartnerSeatNum: this.checkPartnerSeatNum, startTime: this.startTime, endTime: this.endTime}).then((response) => {
              let res = response.data
              if (res.status === '0') {
                console.log('updateCheckInfor ok')
              } else {
                console.log('updateCheckInfor failed')
              }
            })
            console.log('friend has checked this step, you can go to the next step')
            axios.post('/users/updateDiscussionTimes', {seatNum_teaching: this.checkPartnerSeatNum, seatNum_learning: this.seatNum})
            this.mdShow2 = true
            this.$refs.kakibtn.style.visibility = 'hidden'
            clearInterval(this.InitSetInterval)
          } else {
            this.endTime = getTime()
            axios.post('/users/updateCheckInfor', {seatNum: this.seatNum, stepsNum: this.stepsNum, result: 'passed', checkPartnerSeatNum: this.checkPartnerSeatNum, startTime: this.startTime, endTime: this.endTime}).then((response) => {
              let res = response.data
              if (res.status === '0') {
                console.log('updateCheckInfor ok')
              } else {
                console.log('updateCheckInfor failed')
              }
            })
            axios.post('/users/updateDiscussionTimes', {seatNum_teaching: this.checkPartnerSeatNum, seatNum_learning: this.seatNum})
            clearInterval(this.InitSetInterval)
            this.mdShow = true
            this.$refs.kakibtn.style.visibility = 'hidden'
          }
        }
      })
    },
    gotonext () {
      axios.post('/users/setTime', {seatNum: this.seatNum})
      this.mdShow2 = false
      this.$router.push({path: '/programming'})
    },
    getContent () {
      const param = {stepsNum: this.stepsNum}
      axios.get('/users/getContent', {params: param}).then((result) => {
        let res = result.data
        if (res.status === '0') {
          this.checkContent = res.result
        }
      })
    },
    kakinaoshi () {
      axios.post('/users/kakinaoshi', {checkPwd: this.checkPwd}).then((result) => {
        let res = result.data
        if (res.status === '0') {
          this.$router.push({path: '/programming'})
          axios.post('/users/deleteCheckList', {seatNum_teaching: this.checkPartnerSeatNum, seatNum_learning: this.seatNum}).then((result) => {
            let res = result.data
            if (res.status === '0') {
              console.log('deleted')
            } else {
              console.log('failed')
            }
          })
          console.log('kakinaoshi successfully')
          this.endTime = getTime()
          axios.post('/users/updateCheckInfor', {seatNum: this.seatNum, stepsNum: this.stepsNum, result: 'failed', checkPartnerSeatNum: this.checkPartnerSeatNum, startTime: this.startTime, endTime: this.endTime}).then((response) => {
            let res = response.data
            if (res.status === '0') {
              console.log('updateCheckInfor ok')
            } else {
              console.log('updateCheckInfor failed')
            }
          })
          axios.post('/users/updateDiscussionTimes', {seatNum_teaching: this.checkPartnerSeatNum, seatNum_learning: this.seatNum})
        } else {
          console.log('kakinaoshi failed')
        }
      })
    },
    end () {
      this.$router.push({path: '/programming'})
    }
  }
}
</script>

<style scoped>

</style>
