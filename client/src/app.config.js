export default {
  pages: [
    'pages/index/index',
    'pages/user/index',
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
    // color: '#8A8A8A',
    selectedColor: '#8331FF',
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
