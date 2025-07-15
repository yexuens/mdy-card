// d:\Dy\mdy-card\mdy-card\pages\web\web.ts
Page({
  data: {

    url: ''
  },
  onLoad: function (options) {
    this.setData({
      url: options?.url
    })
  }
})