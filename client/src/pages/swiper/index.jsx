import React, { useEffect, useState } from 'react';
import { View, Swiper, SwiperItem, Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import back from '../../assets/icon/back.png'
import download from '../../assets/icon/download.png'
import share from '../../assets/icon/share.png'
import thumb from '../../assets/icon/thumb.png'
import './index.less'
import { currentDateType } from "../../untils/common";

const SwiperPage = () => {
  // 总数据
  const [swiperDataList, setSwiperDataList] = useState([])
  // 用户点击查看的下标
  const [swiperCurrent, setSwiperCurrent] = useState(0)
  useEffect(() => {
    Taro.eventCenter.once('acceptDataFromOpenerPage:detail', (data) => {
      setSwiperDataList(data?.dataList)
      setSwiperCurrent(data?._index)
    })
    Taro.eventCenter.trigger('acceptDataFromOpenerPage:init')
  }, [])
  // 获取时间
  const time = currentDateType("time")
  // 获取月份
  const month = currentDateType("month")

  // 得到当前的current
  const swiperChange = (e) => {
    setSwiperCurrent(e?.detail?.current)
  }

  // 返回上一页
  const handleGoBack = () => {
    Taro.navigateBack({
      delta: 1
    })
  }

  const handleOtherIcon = () => {
    Taro.showToast({ title: '暂不支持，后续开放', icon: 'none' })
  }
  return (
    <View className='swiper-container'>
      <Swiper
        className='swiper-content'
        circular
        current={swiperCurrent}
        onChange={swiperChange}
      >
        {
          swiperDataList?.map(({ img, id }) => (
            <SwiperItem key={id}>
              <View className='swiper-content-item'>
                <Image src={img} mode='aspectFill' className='swiper-content-image' />
              </View>

            </SwiperItem>
          ))
        }
      </Swiper>
      <View className='swiper-cover-date'>
        <Text className='swiper-cover-date-time'>{time}</Text>
        <Text className='swiper-cover-date-month'>{month}</Text>
      </View>
      <View className='swiper-cover-footer'>
        <Text className='swiper-cover-footer-current'>{swiperCurrent + 1}/{swiperDataList?.length}</Text>
        <View className='swiper-cover-footer-tab'>
          <View className='swiper-cover-footer-tab-item' onClick={handleGoBack}>
            <Image src={back} className='swiper-cover-footer-tab-item-icon' />
            <Text className='swiper-cover-footer-tab-item-text'>返回</Text>
          </View>
          <View className='swiper-cover-footer-tab-item' onClick={handleOtherIcon}>
            <Image src={thumb} className='swiper-cover-footer-tab-item-icon' />
            <Text className='swiper-cover-footer-tab-item-text'>收藏</Text>
          </View>
          <View className='swiper-cover-footer-tab-item' onClick={handleOtherIcon}>
            <Image src={download} className='swiper-cover-footer-tab-item-icon' />
            <Text className='swiper-cover-footer-tab-item-text'>下载</Text>
          </View>
          <View className='swiper-cover-footer-tab-item' onClick={handleOtherIcon}>
            <Image src={share} className='swiper-cover-footer-tab-item-icon' />
            <Text className='swiper-cover-footer-tab-item-text'>分享</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SwiperPage;
