import { GET } from "../../../api/GET"
import { env } from "../../../constants/env"
import { httpGet } from "../../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tltie: "",
    conost: '',
    image: '',
    erwm: [] as unknown[],
    _id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options && options.item) {
      this.setData({
        tltie: JSON.parse(options.item).title,
        conost: JSON.parse(options.item).detail,
        image: JSON.parse(options.item).photo,
        _id: JSON.parse(options.item).id
      }, () => {
        let img = []
        img.push(this.data.image)
        this.setData({
          erwm: img
        })
      })
    }
  },
  // 删除头像图片
  shanc: function (e) {
    console.log(e)
    var tha = this
    var tupian = tha.data.erwm
    var ind = app.hdindex(e, 'ind')

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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  methods() {

    let that = this;
    tt.chooseImage({
      success: (res: { tempFilePaths: any }) => {
        console.log(res);

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
  ModifyData() {
    let that = this;
    if (!that.data.tltie) {
      tt.showToast({
        title: '请输入文章标题',
        icon: 'none'
      })
      return false
    }
    if (!that.data.conost) {
      tt.showToast({
        title: '请输入文章内容',
        icon: 'none'
      })
      return false
    }
    if (!that.data.erwm.length) {
      tt.showToast({
        title: '请上传文章图片',
        icon: 'none'
      })
      return false
    }
    let newArray = that.data.erwm.map(value => {
      return {
        url: value,
        name: "图片"
      };
    });
    let url = GET.publish_new_content
    let data = {
      userId: tt.getStorageSync('authUserInfo').id || 12,
      title: that.data.tltie,
      detail: that.data.conost,
      photo: newArray[0].url,
      images: newArray,
      type: 1,
      saveFlag: that.data._id ? "edit" : "add",
    }
    if (that.data._id) {
      data.id = that.data._id
    }
    httpGet(
      url,
      data
    ).then(res3 => {
      tt.showModal({
        title: '提示',
        content: that.data._id ? '修改成功' : '创建成功',
        showCancel: false,
        success(res) {
          tt.navigateBack({
            delta: 1
          });
        }
      })
    })
  },
  inputTltie: function (e) {
    var title = e.detail.value;
    this.setData({
      tltie: title

    })
  },
  inputConost: function (e) {
    var conost = e.detail.value;

    this.setData({
      conost: conost

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
  previewImage() {
    tt.previewImage({
      urls: [this.data.ContentInformation.image], // 需要预览的图片http链接列表
      current: '', // 当前显示图片的http链接
    })
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