<template>
  <section class="mu-login-m">
    <div class="mu-login-m-wrapper">
      <div class="mu-login-m-logo">
        <img :src="logo" />
      </div>
      <h1 class="mu-login-m-title">{{ title }}</h1>
      <h4 class="mu-login-m-tip">请输入您的用户名和密码</h4>
      <el-form ref="formRef" class="mu-login-m-form" :model="model" :rules="rules">
        <el-form-item prop="userName">
          <el-input v-model="model.userName" placeholder="用户名">
            <template #prefix>
              <mu-icon name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="model.password" type="password" autocomplete="off" placeholder="密码">
            <template #prefix>
              <mu-icon name="lock" />
            </template>
          </el-input>
        </el-form-item>
        <div class="mu-login-m-verifycode">
          <div class="verifycode-input">
            <el-form-item prop="code">
              <el-input v-model="model.verifyCode.code" autocomplete="off" placeholder="验证码">
                <template #prefix>
                  <mu-icon name="adn"></mu-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>
          <div class="verifycode-img">
            <el-tooltip effect="dark" content="点击刷新" placement="top">
              <img :src="verifyCodeUrl" @click="refreshVerifyCode" />
            </el-tooltip>
          </div>
        </div>
        <el-form-item>
          <el-button class="mu-login-m-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
import { reactive, ref } from 'vue'
export default {
  name: 'LoginM',
  setup() {
    const { title, logo } = MkhUI.config.site
    const formRef = ref(null)
    const model = reactive({ username: '', password: '', verifyCode: { id: '', code: '' } })
    const rules = {
      userName: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'change',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'change',
        },
      ],
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'change',
        },
      ],
    }
    const verifyCodeUrl = ref()

    const { getVerifyCode } = MkhUI.config.actions

    //刷新验证码
    const refreshVerifyCode = () => {
      getVerifyCode().then(data => {
        verifyCodeUrl.value = data.base64String
        model.verifyCode.id = data.id
      })
    }
    refreshVerifyCode()

    return {
      title,
      logo,
      formRef,
      model,
      rules,
      verifyCodeUrl,
      refreshVerifyCode,
    }
  },
}
</script>
<style lang="scss">
.mu-login-m {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0) linear-gradient(to right, #667eea 0%, #764ba2 100%) repeat scroll 0 0;

  &-wrapper {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 15px auto;
    padding: 20px 50px 50px;
    width: 510px;
    background: #e1f0fc none repeat scroll 0 0;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: -1px;
      height: 0;
      width: 0;
      border-width: 0 255px 37px;
      border-color: transparent transparent #6d68cb;
      border-style: solid;
    }
  }

  &-logo {
    text-align: center;

    img {
      width: 50px;
    }
  }

  &-title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }

  &-tip {
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    color: #888888;
  }

  &-form {
    .el-input__inner {
      background-color: #fff !important;
    }

    .el-input__prefix {
      .mu-icon {
        position: relative;
        top: 2px;
        font-size: 17px;
        color: #888;
      }
    }
  }

  &-verifycode {
    position: relative;
    padding-right: 110px;

    .verifycode-img {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }

  &-btn {
    padding: 17px 20px;
    width: 100%;
    border-radius: 25px;
    background: rgba(0, 0, 0, 0) linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%) repeat scroll 0 0;
    color: #fff;

    &:hover,
    &:active,
    &:focus {
      background: #333;
      color: #fff;
    }
  }
}
</style>
