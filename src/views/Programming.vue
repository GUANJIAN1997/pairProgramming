<template>
  <div>
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
      <button type="button" @click.stop="Return" class="button1"><ruby>前<rt>まえ</rt></ruby>のステップ</button>
      <button type="button" @click.stop="Discussion" class="button2"><ruby>相談<rt>そうだん</rt></ruby>する</button>
      <button type="button" @click.stop="Next" class="button3"><ruby>次<rt>つぎ</rt></ruby>のステップ</button>
    </div>

    <Modal :discussionPartner="discussionPartner" :mdShow="mdShow1" :imgAddr="imgAddr" :userName="userName" :stepsNum="stepsNum" :seatNum="seatNum" @close="mdShow2 = false"></Modal>
    <div class="modal-container" :class="{'md-show': mdShow2}">
      <div class="md-infor">これが<ruby>最後<rt>さいご</rt></ruby>のステップです<br><ruby>課題<rt>かだい</rt></ruby>は<ruby>全部<rt>ぜんぶ</rt></ruby>できましたか？</div>
      <div class="btn-container">
        <button class="OK-btn" @click="end">はい</button>
        <button class="OK-btn" @click="mdShow2 = false">いいえ</button>
      </div>
    </div>
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
      <div class="md-infor"><ruby>君<rt>きみ</rt></ruby>の<ruby>助<rt>たす</rt></ruby>けがほしいともだち：</div>
      <div class="md-infor"><ruby>席番号<rt>せきばんごう</rt></ruby>: {{child_learning_seatNum}}</div>
      <div class="md-infor"><ruby>名前<rt>なまえ</rt></ruby>: {{child_learning_Name}}</div>
      <div class="btn-container">
        <button class="OK-btn" @click="goToTeach">OK</button>
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
      stepsNum: null,
      mdShow1: false,
      mdShow2: false,
      mdShow3: false,
      mdShow4: false,
      mdShow5: false,
      imgAddr: '',
      InitSetInterval: '',
      discussionPartner: {},
      progressList: [],
      child_learning_seatNum: '',
      child_learning_Name: ''
    }
  },
  created () {
    this.test()
    this.InitSetInterval = setInterval(this.test, 2000)
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
          let discussionList = res.msg
          for (let i = 0; i < discussionList.length; i += 2) {
            if (discussionList[i] === this.seatNum) {
              this.child_learning_seatNum = discussionList[i + 1]
              this.mdShow5 = true
              break
            }
          }
          for (let item of this.progressList) {
            if (item.seatNum === this.child_learning_seatNum) {
              this.child_learning_Name = item.userName
              console.log(item)
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
          }
        })
      }
    },
    Next () {
      if (this.stepsNum >= 3) {
        this.mdShow2 = true
        return 0
      } else {
        this.stepsNum += 1
        axios.post('/users/stepProject/updateProgress', {seatNum: this.seatNum, progress: this.stepsNum}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('進捗更新成功')
          }
        })
      }
    },
    Return () {
      if (this.stepsNum <= 1) {
        this.mdShow3 = true
        return 0
      } else {
        this.stepsNum -= 1
        axios.post('/users/stepProject/updateProgress', {seatNum: this.seatNum, progress: this.stepsNum}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('進捗更新成功')
          }
        })
      }
    },
    Discussion () {
      var stepsNum = this.stepsNum
      var discussionChildList = this.progressList.filter((item) => {
        return item.progress >= stepsNum
      })
      if (discussionChildList.length === 0) {
        this.mdShow4 = true
      } else if (discussionChildList.length === 1) {
        console.log('有一个可以讨论的孩子')
        axios.post('/users/discussionChildListConfirm', {discussionChildList: discussionChildList}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.discussionPartner = res.result
            this.mdShow1 = true
          } else {
            this.mdShow4 = true
          }
        })
      } else {
        axios.post('/users/discussionChildListConfirm', {discussionChildList: discussionChildList}).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.discussionPartner = res.result
            this.mdShow1 = true
          } else {
            this.mdShow4 = true
          }
        })
      }
    },
    getImgAddr (imgAddr) {
      this.imgAddr = imgAddr
    },
    end () {
      this.$router.push({path: '/questionnaire'})
    },
    ta () {
      this.mdShow4 = false
      axios.post('/users/callTA', {userName: this.userName, seatNum: this.seatNum}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('TAOK')
        } else {
          console.log('すでに呼んだ')
        }
      })
    },
    goToTeach () {
      this.mdShow5 = false
      this.$router.push({path: '/childTeaching'})
    }
  }
}
</script>

<style scoped>

</style>
