import Vue from 'vue'

// 时间过滤
Vue.filter('formatTime', (value, format='yyyy-MM-dd', join="-") => {
  let that = new Date(value)
  let o = {
    "M+": that.getMonth() + 1,
    "d+": that.getDate(),
    "h+": that.getHours(),
    "m+": that.getMinutes(),
    "s+": that.getSeconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return format.split('-').join(join);
  }
})
