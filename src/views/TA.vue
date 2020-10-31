<template>
    <div>
      <div class="container">
        <div class="TA-title">児童進捗管理</div>
      <table class="TA-table">
        <tr class="TA-tr">
          <th class="TA-th">席番号</th>
          <th class="TA-th">名前</th>
          <th class="TA-th">進捗</th>
        </tr>
        <tr v-for="item in progressList" :key="item.seatNum" class="TA-tr">
          <td class="TA-td">{{item.seatNum}}</td>
          <td class="TA-td">{{item.userName}}</td>
          <td class="TA-td">{{item.progress}}</td>
        </tr>
      </table>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow1}">
        <div class="md-infor">児童がサポーターを呼んでいます</div>
        <div class="btn-container">
          <button class="Detail-btn" @click="getWaitList">児童の情報をみる</button>
        </div>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow2}">
          <div class="md-infor">サポーターを呼ぶ児童</div>
          <div class="md-infor">席番号: {{seatNum}}</div>
          <div class="md-infor">名前: {{childName}}</div>
          <div class="btn-container">
            <button class="OK-btn" @click="OK">OK</button>
          </div>
      </div>
      <div class="modal-container" :class="{'md-show': mdShow3}">
        <div class="md-infor">他のサポーターが行きました</div>
        <div class="btn-container">
          <button class="Detail-btn" @click="mdShow3 = false">了解</button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import '../assets/css/TA.css'
import {prevent} from '../util/preventBrowserBack'
export default {
  name: 'TA',
  data () {
    return {
      InitSetInterval1: '',
      InitSetInterval2: '',
      mdShow1: false,
      mdShow2: false,
      mdShow3: false,
      childName: '',
      seatNum: '',
      progressList: []
    }
  },
  created () {
    this.getAllProgress()
    this.InitSetInterval1 = setInterval(this.getAllProgress, 2000)
    this.waitListConfirm()
    this.InitSetInterval2 = setInterval(this.waitListConfirm, 2000)
  },
  mounted () {
    prevent()
  },
  destroyed () {
    clearInterval(this.InitSetInterval1)
    clearInterval(this.InitSetInterval2)
  },
  methods: {
    getAllProgress () {
      axios.get('/users/getAllProgress').then((response) => {
        let res = response.data
        if (res.status === '0') {
          res.result.sort(function (a, b) {
            return b.progress - a.progress
          })
          this.progressList = res.result
        }
      })
    },
    waitListConfirm () {
      axios.post('/users/waitListConfirm').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.mdShow1 = true
        }
      })
    },
    getWaitList () {
      axios.get('/users/getWaitList').then((response) => {
        let res = response.data
        this.mdShow1 = false
        if (res.status === '0' && res.result) {
          this.childName = res.result.userName
          this.seatNum = res.result.seatNum
          this.mdShow2 = true
        } else {
          this.mdShow3 = true
        }
      })
    },
    OK () {
      this.mdShow2 = false
      this.$router.push({path: '/TA/teaching', query: {seatNum: this.seatNum}})
    }
  }
}
</script>

<style scoped>

</style>
