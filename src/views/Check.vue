<template>
  <div class="check-container">
    <div class="checkPartnerinfor">
      チェックしてもらう<ruby>児童<rt>じどう</rt>の</ruby><ruby>名前<rt>なまえ</rt>：{{checkPartnerName}}</ruby><br>
      チェックしてもらう<ruby>児童<rt>じどう</rt>の</ruby><ruby>席番号<rt>せきばんごう</rt>：{{checkPartnerSeatNum}}</ruby>
    </div>
    <div class="checkContainer">
      <div class="checkContent">{{checkContent}}</div>
      <div class="checkContent"> チェックパスワード: {{checkPwd}}</div>

    </div>
    <div class="btn-container">

      <button type="button" @click.stop="kakinaoshi" class="button_kakinaoshi"><ruby>書<rt>か</rt></ruby>き<ruby>直<rt>なお</rt></ruby>し</button>

    </div>
    <div class="modal-container" :class="{'md-show': mdShow}">
      <div class="md-infor">これが<ruby>最後<rt>さいご</rt></ruby>のステップです<br>アンケートにいきましょう</div>
      <div class="btn-container">
        <button class="OK-btn" @click="end">はい</button>
      </div>
    </div>
  </div>

</template>

<script>
import '../assets/css/check.css'
import axios from 'axios'
export default {
  name: 'Check.vue',
  data () {
    return {
      checkPartnerName: '',
      checkPartnerSeatNum: '',
      checkContent: '',
      checkPwd: '',
      progress: '',
      mdShow: false
    }
  },
  created () {
    this.init()
    this.getContent()
  },
  mounted () {
    this.test()
    this.InitSetInterval = setInterval(this.test, 1000)
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
    },
    test () {
      axios.post('/users/checkPwdListConfirm', {checkPwd: this.checkPwd}).then((result) => {
        let res = result.data
        if (res.status === '0') {
          if (this.progress < 3) {

            axios.post('/users/updateCheckInfor', {seatNum: this.seatNum, stepsNum: this.stepsNum, result: 'passed', checkPartnerSeatNum: this.checkPartnerSeatNum}).then((response) => {
              let res = response.data
              if (res.status === '0') {
                console.log('updateCheckInfor ok')
              } else {
                console.log('updateCheckInfor failed')
              }
            })
            console.log('friend has checked this step, you can go to the next step')
            axios.post('/users/updateDiscussionTimes', {seatNum_teaching: this.checkPartnerSeatNum, seatNum_learning: this.seatNum})
            this.$router.push({path: '/programming'})
          } else {
            axios.post('/users/updateCheckInfor', {seatNum: this.seatNum, stepsNum: this.stepsNum, result: 'passed', checkPartnerSeatNum: this.checkPartnerSeatNum}).then((response) => {
              let res = response.data
              if (res.status === '0') {
                console.log('updateCheckInfor ok')
              } else {
                console.log('updateCheckInfor failed')
              }
            })
            axios.post('/users/updateDiscussionTimes', {seatNum_teaching: this.checkPartnerSeatNum, seatNum_learning: this.seatNum})
            this.mdShow = true
          }
        }
      })
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
          axios.post('/users/updateCheckInfor', {seatNum: this.seatNum, stepsNum: this.stepsNum, result: 'failed', checkPartnerSeatNum: this.checkPartnerSeatNum}).then((response) => {
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
      this.$router.push({path: '/questionnaire'})
    }
  }
}
</script>

<style scoped>

</style>
