<template>
  <div>
    <div>指導中．．．</div>
    <div class="btn-container">
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
