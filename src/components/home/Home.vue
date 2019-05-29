<template>
  <div>
    <home-nav></home-nav>
    <home-slider></home-slider>
    <Tabs>
      <TabPane label="项目介绍" icon="md-book">
        <div style="text-align:center; font-size:30px;">
          <h1>项目介绍：</h1>
          <div>
            <p>
              &nbsp;&nbsp;
              <strong>技术栈：vue.js+django+rabbitmq+redis+mysql</strong>
            </p>
            <p>
              &nbsp;&nbsp;
              <strong>
                其他项目：
                <a href="http://120.78.176.77">购物网站</a>
              </strong>
            </p>
            <p>
              &nbsp;&nbsp;
              <strong>
                其他项目：
                <a href="http://120.78.176.77:8000/index/">Blog网站</a>
              </strong>
            </p>
          </div>
        </div>
      </TabPane>
      <TabPane label="个人中心" icon="ios-body">
        <div style="text-align:center; font-size:30px;">
          <h1>个人中心：</h1>
          <div>
            <p>
              &nbsp;&nbsp;
              <strong>现职业：学生</strong>
            </p>
            <p>
              &nbsp;&nbsp;
              <strong>
                个人博客：
                <a href="https://www.cnblogs.com/taozhengquan/">博客园</a>
              </strong>
            </p>
            <p>
              &nbsp;&nbsp;
              <strong>
                个人GitHub：
                <a href="https://github.com/zhengquantao">GitHub</a>
              </strong>
            </p>
          </div>
        </div>
      </TabPane>
      <TabPane label="联系本人" icon="ios-chatbubbles">
        <div style="text-align:center; font-size:30px;">
          <h1>联系本人：</h1>
          <div>
            <p>
              &nbsp;&nbsp;
              <strong>现职业：学生</strong>
            </p>
            <p>
              &nbsp;&nbsp;
              <strong>个人QQ:1483906080</strong>
            </p>
            <p>
              &nbsp;&nbsp;
              <strong>个人邮箱:1483906080@qq.com</strong>
            </p>
          </div>
        </div>
      </TabPane>
      <TabPane label="Linux" icon="logo-tux">
        <h1>自学中。。。。</h1>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import HomeNav from "./components/Nav";
import HomeSlider from "./components/Slider";
export default {
  name: "Home",
  components: {
    HomeNav,
    HomeSlider
  },
  data() {
    return {
      itemList: [{}]
    };
  }
};
</script>
<style>
</style>

