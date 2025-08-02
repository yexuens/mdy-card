import { GET } from "../../../api/GET";
import { httpGet } from "../../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    MyArticleList: [],
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { },
  EditEssay(e) {
    let item = e.currentTarget.dataset.item
    tt.navigateTo({
      url: '/pages/content/publish_new/publish_new?item=' + JSON.stringify(item),
    })
  },
  DeleteBata() {
    let that = this;
    that.getMyArticle()
    this.setData({
      show: !that.data.show
    })
    let list = []
    that.data.MyArticleList.forEach((item) => {
      if (item.Select) {
        list.push(item.id)
      }
    })
    if (list && list.length) {
      let url = GET.delete_content
      let data = {
        listid: list.join()
      }
      httpGet(
        url,
        data
      ).then(res3 => {
        that.getMyArticle()
        let item = that.data.MyArticleList.forEach((item) => {
          item.Select = false

        })
        that.setData({
          MyArticleList: item
        })
      })
    }

  },
  Select_Cancel(e) {
    let id = e.currentTarget.dataset.item.id
    let Select = e.currentTarget.dataset.item.Select
    this.data.MyArticleList.forEach((item) => {
      if (item.id == id) {
        item.Select = true
      }
      if (item.id == id && Select) {
        item.Select = false
      }
    })
    this.setData({
      MyArticleList: this.data.MyArticleList
    })
  },
  getMyArticle() {
    let that = this;
    let url = GET.my_content_list
    let data = {
      userId: tt.getStorageSync('authUserInfo').id || 12
    }
    httpGet(
      url,
      data
    ).then(res3 => {
      if (res3.code == '1') {
        res3.record.forEach((item) => {
          item.Select = false
        })
        that.setData({
          MyArticleList: res3.record
        })
      } else {
        that.setData({
          MyArticleList: []
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  Lookver(e) {
    let id = e.currentTarget.dataset.id
    tt.navigateTo({
      url: '/pages/history/read/index?id=' + id,
    })
  },
  onReady() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getMyArticle()

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
  onShareAppMessage(e) {

  }

})