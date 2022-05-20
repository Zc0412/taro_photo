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
      <View className='photo-album-type-image-container'>
        {
          typeDataList?.map(({ cover, e_name, name, ename, picasso_cover }, index) => (
            <React.Fragment key={picasso_cover}>
              <View className={`${index % 2 === 0 ? "text-odd" : "text-even"}`}>
                <Text className='photo-album-type-text-zh'>{name}</Text>
                <Text className='photo-album-type-text-en'>{ename?.toUpperCase()}</Text>
              </View>
              <View className='photo-album-type-image'>
                <Image src={cover} lazyLoad mode='aspectFill' />
              </View>
            </React.Fragment>
          ))
        }
        <View className='photo-album-type-image'>
          {/*<Image src={""}/>*/}

        </View>
      </View>

    </View>
  );
};

export default Index;
