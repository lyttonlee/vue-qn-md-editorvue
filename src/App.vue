<template>
  <div id="editor" :class="theme">
    <Editor ref="myqiniuEditorOldDeepComponent" @getToken="getToken" :customStyle="customStyle" :domain="domain" v-model="htmlInfo" />
    <div class="show" :style="customStyle" v-html="htmlInfo"></div>
  </div>
</template>

<script>
import Editor from './components/Editor'
export default {
  name: 'App',
  props: {
    theme: {
      type: String,
      default: () => {
        return 'light'
      }
    },
    domain: {
      type: String,
      required: true
    },
    customStyle: {
      default: ''
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
    },
    setToken (token) {
      this.$refs.myqiniuEditorOldDeepComponent.setToken(token)
    }
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
  }
}
</style>
