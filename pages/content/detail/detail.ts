import { GET } from "../../../api/GET";
import { httpGet } from "../../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: {},
    LikeArticle: false,
    isGreat: '',

    //存储计时器
    setInter: '',
    num: 1,
    swiperCurrent: 1,
    _id: '',
    show: true,
    FetchCache: false,
    loginData: {
      openId: "",
      brandId: 2,
      userId: "",
      storeStatus: "",
      storeId: "",
      token: "",
      wxName: "",
      wxPhoto: "",
      name: "",
      role: 0,
      phone: "",
      number: "",
      sex: "",
      address: ''
    },
    bindingID: "",
    Fz_authUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getdetailed(id)
    if (options && options.type) {
      this.setData({
        classify: options.type,
        _id: options.id,
        bindingID: options.bindingID
      })
    }


  },
  onShareTimeline: function (res) {
    var that = this;
    return {
      title: `干货详情`,
      query: 'id=' + that.data._id + '&type=' + that.data.classify + '&bindingID=' + tt.getStorageSync('authUserInfo').id,
      success: function (res) {
      },
    };
  },
  NogetUserInfo() {
    this.setData({
      // pointOut: true,
      FetchCache: false
    })
  },
  FetchCache() {
    this.setData({
      FetchCache: true
    })
  },
  mdykj() {
    tt.navigateTo({
      url: '/pages/web/index?linkUrl=' + 'https://mp.weixin.qq.com/s/YZl9cQhJUwxbyPA0Zm-zcw' + '&type=' + 1 + '&title=' + '蜜多云科技',
    })
  },
  Privacy() { //隐私条款
    tt.navigateTo({
      url: '/pages/privacy/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getdetailed(id) {
    let url = GET.get_content_detail
    let data = {
      id: id,
      userId: tt.getStorageSync('authUserInfo').id
    }
    let that = this;
    httpGet(
      url,
      data
    ).then(res3 => {
      if (res3 && res3.code == '1' && res3.record && res3.record.isGreat) {
        that.setData({
          LikeArticle: true,
          isGreat: res3.record.isGreat
        })
      } else if (res3 && res3.code == '-1') {
        that.setData({
          show: false
        })
      }

      that.setData({
        record: res3.record,
        detail: JSON.parse(res3.record.detail),
        classify: res3.code == '1' ? res3.record.classify : '',
        _id: id,
        great: res3.code == '1' ? res3.record.great : '',
        banner: res3.record && res3.record.images ? JSON.parse(res3.record.images) : '',
      })
    })
  },
  // 轮播
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current + 1,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取缓存
    const authUserInfo = tt.getStorageSync('authUserInfo');
    console.log(authUserInfo)
    if (!authUserInfo) {
      this.setData({})
    } else {
      this.setData({
        Fz_authUserInfo: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})