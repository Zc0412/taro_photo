import React from 'react';
import { Form, Text, View, Textarea, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";


import './index.less'

const Feedback = () => {

  const handleSubmit = (event) => {
    console.log(event)
    if (!event.detail.value.feedback) {
      Taro.showToast({
        icon: 'none',
        title: '亲亲，内容不能为空哦~'
      })
      return false
    }
  }
  return (
    <View className='feedback-container'>
      <Form onSubmit={handleSubmit}>
        <View className='feedback-item'>
          <View className='feedback-item-text'>
            <Text>Feedback</Text>
          </View>
          <View className='feedback-item-input'>
            <Textarea
              name='feedback'
              type='text'
              placeholder='请输入内容，该内容用户无法查看，请放心使用！'
              placeholderClass='feedback-placeholder'
            />
          </View>
        </View>

        <Button formType='submit' type='warn'>提交</Button>
        <Button formType='reset' type='default'>重置</Button>

      </Form>
    </View>
  );
};

export default Feedback;
