<template>
  <div>
    <div style="font-size: 3rem; text-align: center"><div class="iconfont" style="display: inline-block; font-size: 5rem">&#xe61b;</div>指導中．．．</div>
    <div class="btn-container" style="position: absolute; top: 50%; left: 0rem; right: 0rem; bottom: 0rem; margin: auto ">
      <button class="Detail-btn" @click="finishTeaching">指導完了</button>
    </div>
  </div>

</template>

<script>
import {prevent} from '../util/preventBrowserBack'
import axios from 'axios'

export default {
  name: 'Teaching',
  mounted () {
    prevent()
  },
  methods: {
    finishTeaching () {
      axios.post('/users/deleteDiscussionList', {seatNum_teaching: 'TA', seatNum_learning: this.$route.query.seatNum}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('deleted')
        }
      })
      this.$router.push({path: '/TA'})
    }
  }
}
</script>

<style scoped>

</style>
