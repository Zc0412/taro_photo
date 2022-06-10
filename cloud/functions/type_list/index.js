// 云函数模板
// 部署：在 cloud-functions/type_list 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 请求库
const rp = require('request-promise')

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async () => {

  return rp('http://service.picasso.adesk.com/v1/vertical/category').then(res => {
    return { dataList: JSON.parse(res) }
  }).catch(err => {
    return err
  })
}

