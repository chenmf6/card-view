const CARD_AVATAR_CLIP = '120w_120h_1c_1e'
const REMARK_IMG_CLIP = '200w_200h_1c_1e'

/**
 * 对于 img.ibos.cn 的图片加上图片裁剪
 * @param  {String} imgUrl 图片地址
 * @param  {String} cliper 裁剪规则
 * @return {String}        图片地址
 */
function clipImage (imgUrl, cliper = REMARK_IMG_CLIP) {
  if (/^https?:\/\/img.ibos.cn/.test(imgUrl)) {
    return imgUrl + '@' + cliper
  } else {
    return imgUrl
  }
}

// 获取头像缩略图
function getAvatar (avatar, cliper = CARD_AVATAR_CLIP) {
  return clipImage(avatar, cliper)
}

function convertNumber (n) {
  if (n === null || n === undefined) {
    return 0
  }
  n = n.toString()
  if (n.length >= 5) {
    return n.slice(0, -3) + 'k+'
  }
  return n
}

function formatMobile (mobile) {
  return `${mobile.slice(0, 3)}-${mobile.slice(3, 7)}-${mobile.slice(7)}`
}

/**
 * 将数据按指定数目分成二维数组
 * @param  {Array} arr    源数组
 * @param  {Number} count 每数组长度
 * @return {Array}        二维数组
 */
function chunk (arr, count = 3) {
  if (!arr || !arr.length) return []
  let res = []
  for (let i = 0; i <= arr.length; i += count) {
    res.push(arr.slice(i, i + count))
  }
  return res
}

export default {
  clipImage,
  getAvatar,
  convertNumber,
  formatMobile,
  chunk
}
