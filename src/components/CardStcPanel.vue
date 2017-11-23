<template>
  <div class="card-stc-panel">
    <div class="weui-grids">
      <div class="weui-grid">
        <img class="weui-grid__icon" src='../assets/images/eye.png' />
        <div class="weui-grid__label"><span>人气：{{ card.views || 0 }}</span></div>
      </div>
      <div class="weui-grid">
        <img class="weui-grid__icon" src='../assets/images/heart.png'/>
        <div class="weui-grid__label"><span>赞：{{ card.viewlikes || 0 }}</span></div>
      </div>
      <div class="weui-grid">
        <img class="weui-grid__icon" src='../assets/images/comments.png'/>
        <div class="weui-grid__label"><span>留言：{{ card.viewcomments || 0 }}</span></div>
      </div>
    </div>
    <div class="weui-card-fav-cell">
      <div>我的人脉</div>
      <div class="weui-flex">
        <div class="weui-card-fav-cell-as">
          <div class="nc-avatar-placeholder" v-for="(item, index) in connection.avatarArray" :key="index">
            <img class="nc-avatar-img" alt="" :src="item.avatar"></img>
          </div>
        </div> 
        <div class="weui-cell__ft">{{ card.viewfavs || 0 }}人</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card', 'connection'],
  updated () {
    this.$nextTick(() => {
      this.connection.avatarArray.forEach(item => {
        console.log(item)
      })
    })
  }
}
</script>

<style scoped>
/* panel */
.card-stc-panel{
  width: 100%;
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
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

/* 人脉 */
.weui-card-fav-cell {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin: 10px 0 -9px 0;
  padding-left: 15px;
  padding-right: 15px;
  height: 50px;
  border-top: 1px solid #E5E5E5;
  align-items: center;
  justify-content: space-between;
  color: #000000;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.weui-card-fav-cell-as {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 2.7vw;
  margin-top: 2px;
}

.card-stc-panel .nc-avatar-placeholder {
  width: 5.3vw;
  height: 5.3vw;
  box-sizing: border-box;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-left: -1.3vw;
}

.weui-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.weui-cell__ft {
  text-align: right;
  color:#999;
}

</style>
