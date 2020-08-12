<template>
  <div id="editor" :class="theme">
    <Editor v-if="edit" ref="myqiniuEditorOldDeepComponent" :initInfo="initContent" @changeHtmlInfo="changeHtmlInfo" @getToken="getToken" :customStyle="customStyle" :domain="domain" v-model="info" />
    <div class="show" :style="customStyle" v-html="htmlInfo"></div>
  </div>
</template>

<script>
import Editor from './components/Editor'
import marked from 'marked'
import hljs from 'highlight.js'
export default {
  name: 'App',
  model: {
    prop: 'initContent',
    event: 'changeInfo'
  },
  props: {
    theme: {
      type: String,
      default: () => {
        return 'dark'
      }
    },
    domain: {
      type: String,
      required: true
    },
    customStyle: {
      default: ''
    },
    initContent: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Editor
  },
  data () {
    return {
      info: '',
      htmlInfo: ''
    }
  },
  methods: {
    getToken () {
      this.$emit('getUploadToken')
      // this.$refs.myqiniuEditorOldDeepComponent.setToken('token')
    },
    setToken (token) {
      this.$refs.myqiniuEditorOldDeepComponent.setToken(token)
    },
    changeHtmlInfo () {
      this.$emit('changeInfo', this.info)
      const htmlInfo = marked(this.info)
      this.htmlInfo = htmlInfo
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
    if (this.initContent) {
      this.htmlInfo = marked(this.initContent)
    }
  },
  created () {
    this.info = this.initContent
  }
}
</script>

<style lang="less">
@import './theme/theme.less';
* {
  margin: 0;
  padding: 0;
}
#editor {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  display: flex;
  .show {
    width: 100%;
    max-width: 1024px;
    max-height: 100vh;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto;
  }
}
</style>
