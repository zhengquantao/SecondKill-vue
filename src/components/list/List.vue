<template>
  <div>
    <home-nav></home-nav>
    <h1>商品列表</h1>
    <div v-if="error">{{ error }}</div>
    <Row>
      <Col span="20" offset="2" class="item" v-for="good in goods" :key="good.number">
        <Col span="5">
          <img :src="good.img" class="img" alt>
        </Col>
        <Col span="10" offset="1">
          <p>商品名：{{ good.name }}</p>
          <p>介绍：{{ good.detail }}</p>
          <p>
            价格：
            {{ good.price }}
          </p>
          <p>
            数量：
            <span :ref="good.number">{{ good.count }}</span>
          </p>
        </Col>
        <Col span="3" offset="5">
          <Button disabled v-if="good.endTime < now" type="error" class="btn">活动结束</Button>
          <Button
            disabled
            v-else-if="good.startTime > now"
            type="primary"
            class="btn"
          >剩余开始时间{{ good.startTime - now }}</Button>
          <Button v-else type="primary" class="btn" @click="getKill(good.number)">开始秒杀</Button>
        </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
import HomeNav from "../home/components/Nav";
export default {
  name: "HomeList",
  components: {
    HomeNav
  },
  data() {
    return {
      goods: "",
      error: "",
      now: parseInt(new Date() / 1000)
    };
  },
  methods: {
    getGoods() {
      this.$axios
        .request({
          url: this.$store.state.apiList.list,
          method: "GET",
          Headers: {
            "Content-Type": "application/json"
          }
        })
        .then(ret => {
          if (ret.data.code == 1000) {
            this.goods = ret.data.data;
          } else {
            this.error = ret.data.error;
          }
        });
    },
    /**加载函数 */
    loading() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      setTimeout(() => {
        this.$Spin.hide();
      }, 3000);
    },
    /** 发送消息函数 */
    getKill(number) {
      var that = this;
      console.log(that.$store.state.name, that.$store.state.token);
      if (that.$store.state.token) {
        //loading动画
        this.loading();
        this.$axios
          .request({
            url: that.$store.state.apiList.commit,
            method: "POST",
            data: {
              number: number,
              username: that.$store.state.name,
              token: that.$store.state.token
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(ret => {
            console.log(ret);
            if (ret.data.code == 1000) {
              this.$refs[number][0].innerText = ret.data.count;
            } else {
              this.$Message.error(ret.data.error);
            }
          });
      } else {
        that.$router.push({ path: "/login" });
      }
    }
  },
  computed: {
    getNow() {
      setInterval(() => {
        this.now += 1;
      }, 1000);
    }
  },
  //点击这个页面就实行这个方法
  mounted() {
    this.getGoods();
    this.getNow;
  }
  //   //监听数据变化
  //   watch:{
  //       now(){}
  //
  // }
};
</script>
<style>
.item {
  height: 150px;
  border-radius: 5px;
  border: 1px solid #eee;
}
h1 {
  text-align: center;
}
p {
  height: 30px;
  font-size: 16px;
  line-height: 30px;
}
.img {
  height: 139px;
  width: 100%;
  border-radius: 5px;
}
.btn {
  margin-top: 50px;
}
</style>
