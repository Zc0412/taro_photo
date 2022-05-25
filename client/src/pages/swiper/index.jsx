import React, { useEffect, useState } from 'react';
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import './index.less'

const SwiperPage = () => {
  const [swiperDataList, setSwiperDataList] = useState([])
  useEffect(() => {
    Taro.eventCenter.once('acceptDataFromOpenerPage:detail', (dataList) => setSwiperDataList(dataList))
    Taro.eventCenter.trigger('acceptDataFromOpenerPage:init')
  }, [])

  return (
    <View className='swiper-container'>
      <Swiper
        style={{ height: "100vh" }}
        // className='swiper-content'
        circular
      >
        {
          swiperDataList?.map(({ img, id }) => (
            <SwiperItem key={id}>
              <View style={{ height: '100%' }}>
                <Image src={img} mode='heightFix' style={{ height: '100%' }} />
              </View>
            </SwiperItem>
          ))
        }
      </Swiper>
    </View>
  );
};

export default SwiperPage;
