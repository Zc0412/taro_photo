import React, { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from "@tarojs/taro";
import { INDEX_URL } from "../../constant/common";

import './index.less'

const Index = () => {
  // 获取首页数据list
  const [typeDataList, setTypeDataList] = useState([])

  // 获取数据
  useEffect(() => {
    Taro.showLoading({
      title: 'Loading',
    })
    Taro.request({
      url: INDEX_URL,
      method: "GET",
      success: (res) => {
        if (res?.data?.code === 0) {
          setTypeDataList(res?.data?.res?.category)
          Taro.hideLoading()
        }
      }
    })
  }, [])

  // 跳转详情页面
  const handleToDetailPage = (id, ename, rname) => () => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&ename=${ename}&rname=${rname}`
    })
  }

  return (
    <View className='bg-grid-slate home-container'>
      <View className='home-head'>
        <Text className='home-head-l'>PHONE</Text>
        <View className='home-head-r'>
          <View className='home-head-r-one' />
          <View className='home-head-r-two' />
        </View>
      </View>
      <View className='home-head-text'>
        <Text>WALLPAPER!</Text>
      </View>
      <View className='home-type-image-container'>
        {
          typeDataList?.map(({ cover, e_name, name, ename, id, picasso_cover, count, rname }) => (
            <View
              className='home-type-image-content'
              key={picasso_cover}
              onClick={handleToDetailPage(id, ename, rname)}
            >
              <View className='home-type-image'>
                <Image src={cover} lazyLoad mode='aspectFill' />
              </View>
              <View className='home-type-image-footer'>
                <View className='home-type-text-en'>
                  <Text>{ename}</Text>
                </View>
                <View className='home-type-text-num'>
                  <Text>{count} photos</Text>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    </View>
  );
};

export default Index;
