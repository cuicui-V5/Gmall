<template>
  <Form class="form" ref="target" v-slot="{ errors }">
    <div class="form-item">
      <div class="input">
        <i class="iconfont icon-user"></i>
        <Field autocomplete="off" type="text" name="account" :rules="checkAccount" placeholder="请输入用户名或手机号" />
      </div>
      <div class="error" v-if="errors.account"><i class="iconfont icon-warning" />{{ errors.account }}</div>
    </div>

    <div class="form-item">
      <div class="input">
        <i class="iconfont icon-lock"></i>
        <Field type="password" v-model="form.password" name="password" :rules="checkPwd" placeholder="请输入密码" />
      </div>
      <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{ errors.password }}</div>
    </div>
    <my-button type="plain" size="mini" @click="handleLogin" href="javascript:;" class="btn">登录</my-button>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { ref, reactive, getCurrentInstance } from 'vue'

export default {
  name: 'App',
  components: { Field, Form },
  setup() {
    const instance = getCurrentInstance()
    const target = ref(null)
    // 表单数据
    const form = reactive({
      // 用户名
      account: null,
      // 密码
      password: null
    })

    // 定义表单-用户名验证规则
    const checkAccount = value => {
      // value是将来使用该规则的表单元素的值
      // 1. 必填
      // 2. 6-20个字符，需要以字母开头
      // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
      if (!value) return '请输入用户名'
      if (!/^[a-zA-Z]\w{5,9}$/.test(value)) return '字母开头且6-20个字符'
      return true
    }

    // 密码验证规则
    const checkPwd = value => {
      if (!value) return '请输入密码'
      if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
      return true
    }

    // 点击登录
    const handleLogin = async () => {
      const valid = await target.value.validate()
      if (valid) {
        // 表单验证通过，调用接口实现登录
        // 以下为演示代码
        return instance.proxy.$message({ text: '验证通过', type: 'success' })
      }
    }
    return { target, form, checkAccount, checkPwd, handleLogin }
  }
}
</script>

<style scoped lang="less">
// 账号容器
* {
  box-sizing: border-box;
}
.form {
  margin: 100px auto;
  padding: 50px;
  width: 500px;
  border: 1px solid #ccc;
  &-item {
    margin-bottom: 28px;
    .input {
      position: relative;
      height: 40px;
      outline: none;
      > i {
        width: 35px;
        height: 35px;
        background: #cfcdcd;
        color: #fff;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        line-height: 34px;
        font-size: 18px;
      }
      input {
        padding-left: 44px;
        border: 1px solid #cfcdcd;
        outline: none;
        height: 36px;
        line-height: 36px;
        width: 100%;
        &.error {
          border-color: #ff3040;
        }
        &.active,
        &:focus {
          border-color: skyblue;
        }
      }
    }
    > .error {
      position: absolute;
      font-size: 12px;
      line-height: 28px;
      color: #ff3040;
      i {
        font-size: 14px;
        margin-right: 2px;
      }
    }
  }
  .btn {
    float: right;
  }
}
</style>
