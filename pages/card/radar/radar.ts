import { GET } from "../../../api/GET";
import { httpGet } from "../../../utils/request";

// pages/business_card/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailed: {},
    VisitList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      detailed: JSON.parse(options?.detailed)
    })
    this.getNewlyIncreasedVisit()
  },
  getlist() {
    tt.navigateTo({
      url: '/pages/business_card/Visit_list/index',
    })
  },
  getNewlyIncreasedVisit() {
    let that = this;
    let url = GET.today_customer
    let data = {
      userId: tt.getStorageSync('authUserInfo').id || 12,
    }
    httpGet(
      url,
      data
    ).then(res3 => {
      // console.log(res3.data.record)
      // var a = [{
      //     count: 25,
      //     id: 9,
      //     latestTime: "2023-03-01 09:27:47",
      //     phone: "",
      //     wxName: "微信用户",
      //     wxPhoto: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
      //   },
      //   {
      //     count: 25,
      //     id: 9,
      //     latestTime: "2023-03-01 09:27:47",
      //     phone: "23423423",
      //     wxName: "微信用户",
      //     wxPhoto: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
      //   }
      // ]
      that.setData({
        // VisitList: a
        VisitList: res3.record
      })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  FootMark(e) {
    let id = e.currentTarget.dataset.id;
    tt.navigateTo({
      url: '/pages/business_card/connection/index?id=' + id,
    })

  },
  getUserList() {
    tt.navigateTo({
      url: '/pages/business_card/did_apply_list/index',
    })
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