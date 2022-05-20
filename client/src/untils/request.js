import Taro from "@tarojs/taro";

export async function request(data) {
  return Taro.request({
    ...data
  })
}






