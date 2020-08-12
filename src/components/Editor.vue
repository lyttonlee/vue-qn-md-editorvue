<template>
  <div class="editor-content">
    <textarea :style="customStyle" @keyup="changeInfo" @change="changeInfo" ref="textarea" @drop.prevent="dragFile" class="area" autofocus placeholder="使用markdown语法编辑内容" v-model="info" ></textarea>
  </div>
</template>
<script>
// import 'highlight.js/styles/atom-one-dark.css'
import {
  isImage,
  upload
} from '../util/utils'
export default {
  model: {
    event: 'changeHtmlInfo',
    prop: 'initInfo'
  },
  props: {
    initInfo: {
      type: String
    },
    domain: {
      type: String,
      required: true
    },
    customStyle: {
      default: ''
    }
  },
  data () {
    return {
      info: this.initInfo || '',
      token: ''
    }
  },
  methods: {
    setToken (token) {
      if (!token) {
        console.log('没有token')
        return
      }
      this.token = token
    },
    dragFile (ev) {
      if (!this.token) { // 没有token直接返回
        console.log('没有实现七牛云上传token')
        return
      }
      const myField = this.$refs.textarea
      const start = myField.selectionStart
      // console.log(myField.value)
      const files = ev.dataTransfer.files
      // const token = await getToken()
      // const token = 'YOXpF0XvM_3yVDsz5C-hWwrFE5rtDAUQC3XjBQEG:QLjFeRD-YQifnHf0aRVlFJcIjPw=:eyJzY29wZSI6ImRvYy1hcnRpY2xlLWltYWdlIiwiZGVhZGxpbmUiOjE1OTcxMzQyNjB9'
      // 判断是否是图片
      // console.log(files)
      // console.log(files instanceof Array)
      // FileList 不要使用 foreach 去迭代
      for (let i = 0; i < files.length; i++) {
        if (isImage(files[i])) {
          upload(files[i], this.token, this.domain).then((url) => {
            const imgStr = `![${files[i].name}](${url})\n`
            myField.value = myField.value.substring(0, start) + imgStr + myField.value.substring(start, myField.value.length)
            this.info = myField.value
            // console.log(this.info)
            this.changeInfo()
            // myField.focus()
            // this.changeInfo()
          })
        } else {
          console.log('只能上传图片，自动忽略非图片文件')
        }
      }
    },
    changeInfo () {
      // console.log('change')
      this.$emit('changeHtmlInfo', this.info)
    }
  },
  mounted () {
    // this.info = this.initInfo
    this.$emit('getToken')
    this.time = setInterval(() => {
      this.$emit('getToken')
    }, 120000)
  },
  beforeDestroy () {
    this.time && clearInterval(this.time)
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/atom-one-dark.css';
.editor-content {
  width: 100%;
  margin: 0 auto;
  .area {
    padding: 20px;
    margin: 0 auto;
    display: block;
    width: 100%;
    max-width: 1024px;
    // height: 400px;
    // min-height: ;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    resize: none;
    box-sizing: border-box;
    border: none;
    border-right: .5px solid rgb(83, 83, 83);
    // background: rgb(51, 50, 50);
    // color: rgb(155, 157, 158);
    outline: none;
    font-size: 16px;
  }
}
</style>
