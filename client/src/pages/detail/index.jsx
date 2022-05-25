import React, { useEffect, useState } from 'react';
import { Image, Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";

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

  useEffect(() => {
    Taro.request({
      url: `http://service.picasso.adesk.com/v1/vertical/category/${id}/vertical`,
      data: {
        limit: 30, // 每页固定返回30条
        skip: 0,
        first: 0,
        type: 'hot',
      },
      method: 'GET',
      success: (res) => {
        setDataList(res?.data?.res?.vertical)
      }
    })
  }, [id])

  return (
    <View className='detail-container'>
      {
        dataList?.map(({ thumb, id: kId, tag, favs }) => (
          <View key={kId} className='detail-card-content'>
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
