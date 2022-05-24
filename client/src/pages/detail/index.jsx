import React, { useEffect, useState } from 'react';
import { Image, Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";

import './index.less'

const Detail = () => {
  // 获取路由携带的参数
  const { params: { id, name } } = useRouter()
  // 设置title
  Taro.setNavigationBarTitle({
    title: name
  })

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
  }, [])

  return (
    <View className='detail-container'>
      {
        dataList?.map(({ thumb, id: kId, tag }) => (
          <View key={kId} className='detail-container-content'>
            <Image src={thumb} mode='aspectFill' className='detail-container-content-image' />
            {
              tag?.map((item, index) => <Text key={index}>{item}</Text>)
            }
            {/*TODO*/}
          </View>
        ))
      }
      <Text>{id}</Text>
    </View>
  );
};

export default Detail;
