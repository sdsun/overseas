<template>
  <el-dialog
    :title="$t('contactSubscribe.btn')"
    :visible.sync="dialogVisible"
    width="45%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm">
      <el-form-item :label="$t('name')" prop="nickname">
        <el-input v-model="ruleForm.nickname" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item :label="$t('email')" prop="email">
        <el-input v-model="ruleForm.email" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item :label="$t('region')" prop="region">
        <el-select v-model="ruleForm.region" :placeholder="$t('selectRegion')" style="width: 100%">
          <el-option :label="item.value" :value="item.value" v-for="(item, index) in regions" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('title')" prop="title">
        <el-input v-model="ruleForm.title" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item :label="$t('startTime')" prop="startTime">
        <el-date-picker
          style="width: 100%"
          v-model="ruleForm.startTime"
          type="datetime"
          format="yyyy-MM-dd hh:mm"
          value-format="yyyy-MM-dd hh:mm"
          :placeholder="$t('selectStartTime')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('endTime')" prop="endTime">
        <el-date-picker
          style="width: 100%"
          v-model="ruleForm.endTime"
          type="datetime"
          format="yyyy-MM-dd hh:mm"
          value-format="yyyy-MM-dd hh:mm"
          :placeholder="$t('selectEndTime')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('content')" prop="content">
        <el-input type="textarea" v-model="ruleForm.content" rows="3" maxlength="400" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">
        {{ $t('submit') }}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
  import api from '@/api/index'
  import { postMeeting, getClientGetByType } from '@/api/api'

  export default {
    data() {
      return {
        dialogVisible: false,
        regions: [],
        tags: [],
        loading: false,
        fileList: [],
        ruleForm: {
          nickname: '',
          email: '',
          title: '',
          region: '',
          startTime: '',
          endTime: '',
          email: '',
          content: ''
        },
        rules: {
          nickname: [
            { required: true, message: this.$t('meetingRules.name'), trigger: 'change' }
          ],
          mobile: [
            { required: true, message: this.$t('meetingRules.tel'), trigger: 'change' }
          ],
          email: [
			      { required: true, type: 'email', message: this.$t('meetingRules.email'), trigger: 'change' }
          ],
          region: [
            { required: true,  message: this.$t('meetingRules.region'), trigger: 'change' }
          ],
          title: [
            { required: true, message: this.$t('meetingRules.title'), trigger: 'change' }
          ],
          startTime: [
            { required: true, message: this.$t('meetingRules.startTime'), trigger: 'change' }
          ],
          endTime: [
            { required: true, message: this.$t('meetingRules.endTime'), trigger: 'change' }
          ],
          content: [
            { required: true, message: this.$t('meetingRules.content'), trigger: 'change' }
          ]
        }
      }
    },
    methods: {
       changeTime(date){
        this.pickerBeginDateAfter={
          disabledDate(time) {
            return (time.getTime() < new Date(date).getTime());
          }
        }
      },
      // 显示modal
      show(){
        this.dialogVisible = true
        this.handleInit('region')
      },
      // 初始化字典
      handleInit(type) {
        getClientGetByType({
          params: {
            type: type
          }
        }).then((res) => {
          if(res.code === 200) {
            var data = res.data
            if (type == 'region') {
              this.regions = data
            }
          }
        })
      },
      // 提交即使沟通
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            postMeeting(this.ruleForm).then((res) => {
              this.loading = false
              if (res.code === 200) {
                this.$refs[formName].resetFields()
                this.fileList = []
                this.dialogVisible = false
                this.$message.success(this.$t('submitSuccess'))
              } else {
                this.$message.error(this.$t('submitError'))
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>