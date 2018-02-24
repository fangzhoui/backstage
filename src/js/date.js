export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function formatDate2 (date) {
  let t = date
  let y1 = t[0].getFullYear()
  let y2 = t[1].getFullYear()
  let m1 = ((t[0].getMonth() + 1) < 10 ? `0${(t[0].getMonth()+1)}` : (t[0].getMonth() + 1))
  let m2 = ((t[1].getMonth() + 1) < 10 ? `0${(t[1].getMonth()+1)}` : (t[1].getMonth() + 1))
  let d1 = (t[0].getDate() < 10 ? `0${t[0].getDate()}` : t[0].getDate())
  let d2 = (t[1].getDate() < 10 ? `0${t[1].getDate()}` : t[1].getDate())
  let tbegin = `${y1}-${m1}-${d1} 00:00:00`
  let tend = `${y2}-${m2}-${d2} 23:59:59`
  return {
    begin: tbegin,
    end: tend
  }
}