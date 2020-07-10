/**
 * 导出页面为PDF格式
 * @author bayes
 */

import html2Canvas from 'html2canvas'

function getLeafletImage (dom) {
  return new Promise((resolve, reject) => {
    html2Canvas(document.querySelector(dom), {
      // allowTaint: true,
      useCORS: true,
      scale: 1
    }).then(function (canvas) {
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      // 模拟链接点击
      let dlLink = document.createElement('a')
      dlLink.download = new Date().getTime() + '.jpeg'
      dlLink.href = pageData
      dlLink.dataset.downloadurl = ['image/jpeg', dlLink.download, dlLink.href].join(':')
      document.body.appendChild(dlLink)
      dlLink.click()
      document.body.removeChild(dlLink)
      // saveFile(pageData.replace('image/jpeg', 'image/octet-stream'), new Date().getTime() + '.jpeg')
      resolve(pageData)
    }).catch(err => {
      reject(err)
    })
  })
}

// 下载图片

// function saveFile (data, filename) {
//   var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
//   saveLink.href = data
//   saveLink.download = filename
//
//   var event = document.createEvent('MouseEvents')
//   // event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
//   saveLink.dispatchEvent(event)
// }
export default {
  getLeafletImage
}