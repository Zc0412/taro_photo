export default {
  pages: [
    'pages/index/index',
    'pages/user/index',
    'pages/detail/index',
    'pages/swiper/index',
    'pages/about/index',
    'pages/feedback/index',
    'pages/data/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  cloud: true,
  tabBar: {
    color: '#69727E',
    selectedColor: '#c89ffb',
    list: [
      {
        text: '相册',
        pagePath: 'pages/index/index',
        iconPath: './assets/icon/homeIcon.png',
        selectedIconPath: './assets/icon/selectedHomeIcon.png',

      },
      {
        text: '我的',
        pagePath: 'pages/user/index',
        iconPath: './assets/icon/userIcon.png',
        selectedIconPath: './assets/icon/selectedUserIcon.png',
      }
    ]
  }
}
