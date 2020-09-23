<template>
  <div>
    <div class="contact">
      <div class="inner">
        <el-row :gutter="10">
          <el-col :span="12" class="item">
            <span class="y" @click="$refs.inquiryForm.show()">
              {{ $t('contactOnline.btn') }}
            </span>
          </el-col>
          <el-col :span="12" class="item">
            <span class="g" @click="$refs.meetingForm.show()">
              {{ $t('contactSubscribe.btn') }}
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
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
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9;
  background: #FFF;
  .inner{
    padding: .2rem .3rem;
    .item{
      span{
        cursor: pointer;
        display: block;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .24rem;
        font-weight: bold;
        box-sizing: border-box;
        &.y{
          border: 1px solid #d71e26;
        }
        &.g{
          background: #d71e26;
          color: #FFF;
        }
      }
    }
  }
}
</style>
