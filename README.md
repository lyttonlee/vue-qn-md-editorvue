# vue-md-editor

> markdown 语法的vue web-component 组件，直接封装了七牛云上传方法，可以直接拖动图片到编辑区域实现上传

## 安装
```
yarn install vue-qn-md-editor -S
```

## api

**属性 options**

| name | required | type | default | description |
| :--: | :--: | :--: | :--: | :--: |
| theme | false | string | light | 颜色主题 'light' ,'dark' 可选 |
| domain | true |  string| --- | 七牛云空间的外链域名 |
| customStyle | false |  string| --- | 自定义编辑框的样式 |
| edit | false |  bool| true | 是否显示编辑框,false时用于展示 |

**v-model**

可以在组件上使用 v-model 来绑定编辑的内容

**事件 event**

| name | param | description |
| :--: | :--: | :--: |
| getUploadToken |--- | 必须实现此方法，用户需要在此方法中实现获取七牛云的上传token,且通过 this.$refs[element].setToken(token)来传递上传凭证，且保证上传凭证的有效时间大于2分钟 |

## Use

```html
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <MdEditor
      ref="editor"
      v-model="mdInfo"
      domain="http://xxxx.cn/"
      @getUploadToken="getUploadToken"
      theme="dark"
      customStyle="height: 100vh;text-align: left;"
    />
  </div>
</template>

<script>
import MdEditor from 'vue-qn-md-editor'

export default {
  name: 'App',
  components: {
    MdEditor
  },
  data () {
    return {
      mdInfo: ''
    }
  },
  methods: {
    getUploadToken () {
      // 实现获取七牛云上传token
      // fetch('/api/token').then((token) => {todo...})
      const token = 'YOXpF0XvM_3yVDsz5C-hWwrFE5rtDAUQC3XjBQEG:A'
      this.$refs.editor.setToken(token)
    }
  }
}
</script>
```

