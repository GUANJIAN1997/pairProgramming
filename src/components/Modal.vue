<template>
  <div class="modal-container" :class="{'md-show': mdShow}">
    <div class="md-infor"><ruby>相談<rt>そうだん</rt></ruby>する<ruby>友達<rt>ともだち</rt></ruby></div>
    <div class="md-infor"><ruby>席番号<rt>せきばんごう</rt></ruby>: {{discussionPartner.seatNum}}</div>
    <div class="md-infor"><ruby>名前<rt>なまえ</rt></ruby>: {{discussionPartner.userName}}</div>
    <div class="btn-container">
      <button class="OK-btn" @click="discussionScreen">OK</button>
    </div>
  </div>
</template>

<script>
import '../assets/css/modal.css'
export default {
  name: 'modal',
  props: ['discussionPartner', 'mdShow', 'userName', 'progress', 'seatNum'],
  methods: {
    discussionScreen () {
      this.$emit('close')
      this.$router.push({path: '/discussion', query: {discussionPartner: this.discussionPartner.userName, userName: this.userName, progress: this.progress, seatNum_teaching: this.discussionPartner.seatNum, seatNum_learning: this.seatNum}})
    }
  }
}
</script>

<style scoped>

</style>
