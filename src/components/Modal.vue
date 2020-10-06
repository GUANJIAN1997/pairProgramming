<template>
  <div class="modal-container" :class="{'md-show': mdShow}">
    <div class="md-infor">ディスカッションする子供の情報</div>
    <div class="md-infor">席番号: {{discussionPartner.seatNum}}</div>
    <div class="md-infor">名前: {{discussionPartner.userName}}</div>
    <div class="btn-container">
      <button class="OK-btn" @click="discussionScreen">OK</button>
    </div>
  </div>
</template>

<script>
import '../assets/css/modal.css'
export default {
  name: 'modal',
  props: ['discussionPartner', 'mdShow', 'imgAddr', 'userName', 'stepsNum'],
  methods: {
    discussionScreen () {
      this.$emit('close')
      this.$router.push({path: '/discussion', query: {imgAddr: this.imgAddr, discussionPartner: this.discussionPartner.userName, userName: this.userName, stepsNum: this.stepsNum}})
    }
  }
}
</script>

<style scoped>

</style>
