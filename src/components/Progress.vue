<template>
  <div>
    <div class="progress-container">
      <div class="progress-title">ともだちの<ruby>進度<rt>しんど</rt></ruby></div>
      <div>
        <table class="table-style">
          <tr>
            <th><ruby>席番号<rt>せきばんごう</rt></ruby></th>
            <th><ruby>名前<rt>なまえ</rt></ruby></th>
            <th>ステップ</th>
          </tr>
          <tr v-for="item in progressListAfter" :key="item.seatNum" style="text-align: center">
            <td>{{item.seatNum}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.progress}}</td>
          </tr>
        </table>
      </div>
    </div>

  </div>

</template>

<script>
import '../assets/css/progress.css'
export default {
  name: 'Progress',
  props: ['progressList'],
  watch: {
    progressList: function () {
      return this.filter()
    }
  },
  data () {
    return {
      progressListAfter: []
    }
  },
  mounted () {
    this.filter()
  },
  methods: {
    deepClone (obj) {
      if (typeof obj !== 'object' || obj == null) {
        return obj
      }
      var res
      if (obj instanceof Array) {
        res = []
      }else {
        res = {}
      }
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          res[i] = this.deepClone(obj[i])
        }
      }
      return res
    },
    filter () {
      this.progressListAfter = this.deepClone(this.progressList)
      for(let item of this.progressListAfter) {
        if (item.progress > 9) {
          item.progress = '完成'
        }
      }
    }
  }
}

</script>

<style scoped>

</style>
