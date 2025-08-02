import { GET } from "../../../api/GET"
import { env } from "../../../constants/env"
import { httpGet } from "../../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tltie: "",
    Tnterlinkage: '',
    erwm: [],
    _id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  // 删除头像图片
  shanc: function (e) {
    var tha = this
    var tupian = tha.data.erwm
    var ind = e.currentTarget.dataset

    tt.showModal({
      title: '删除图片',
      content: '是否要删除图片',
      success(res) {
        if (res.confirm) {
          tupian.splice(ind, 1)
        }
      },
      complete() {
        tha.setData({
          longzt: true,
          erwm: tupian
        })
      }
    })
  },
  methods() {
    let that = this;
    tt.chooseImage({
      count: 9,
      success: res => {
        let tempFilePaths = res.tempFilePaths;
        tempFilePaths.forEach((item, i) => {
          tt.uploadFile({
            url: env.baseUrl + "/uploadCloud?filename=11111",
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {},
            success: res => {
              let datas = JSON.parse(res.data)
              let erwm = that.data.erwm;
              erwm.push(datas.yunUrl);
              console.log(datas.yunUrl)
              that.setData({
                erwm: erwm
              })
            },
          })
        })
      }
    })
  },
  inputTltie: function (e) {
    var title = e.detail.value;
    this.setData({
      tltie: title

    })
  },
  inputTnterlinkage: function (e) {
    var Tnterlinkage = e.detail.value;

    this.setData({
      Tnterlinkage: Tnterlinkage

    })
  },
  ModifyData() {
    let that = this;
    if (!that.data.tltie) {
      tt.showToast({
        title: '请输入文章标题',
        icon: 'error'
      })
      return false
    }
    if (!that.data.Tnterlinkage) {
      tt.showToast({
        title: '请输入文章链接',
        icon: 'error'
      })
      return false
    }
    if (!that.data.erwm.length) {
      tt.showToast({
        title: '请上传文章图片',
        icon: 'error'
      })
      return false
    }
    let url = GET.publish_new_content
    let data = {
      userId: wx.getStorageSync('authUserInfo').id || 12,
      title: that.data.tltie,
      photo: that.data.erwm[0],
      type: 2,
      saveFlag: "add",
      linkUrl: that.data.Tnterlinkage
    }


    httpGet(
      url,
      data
    ).then(res3 => {
      if (res3.code == 1) {
        tt.showModal({
          title: '提示',
          content: '创建成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              tt.navigateBack({
                delta: 1
              });
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      }

    })
  },
  Preview() {
    if (!this.data.Tnterlinkage) {
      tt.showToast({
        title: '请输入文章链接',
        icon: 'none'
      })
      return false
    }

    tt.navigateTo({
      url: '/pages/web/index?linkUrl=' + this.data.Tnterlinkage + '&type=' + 1,
    })
  },
  previewImage() {
    wx.previewImage({
      urls: [this.data.erwm[0]], // 需要预览的图片http链接列表
      current: '', // 当前显示图片的http链接
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
})