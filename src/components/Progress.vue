<template>
  <div>
    <div class="progress-container">
      <div class="progress-title">ステップ課題の進捗</div>
      <ul class="list">
        <li>席番号  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名前    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;進捗</li>
        <li v-for="(item, index) in progressList" :key="item.seatNum" >
          {{item.seatNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.userName }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.progress}}
        </li>
      </ul>
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
