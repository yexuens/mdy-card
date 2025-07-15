import { GET } from "../../api/GET";
import { httpGet } from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Solution: [],
    Drygoods: [],
    essayList: [],
    currentTab: 0,
    tapBaColor: '',
    searchValue: '',
    SolutionAll: [],
    essayListAll: [],
    DrygoodsAll: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSolution()


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShareTimeline: function (res) {
    var that = this;
    return {
      title: `干货`,
      query: "",
      success: function (res) { },
    };
  },
  getSolution(keyword = '') {
    let data = {
      classify: '2'
    }
    if (keyword) {
      data.keyword = keyword
    }
    let that = this;
    httpGet(GET.get_advice, data).then(res3 => {
      that.setData({
        Solution: res3.code == -1 ? [] : res3.record
      })
    })
  },
  getDrygoods(keyword = '') {
    let data = {
      classify: '1'
    }
    if (keyword) {
      data.keyword = keyword
    }
    let that = this;
    httpGet(GET.get_advice, data).then(res3 => {
      that.setData({
        Drygoods: res3.code == -1 ? [] : res3.record
      })
    })
  },
  getessayList(keyword = '') {
    let data = {
      classify: '3'
    }
    if (keyword) {
      data.keyword = keyword
    }
    let that = this;
    httpGet(GET.get_advice, data).then(res3 => {
      that.setData({
        essayList: res3.code == -1 ? [] : res3.record
      })
    })
  },
  getdetailed(e) {
    var data = e.currentTarget.dataset.item;
    tt.navigateTo({
      url: '/pages/web/web?url=' + data.linkUrl,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        // tebshow:true
        tebshow: true

      })
    }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onPageScroll: function (params) {
    this.setData({
      tapBaColor: params.scrollTop > 10 ? '#fff' : '',
    })
  },
  onTabTap(e) {
    const index = Number(e.currentTarget.dataset.index);
    this.setData({
      currentTab: index
    });
    // Load data for the new tab with current search value
    this.loadCurrentTabData(this.data.searchValue);
  },
  loadCurrentTabData(keyword = '') {
    if (this.data.currentTab === 0) {
      this.getSolution(keyword);
    } else if (this.data.currentTab === 1) {
      this.getessayList(keyword);
    } else if (this.data.currentTab === 2) {
      this.getDrygoods(keyword);
    }
  },
})