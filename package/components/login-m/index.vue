<template>
  <section class="mu-login-m">
    <div class="mu-login-m-wrapper">
      <div class="mu-login-m-logo">
        <img :src="logo" />
      </div>
      <h1 class="mu-login-m-title">{{ title }}</h1>
      <h4 class="mu-login-m-tip">请输入您的用户名和密码</h4>
      <el-form ref="formRef" class="mu-login-m-form" :model="model" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="用户名" clearable>
            <template #prefix>
              <mu-icon name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="model.password" type="password" autocomplete="off" placeholder="密码" clearable>
            <template #prefix>
              <mu-icon name="lock" />
            </template>
          </el-input>
        </el-form-item>
        <mu-verifycode-input v-model="model.verifyCode.code" v-model:id="model.verifyCode.id" />
        <el-form-item>
          <el-button class="mu-login-m-btn" :loading="loading" @click="tryLogin">{{ loading ? '登录中...' : '登录' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
import useLogin from '../../composables/useLogin'
export default {
  name: 'LoginM',
  setup() {
    const { title, logo } = MkhUI.config.site
    const { model, rules, loading, formRef, tryLogin } = useLogin()

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
