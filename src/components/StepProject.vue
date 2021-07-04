<template>
  <div>
    <div class="steps-container">
      <div class="title">
        <slot name="steps"></slot>
      </div>
        <div><img class="img" :src="'static/' + imgAddr"></div>

        <div style="text-align: center">
          <video ref="video" width="45%" controls autoplay>
<!--          <source  type="video/mp4">-->
          </video>
        </div>
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
      imgAddr: '',
      url: ''
    }
  },
  mounted () {
    this.getImg()
  },
  methods: {
    getImg () {
      var param = {stepsNum: this.stepsNum}
      if (this.stepsNum) {
        axios.get('/users/stepProject', {params: param}).then((result) => {
          let res = result.data
          if (res.status === '0') {
            this.imgAddr = res.result[0]
            this.$refs.video.style.display = 'inline'
            if (res.result[1]) {
              this.url = res.result[1]
            } else {
              this.$refs.video.style.display = 'none'
            }
            this.$refs.video.src = this.url
            console.log(this)
            this.$emit('getImgAddr', this.imgAddr, this.url)
          } else {
            console.log(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
