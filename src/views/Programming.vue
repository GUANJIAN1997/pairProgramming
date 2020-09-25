<template>
  <div>
    <div class="infor">
      <span>名前：{{userName}}</span>
      <span>席番号：{{seatNum}}</span>
    </div>
    <step-project :stepsNum="stepsNum">
      <span slot="steps" class="stepNum">{{'ステップ'+stepsNum}}</span>
    </step-project>
    <div class="next-step-btn">
      <button type="button" @click.stop="next">次のステップ</button>
    </div>
  </div>
</template>

<script>
import StepProject from '../components/StepProject'
export default {
  name: 'Programming.vue',
  components: {
    StepProject
  },
  data () {
    return {
      userName: '',
      seatNum: '',
      stepsNum: 2
    }
  },
  computed: {
    stepsNum : function () {
      return this.stepsNum
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      document.cookie.split(';').map((item) => {
        if (item.slice(1, 9) === 'userName') {
          this.userName = item.slice(10)
        }
        if (item.slice(1, 8) === 'seatNum') {
          this.seatNum = item.slice(9)
        }
      })
      if (!(this.userName && this.seatNum)) {
        alert('もう一度登録してください')
      }
    },
    next () {
      this.stepsNum += 1
    }
  }
}
</script>

<style scoped>

</style>
