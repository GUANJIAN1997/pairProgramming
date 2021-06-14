<template>
  <div>
    <div class="container-all">
      <div class="infor">
        <ruby>名前<rt>なまえ</rt>：{{userName}}</ruby>
        <ruby>席番号<rt>せきばんごう</rt>：{{seatNum}}</ruby>
      </div>
      <div class="container">

          <step-project :stepsNum="stepsNum" @getImgAddr="getImgAddr">
            <span slot="steps" class="stepNum" >{{'ステップ'+stepsNum}}</span>
          </step-project>
        <Progress :progressList="progressList"></Progress>

      </div>

      <div class="btn-container">
        <button type="button" @click.stop="Return" class="button1" ref="btn1"><ruby>前<rt>まえ</rt></ruby>のステップ</button>
        <button type="button" @click.stop="beforeDiscussion" class="button2" ref="btn2"><ruby>相談<rt>そうだん</rt></ruby>する</button>
        <button type="button" @click.stop="Next" class="button3" ref="btn3"><ruby>次<rt>つぎ</rt></ruby>のステップ</button>
      </div>

      <Modal :discussionPartner="discussionPartner" :mdShow="mdShow1" :imgAddr="imgAddr" :url= "url" :userName="userName" :stepsNum="stepsNum" :seatNum="seatNum" @close="mdShow2 = false"></Modal>

      <div class="modal-container" :class="{'md-show': mdShow3}">
        <div class="md-infor"><ruby>前<rt>まえ</rt></ruby>のステップはありません！</div>
        <div class="btn-container">
          <button class="OK-btn" @click="mdShow3 = false">はい</button>
        </div>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow4}">
        <div class="md-infor"><ruby>相談<rt>そうだん</rt></ruby>できる<ruby>友達<rt>ともだち</rt></ruby>がいません！</div>
        <div class="btn-container">
          <button class="OK-btn" @click="mdShow4 = false"><ruby>待<rt>ま</rt></ruby>ちます</button>
          <button class="OK-btn" @click="ta">サポーターに<ruby>聞<rt>き</rt></ruby>く</button>
        </div>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow5}">
        <audio ref="discussionAudio" autoplay>
        </audio>
        <div class="md-infor"><ruby>君<rt>きみ</rt></ruby>の<ruby>助<rt>たす</rt></ruby>けがほしいともだち：</div>
        <div class="md-infor"><ruby>席番号<rt>せきばんごう</rt></ruby>: {{child_learning_seatNum}}</div>
        <div class="md-infor"><ruby>名前<rt>なまえ</rt></ruby>: {{child_learning_Name}}</div>
        <div class="btn-container">
          <button class="OK-btn" @click="goToTeach">OK</button>
        </div>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow6}">
        <div class="md-infor">チェックしてほしいですか？</div>
        <div class="btn-container">
          <button class="OK-btn" @click="check">はい</button>
          <button class="OK-btn" @click="noCheck">いいえ</button>
        </div>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow7}">
        <audio autoplay ref="checkAudio">
        </audio>
        <div class="md-infor">チェックしてほしいともだち：</div>
        <div class="md-infor"><ruby>席番号<rt>せきばんごう</rt></ruby>: {{child_learning_seatNum}}</div>
        <div class="md-infor"><ruby>名前<rt>なまえ</rt></ruby>: {{child_learning_Name}}</div>
        <div class="btn-container">
          <button class="OK-btn" @click="goToCheck">OK</button>
        </div>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow8}">
        <div class="md-infor"><ruby>相談<rt>そうだん</rt></ruby>してほしいですか？</div>
        <div class="btn-container">
          <button class="OK-btn" @click="Discussion">はい</button>
          <button class="OK-btn" @click="noDiscussion">いいえ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StepProject from '../components/StepProject'
