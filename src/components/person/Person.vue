<template>
  <div>
    <nav-home></nav-home>
    <h1>个人中心</h1>
    <div>
      <Row>
        <Col span="20" offset="2" class="item" v-for="good in myGoods" :key="good.id">
          <Col span="5">
            <img :src="good.goods.img" class="img" alt>
          </Col>
          <Col span="10" offset="1">
            <p>商品名：{{ good.goods.name }}</p>
            <p>介绍：{{ good.goods.detail }}</p>
            <p>
              价格：
              {{ good.goods.price }}
            </p>
          </Col>
          <Col span="3" offset="5">
            <Button
              v-if="good.pay_count == 0"
              type="primary"
              class="btn"
              @click="modal11 = true"
            >未支付</Button>
            <Button v-else disabled>已支付</Button>
            <Modal
              v-model="modal11"
              fullscreen
              :title="'商品名称:'+good.goods.name + ' 价格:'+good.goods.price+'元'"
            >
              <Col>
                <h2>请选择一种支付方式：</h2>
                <Col span="3" offset="5">
                  <div
                    @click="zhifubao(good.id,good.goods.number,good.goods.name,good.goods.price)"
                  >
                    <img src="../../../static/images/bank_zfb.gif">
                  </div>
                  <strong>支付宝</strong>
                </Col>
                <Col span="3" offset="3">
                  <div @click="weixin(good.id,good.goods.number,good.goods.name,good.goods.price)">
                    <img src="../../../static/images/bank_wx.gif">
                  </div>
                  <strong>微信</strong>
                </Col>
                <Col span="3" offset="3">
                  <div @click="yinlian(good.id,good.goods.number,good.goods.name,good.goods.price)">
                    <img src="../../../static/images/bank_zgyl.gif">
                  </div>
                  <strong>银联</strong>
                </Col>
              </Col>
            </Modal>
          </Col>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import NavHome from "../home/components/Nav";
export default {
  name: "Person",
  components: {
    NavHome
  },
  data() {
    return {
      myGoods: "",
      modal11: false
    };
  },
  methods: {
    getGood() {
      var that = this;

      if (this.$store.state.name) {
        this.$axios
          .request({
            url: that.$store.state.apiList.person,
            method: "POST",
            data: {
              username: this.$store.state.name
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(ret => {
            // console.log(ret.data);
            this.myGoods = ret.data.data;
          });
      }
    },
    zhifubao(id, number, name, price) {
      // console.log(number, name, price, id);
      var that = this;
      this.$Message.success("正在跳转支付页面!"); // 无关紧要
      this.$axios
        .request({
          url: that.$store.state.apiList.alipay,
          method: "POST",
          data: {
            username: that.$store.state.name,
            id: id,
            number: number,
            goodName: name,
            price: price
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(ret => {
          if (ret.data.code == 1000) {
            location.href = ret.data.url;
          }
        });
    },
    weixin(number, name, price) {},
    yinlian(number, name, price) {}
  },
  mounted() {
    this.getGood();
  }
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