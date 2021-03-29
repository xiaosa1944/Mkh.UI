<template>
  <section class="mu-login-k">
    <a href="#" class="mu-login-k-logo">
      <img :src="logo" class="mu-login-k-logo-img" />
      <span class="mu-login-k-logo-title">{{ title }}</span>
    </a>
    <div class="mu-login-k-left">
      <img src="./login-bg.svg" class="mu-login-k-bg" />
    </div>
    <div class="mu-login-k-right">
      <div class="mu-login-k-box">
        <h1 class="mu-login-k-title">{{ title }}</h1>
        <h4 class="mu-login-k-tip">请输入您的用户名和密码</h4>
        <el-form ref="formRef" class="mu-login-k-form" :model="model" :rules="rules" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" placeholder="用户名" clearable>
              <template #prefix>
                <mu-icon name="user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" placeholder="密码" clearable>
              <template #prefix>
                <mu-icon name="lock" />
              </template>
            </el-input>
          </el-form-item>
          <mu-verifycode-input v-model="model.verifyCode.code" v-model:id="model.verifyCode.id" label="验证码" />
          <el-form-item>
            <el-button class="mu-login-k-btn" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script>
import { reactive } from 'vue'
import useLogin from '../../composables/useLogin'
export default {
  name: 'LoginK',
  setup() {
    const model = reactive({ username: '', password: '', verifyCode: { id: '', code: '' } })
    const { title, logo } = MkhUI.config.site
    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      ],
      'verifyCode.code': [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        },
      ],
    }
    const { loading, formRef, tryLogin } = useLogin(model)

    return {
      title,
      logo,
      formRef,
      model,
      rules,
      loading,
      tryLogin,
    }
  },
}
</script>
<style lang="scss">
.mu-login-k {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;

  &-logo {
    position: absolute;
    top: 20px;
    left: 20px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: #333;
    font-size: 25px;
    z-index: 10;

    &-img {
      margin-right: 7px;
      float: left;
      width: 40px;
    }
  }

  &-left {
    position: relative;
    flex-grow: 1;
    padding: 50px;
    background-color: #f8f8f8;
  }

  &-right {
    position: relative;
    flex-shrink: 0;
    width: 650px;
    background-color: #f8fcf8;
  }

  &-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 700px;
    transform: translateX(-50%) translateY(-50%);
  }

  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  &-title {
    font-size: 22px;
    font-weight: bold;
  }

  &-tip {
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

  &-btn {
    padding: 12px 20px;
    width: 100%;
    border-radius: 5px;
    background: #7064f0;
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
