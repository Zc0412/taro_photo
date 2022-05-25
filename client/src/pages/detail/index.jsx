import React, { useEffect, useState } from 'react';
import { Image, Text, View } from "@tarojs/components";
import Taro, { useRouter, useReachBottom } from "@tarojs/taro";

import like from '../../assets/images/like.png'
import './index.less'


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

  // 获取壁纸数据
  const queryCategoryData = () => {
    Taro.showLoading()
    Taro.request({
      url: `http://service.picasso.adesk.com/v1/vertical/category/${id}/vertical`,
      data: {
        limit: 30, // 每页固定返回30条
        skip: skip,
        first: 3,
        // type: 'new',
        order: 'hot',
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
  }, [id, skip])

  // 触底加载数据
  useReachBottom(() => {
    setSkip((prevState) => prevState + 30)
  })


  const handleCard = () => {
    Taro.navigateTo({
      url: '/pages/swiper/index',
      success:  ()=> {
        Taro.eventCenter.once("acceptDataFromOpenerPage:init", () => {
          Taro.eventCenter.trigger("acceptDataFromOpenerPage:detail", dataList)
        })
      }
    })
  }

  return (
    <View className='detail-container'>
      {
        dataList?.map(({ thumb, id: kId, tag, favs }) => (
          <View key={kId} className='detail-card-content' onClick={handleCard}>
            <View className='detail-card-head'>
              <Image src={thumb} mode='aspectFill' className='detail-card-head-image' />
            </View>
            <View className='detail-card-footer'>
              <View>
                {
                  tag?.length !== 0 ?
                    tag?.slice(-3).map((item, index) => (
                      <Text
                        key={index}
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
