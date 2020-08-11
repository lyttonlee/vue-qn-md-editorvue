<template>
  <md-editor ref="editor" domain="http://cdn.xxxx.cn/" @getUploadToken="getUploadToken"></md-editor>
</template>
<script>
import 'vue-md-editor'
export default {
  methods: {
    getUploadToken () {
      // 通过你的方法获取到token ...
      const token = 'askdhaskdhkasdas'
      this.$refs['editor'].setToken(token)
    }
  }
}
</script>