import React from 'react'
import Taro from "@tarojs/taro";
import { Button, View } from '@tarojs/components'
import './index.less'

import Login from '../../components/login/index'


const Index = () => {

  const db = Taro.cloud.database()
  // 请求相册参数
  const handleQes = async () => {
    Taro.request({
      url: "https://service.picasso.adesk.com/v1/vertical/category",
      method: "GET",
      success: (res) => {
        if (res.data.code === 0) {
          Taro.showToast({
            icon: "success",
            title: '请求成功'
          })
          // console.log(res.data.res.category)
          for (const categoryKey in res.data.res.category) {
            // console.log(res.data.res.category[categoryKey].id)
            db.collection("photo_album_type").add({
              data: {
                cover: res.data.res.category[categoryKey].cover,
                t_id: res.data.res.category[categoryKey].id,
                name: res.data.res.category[categoryKey].name,
                e_name: res.data.res.category[categoryKey].ename,
                i_cover: res.data.res.category[categoryKey].icover,
                picasso_cover: res.data.res.category[categoryKey].picasso_cover,
                rank: res.data.res.category[categoryKey].rank,
                sn: res.data.res.category[categoryKey].sn,
                cloud_file_path: "cloud://env-9gbuqrf1678143c1.656e-env-9gbuqrf1678143c1-1311908429/photo_album_type/" + res.data.res.category[categoryKey].picasso_cover + ".jpeg",
                due: new Date(),
              }
            })
          }


        }

      }
    })
  }

  function sleep(time) {
    return new Promise((reslove) => setTimeout(reslove, time))
  }

  async function handleTypeQes(_,skip = 0) {
    console.log(skip)
    const { data: { res: { vertical } } } = await Taro.request({
      url: "https://service.picasso.adesk.com/v1/vertical/category/4e4d610cdf714d2966000000/vertical",
      method: "GET",
      data: {
        limit: 10, // 每页固定返回20条
        skip: skip,
        first: 0,
        order: 'hot',
      }
    })
    // console.log(vertical)
    await downloadFile(vertical)
    await sleep(10000)
    if (skip < 100) {
      handleTypeQes("",skip + 10)
    } else {
      console.log('下载完成')
    }
  }

  async function downloadFile(data) {
    for (let index = 0; index < data.length; index++) {
      const item = data[index]
      // console.log(item.cid)
      db.collection("photo_album_type_girl").add({
        data: {
          atime: item.atime,
          cid: item.cid,
          cr: item.cr,
          desc: item.desc,
          favs: item.favs,
          g_id: item.id,
          img: item.img,
          ncos: item.ncos,
          preview: item.preview,
          rank: item.rank,
          source_type: item.source_type,
          store: item.store,
          tag: item.tag,
          thumb: item.thumb,
          url: item.url,
          views: 0,
          wp: item.wp,
          xr: item.xr,
          cloud_file_path: "cloud://env-9gbuqrf1678143c1.656e-env-9gbuqrf1678143c1-1311908429/photo_album_type_girl/" + item.id + ".jpeg",
          due: new Date(),
        }
      })
    }
  }


  return (
    <View className='index'>
      <Login />
      <Button onClick={handleQes} disabled>获取保存分类数据</Button>
      <Button onClick={handleTypeQes}>获取保存类型数据</Button>
    </View>
  );
};

export default Index;
