<template>
  <div class="timedown-box">
    <template v-if="timeDiff> 0">
      <TimerCountdown
        class="timedown"
        :deadline="timeDiff"
        :ignore-day="false"
        v-slot="time">
        <span class="name">Countdown</span>
        <span><i>{{ time.day }}</i>Days</span>
        <span><i>{{ time.hour }}</i>Hours</span>
        <span><i>{{ time.minute }}</i>Minutes</span>
        <span><i>{{ time.second }}</i>Seconds</span>
      </TimerCountdown>
    </template>
    <template v-else>
      <span>End</span>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import vueTimerCountdown from 'vue-timer-countdown'

export default {
  props: {
    endTime: {
      type: String,
      required: true
    }
  },
  components: {
    TimerCountdown: vueTimerCountdown
  },
  data() {
    return {
      timeDiff: '',
      startTime: '',
    }
  },
  watch: {
    endTime(val) {
      this.handleGetTimeDiff()
    }
  },
  methods: {
    moment,
    // 获取服务器时间
    getSevertime(){
      var xmlHttp = new XMLHttpRequest();
      if( !xmlHttp ){
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
      }
      xmlHttp.open("HEAD",location.href,false);
      xmlHttp.send();
      var severtime=new Date(xmlHttp.getResponseHeader("Date"))
      this.startTime = severtime
    },
    // 换算时间差（秒）
    handleGetTimeDiff() {
      let startTime = this.moment().format("YYYY-MM-DD HH:mm:ss")
      let endTime = this.moment(this.endTime).format("YYYY-MM-DD HH:mm:ss")
      this.timeDiff = this.moment(endTime).diff(moment(startTime), "seconds")
    }
  },
  created() {
    this.getSevertime()
    this.handleGetTimeDiff()
  }
}
</script>

<style lang="scss">
  .timedown-box{
    position: absolute;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: #FFF;
    .timedown{
      span{
        margin-right: 6px;
        i{
          font-style: normal;
          font-weight: bold;
          font-size: 24px;
          padding: 0 3px;
        }
      }
    }
  }
  // 适配移动端
  @media (max-width: 1199px) {
    .timedown-box{
      height: 32px;
      line-height: 32px;
      .timedown{
        .name{
          display: none;
        }
        span{
          margin-right: 4px;
          i{
            font-size: 14px;
            padding: 0 2px;
          }
        }
      }
    }
  }
</style>
