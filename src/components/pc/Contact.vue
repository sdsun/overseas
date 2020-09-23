<template>
  <div class="contact">
    <el-row :gutter="20">
      <el-col :span="12" class="item">
        <div class="item-img">
          <img src="https://cdnoverseas.haier.net/sys/937ba7e9a77445e2be8fd9f344daef6d.jpg" class="rep-img">
        </div>
        <div class="item-text">
          <h1 v-html="$t('contactOnline.title')"></h1>
          <div class="btn" @click="$refs.inquiryForm.show()">
            <i class="el-icon-chat-dot-square"></i>
            {{ $t('contactOnline.btn') }}
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="item">
        <div class="item-img">
          <img src="https://cdnoverseas.haier.net/sys/9450c6f9a61c47388b682b9b43d29a98.jpg" class="rep-img">
        </div>
        <div class="item-text">
          <h1 v-html="$t('contactSubscribe.title')"></h1>
          <div class="btn" @click="$refs.meetingForm.show()">
            <i class="el-icon-time"></i>
            {{ $t('contactSubscribe.btn') }}
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 在线咨询 -->
    <inquiry-form ref="inquiryForm" />
    <!-- 立即预约 -->
    <meeting-form ref="meetingForm" />
  </div>
</template>

<script>
import InquiryForm from '@/components/InquiryForm'
import MeetingForm from '@/components/MeetingForm'

export default {
  name: 'Contact',
  components: {
    InquiryForm,
    MeetingForm
  }
}
</script>

<style lang="scss" scoped>
.contact{
  .item{
    position: relative;
    .item-img{
      overflow: hidden;
    }
    .item-text{
      position: absolute;
      height: 150px;
      width: 350px;
      right: 30px;
      top: 50%;
      margin-top: -75px;
      color: #FFF;
      h1{
        font-weight: bold;
        font-size: 22px;
        color: #FFF;
        line-height: 34px;
        height: 68px;
        margin-bottom: 30px;
      }
      .btn{
        height: 54px;
        line-height: 54px;
        width: 250px;
        text-align: center;
        border: 2px solid #aaaaaa;
        font-size: 15px;
        cursor: pointer;
        transition: all .5s;
        &:hover{
          background: #FFF;
          border: 2px solid #FFF;
          color: #333;
        }
        i{
          margin-right: 5px;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
