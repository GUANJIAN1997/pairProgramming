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
          <tr v-for="item in progressList" :key="item.seatNum" style="text-align: center">
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
  props: ['progressList']

}
</script>

<style scoped>

</style>
