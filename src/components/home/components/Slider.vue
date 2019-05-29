<template>
  <Carousel autoplay>
    <CarouselItem loop v-for="img in imgs" :key="img.id">
      <div style="height:400px;width:100%;">
        <img :src="img.imgUrl" style="height:100%;width:100%;" alt>
      </div>
    </CarouselItem>
  </Carousel>
</template>
<script>
export default {
  name: "HomeSlider",
  data() {
    return {
      imgs: [
        {
          id: 1,
          imgUrl: "../../../../static/images/shopping1.jpg"
        },
        {
          id: 2,
          imgUrl: "../../../../static/images/shopping2.jpg"
        },
        {
          id: 3,
          imgUrl: "../../../../static/images/shopping3.jpg"
        },
        {
          id: 4,
          imgUrl: "../../../../static/images/shopping4.jpg"
        }
      ]
    };
  }
};
</script>
<style>
.demo-carousel {
  height: 400px;
  width: 100%;
  background-color: #5cadff;
}
</style>
