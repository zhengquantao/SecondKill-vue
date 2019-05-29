<template>
  <div class="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
      <Row>
        <Col span="10" offset="7">
          <h1>用户登录</h1>
        </Col>
      </Row>
      <Row>
        <Col span="10" offset="7">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="10" offset="7">
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="10" offset="7">
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            <!-- <Button type="primary" @click="handleSubmit('formInline')">Signin</Button> -->
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Row>
      <Col span="10" offset="7">
        <div class="other_login">第三方登录</div>
        <Col offset="1">
          <div>
            <img class="weibo" src="../../../static/images/weibo.jpg" @click="weibo">
            <img class="weibo" src="../../../static/images/qq.jpg" @click="qq">
            <img class="weibo" src="../../../static/images/weixin.png" @click="weixin">
          </div>
        </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formInline.user, this.formInline.password, valid);
          //这个this指向全局的store的this
          var that = this;
          //console.log(that);
          //发送ajax请求
          this.$axios
            .request({
              url: that.$store.state.apiList.login,
              method: "POST",
              data: {
                username: this.formInline.user,
                password: this.formInline.password
              },
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(args => {
              //console.log(args);
              //如何成功就跳转
              if (args.data.code == 1000) {
                //放入全局变量之中
                that.$store.commit("saveToken", {
                  token: args.data.token,
                  username: this.formInline.user
                });
                //先确认是不是从其他页面进来的
                let url = that.$route.query.backUrl;
                this.$Message.success("登录成功,正在跳转!"); // 无关紧要
                if (url) {
                  //是
                  that.$router.push({ path: url });
                } else {
                  //不是返回首页
                  that.$router.push({ path: "/" });
                }
              } else {
                this.$Message.error(args.data.error);
              }
            });
        } else {
          this.$Message.error("失败!");
        }
      });
    },
    weibo() {
      var that = this;
      // location.href = "http://127.0.0.1:8000/login/weibo/";
      that.$axios
        .request({
          //that.$store.state.apiList.login + "geturl/"
          url: that.$store.state.apiList.login + "geturl/",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(args => {
          location.href = args.data.urls;
        });
    },
    qq() {
      location.href =
        "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101584072&redirect_uri=http://101.132.132.181:8000/login/qq&scope=get_user_info";
    },
    weixin() {
      location.href =
        "https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";
    }
  }
};
</script>
<style>
.login {
  height: 100%;
  width: 100%;
  background: url("../../../static/images/background.jpg");
}
.form {
  padding-top: 100px;
}
.other_login {
  color: #ed4014;
}
.weibo {
  height: 32px;
  width: 32px;
  cursor: pointer;
  /* background: url("../../../static/images/weibo.ico") no-repeat; */
}
</style>