<template>
    <div>
      <table>
        <tr>
          <th>席番号</th>
          <th>名前</th>
          <th>進捗</th>
        </tr>
        <tr v-for="item in progressList" :key="item.seatNum">
          <td>{{item.seatNum}}</td>
          <td>{{item.userName}}</td>
          <td>{{item.progress}}</td>
        </tr>
      </table>
    </div>
</template>

<script>
import axios from 'axios'
import '../assets/css/TA.css'
export default {
  name: 'TA',
  data () {
    return {
      InitSetInterval: '',
      progressList: []
    }
  },
  created () {
    if (this.InitSetInterval) {
      clearInterval(this.InitSetInterval)
    }
    this.test()
    this.InitSetInterval = setInterval(this.test, 2000)
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
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
