import { getCheckToken } from '@/api/user'

let mixin = {
  data(){
    return{
      isMobile: false,
      browserLang: ''
    }
  },
  methods:{
    // 是否为移动端
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
    // 设置移动端字体大小
    getRem(pwidth, prem) {
      var html = document.getElementsByTagName('html')[0]
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
      html.style.fontSize = oWidth/pwidth*prem + 'px'
    },
    // 改变语言
    changeLang(lang) {
      localStorage.setItem('lang', lang)
      this.$i18n.locale = lang
      window.location.reload()
    },
    // 获取语言数据
    getLangData(data) {
      if (data) {
        switch(this.$i18n.locale) {
          case 'en':
            return eval("(" + data + ")").en_US
            break;
          case 'ja':
            return eval("(" + data + ")").ri_JA
            break;
          default:
            return eval("(" + data + ")").en_US
        }
      }
    },
    handleGoLogin() {
      this.$confirm(this.$t('noLogin'), this.$t('friendlyReminder'), {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no'),
        type: 'warning'
      }).then(() => {
        this.$router.push('/user/login')
      })
    },
    // 直播检测是否登录
    isLogin(link, linkZh) {
      var token = localStorage.getItem('token')
      if (token) {
        getCheckToken({
          params: {
            token: token
          }
        }).then((res) => {
          if (res.code === 200) {
            if (link && linkZh) {
              this.$alert(`<div class="checkVLink"><a href="${linkZh}" target="_blank">China</a><a href="${link}" target="_blank">Oher</a></div>`,
                'Choose the route', 
                {
                  showConfirmButton: false,
                  dangerouslyUseHTMLString: true
                })
            } else {
              if (this.isMobile) {
                window.location.href = link
              } else {
                window.open(link)
              }
            }
          } else if (res.code === 401) {
            this.handleGoLogin()
          }
        })
      } else {
        this.handleGoLogin()
      }
    }
  },
  created() {
    if (this._isMobile()) {
      this.isMobile = true
      window.onload = () => {
        this.getRem(750, 100)
      }
      window.onresize = () => {
        this.getRem(750, 100)
      }
    } else {
      this.isMobile = false
    }
  }
}
export default mixin