<template>
  <div>
      <div>
        <span>名前：{{userName}}</span>
        <span>席番号：{{seatNum}}</span>
      </div>
    <div class="questionnaire-box">
      <h2>性格アンケート</h2>
      <ul class="questionnaire-content">
        <li>
          おしゃべりな子供ですか？
          <div class="questionnaire-A">
            <input type="radio" name="talkative" value="yes" v-model="talkative" >はい
            &nbsp;&nbsp;
            <input type="radio" name="talkative" value="no" v-model="talkative">いいえ
          </div>
        </li>
        <li>
          プログラミング好きですか？
          <div class="questionnaire-A">
            <input type="radio" name="like" value="yes" v-model="like" >はい
            &nbsp;&nbsp;
            <input type="radio" name="like" value="no" v-model="like">いいえ
          </div>
        </li>
      </ul>
      <div class="login-btn">
        <button @click="submit">提出</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../assets/css/questionnaire.css'
import '../assets/css/login.css'
export default {
  name: 'Questionnaire',
  data () {
    return {
      talkative: '',
      like: '',
      userName: '',
      seatNum: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    submit () {
      if (this.talkative && this.like) {
        var params = {talkative: this.talkative, like: this.like}
        axios.post('/users/questionnaire', params).then((response) => {
          let res = response.data
          if (res.status === '0') {
            alert('アンケート提出完了')
            this.$router.push({path: '/programming'})
          } else {
            console.log(res.msg)
          }
        })
      } else {
        alert('入力不完全')
      }
    },
    init () {
      document.cookie.split(';').map((item) => {
        if (item.slice(1, 9) === 'userName') {
          this.userName = item.slice(10)
        }
        if (item.slice(1, 8) === 'seatNum') {
          this.seatNum = item.slice(9)
        }
      })
      if (!(this.userName && this.seatNum)) {
        alert('もう一度登録してください')
      }
    }
  }
}
</script>

<style scoped>

</style>
