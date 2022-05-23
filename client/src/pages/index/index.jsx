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

  return (
    <View className='bg-grid-slate photo-album-container'>
      <View className='photo-album-head'>
        <Text className='photo-album-head-l'>PHONE</Text>
        <View className='photo-album-head-r'>
          <View className='photo-album-head-r-one' />
          <View className='photo-album-head-r-two' />
        </View>
      </View>
      <View className='photo-album-head-text'>
        <Text>WALLPAPER!</Text>
      </View>
      <View className='photo-album-type-image-container'>
        {
          typeDataList?.map(({ cover, e_name, name, ename, picasso_cover, count }) => (
            <View className='photo-album-type-image-content' key={picasso_cover}>
              <View className='photo-album-type-image'>
                <Image src={cover} lazyLoad mode='aspectFill' />
              </View>
              <View className='photo-album-type-image-footer'>
                <View className='photo-album-type-text-en'>
                  <Text>{ename}</Text>
                </View>
                <View className='photo-album-type-text-num'>
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
