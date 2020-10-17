<template>
  <div>
    <div class="progress-container">
      <div class="progress-title">ステップ課題の進捗</div>
      <div>
        <table style="font-size: 2rem; margin: auto; margin-top: 2rem">
          <tr>
            <th>席番号</th>
            <th>名前</th>
            <th>進捗</th>
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
