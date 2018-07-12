<style lang="scss" scoped>
.login-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -235px;
  margin-top: -265px;
  width: 470px;
  height: 431px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
  .head {
    padding: 20px 0px 20px 0px;
    border-bottom: 1px solid #edf0fa;
    img {
      max-width: 113px;
    }
  }
  .body {
    width: 310px;
    height: 300px;
    margin: 0 auto;
    padding-top: 30px;
  }
  .err {
    font-size: 12px;
    text-align: left;
    color: red;
  }
  .login-line {
    height: 55px;
    .username,
    .password {
      color: #666666;
      font-size: 12px;
      border-radius: 2px;
      height: 35px;
    }
    .login-btn {
      background-color: #36af89;
      border-color: #36af89;
      line-height: 0;
      border-radius: 2px;
      font-size: 12px;
      color: #fff;
      height: 36px;
      padding: 10px 15px;
      width: 100%;
    }
  }
  .login-captcha {
    height: 60px;
    .hide {
      position: absolute;
    }
  }
}
</style>

<template>
  <div class="login-wrap">
    <div class="head">
      <img :src="yiyeLogo" alt="">
    </div>
    <div class="body">
      <div class="login-line">
        <el-input class="username" v-model="username" @input="usernameValidate" placeholder="用户名"></el-input>
        <div class="err">{{usernameErrMsg}}</div>
      </div>
      <div class="login-line">
        <el-input class="password" v-model="password" @input="passwordValidate" placeholder="密码"></el-input>
        <div class="err">{{passwordErrMsg}}</div>
      </div>
      <div class="login-captcha">
        <!-- <el-input type="hidden" v-model="luotestResponse" class="hide"></el-input> -->
        <div class="l-captcha" data-site-key="54fb2db08556751b513acb9732f656ef" data-width="310px" data-callback="getResponse"></div>
        <div class="err">{{luotestResponseErrMsg}}</div>
      </div>
      <div class="login-line">
        <el-button class="login-btn" type="primary" @click="submitForm">登陆</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import yiyeLogo from '@/assets/iconfont/yiye-ai.svg'
import { mapActions } from 'vuex'
// import api from '@/helpers/call_api'
export default {
  data() {
    return {
      username: 'admin@6ceng.com',
      password: '111111',
      yiyeLogo,
      usernameErrMsg: '',
      passwordErrMsg: '',
      luotestResponseErrMsg: ''
    }
  },
  created() {
    const luosimao = `<script id="luosimao-script" src="https://captcha.luosimao.com/static/dist/api.js" type="text/javascript"><\/script>`
    $('body').append(luosimao)
    window.getResponse = this.successResponse
  },
  destroyed() {
    $('#luosimao-script').remove()
    if ($('div[id^="l-captcha-float"]')[0]) {
      $('div[id^="l-captcha-float"]')[0].remove()
    }
  },
  methods: {
    ...mapActions({
      fillLogin: 'fillLogin'
    }),
    successResponse(...args) {
      this.luotestResponse = args[0]
    },
    submitForm() {
      let storage = window.localStorage
      if (!this.usernameValidate() || !this.passwordValidate() || !this.luotestResponse) {
        return false
      }
      const formData = {
        username: this.username,
        password: this.password,
        loutest_response: this.luotestResponse,
        remember: ''
      }
      this.fillLogin({formData}).then(res => {
        storage['jwtToken'] = res.jwtToken
        this.$router.push({
          name: 'overview'
        })
      })
    },
    usernameValidate() {
      if (!this.username.trim()) {
          this.usernameErrMsg = '请输入用户名'
          return false
        }
        this.usernameErrMsg = ''
        return true
    },
    passwordValidate() {
      if (!this.password.trim()) {
        this.passwordErrMsg = '请输入密码'
        return false
      }
      this.passwordErrMsg = ''
      return true
    }
  }
}
</script>
