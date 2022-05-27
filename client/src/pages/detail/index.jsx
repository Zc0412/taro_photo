import React, { useEffect, useState } from 'react';
import { Image, Text, View } from "@tarojs/components";
import Taro, { useRouter, useReachBottom } from "@tarojs/taro";

import like from '../../assets/icon/like.png'
import './index.less'
import { defaultTabKey, tabList } from "../../constant/common";


const Detail = () => {
  // 获取路由携带的参数
  const { params: { id, ename, rname } } = useRouter()
  // 设置title
  Taro.setNavigationBarTitle({
    title: ename
  })
  // 图片数据
  const [dataList, setDataList] = useState([])
  // 返回图片数量
  const [skip, setSkip] = useState(0)
  // 选中的tab
  const [tabType, setTabType] = useState(defaultTabKey)


  // 获取壁纸数据
  const queryCategoryData = () => {
    Taro.showLoading({
      title: 'Loading'
    })
    Taro.request({
      url: `https://service.picasso.adesk.com/v1/vertical/category/${id}/vertical`,
      data: {
        limit: 30, // 每页固定返回30条
        skip: skip,
        first: 0,
        order: tabType,
      },
      method: 'GET',
      success: (res) => {
        setDataList((data) => [...data, ...res?.data?.res?.vertical])
        Taro.hideLoading()
      },
      fail: () => {
        Taro.hideLoading()
      }
    })
  }

  // 初始加载壁纸数据
  useEffect(() => {
    queryCategoryData()
  }, [id, skip, tabType,])

  // 触底加载数据
  useReachBottom(() => {
    setSkip((prevState) => prevState + 30)
  })

  // 跳转全屏壁纸页面
  const handleCard = (_index) => () => {
    Taro.navigateTo({
      url: '/pages/swiper/index',
      success: () => {
        Taro.eventCenter.once("acceptDataFromOpenerPage:init", () => {
          Taro.eventCenter.trigger("acceptDataFromOpenerPage:detail", { dataList, _index })
        })
      }
    })
  }

  // 设置选中的tab
  const handleTab = (key) => () => {
    setTabType(key)
    setDataList([])
  }

  return (
    <View className='detail-container'>
      <View className='detail-tab'>
        {
          tabList?.map(({ tab, key }) => (
            <Text
              key={key}
              className={`${tabType === key && 'active'} detail-tab-item`}
              onClick={handleTab(key)}
            >
              {tab}
            </Text>
          ))
        }
      </View>
      {
        dataList?.map(({ thumb, id: kId, tag, favs }, index) => (
          <View key={kId} className='detail-card-content' onClick={handleCard(index)}>
            <View className='detail-card-head'>
              <Image src={thumb} mode='aspectFill' className='detail-card-head-image' />
            </View>
            <View className='detail-card-footer'>
              <View>
                {
                  tag?.length !== 0 ?
                    tag?.slice(-3).map((item, i) => (
                      <Text
                        key={i}
                        className='detail-card-footer-tag'
                      >
                        {item}
                      </Text>
                    )) : (<Text className='detail-card-footer-tag'>{rname}</Text>)
                }
              </View>
              <View className='detail-card-footer-like'>
                <Image src={like} className='detail-card-footer-like-icon' />
                <Text className='detail-card-footer-like-text'>{favs}</Text>
              </View>
            </View>
          </View>
        ))
      }
    </View>
  );
};

export default Detail;
