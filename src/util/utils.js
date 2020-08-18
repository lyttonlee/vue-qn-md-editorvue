import * as qiniu from 'qiniu-js'
import randomStr from 'random-string'
export const isImage = (file) => {
  return file.type && file.type.includes('image/')
}

export const upload = (file, token, qiniuDomain, imgStyle) => {
  return new Promise((resolve, reject) => {
    qiniu.compressImage(file, {
      quality: 0.9,
      noCompressIfLarger: true
      // maxWidth: 750
    }).then((data) => {
      // console.log(data)
      const type = file.name.split('.').pop()
      const randomHash = randomStr({
        length: 20
      })
      // console.log(randomHash)
      const key = randomHash + '.' + type
      const observable = qiniu.upload(data.dist, key, token)
      observable.subscribe({
        complete (res) {
          // console.log(res)
          const url = imgStyle ? qiniuDomain + res.key + imgStyle : qiniuDomain + res.key
          resolve(url)
        },
        error (err) {
          reject(err)
        }
      })
    })
  })
}
