export function getTime () {
  const time = new Date()
  let str = ''
  // str += time.getFullYear() + '年'; //获取当前年份
  // str += time.getMonth() + 1 + '月'; //获取当前月份（0——11）
  // str += time.getDate() + '日';
  str += time.getHours() + '时';
  str += time.getMinutes() + '分';
  str += time.getSeconds() + '秒';
  return str;
}
