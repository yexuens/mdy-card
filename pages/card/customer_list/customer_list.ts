import { GET } from "../../../api/GET"
import { httpGet } from "../../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCustomerPool()
  },
  bindconfirm(e) {
    var keyword = e.detail.value
    this.setData({
      keyword: keyword
    })
    this.getCustomerPool()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getCustomerPool() {
    let that = this;
    let url = GET.customer_list
    let data = {
      userId: tt.getStorageSync('authUserInfo').id || 12
    }
    if (this.data.keyword) {
      data.keyword = this.data.keyword
    }
    httpGet(
      url,
      data
    ).then(res3 => {
      if (res3.code == '1') {
        that.setData({
          UserList: res3.record
        })
      } else {
        that.setData({
          UserList: []
        })
      }

    })
  },
  Contact(e) {
    let phone = e.currentTarget.dataset.item;
    if (!phone) {
      tt.showModal({
        title: '用户暂未授权手机号',
        icon: 'success',
        duration: 2000,
        showCancel: false // 2秒
      });
    } else {
      tt.makePhoneCall({
        phoneNumber: phone, //此号码并非真实电话号码，仅用于测试
        success: function () { },
        fail: function () { }
      })
    }
  },
  FootMark(e) {
    let id = e.currentTarget.dataset.id;
    tt.navigateTo({
      url: '/pages/card/customer_history/customer_history?id=' + id,
    })

  },
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