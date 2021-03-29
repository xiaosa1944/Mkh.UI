<template>
  <section class="mu-login-h">
    <div class="mu-login-h-wrapper">
      <div class="mu-login-h-left">
        <div class="mu-login-h-modal"></div>
        <img class="mu-login-h-bg" src="./login-bg.jpg" />
        <a href="#" class="mu-login-h-logo">
          <img :src="logo" class="mu-login-h-logo-img" />
          <span class="mu-login-h-logo-title">{{ title }}</span>
        </a>
        <h1 class="mu-login-h-tip">欢迎登录</h1>
      </div>
      <div class="mu-login-h-right">
        <h1 class="mu-login-h-title">登录</h1>
        <el-form ref="formRef" class="mu-login-h-form" :model="model" :rules="rules" label-position="top">
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
            <el-button class="mu-login-h-btn" type="primary" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
          </el-form-item>
          <el-divider>您也可以使用以下方式登录</el-divider>
          <div style="text-align: center">
            <ul class="mu-login-h-applist">
              <li>
                <mu-icon name="github" />
              </li>
              <li>
                <mu-icon name="weixin" />
              </li>
              <li>
                <mu-icon name="qq" />
              </li>
              <li>
                <mu-icon name="weibo" />
              </li>
            </ul>
          </div>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script>
import { reactive } from 'vue'
import useLogin from '../../composables/useLogin'
export default {
  name: 'LoginH',
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
.mu-login-h {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #303840;

  &-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 950px;
    height: 700px;
    transform: translateX(-50%) translateY(-50%);
    background-color: #101418;
    border-radius: 5px;
    overflow: hidden;
  }

  &-logo {
    position: absolute;
    top: 40px;
    left: 30px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: #fff;
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
  }
  &-right {
    position: relative;
    flex-shrink: 0;
    padding: 40px;
    width: 400px;
  }

  &-modal {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.9;
    background-color: #007bff;
    z-index: 1;
  }

  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: background-image 300ms ease-in 200ms;
  }

  &-tip {
    position: absolute;
    top: 200px;
    left: 50px;
    width: 100%;
    font-size: 40px;
    color: #fff;
    z-index: 2;
  }

  &-title {
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  &-form {
    .el-form-item__label {
      font-size: 22px;
      color: #dee3e4;
    }
    .el-divider {
      margin: 35px 0;
      background-color: #818181;
    }
    .el-divider__text {
      width: 210px;
      color: #818181;
      background-color: #101418;
    }
  }

  &-btn {
    padding: 18px;
    width: 100%;
    font-size: 20px;
  }

  &-applist {
    margin-top: 20px;
    display: inline-block;
    li {
      float: left;
      margin: 0 8px;
      cursor: pointer;

      .mu-icon {
        font-size: 30px;
        color: #fff;
      }
    }
  }
}
</style>