import Progress from '../components/Progress'
import Modal from '../components/Modal'
import '../assets/css/programming.css'
import axios from 'axios'
import {prevent} from '../util/preventBrowserBack'
export default {
  name: 'Programming.vue',
  components: {
    Progress,
    StepProject,
    Modal
  },
  data () {
    return {
      userName: '',
      seatNum: '',
      progress: null,
      stepsNum: null,
      mdShow1: false,
      mdShow3: false,
      mdShow4: false,
      mdShow5: false,
      mdShow6: false,
      mdShow7: false,
      mdShow8: false,
      imgAddr: '',
      url: '',
      InitSetInterval: '',
      discussionPartner: {},
      checkPartner: {},
      progressList: [],
      child_learning_seatNum: '',
      child_learning_Name: '',
      child_learning_Progress: '',
      checkPwd: '',
      discussionAudioBoolean: true,
      checkAudioBoolean: true
    }
  },
  created () {
    this.test()
    this.InitSetInterval = setInterval(this.test, 1000)
  },
  mounted () {
    this.init()
    prevent()
  },
  destroyed () {
    clearInterval(this.InitSetInterval)
  },
  methods: {
    test () {
      axios.get('/users/stepProject/getOthersProgress').then((response) => {
        let res = response.data
        if (res.status === '0') {
          res.result.sort(function (a, b) {
            return b.progress - a.progress
          })
          this.progressList = res.result
          let discussionList = res.msg1
          for (let i = 0; i < discussionList.length; i += 2) {
            if (discussionList[i] === this.seatNum) {
              this.child_learning_seatNum = discussionList[i + 1]
              this.mdShow5 = true
              this.$refs.btn1.style.visibility = 'hidden'
              this.$refs.btn2.style.visibility = 'hidden'
              this.$refs.btn3.style.visibility = 'hidden'
              if (this.discussionAudioBoolean) {
                this.$refs.discussionAudio.src = 'static/discussion.mp3'
                this.discussionAudioBoolean = false
              }
              break
            }
          }
          let checkList = res.msg2
          for (let i = 0; i < checkList.length; i += 2) {
            if (checkList[i] === this.seatNum) {
              this.child_learning_seatNum = checkList[i + 1]
              this.mdShow7 = true
              this.$refs.btn1.style.visibility = 'hidden'
              this.$refs.btn2.style.visibility = 'hidden'
              this.$refs.btn3.style.visibility = 'hidden'
              if (this.checkAudioBoolean) {
                this.$refs.discussionAudio.src = 'static/check.mp3'
                this.checkAudioBoolean = false
              }
              break
            }
          }
          for (let item of this.progressList) {
            if (item.seatNum === this.child_learning_seatNum) {
              this.child_learning_Name = item.userName
              this.child_learning_Progress = item.progress
              break
            }
          }
        }
      })
    },
    init () {
      var reg1 = new RegExp(`userName=([^;]*)`, 'i')
      var reg2 = new RegExp(`seatNum=([^;]*)`, 'i')
      const res1 = document.cookie.match(reg1)
      const res2 = document.cookie.match(reg2)
      if (!res1 || !res2) {
        console.log('not found')
      } else {
        this.userName = res1[1]
        this.seatNum = res2[1]
      }
      // document.cookie.split(';').map((item) => {
      //   if (item.slice(1, 9) === 'userName') {
      //     this.userName = item.slice(10)
      //   }
      //   if (item.slice(1, 8) === 'seatNum') {
      //     this.seatNum = item.slice(9)
      //   }
      // })
      if (!(this.userName && this.seatNum)) {
        alert('もう一度登録してください')
      } else {
        axios.post('/users/stepProject/getProgress', {seatNum: this.seatNum}).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.stepsNum = res.result
            this.progress = res.result
          }
        })
      }
    },
    Next () {
      if (this.progress > this.stepsNum) {
        this.stepsNum += 1
      } else {
        this.mdShow6 = true
        this.$refs.btn1.style.visibility = 'hidden'
        this.$refs.btn2.style.visibility = 'hidden'
        this.$refs.btn3.style.visibility = 'hidden'
      }
    },
    Return () {
      if (this.stepsNum <= 1) {
        this.mdShow3 = true
        return 0
      } else {
        this.stepsNum -= 1
      }
    },
    beforeDiscussion () {
      this.mdShow8 = true
      this.$refs.btn1.style.visibility = 'hidden'
      this.$refs.btn2.style.visibility = 'hidden'
      this.$refs.btn3.style.visibility = 'hidden'
    },
    noDiscussion () {
      this.mdShow8 = false
      this.$refs.btn1.style.visibility = 'visible'
      this.$refs.btn2.style.visibility = 'visible'
      this.$refs.btn3.style.visibility = 'visible'
    },
    Discussion () {
      this.mdShow8 = false
      var discussionChildList = this.progressList.filter((item) => {
        return item.progress >= this.progress
      })
      if (discussionChildList.length === 0) {
        this.mdShow4 = true
      } else {
        axios.post('/users/discussionChildListConfirm', {discussionChildList: discussionChildList}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.discussionPartner = res.result
            axios.post('/users/updateDiscussionList', {seatNum_teaching: this.discussionPartner.seatNum, seatNum_learning: this.seatNum}).then((response) => {
              let res = response.data
              if (res.status === '0') {
                console.log('discussionList updated')
                this.mdShow1 = true
              } else {
                console.log('discussionList updated failed (you are in discussionList now)')
                alert('ただいま，君は相談中です')
              }
            })
          } else {
            this.mdShow4 = true
          }
        })
      }
    },
    getImgAddr (imgAddr,url) {
      this.imgAddr = imgAddr
      this.url = url
    },
    ta () {
      this.mdShow4 = false
      axios.post('/users/callTA', {userName: this.userName, seatNum: this.seatNum}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('TAOK')
          axios.post('/users/updateDiscussionList', {seatNum_teaching: 'TA', seatNum_learning: this.seatNum}).then((response) => {
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
    goToTeach () {
      this.mdShow5 = false
      this.$router.push({path: '/childTeaching', query: {child_learning_Name: this.child_learning_Name}})
    },
    noCheck () {
      this.mdShow6 = false
      this.$refs.btn1.style.visibility = 'visible'
      this.$refs.btn2.style.visibility = 'visible'
      this.$refs.btn3.style.visibility = 'visible'
    },
    check () {
      this.mdShow6 = false
      var checkChildList = this.progressList
      axios.post('/users/checkChildListConfirm', {checkChildList: checkChildList}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.checkPartner = res.result
          this.checkPwd = res.msg
          axios.post('/users/updateCheckList', {seatNum_teaching: this.checkPartner.seatNum, seatNum_learning: this.seatNum}).then((response) => {
            let res = response.data
            if (res.status === '0') {
              console.log('checkList updated')
              this.$router.push({path: '/check', query: {checkPwd: this.checkPwd, checkPartnerSeatNum: this.checkPartner.seatNum, checkPartnerName: this.checkPartner.userName, seatNum: this.seatNum, stepsNum: this.stepsNum, progress: this.stepsNum, url: this.url}})
            } else {
              console.log('discussionList updated failed (you are in discussionList now)')
              alert('ただいま，君は相談中です')
            }
          })
        } else {
          this.mdShow4 = true
        }
      })
    },
    goToCheck () {
      this.mdShow7 = false
      this.$router.push({path: '/childChecking', query: {child_learning_seatNum: this.child_learning_seatNum, seatNum: this.seatNum, progress: this.child_learning_Progress}})
    }
  }
}
</script>

<style scoped>

</style>
