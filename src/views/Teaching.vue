<template>
  <div>
    <div style="font-size: 3rem; text-align: center"><div class="iconfont" style="display: inline-block; font-size: 5rem">&#xe61b;</div>指導中．．．</div>
    <div class="btn-container" style="position: absolute; top: 50%; left: 0rem; right: 0rem; bottom: 0rem; margin: auto ">
      <button class="Detail-btn" @click="finishTeaching">指導完了</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Teaching',
  methods: {
    finishTeaching () {
      this.$router.push({path: '/TA'})
    }
  }
}
</script>

<style scoped>

</style>
