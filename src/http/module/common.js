import axios from 'axios'

// JSON转FormData
function json2Fd(json) {
  const fd = new FormData()
  for (const key of Object.keys(json)) {
    if (json[key] instanceof Array) {
      json[key].forEach(item => {
        fd.append(key, item)
      })
    } else if (json[key] instanceof Object) {
      fd.append(key, JSON.stringify(json[key]))
    } else {
      fd.append(key, json[key])
    }
  }
  return fd
}

// 文件上传
export const subbmitWithFiles = (url, fd) => {
  // const fd = json2Fd(json)
  url = process.env.BASE_API + url
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: fd
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
