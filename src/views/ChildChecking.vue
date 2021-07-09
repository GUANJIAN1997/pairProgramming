<template>
  <div>
    <div class="infor">
      チェックしてほしい人の<ruby>席番号<rt>せきばんごう</rt>：{{child_learning_seatNum}}</ruby>
      チェックしてほしい人の<ruby>名前<rt>なまえ</rt>：{{child_learning_Name}}</ruby>
    </div>
    <div class="modal-container" :class="{'md-show': mdShow1}">
      <div class="md-infor">まず<ruby>項目<rt>こうもく</rt></ruby>をチェックしてください</div>
      <div class="btn-container">
        <button class="OK-btn" @click="function (){
            mdShow1 = false
            }">OK</button>
      </div>
    </div>
    <div class="checkPwd-input-container">
      <p style="font-size: 2rem">プログラムは以下の項目ができているかどうかを<ruby>確認<rt>かくにん</rt>してください</ruby></p>
      <div ref="step1" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step1_1">&emsp;クレーンを右上に&emsp;</div>
        <div><input style="transform: scale(2,2);" type="checkbox" value="2" v-model="step1_2">&emsp;星を右上に&emsp;&emsp;&emsp;&emsp;</div>
        <div><input style="transform: scale(2,2);" type="checkbox" value="3" v-model="step1_3">&emsp;景品を左下に&emsp;&emsp;&emsp;</div>
        <div><input style="transform: scale(2,2);" type="checkbox" value="3" v-model="step1_4">&emsp;受け取り口を右下に</div>
      </div>
      <div ref="step2" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step2_1">&emsp;スペースキーを押している間、クレーンが左に動くか？</div>
      </div>
      <div ref="step3" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step3_1">&emsp;スペースキーを離したあと、クレーンが下まで下がるか？</div>
      </div>
      <div ref="step4" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step4_1">&emsp;クレーンが下がったあと、上まで上がるか？</div>
      </div>
      <div ref="step5" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step5_1">&emsp;クレーンが星に触れたら、止まったか？</div>
      </div>
      <div ref="step6" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step6_1">&emsp;クレーンが下に下がった時、開けたか？&emsp;&emsp;&emsp;&emsp;</div>
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step6_2">&emsp;クレーンが下に着いた時、閉めたか？&emsp;&emsp;&emsp;&emsp;&emsp;</div>
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step6_3">&emsp;クレーンが星に触れた時、開けたか？&emsp;&emsp;&emsp;&emsp;&emsp;</div>
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step6_4">&emsp;クレーンが星に触れて、一秒間あと、閉めたか？</div>
      </div>
      <div ref="step7" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step7_1">&emsp;景品に触れたら、クレーンにつかまれたか？</div>
      </div>
      <div ref="step8" style="display: none; font-size: 2rem; margin: auto">
      <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step8_1">&emsp;クレーンが開けられたら、景品が落ちてくるか？</div>
      </div>
      <div ref="step9" style="display: none; font-size: 2rem; margin: auto">
        <div><input style="transform: scale(2,2);" type="checkbox" value="1" v-model="step9_1">&emsp;景品が取り出し口に落ちたら「ゲット」と言ったか？</div>
      </div>
      <div>チェックパスワードを<ruby>入力<rt>にゅうりょく</rt></ruby>してください</div>
      <input type="text" class="checkPwd-input" v-model="checkPwd">
      <div class="button-input-container">
        <button class="button-input" @click="OK"><ruby>入力<rt>にゅうりょく</rt></ruby></button>
        <button class="button-input" @click="Return"><ruby>戻<rt>もど</rt></ruby>る</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {prevent} from '../util/preventBrowserBack'
export default {
  name: 'ChildChecking',
  data () {
    return {
      checkPwd: '',
      child_learning_seatNum: '',
      child_learning_Name: '',
      progress: '',
      step1_1: '',
      step1_2: '',
      step1_3: '',
      step1_4: '',
      step2_1: '',
      step3_1: '',
      step4_1: '',
      step5_1: '',
      step6_1: '',
      step6_2: '',
      step6_3: '',
      step6_4: '',
      step7_1: '',
      step8_1: '',
      step9_1: '',
      mdShow1: ''
    }
  },
  mounted () {
    prevent()
    this.child_learning_seatNum = this.$route.query.child_learning_seatNum
    this.child_learning_Name = this.$route.query.child_learning_Name
    this.progress = this.$route.query.progress
    let progress = this.progress
    switch (progress) {
      case '1' :
        this.$refs.step1.style.display = 'block'
        break
      case '2':
        this.$refs.step2.style.display = 'block'
        break
      case '3':
        this.$refs.step3.style.display = 'block'
        break
      case '4':
        this.$refs.step4.style.display = 'block'
        break
      case '5':
        this.$refs.step5.style.display = 'block'
        break
      case '6':
        this.$refs.step6.style.display = 'block'
        break
      case '7':
        this.$refs.step7.style.display = 'block'
        break
      case '8':
        this.$refs.step8.style.display = 'block'
        break
      case '9':
        this.$refs.step9.style.display = 'block'
        break
    }
  },
  methods: {
    OK () {
      if ((this.step1_1 && this.step1_2 && this.step1_3 && this.step1_4) || this.step2_1 || this.step3_1 || this.step4_1 || this.step5_1 || (this.step6_1 && this.step6_2 && this.step6_3 && this.step6_4) || this.step7_1 || this.step8_1 || this.step9_1) {
        const child_learning_seatNum = this.child_learning_seatNum
        const progress = Number(this.$route.query.progress) + 1
        const seatNum = this.$route.query.seatNum
        axios.post('/users/submitCheckPwd', {child_learning_seatNum: child_learning_seatNum, checkPwd: this.checkPwd, progress: progress}).then((result) => {
          let res = result.data
          if (res.status === '0') {
            axios.post('/users/deleteCheckList', {seatNum_teaching: seatNum, seatNum_learning: child_learning_seatNum}).then((result) => {
              let res = result.data
              if (res.status === '0') {
                console.log('deleted')
              } else {
                console.log('failed')
              }
            })
            console.log('go to next successfully')
            this.$router.push({path: '/programming'})
          } else if (res.status === '2') {
            alert('チェックパスワードが違います,もう一度入力してください')
          }
        })
      } else {
        this.mdShow1 = true
      }
    },
    Return () {
      this.$router.push({path: '/programming'})
    }
  }
}

</script>

<style scoped>
.checkPwd-input-container {
  margin: 2rem;
  text-align: center;
}
.checkPwd-input {
  font-size: 2rem;
  width: 20rem;
  line-height: 2rem;
}
.button-input-container {
  text-align: center;
}
.button-input {
  margin: 2rem;
  font-size: 1.2rem;

}
</style>
