<template>
  <div>
    <div class="infor">
      <span>名前：{{userName}}</span>
      <span>席番号：{{seatNum}}</span>
    </div>
    <div class="container">

        <step-project :stepsNum="stepsNum">
          <span slot="steps" class="stepNum">{{'ステップ'+stepsNum}}</span>
        </step-project>


      <Progress :progressList="progressList"></Progress>

    </div>



    <div class="btn-container">
      <button type="button" @click.stop="Return" class="button1">前に戻る</button>
      <button type="button" @click.stop="Discussion" class="button2">ディスカッション</button>
      <button type="button" @click.stop="Next" class="button3">次のステップ</button>
    </div>


    <Modal :discussionPartner="discussionPartner" :mdShow="mdShow" @close="closeModal"></Modal>
  </div>
</template>

<script>
import StepProject from '../components/StepProject'
import Progress from '../components/Progress'
import Modal from '../components/Modal'
import '../assets/css/programming.css'
import axios from 'axios'
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
      mdShow: false,
      discussionPartner: {},
      progressList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var reg1 = new RegExp(`userName=([^;]*)`,'i');
      var reg2 = new RegExp(`seatNum=([^;]*)`,'i');
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
        axios.post('/users/stepProject/getProgress',{seatNum: this.seatNum}).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.stepsNum = res.result
          }
        })
      }
      axios.get('/users/stepProject/getOthersProgress').then((response) => {
        let res = response.data
        if (res.status === '0') {
          res.result.sort(function (a,b) {
            return b.progress - a.progress
          })
          this.progressList = res.result
        }
      })
    },
    Next () {
      if (this.stepsNum >=3) {
        return function (stepsNum) {
          alert(stepsNum+'は最後の課題ですよ！')
        }(this.stepsNum)
      } else {
        this.stepsNum += 1
        axios.post('/users/stepProject/updateProgress',{seatNum: this.seatNum, progress: this.stepsNum}).then((response)=>{
          let res = response.data
          if (res.status === '0') {
            console.log('進捗更新成功')
          }
        })
      }
    },
    Return () {
      if (this.stepsNum <= 1) {
        return function(stepsNum){
          alert(stepsNum+'は最初の課題ですよ')
        }(this.stepsNum)
      } else {
        this.stepsNum -=1
        axios.post('/users/stepProject/updateProgress',{seatNum: this.seatNum, progress: this.stepsNum}).then((response)=>{
          let res = response.data
          if (res.status === '0') {
            console.log('進捗更新成功')
          }
        })
      }
    },
    Discussion () {
      var stepsNum = this.stepsNum
      this.discussionPartner = this.progressList.filter((item) => {
       return  item.progress >= stepsNum
      }).sort(function (a,b) {
        return a.discussionTimes - b.discussionTimes
      })[0]
      this.mdShow = true
    },
    closeModal () {
      this.mdShow = false
    }
  }
}
</script>

<style scoped>

</style>
