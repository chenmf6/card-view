<template>
  <div id="app">
    <loading v-model="showLoading"></loading>
    <alert v-model="showAlert" :title="alertTitle" :content="alertContent"></alert>
    <!-- 卡片预览 -->
    <card-preview :card="card" :isVerifyMobile="isVerifyMobile" :alert="alert"></card-preview>
    <!-- 统计面板 -->
    <card-stc-panel :card="card" :connection="connection"></card-stc-panel>
    <!-- 更多 -->
    <card-remark :card="card" :chunkedImages="chunkedImages" :images="images"></card-remark>
    <div class="card-footer">微信使用名片：发现-小程序-搜索“群应用”</div>
  </div>
</template>

<script>
import { Loading, Alert, AjaxPlugin } from "vux"
import Vue from "vue"
import util from "./util"
import CardPreview from "./components/CardPreview"
import CardStcPanel from "./components/CardStcPanel"
import CardRemark from "./components/CardRemark"

Vue.use(AjaxPlugin)

const apiPrefix = process.env.NODE_ENV === 'production' ? 'https://api.ibos.cn/v4/weappcard' : ''
export default {
  name: "app",

  data() {
    return {
      card: {},
      isVerifyMobile: false,
      chunkedImages: [],
      images: [],
      connection: {
        count: 0,
        avatarArray: []
      },
      showLoading: false,
      showAlert: false,
      alertContent: '',
      alertTitle: ''
    }
  },

  components: {
    Loading,
    Alert,
    CardPreview,
    CardStcPanel,
    CardRemark
  },

  created() {
    let url = window.location.href
    // let url = '/pages/view/view?cardid=1720146&aid=ac1bb8347be75ce6d9403488ae78faef'
    let params = this.parseParams(url)
    if(util.isEmptyObject(params)) {
      this.alert('没有名片信息', '加载失败')
      return
    }
    this.request(
      params,
      data => {
        this.loadCard(data)
      },
      err => {
        this.alert(err, '加载失败')    
      }
    )
  },

  methods: {
    alert (content = '', title = '') {
      this.showAlert = true
      this.alertTitle = title
      this.alertContent = content
    },
    parseParams(url) {
      let reg = /[?&](cardid|aid)=[^?&]+/g
      let params = {}
      url.match(reg).forEach(item => {
        let [key, val = ''] = item.substring(1).split('=')
        params[key] = val
      })
      return params
    },

    clearBOMAndParseJson(res) {
      if (typeof res === "string") {
        try {
          return JSON.parse(res.trim())
        } catch (e) {
          return {}
        }
      }
      return res
    },

    request(params, success, fail) {
      // let url = apiPrefix + `/view?cardid=${params.cardid}&aid=${params.aid}`
      let url = apiPrefix + '/view'
      this.showLoading = true
      AjaxPlugin.$http({
        method: 'get',
        params,
        url
      })
      .then(res => {
        this.showLoading = false
        res = this.clearBOMAndParseJson(res.data)
        if (res.code === 0) {
          success(res.data)
        } else {
          fail(res.message)
        }
      })
      .catch(error => {
        this.showLoading = false
        fail(error)
      })
    },

    loadCard(data) {
      console.log('loadCard', data)
      let {
        card,
        images,
        connection,
        isverifymobile: isVerifyMobile
      } = data
      if (!card) return
      if(card.realname) {
        document.title = card.realname + '的名片'
      }
      
      this.formatCardData(card)
      this.addRemarkImagesThumb(images)
      this.card = card
      // this.isVerifyMobile = false
      this.isVerifyMobile = isVerifyMobile
      this.connection = connection
      this.chunkedImages = util.chunk(images, 3)
      this.images = images
    },

    formatCardData(card) {
      if (!card) return
      card.avatarThumb = util.getAvatar(card.avatar)
      card.formattedMobile = util.formatMobile(card.mobile)
      card.views = util.convertNumber(card.views)
      card.viewlikes = util.convertNumber(card.likes)
      card.viewfavs = util.convertNumber(card.favs)
      card.viewcomments = util.convertNumber(card.comments)
    },

    addRemarkImagesThumb: function(images) {
      if (!images || !images.length) return
      images.forEach(img => {
        img.thumbSrc = util.clipImage(img.src || img.cover)
      })
    }
  }
}
</script>

