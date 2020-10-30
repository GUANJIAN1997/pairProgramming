<template>
  <div class="handwriting-board" :class="direction" style="position: fixed">
    <div class="handle-box">
      <div class="color-box">
        <div v-for="(item, index) in colors" :key="index" class="color-item" :class="{active:item.active}" :style="{background:item.color}" @click="clickColorItem(item)"></div>
      </div>
      <button @click="clickReset">クリア</button>
      <button @click="clickFinish"><ruby>相談<rt>そうだん</rt></ruby><ruby>画面<rt>がめん</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る</button>
    </div>
    <div class="board-box">
      <canvas ref="boardCanvas" :width="canvasWidth" :height="canvasHeight" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"></canvas>
    </div>
  </div>
</template>

<script>
import '../assets/css/handwritingBoard.css'
export default {
  name: 'ChildTeaching',
  mounted () {
    this.initCanvas()
  },
  data () {
    return {
      direction: 'horizontal', // 画板方向 vertical horizontal
      colors: [
        { color: 'black', active: true },
        { color: 'red', active: false },
        { color: 'blue', active: false }
      ], // 可选颜色
      ctx: '', // canvas对象
      canvasWidth: '', // canvas宽度
      canvasHeight: '', // canvas高度
      lineColor: 'black', // 线条的颜色
      lineWidth: 3, // 线条宽度
      filePath: '' // 生成的图片地址,
    }
  },
  methods: {
    /**
     * 初始化画板，获取canvas节点对象，设置画板的宽高
     * 不能在此方法中设置线条宽度样式，否则无效
     */
    initCanvas () {
      // 获取到当前canvas节点的信息，包含宽，高，top，left等
      var boardCanvas = this.$refs.boardCanvas // 获取canvas元素
      this.canvasWidth = boardCanvas.offsetWidth // 设置画板宽度
      this.canvasHeight = boardCanvas.offsetHeight // 设置画板高度
      // canvas基础设置，线条设置
      this.ctx = boardCanvas.getContext('2d')
      this.ctx.beginPath()
    },
    /**
     * 绘制笔触
     */
    handleDraw (targetX, targetY) {
      this.ctx.lineTo(targetX, targetY) // 将笔触移到当前点击点
      this.ctx.stroke()
    },
    /**
     * 触摸开始
     * 获取当前点击点的坐标
     * 设置线条颜色，宽度，样式等
     */
    onTouchStart (e) {
      let offsetLeft = e.target.offsetLeft // 获取canvas距离页面左边的距离
      let offsetTop = e.target.offsetTop // 获取canvas距离页面顶部的距离
      let targetX = e.touches[0].clientX - offsetLeft
      let targetY = e.touches[0].clientY - offsetTop
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.lineColor // 设置线条颜色
      this.ctx.lineWidth = this.lineWidth // 设置线条的宽度
      this.ctx.lineCap = 'round' // 设置线条的端点的样式，设为圆弧形
      this.ctx.lineJoin = 'round' // 设置线条的连接点的样式，设为弧形
      this.handleDraw(targetX, targetY)
    },
    /**
     * 触摸过程中
     * 获取并计算当前点击点的坐标，绘制线条
     */
    onTouchMove (e) {
      let offsetLeft = e.target.offsetLeft // 获取canvas距离页面左边的距离
      let offsetTop = e.target.offsetTop // 获取canvas距离页面顶部的距离
      let targetX = e.touches[0].clientX - offsetLeft
      let targetY = e.touches[0].clientY - offsetTop
      this.handleDraw(targetX, targetY)
    },
    /**
     * 触摸结束
     */
    onTouchEnd (e) {},
    /**
     * 颜色模块点击事件，切换点击的颜色状态
     */
    clickColorItem (e) {
      this.colors.forEach(item => {
        item.active = false
      })
      e.active = true
      this.lineColor = e.color // 设置当前笔触颜色
    },
    /**
     * 重写按钮点击事件，清空画板内容
     */
    clickReset () {
      // 清空画板
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      // 重新设置canvas画板节点对象，否则绘画会出问题,这里异步操作，否则绘画有误
      setTimeout(() => {
        this.initCanvas()
      }, 100)
    },
    clickFinish () {
      this.$router.push({path: '/programming'})
    }
  }
}
</script>

<style scoped>

</style>
