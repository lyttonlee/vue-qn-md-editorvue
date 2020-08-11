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

**事件 event**

| name | param | description |
| :--: | :--: | :--: | :--: | :--: |
| getUploadToken |--- | 必须实现此方法，用户需要在此方法中实现获取七牛云的上传token,且通过 this.$refs[element].setToken(token)来传递上传凭证，且保证上传凭证的有效时间大于2分钟 |

## Use

```html

<template>
  <md-editor ref="editor" domain="http://cdn.xxxx.cn/" @getUploadToken="getUploadToken"></md-editor>
</template>
<script>
import 'vue-qn-md-editor'
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
```

OR

```html
<meta charset="utf-8">
<title>md-editor demo</title>
<script src="https://unpkg.com/vue"></script>
<script src="./md-editor.js"></script>


<md-editor theme="dark" domain="http://cdn.xxxx.cn/" @getUploadToken="getUploadToken"></md-editor>
```
