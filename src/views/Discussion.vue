<template>
  <div>
    <div class="discussion-container">
      <div class="discussion-title">
        {{this.discussionPartner}}と{{this.userName}}ディスカッション中
      </div>

      <img class="img" :src="'/static/' + imgAddr">
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
      this.getImg()
    },
    methods: {
      getImg () {
        this.imgAddr = this.$route.query.imgAddr
        this.userName = this.$route.query.userName
        this.discussionPartner = this.$route.query.discussionPartner
      }
    }
  }
</script>

<style scoped>

</style>

