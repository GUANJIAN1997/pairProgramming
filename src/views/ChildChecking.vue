<template>
  <div class="checkPwd-input-container">
    <div>チェックパスワードを<ruby>入力<rt>にゅうりょく</rt></ruby>してください</div>
    <input type="text" class="checkPwd-input" v-model="checkPwd">
    <div class="button-input-container">
      <button class="button-input" @click="OK"><ruby>入力<rt>にゅうりょく</rt></ruby></button>
      <button class="button-input" @click="Return"><ruby>戻<rt>もど</rt></ruby>る</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChildChecking',
  data () {
    return {
      checkPwd: ''
    }
  },
  methods: {
    OK () {
      const child_learning_seatNum = this.$route.query.child_learning_seatNum
      const progress = Number(this.$route.query.progress) + 1
      const seatNum = this.$route.query.seatNum
      axios.post('/users/submitCheckPwd', {child_learning_seatNum: child_learning_seatNum, checkPwd: this.checkPwd, progress: progress}).then((result) => {
        let res = result.data
        if (res.status === '0') {
          axios.post('/users/deleteCheckList', {seatNum_teaching: seatNum, seatNum_learning: child_learning_seatNum}).then((result) => {
            let res = result.data
            if (res.status === '0') {
              console.log('deleted')
            } else {
              console.log('failed')
            }
          })
          console.log('go to next successfully')
          this.$router.push({path: '/programming'})
        } else if (res.status === '2') {
          alert('チェックパスワードが違います,もう一度入力してください')
        }
      })
    },
    Return () {
      this.$router.push({path: '/programming'})
    }
  }
}

</script>

<style scoped>
.checkPwd-input-container {
  margin: 2rem;
  text-align: center;
}
.checkPwd-input {
  font-size: 2rem;
  width: 20rem;
  line-height: 2rem;
}
.button-input-container {
  text-align: center;
}
.button-input {
  margin: 2rem;
  font-size: 1.2rem;

}
</style>
