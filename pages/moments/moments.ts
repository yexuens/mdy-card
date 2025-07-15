import { GET } from "../../api/GET"
import { httpGet } from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    address: '',
    banner: '',
    bricklayerColumnDataList: [
      {
        coverPic: 'https://cdn.juesedao.cn/mdy/e6012591e8d0446fba8ef7e9f9e5f5f0',
        title: '312313123131'
      }, {

        coverPic: 'https://cdn.juesedao.cn/mdy/e6012591e8d0446fba8ef7e9f9e5f5f0',
        title: '312313123131'
      }, {
        coverPic: 'https://cdn.juesedao.cn/mdy/e6012591e8d0446fba8ef7e9f9e5f5f0',
        title: '312313123131'
      }, {
        coverPic: 'https://cdn.juesedao.cn/mdy/e6012591e8d0446fba8ef7e9f9e5f5f0',
        title: '312313123131'
      }, {
        coverPic: 'https://cdn.juesedao.cn/mdy/e6012591e8d0446fba8ef7e9f9e5f5f0',
        title: '312313123131'
      }, {
        coverPic: 'https://cdn.juesedao.cn/mdy/e6012591e8d0446fba8ef7e9f9e5f5f0',
        title: '312313123131'
      }
    ],
    ajxtrue: false,
    Recommend: [],
    list1: [],
    list2: [],
    list3: [],

    // 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navBarHeight: app.globalData.navBarHeight,
      menuRight: app.globalData.menuRight,
      menuTop: app.globalData.menuTop,
      menuHeight: app.globalData.menuHeight,
    })
  },
  getFriendsCircle() {
    httpGet(GET.get_friends_circle).then(res3 => {
      res3.records.forEach((item) => {
        if (item.images) {
          item.images = JSON.parse(item.images)

        }
      })

      this.setData({
        list1: res3.records
      })

    })

  },


  previewImage1: function (e) {
    tt.previewImage({
      urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
      current: '', // 当前显示图片的http链接
    })
  },
  previewImage2: function (e) {
    tt.previewImage({
      urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
      current: '', // 当前显示图片的http链接
    })
  },
  previewImage3: function (e) {
    tt.previewImage({
      urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
      current: '', // 当前显示图片的http链接
    })
  },
  getdetailed(e) {
    var id = e.currentTarget.dataset.item.id;
    var type = e.currentTarget.dataset.item.type;
    var linkUrl = e.currentTarget.dataset.item.linkUrl;
    var data = e.currentTarget.dataset.item;
    if (type && type == 2 && linkUrl != '') {
      tt.navigateTo({
        url: '/pages/web/web?url=' + data.linkUrl,
      })
    } else if (type && type == 3) {
      data = {
        linkUrl: data.video,
        classify: data.classify,
        id: data.id,
        title: data.title,
        type: data.type
      }
      tt.navigateTo({
        url: '/pages/web/web?url=' + data.linkUrl,
      })
    } else {
      tt.navigateTo({
        url: '/pages/dry_cargo/dry_cargo_detailed/index?id=' + id + '&type=' + type,
      })
    }

  },
  getRecommend() { //推荐文章
    let that = this;
    httpGet(GET.home_article_list).then(res3 => {
      that.setData({
        Recommend: res3.record
        // Recommend:[]
      })


    })
  },
  onShareTimeline: function (res) {
    var that = this;
    return {
      title: `合作案例`,
      query: "",
      success: function (res) { },
    };
  },
  getSubscribe() {
    httpGet(GET.get_subscribe).then(res3 => {
      this.setData({
        banner: res3.record.image,
      }, () => { })
    })
  },

  inputPhone: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
    })
  },
  inputName: function (e) {
    var name = e.detail.value;
    this.setData({
      name: name
    })
  },
  tapAdres() {
    let that = this
    tt.chooseLocation({
      success(res) {
        that.setData({
          address: res.address
        })
      }
    })
  },
  define() {
    if (this.data.name == '') {
      tt.showToast({
        title: '请输入用户名',
        icon: 'error'
      })
      return false
    }
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      tt.showToast({
        title: '号码有误',
        icon: 'error'
      })
      return false;
    }
    if (this.data.address == '') {
      tt.showToast({
        title: '地址不能为空',
        icon: 'error'
      })
      return false;
    }
    let date = new Date()
    let dates = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let data = {
      name: this.data.name,
      phone: this.data.phone,
      address: this.data.address,
      storeId: '',
      userId: tt.getStorageSync('authUserInfo')?.id,
      brandId: 2,
      date: dates
    }
    httpGet(
      GET.save_subcribe).then(res => {
        if (res.code == 1) {

          tt.showToast({
            title: '预约成功',
            icon: 'success'
          })
          this.setData({
            name: '',
            phone: '',
            address: ''
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4,
        // tebshow:true
        tebshow: true

      })
    }
    this.getSubscribe()
    this.getRecommend();
    this.getFriendsCircle();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onPageScroll: function (params) {
    this.setData({
      tapBaColor: params.scrollTop > 10 ? '#fff' : '',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "预约",
      path: 'pages/make/index'

    }
  }
})