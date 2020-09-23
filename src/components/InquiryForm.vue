<template>
  <el-dialog
    :title="$t('contactOnline.btn')"
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
      <el-form-item :label="$t('tel')" prop="mobile">
        <el-input v-model="ruleForm.mobile" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item :label="$t('email')" prop="email">
        <el-input v-model="ruleForm.email" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item :label="$t('region')" prop="region">
        <el-select v-model="ruleForm.region" :placeholder="$t('selectRegion')" style="width: 100%">
          <el-option :label="item.value" :value="item.value" v-for="(item, index) in regions" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tag')" prop="tag">
        <el-radio-group v-model="ruleForm.tag">
          <el-radio :label="item.value" v-for="(item, index) in tags" :key="index"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('content')" prop="content">
        <el-input type="textarea" v-model="ruleForm.content" rows="3" maxlength="400" show-word-limit></el-input>
      </el-form-item>
      <el-form-item :label="$t('images')" prop="content">
        <el-upload
          accept="image/png, image/jpeg"
          :action="uploadUrl"
          :headers="headers"
          name='files'
          list-type="picture-card"
          :before-upload="beforeUploadPicture"
          :file-list="fileList"
          :on-success="hadnleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
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
  import { postInquiry, getClientGetByType } from '@/api/api'

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
          mobile: '',
          region: '',
          tag: '',
          email: '',
          content: '',
          imageList: []
        },
        headers: {
          accessToken: localStorage.getItem('token')
        },
        uploadUrl: api.UploadImg,
        rules: {
          nickname: [
            { required: true, message: this.$t('inquiryRules.name'), trigger: 'change' }
          ],
          email: [
			      { required: true, type: 'email', message: this.$t('inquiryRules.email'), trigger: 'change' }
          ],
          region: [
            { required: true,  message: this.$t('inquiryRules.region'), trigger: 'change' }
          ]
        }
      }
    },
    watch:{
      fileList: {
        handler(n,o){
          n.map((item) => {
            this.ruleForm.imageList.push(item.response.data[0].url)
          })
        },
        deep: true
      }
    },
    methods: {
      // 显示咨询表单
      show(){
        this.dialogVisible = true
        this.handleInit('region')
        this.handleInit('inquiry_tag')
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
            } else if (type == 'inquiry_tag') {
              this.tags = data
            }
          }
        })
      },
      // 提交留言
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            postInquiry(this.ruleForm).then((res) => {
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
      },
      // 上传图片校验
      beforeUploadPicture(file) {
        if(file.size > 1*1024*1024){
          this.$message.error("上传图片不能大于1M")
          return false;
        }
      },
      // 图片删除
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      // 上传成功
      hadnleSuccess(response, file, fileList){
        this.fileList = fileList
      }
    }
  }
</script>