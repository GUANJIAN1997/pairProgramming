<template>
  <div>
    <div class="discussion-container">
      <div class="discussion-title">
        {{this.discussionPartner}}と{{this.userName}}ディスカッション中
      </div>

      <img class="img" :src="'/static/' + imgAddr">
    </div>
    <div class="btn-container">
      <button type="button" @click.stop="discussionEnd" class="button1">完了</button>
    </div>
  </div>

</template>

<script>
  import '../assets/css/discussion.css'
  import axios from 'axios'
  export default {
    name: 'Discussion.vue',
    data () {
      return {
        imgAddr: '',
        userName: '',
        discussionPartner: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.imgAddr = this.$route.query.imgAddr
        this.userName = this.$route.query.userName
        this.discussionPartner = this.$route.query.discussionPartner
      },
      discussionEnd () {
        this.$router.push({path:"/feedback"})
      }
    }
  }
</script>

<style scoped>

</style>

