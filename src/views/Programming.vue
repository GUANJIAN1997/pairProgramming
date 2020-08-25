<template>
  <div>
    <Header>
      <span slot="steps">Step1</span>
    </Header>
    <div>
      <span>名前：{{userName}}</span>
      <span>席番号：{{seatNum}}</span>
    </div>
    programming
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'Programming.vue',
  components: {
    Header
  },
  data () {
    return {
      userName: '',
      seatNum: ''
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
    }
  }
}
</script>

<style scoped>

</style>
