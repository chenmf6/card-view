<template>
<!-- 名片预览 -->
<div id="card-preview" class="card-wrap">
  <div class="card">
    <div class="nc-avatar-placeholder">
      <img class="nc-avatar-img" :src="card.avatarThumb"></img>
    </div>
    <div class="card-header">
      <span class="card-realname">{{ card.realname || '暂无' }}</span>
      <span class="card-position">{{ card.position || '暂无' }}</span>
    </div>
    <div class="card-data">
      <div class="card-data-item">
        <div class="card-data-item-label">手机</div>
        <span class="card-data-mobile" :class="{'card-data-mobile-verify' : isVerifyMobile}">{{ card.formattedMobile || '读取中...' }}</span>
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
  props: ['card', 'isVerifyMobile']
}
</script>

<style scoped>
.card-wrap{
  position: relative;
  margin: auto;
  z-index: 1;
  width: 92vw;
  box-sizing: border-box;
}
.card{
  margin-top: 10px;
  padding: 3vh 5vw;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  box-shadow: 1px 5px 5px #efefef;
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
  margin: 3vh 5vw 0 0;
  width: 16.82vw;
  height: 16.82vw;
  overflow: hidden;
}
.nc-avatar-img{
  height: 100%;
  width: 100%;
  vertical-align: middle;
}
.nc-avatar-placeholder{
  border: 1px solid #b4b4b4;
  border-radius: 4px;
  background-size: 64%;
  background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABgFBMVEUAAADJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJyclqquSWAAAAf3RSTlMAAQIDBAUGBwgJCgsNDg8QERIXHB0eICEiJCYnKCkqLC0uLzY9Pj9BQkNFR0lLTVRVVlhaXF1jZGVoaWtsbW5vcXR1fH1+hIeJkJGTmJmfoKKlp6yusLK1t7i6vL/AwsPHzM7P0tPV19jZ29zd4OTn6evs7e/x8vb3+Pn6+/z++xZVNQAAAadJREFUGBmlwftfy1EYB/DP1lepxCi33CKhkvsll5YQiwrRSppbQsVmNqK1Pv86Lz+gs+95nnN23m8Ijt2Z+fyT1cKL0SPwlzj3hv/keuDpwGtu9ngbfJxfpWlpL9xdZ4z8fri6xFjLO+Hm6CrjZeEkWqDNRbi4QatCM3RNBdoNQXeZgqUEVHOUdEPTtk7JPWj6KcpBc5uiMjTjlG2HYoqyPVBMU7YPikeUdUAxQdkOKO5TVN0CxRWKPkFzgqJZaForlNyFap6SbqiuUrCShKqlTLtbcDBCq3wzHDQt0+YCnBzfYLxpOMowVnEXHDUuMM4ZODv8g7Um4CHNGiut8BB9oOksvAzTkE/CSxcNT+CnnYYH8NNDwyz8TNJQ2Q0f/Rs0PW+Au5PfWGuqEY6i0SrjvD0EJ32LtFjLtEHVmaXgy2ADRKmxdcrenYJdlC5Rl+2ExcBHOqmMpRCja47OSukIhtTDKn2878X/EoNF+nragb8OvmQdvg8l8Ufi5hrr86odv7U8Y92+9gJbcwxQOY0Mg5RQZhgwEBgIDAQGAgOhyDC4xiCLvwBK8zwld8eicgAAAABJRU5ErkJggg==') center no-repeat;
}
</style>



