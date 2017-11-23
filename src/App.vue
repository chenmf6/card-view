<template>
  <div id="app">
    <loading v-model="isLoading" ></loading>
    <alert v-model="showAlert" title="加载失败" :content="alertContent"></alert>
    <!-- 卡片预览 -->
    <card-preview :card="card" :isVerifyMobile="isVerifyMobile"></card-preview>
    <!-- 统计面板 -->
    <card-stc-panel :card="card"></card-stc-panel>
    <!-- 更多 -->
    <card-remark :card="card" :chunkedImages="chunkedImages" :images="images"></card-remark>
  </div>
</template>

<script>
import { Loading, Alert, AjaxPlugin } from "vux"
import Vue from "vue"
// import axios from 'axios'
import util from "./util"
import CardPreview from "./components/CardPreview"
import CardStcPanel from "./components/CardStcPanel"
import CardRemark from "./components/CardRemark"

Vue.use(AjaxPlugin)

const apiPrefix = process.env.NODE_ENV === 'production' ? 'https://newapi.ibos.cn/v4/weappcard' : ''
export default {
  name: "app",

  data() {
    return {
      card: {},
      isVerifyMobile: false,
      chunkedImages: [],
      images: [],
      isLoading: false,
      loadText: "加载中",
      showAlert: false,
      alertContent: ''
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
    // let url = window.location.href
    let url =
      "/pages/view/view?cardid=1716337&aid=bdaaba6b3a73a7da764313da3858cce6&fromuid=14058136&initiative=1"
    let params = this.parseParams(url)
    this.request(
      params,
      data => {
        this.loadCard(data)
      },
      err => {
        this.showAlert = true
        this.alertContent = err
      }
    )
  },

  methods: {    
    parseParams(url) {
      let reg = /[?&][^?&]+=[^?&]+/g
      let params = {}
      url.match(reg).forEach(item => {
        let [key, val = ""] = item.substring(1).split("=")
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
      let url = apiPrefix + `/view?cardid=${params.cardid}&aid=${params.aid}`
      this.isLoading = true
      AjaxPlugin.$http({
          method: 'get',
          url
        })
        .then(res => {
          this.isLoading = false
          res = this.clearBOMAndParseJson(res.data)
          console.log('res', res)
          if (res.code === 0) {
            success(res.data)
          } else {
            fail(res.message)
          }
        })
        .catch(error => {
          this.isLoading = false
          fail(error)
        })
    },

    loadCard(data) {
      let {
        card,
        images,
        isfav,
        islike,
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
      this.isVerifyMobile = isVerifyMobile
      this.chunkedImages = util.chunk(images, 3)
      this.images = images
      console.log(this.$data)
    },

    formatCardData(card) {
      if (!card) return
      card.avatarThumb = util.getAvatar(card.avatar, this.CARD_AVATAR_CLIP)
      card.formattedMobile = util.formatMobile(card.mobile)
      card.views = util.convertNumber(card.views)
      card.viewlikes = util.convertNumber(card.likes)
      card.viewfavs = util.convertNumber(card.favs)
      card.viewcomments = util.convertNumber(card.comments)
    },

    addRemarkImagesThumb: function(images) {
      if (!images || !images.length) return
      images.forEach(img => {
        img.thumbSrc = util.clipImage(img.src || img.cover, "200w_200h_1c_1e")
      })
    }
  }
}
</script>

