export default {
  isNull(val){
    // 判断非空，主要用于链接判断是否是空连接
    let isnull = false
    if(!!val && val.match(/http(s)?\:\/\//g) && val!=null){
      isnull = false
    }else {
      isnull = true
    }
    return isnull
  },
}
