<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMneu(item)"
        >
          {{ item.txt }}
        </li>

        <!--表单-->
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="login-form"
            size="medium"
          >
            <el-form-item prop="username" class="item-from">
              <label>邮箱</label>
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password" class="item-from">
              <label>密码</label>
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                minlength="6"
                maxlength="20"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="passwords"
              class="item-from"
              v-if="currMenu.txt == '注册'"
            >
              <label>重复密码</label>
              <el-input
                type="password"
                v-model="ruleForm.passwords"
                autocomplete="off"
                minlength="6"
                maxlength="20"
              ></el-input>
            </el-form-item>

            <el-form-item prop="code" class="item-from">
              <label>验证码</label>
              <el-row :gutter="11">
                <el-col :span="14">
                  <el-input v-model.number="ruleForm.code"></el-input
                ></el-col>
                <el-col :span="10"
                  ><el-button
                    type="success"
                    class="block"
                    @click="getSms()"
                    :disabled="!canGetCode"
                    >{{ btnCodeTitle }}</el-button
                  ></el-col
                >
              </el-row>
            </el-form-item>

            <el-form-item>
              <el-button
                type="danger"
                @click="submitForm('ruleForm')"
                class="block login-btn"
                >{{ currMenu.txt }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  reactive,
  ref,
  onMounted,
  watch,
  computed
} from "@vue/composition-api";
import val from "../../utils/validate";
import { GetSms, Register } from "../../api/login";
import servec from "../../utils/request";
import service from "../../utils/request";
export default {
  name: "login",
  setup(props, context) {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!val.email(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        emailInput = true;
        canGetCode.value = emailInput && !startTimer;
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!val.password(value)) {
        callback(new Error("密码为6至12位数字或字母"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (!val.code(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    const menuTab = reactive([
      { txt: "登录", current: true },
      { txt: "注册", current: false }
    ]);
    const currMenu = ref({});
    //-----------element UI
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUserName, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    const canGetCode = ref(false);
    let startTimer = false;
    let emailInput = false;
    const btnCodeTitle = ref("获取验证码");

    let timer = 60;
    let curTime = 60;
    let interval = null;
    //----------函数--------------//
    const toggleMneu = data => {
      currMenu.value = data;
      menuTab.forEach(item => {
        if (item == data) {
          data.current = true;
        } else {
          item.current = false;
        }
      });
      clearAllInput();
    };
    const getSms = () => {
      GetSms({ userEmail: ruleForm.username }, res => {
        if (res.data.result) {
          context.root.$message.success(res.data.message);
        }
      });
      startTimer = true;
      canGetCode.value = emailInput && !startTimer;
      curTime = timer;
      btnCodeTitle.value = curTime + "s";
      interval = setInterval(() => {
        curTime--;
        btnCodeTitle.value = curTime + "s";
        if (curTime <= 0) {
          startTimer = false;
          canGetCode.value = emailInput && !startTimer;
          btnCodeTitle.value = "重新获取";
          clearInterval(interval);
        }
      }, 1000);
    };
    const clearAllInput = () => {
      ruleForm.username = "";
      ruleForm.password = "";
      ruleForm.passwords = "";
      ruleForm.code = "";
      emailInput = false;
      canGetCode.value = emailInput && !startTimer;
    };
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          if (currMenu.value.txt == "注册") {
            Register(
              {
                userEmail: ruleForm.username,
                password: ruleForm.password,
                code: ruleForm.code
              },
              res => {
                context.root.$message({
                  type: res.data.result ? "success" : "warning",
                  message: res.data.message
                });
                if (res.data.result) {
                  currMenu.value = menuTab[0];
                  startTimer = false;
                  canGetCode.value = emailInput && !startTimer;
                  btnCodeTitle.value = "获取验证码";
                  ruleForm.code = "";
                  clearInterval(interval);
                }
              }
            );
          }
        } else {
          context.root.$message.error("请填入正确信息");
          return false;
        }
      });
    };

    //----------生命周期--------------//
    onMounted(() => {
      currMenu.value = menuTab[0];
    });

    return {
      currMenu,
      menuTab,
      toggleMneu,
      submitForm,
      ruleForm,
      rules,
      getSms,
      canGetCode,
      btnCodeTitle
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    margin-bottom: 3px;
    display: block;
    font-size: 14px;
    color: whitesmoke;
    text-align: initial;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
