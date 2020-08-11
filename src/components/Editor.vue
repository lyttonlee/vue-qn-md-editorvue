<template>
  <div class="editor-content">
    <textarea :style="customStyle" @keyup="changeInfo" @change="changeInfo" ref="textarea" @drop.prevent="dragFile" class="area" autofocus placeholder="使用markdown语法编辑内容" v-model="info" ></textarea>
  </div>
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
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
  created () {
    this.info = this.initInfo
  },
  data () {
    return {
      info: '',
      token: ''
    }
  },
  methods: {
    setToken (token) {
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
      files.forEach((file, index) => {
        if (isImage(file, index)) {
          upload(file, this.token, this.domain).then((url) => {
            const imgStr = `![${file.name}](${url})\n`
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
      })
    },
    changeInfo () {
      // console.log('change')
      const htmlInfo = marked(this.info)
      this.$emit('changeHtmlInfo', htmlInfo)
    }
  },
  mounted () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
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
    background: rgb(51, 50, 50);
    color: rgb(155, 157, 158);
    outline: none;
    font-size: 16px;
  }
}
</style>
