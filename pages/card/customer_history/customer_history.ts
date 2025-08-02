import { GET } from "../../../api/GET"
import { httpGet } from "../../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topHeight: "",
    _id: '',
    Userinfo: {},
    UserList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      _id: options.id
    })
    this.getHeaderH()
    this.getUsrtFootmark()
    this.getUserinformation()

  },
  PreviousPage() {
    tt.navigateBack({
      delta: 1
    });
  },
  getShare(e) {
    let id = e.currentTarget.dataset.item.id;
    tt.navigateTo({
      url: '/pages/dry_cargo/dry_cargo_detailed/index?id=' + id,
    })
  },
  getHeaderH() {
    var tha = this
    //获取系统信息
    tt.getSystemInfo({
      success: res => {
        var system = res
        //获取胶囊信息
        var menu = tt.getMenuButtonBoundingClientRect()
        var systemBar = system.statusBarHeight //状态栏高度
        var navigationBar = (menu.top - system.statusBarHeight) * 2 + menu.height //胶囊高度
        var touHeight = (+systemBar) + (+navigationBar)
        tha.setData({
          topHeight: touHeight
        })
      }
    })
  },
  Contact(e) {
    if (this.data.Userinfo && !this.data.Userinfo.phone) {
      tt.showModal({
        title: '用户暂未授权手机号',
        icon: 'success',
        duration: 2000,
        showCancel: false // 2秒
      });
    } else {
      tt.makePhoneCall({
        phoneNumber: this.data.Userinfo.phone, //此号码并非真实电话号码，仅用于测试
        success: function () { },
        fail: function () { }
      })
    }
  },
  getUsrtFootmark() {
    let that = this;
    let url = GET.customer_history
    let data = {
      userId: that.data._id
    }
    httpGet(
      url,
      data
    ).then(res3 => {


      that.setData({
        UserList: res3.record
      })
    })
  },
  getUserinformation() {
    let that = this;
    let url = GET.customer_info
    let data = {
      userId: that.data._id
    }
    httpGet(
      url,
      data
    ).then(res3 => {
      that.setData({
        Userinfo: res3.record
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})