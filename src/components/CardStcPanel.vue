<template>
  <div class="card-stc-panel">
    <div class="weui-grids">
      <div class="weui-grid" hover-class="weui-grid_active">
        <img class="weui-grid__icon" src='../assets/images/eye.png' />
        <div class="weui-grid__label"><span>人气：{{ card.views || 0 }}</span></div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <img class="weui-grid__icon" src='../assets/images/heart.png'/>
        <div class="weui-grid__label"><span>赞：{{ card.viewlikes || 0 }}</span></div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <img class="weui-grid__icon" src='../assets/images/group.png'/>
        <div class="weui-grid__label"><span>人脉：{{ card.viewfavs || 0 }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card']
}
</script>

<style scoped>
/* panel */
.card-stc-panel{
  position: relative;
  top: -50px;
  margin-bottom: -50px;
  width: 100%;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: calc(45px + 3vh);
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}

.weui-grids {
  overflow: hidden;
}
.weui-grid {
  position: relative;
  float: left;
  padding: 20px 10px;
  width: 33.33333333%;
  box-sizing: border-box;
  border-right: 1px solid #D9D9D9;
}
.weui-grid_active {
  background-color: #ECECEC;
}
.weui-grid__icon {
  display: block;
  width: 28px;
  height: 28px;
  margin: 0 auto;
}
.weui-grid__label {
  margin-top: 5px;
  display: block;
  text-align: center;
  color: #000000;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.card-stc-panel .weui-grids{
  border-top: none;
  border-left: none;
}
.card-stc-panel .weui-grid,
.card-stc-panel .weui-grid4{
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: none;
  border-color: #ebeff6;
  border: none;
}
.card-stc-panel .weui-grid__icon{
  width: 22px;
  height: 22px;
}

.card-stc-panel .weui-grid::after{
  content: '';
  width: 1px;
  height: 20px;
  /* background-color: #000; */
  background-color: #e5e5e5;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -10px;
}
.card-stc-panel .weui-grid:last-child::after{
  display: none;
}
</style>
