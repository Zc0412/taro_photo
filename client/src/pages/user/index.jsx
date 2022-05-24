import React, { useState } from 'react';
import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";


import avatar from "../../assets/images/avatar.png"
import feedback from "../../assets/images/feedback.png"
import about from "../../assets/images/about.png"
import './index.less'


const User = () => {
  // 头像url
  const [avatarUrl, setAvatarUrl] = useState('')
  // 昵称
  const [nickName, setNickName] = useState("")
  // 用户信息是否获取成功
  const [hasUserInfo, setHasUserInfo] = useState(false)

  // 获取用户信息
  const handleGetWXUserInfo = () => {
    Taro.getUserProfile({
      desc: '获取用户头像',
      success: (res) => {
        setAvatarUrl(res.userInfo.avatarUrl)
        setNickName(res.userInfo.nickName)
        setHasUserInfo(true)
      }
    })
  }

  return (
    <View className='user-container bg-grid-slate'>
      {
        hasUserInfo ? (<View className='user-info'>
          <Image src={avatarUrl} className='user-info-avatar' />
          <Text>{nickName}</Text>
        </View>) : (
          <View className='user-info' onClick={handleGetWXUserInfo}>
            <Image src={avatar} className='user-info-avatar' />
            <Text className='user-info-nick-name'>点击显示微信头像</Text>
          </View>
        )
      }
      <View className='user-basic'>
        <Image src={feedback} className='user-icon' />
        <Text className='user-text'>Feedback</Text>
      </View>

      <View className='user-basic user-basic-bg'>
        <Image src={about} className='user-icon' />
        <Text className='user-text'>About us</Text>
      </View>
    </View>
  );
};

export default User;
