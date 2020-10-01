<template>
  <div>
    <div class="steps-container">
      <div class="title">
        <slot name="steps"></slot>
      </div>

        <img class="img" :src="'/static/' + imgAddr">

    </div>
  </div>

</template>

<script>
import '../assets/css/stepProject.css'
import axios from 'axios'
export default {
  name: 'StepProject.vue',
  props: ['stepsNum'],
  watch: {
    stepsNum: function () {
      return this.getImg()
    }
  },
  data () {
    return {
      imgAddr: ''
    }
  },
  mounted () {
    this.getImg()
  },
  methods: {
    getImg () {
      var param = {stepsNum: this.stepsNum}
      axios.get('/users/stepProject',{params: param}).then((result) => {
        let res = result.data
        if (res.status === '0') {
          this.imgAddr = res.result
        } else {
          console.log(res.msg)
        }
      })
    }
  }
 }
</script>

<style scoped>

</style>
