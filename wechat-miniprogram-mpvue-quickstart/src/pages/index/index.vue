<template>
  <view>
    <vr-webview v-if="rsVrProps" :props="rsVrProps"></vr-webview>
  </view>
</template>

<script>
import { rsVrWebviewPropsWrapper } from '@realsee/miniprogram/dist/vrwebview/utils'

export default {
  data() {
    return {
      rsVrProps: null
    }
  },
  methods: {
    initVr() {
      // 从页面参数取或根据业务设置
      const url = this.$root.$mp.page.options.url || 'https://gemdale.realsee.qingapi.cn/?pid=1462714342943399936&resid=b5kdGoDd1K&rid=&srcode=ED5Aeg0kkQUPBJecrD&snav=1&token=seller_3a094146-1a07-98a7-2f42-3a8b1fdda0ab&live=0&luid=&lrole=&day=0&back=0&share=0&tcid=0&pf=wechat&hxi=4&hxp=0&open_app_id=&wssid=&wssig=&wstsp=&wx_token=&'

      const options = {
        app: {
          key: 'touristAppKey', // 如视开放平台AppKey
          secret: 'touristAppSecret' // 如视开放平台AppSecret
        },
      }

      // 注⼊⾃定义scheme，这⾥是与h5约定的使⽤jsbridge-x进⾏通信的⽅法
      const schemes = {
        customFn: (callback, type, params) => {
          if (type === 'callAndBackfeed') {
            // 自定义事件调用
            callback(true)
          }
        }
      }

      // 注⼊VRWebview组件所需的⾏为
      const behaviors = {
        // 进⾏登录
        requestLogin: async () => {
          // 需返回的数据结构
          return {
            userName: '⽤户名',
            userId: '⽤户ID',
            token: '⽤户令牌',
            avatar: '⽤户头像'
          }
        },
        // 获取⽤户信息
        getUserInfo: async () => {
          // 需返回的数据结构
          return {
            userName: '⽤户名',
            userId: '⽤户ID',
            token: '⽤户令牌',
            avatar: '⽤户头像'
          }
        },
        popupShare: async (params) => {
          this.shareConfig = {
            title: params.articleTitle,
            imageUrl: params.headImageUrl,
            path: this.$root.$mp.page.route + '?url=' + encodeURIComponent(params.requestUrl)
          }
        },
        // 进⾏分享
        actionShare: async (params) => {
          // h5中会有分享功能，params是相应的分享配置（由h5与⼩程序之间进⾏协商）
          // 因为⼩程序在webview下⽆法直接调起分享，这⾥的最佳实践是获取params的数据后对⻚⾯的shareConfig数据进⾏缓存，在分享相关的钩⼦函数⾥将缓存的数据返给wx
          this.shareConfig = {
            title: params.articleTitle,
            imageUrl: params.headImageUrl,
            path: this.$root.$mp.page.route + '?url=' + encodeURIComponent(params.requestUrl)
          }
        },
        // 当VR退出时, _params是与h5协商的退出消息结构
        onExitVr: async (_params) => {
          console.log('onExitVr', _params)
        },
        // 当webview发⽣错误时进⾏处理
        onWebViewError: (e) => {
          console.error('onWebViewError', e)
        },
        // 组件报错时的回调
        onError: (e) => {
          console.error('onError', e)
        },
        // 获取⽤户的token，因为h5使⽤token时可能会因token超时失效，该⽅法要求返回最新的有效token
        getToken: async () => {
          // return 'abc'
          return "customer_1366209914787086336_Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaW5pX2FwcF9pZCI6Ind4YmU1MzA2YzEyZWZhYTM1YyIsInVzZXJfaWQiOiIxMzY2MjA5OTE0Nzg3MDg2MzM2IiwieWtfb3JnX2NvZGUiOiJqZGppdHVhbmFkbWluIiwib3Blbl9pZCI6Im8zX0ZPNVpUaHFWWktMRzRBd3Nra0dVSWVnRVEiLCJ1bmlvbl9pZCI6Im9DTURVNk5sZDZENHBsM212NGs4RHhua0dibnMiLCJpYXQiOjE2NzYwMDkyNjgsImV4cCI6MTY3NjAxNjQ2OH0.6i5VQsoZquEC5YFZ7G3QTDaG39krndw2g79oH1rdyiQ"
        }
      }

      this.rsVrProps = rsVrWebviewPropsWrapper({
        url,
        options,
        schemes,
        behaviors
      })

    }
  },

  mounted() {
    // let app = getApp()
    this.initVr()
  },

  onShareAppMessage() {
    return this.shareConfig
  }
}
</script>
