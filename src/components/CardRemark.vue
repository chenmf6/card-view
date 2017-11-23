<template>
  <!-- 更多 -->
  <div class="weui-cells">
    <div class="weui-cell nc-remark-v-cell">
      <div class="weui-cell__bd">更多</div>
      <div class="weui-cell__ft">
        <div>{{ card.remark ? card.remark : ( images && images.length ? '' : '这个人很懒，什么都没留下...' ) }}</div>
        <div class="gallery" :class="{'gallery--gap' : card.remark}">
          <div class="gallery__row" v-for="(images, row) in chunkedImages" :key="row">
            <div class="remark-image" v-for="(item, index) in images" :key="index" :style="{ backgroundImage: 'url(' + item.thumbSrc +')' }" @click="viewImage(row, index)"></div>
          </div>
        </div>
        <div class="card-address" v-if="card.address">
          <img class="card-address__icon" src='../assets/images/address.png'></img>
          <span class="card-address__text">{{ card.address }}</span>
        </div>
      </div>
    </div>
    <div v-if="showPreview" @click="stopPreview" class="swiper-container">
      <swiper :list="imgList" :value="previewIndex" :auto="false" :showDescMask="false" :aspectRatio="1" dotsPosition="center" class="swiper-body"></swiper>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'vux'
export default {
  props: ['card', 'chunkedImages', 'images'],
  data () {
    return {
      showPreview: false,
      previewIndex: 0
    }
  },
  components: {
    Swiper
  },
  computed: {
    imgList () {
      return this.images.map(item => {
        return {
          img: item.src
        }
      })
    }
  },
  methods: {
    viewImage (row, index) {
      // console.log('viewImage', this.imgList)
      this.showPreview = true
      this.previewIndex = row * 3 + index
    },
    stopPreview () {
      this.showPreview = false
    }
  }
}
</script>

<style scoped>
.weui-cells {
  position: relative;
  width: 100%;
  margin-top: 1.17647059em;
  background-color: #FFFFFF;
  line-height: 1.41176471;
  font-size: 17px;
}
.weui-cells:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
}
.weui-cells:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
}
.weui-cell {
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
}

.nc-remark-v-cell{
  min-height: 50px;
  line-height: 24px;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.nc-remark-v-cell .weui-cell__bd{
  -webkit-box-flex: 0 0 60px;
  -webkit-flex: 0 0 60px;
  flex: 0 0 60px;
  font-size: 14px;
  text-align: center;
  color: #999;
}

.nc-remark-v-cell .weui-cell__ft{
  flex: 1;
  margin-top: 0;
  padding-right: 12px;
  text-align: left;
  font-size: 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  color: #b2b2b2;
}
.card-address{
  line-height: 20px;
}
.card-address__icon{
  width: 18px;
  height: 18px;
  margin-right: -10px;
  vertical-align: -3px;
}
.card-address__text{
  padding-left: 10px;
}
/* 图片 */
.gallery--gap,
.card-address{ margin-top: -15px; }
.gallery__row{ margin-top: 1.3vw; text-align: left; }
.gallery__row:first-child{ margin-top: 0; }
.gallery__row .remark-image{
  display: inline-block;
  width: calc(32.4vw - 34px);
  height: calc(32.4vw - 34px);
  max-height: 110px;
  max-width: 110px;
  margin-left: 1.3vw; 
  vertical-align: middle;
  background-size: contain;
  background-position: center; 
}
.gallery__row .remark-image:first-child{ margin-left: 0; }

.swiper-container{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: 100%; */
  background-color: #000;
  z-index: 2;
}
.swiper-container .swiper-body{
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}
.swiper-container .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
  background-size: contain !important;
}
</style>


