import React from 'react';
import { Text, View } from "@tarojs/components";
import "./index.less"
import { version } from "../../constant/common";


const About = () => {
  return (
    <View className='about-container'>
      <View className='about-content'>
        <View className='about-content-title'>
          <Text>动态壁纸-手机高清壁纸</Text>
        </View>


        <View className='about-content-footer'>
          <View className='about-content-version'>
            <Text>Version：{version}</Text>
          </View>
          <Text>
            免责申明：本站内容来自网上资源，如涉及版权问题，请随时联系告知。
          </Text>
        </View>
      </View>
    </View>
  );
};

export default About;
