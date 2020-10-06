<template>
 <div>
   <div class="login-box">
     <div class="login-title">
       <h1>
         学習支援システム
       </h1>
     </div>
           <!-- 席番号 -->
           <div class="input">
                 <span class="input-name">席番号</span><input type="text" class="input-content" v-model="seatNum">
           </div>

           <!-- 名前 -->
          <div class="input">
              <span class="input-name">名前</span><input type="text" class="input-content" v-model="userName">
           </div>
          <!-- パスワード -->
          <div class="input">
             <span class="input-name">パスワード</span><input type="password" class="input-content" v-model="userPwd">
          </div>

           <!-- 性別 -->
           <div class="input-select">
              <input type="radio" name="gender" value="male" v-model="gender">男性
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" name="gender" value="female" v-model="gender">女性
           </div>

           <!-- 登録ボタン -->
           <div class="login-btn">
               <button type="button" @click.stop="login">登録</button>
           </div>
       </div>
 </div>
</template>

<script>
import '../assets/css/login.css'
import axios from 'axios'
export default {
  name: 'login.vue',
  data () {
    return {
      seatNum: '',
      userName: '',
      userPwd: '',
      gender: ''
    }
  },
  methods: {
    login () {
      if (this.seatNum && this.userName && this.userPwd && this.gender) {
        var params = {seatNum: this.seatNum, userName: this.userName, userPwd: this.userPwd, gender: this.gender}
        axios.post('/users', params).then((response) => {
          let res = response.data
          if (res.status === '0') {
            alert('登録成功')
            this.$router.push({
              path: '/questionnaire'
            })
          } else {
            alert('パスワードが違います')
          }
        })
      } else {
        alert('入力不完全')
      }
    }
  }
}
</script>

<style scoped>

</style>
