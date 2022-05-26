/**
 * 获取时间
 * @param type
 * @returns {string|null}
 */
export const currentDateType = (type) => {
  // 初始化时间
  const date = new Date()
  // 获取月份
  const month = date.getMonth() + 1
  // 获取日期
  const day = date.getDate()

  // 小时
  const hour = date.getHours()
  // 分钟
  const minute = date.getMinutes()

  switch (type) {
    case "time":
      return `${[hour, minute].map(formatNumber).join(':')}`
    case 'month':
      return `${[month, day].map(formatNumber).join('/')}`
    default:
      return null
  }

}
// 补0
const formatNumber = n => {
  n = n.toString()
  // n[1] 判断length 1 是不是存在
  return n[1] ? n : `0${n}`
}
