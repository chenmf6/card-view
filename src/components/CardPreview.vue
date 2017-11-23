<template>
<!-- 名片预览 -->
<div id="card-preview" class="card-wrap">
  <div class="card">
    <div class="nc-avatar-placeholder">
      <img class="nc-avatar-img"  alt="" :src="card.avatarThumb"></img>
    </div>
    <div class="card-header">
      <span class="card-realname">{{ card.realname || '暂无' }}</span>
      <span class="card-position">{{ card.position || '暂无' }}</span>
    </div>
    <div class="card-data">
      <div class="card-data-item">
        <div class="card-data-item-label">手机</div>
        <a v-if="isVerifyMobile" :href="'tel:' + card.mobile"><span class="card-data-mobile card-data-mobile-verify">{{ card.formattedMobile || '读取中...' }}</span></a>
        <span v-else @click="hintDial" class="card-data-mobile">{{ card.formattedMobile || '读取中...' }}</span>
      </div>
      <div class="card-data-item">
        <div class="card-data-item-label">公司</div>
        <div class='card-data-company'>
          <div>{{ card.corpname || '暂无' }}</div>
        </div>
      </div>
      <div class="card-data-item">
        <div class="card-data-item-label">email</div>
        <span>{{ card.email || '暂无' }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['card', 'isVerifyMobile', 'alert'],
  methods: {
    hintDial () {
      this.alert('未验证的号码不支持一键拨打')
    }
  }
}
</script>

<style scoped>
.card-wrap{
  padding: 15px;
}
.card{
  position:relative;
  padding:20px 15px 15px;
  background-color:#fff;
  min-height:163px;
}
.card-header{
  margin-right: 16.82vw;
}
.card-realname,
.card-position{
  color: #58585c;
}
.card-realname{
  font-size: 24px;
}
.card-position{
  padding: 0 10px;
  font-size: 14px;
}

.card-data{ margin-top: 20px; }

.card-data-item{
  position: relative;
  padding-left: 40px;
  margin: 5px 0;
  line-height: 30px;
  font-size: 14px;
}
.card-data-item-label{
  position: absolute;
  left: 0;
  color: #999;
}
.card-data-item text{
  display: inline-block;
}
.card-data-item .card-data-company{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.card-data-company div{
  display: inline-block;
}

.card-data-item .card-data-mobile{
  font-size: 19px;
}

.card-data-mobile-verify{
  color: #10aeff;
}

.card .nc-avatar-placeholder{
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 15px 0 0;
  width: 16.82vw;
  height: 16.82vw;
  border: 1px solid #b5b5b5;
  border-radius: 4px;
}

.card a {
  text-decoration: none;
}

</style>



