import { GET } from "../../api/GET"
import { httpGet } from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {

    kclist: [],

    kcindex: 0,
    KGKCLIST: [],
    FFKCLIST: [],
    KL: '',
    srkl: false,
    HomeImageslist: [],
    jsCode: '',
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
    GetItem: "",
    currentTabImg: 0,
    currentTab: 0,
    customTabBgImages: [
      'https://cdn.juesedao.cn/mdy/2abe61255b654c64b3af317bba5d9f62',
      'https://cdn.juesedao.cn/mdy/1785dcccbc5e4e1cb02dbf7ed620c5bc',
      'https://cdn.juesedao.cn/mdy/11f41f6a8b7b412f87bed98936297807'
    ],
    czCardList: [
      {
        bg: 'https://cdn.juesedao.cn/mdy/c68cff8f831c41299090f6ae4426e1d8', // 你来填写图片地址
        title: '智慧门店',
        subtitle: '认知篇'
      },
      {
        bg: 'https://cdn.juesedao.cn/mdy/efddc66343cf482fb4d83777f1a981fe', // 你来填写图片地址
        title: '抖音流量',
        subtitle: '操作篇'
      },
      {
        bg: 'https://cdn.juesedao.cn/mdy/6a503c70c9fa4eac94d6c77860c03dd7', // 你来填写图片地址
        title: '抖音流量',
        subtitle: '操作篇'
      },
      {
        bg: 'https://cdn.juesedao.cn/mdy/37f8c9eb9cd84f228fb3c8f76d23774d', // 你来填写图片地址
        title: '营销策略',
        subtitle: '操作篇'
      }
    ],
  },
  gocp(e) {
    let type = e.currentTarget.dataset.type
    if (type == 0) {
      tt.navigateTo({
        url: '/pages/XPLL/WD/index',
      })
    }
    if (type == 1) {
      tt.navigateTo({
        url: '/pages/XPLL/KCSC/index',
      })
    }
    if (type == 2) {
      tt.showToast({
        title: '此功能尚未开发完成，敬请期待！', //提示的内容
        duration: 2000, //持续的时间
        icon: 'none', //图标有success、error、loading、none四种
      })
    }
    if (type == 3) {
      let data = {
        linkUrl: 'https://mp.weixin.qq.com/s/MUxis67IhxZN80otZtH8zA',
        title: '蜜多云科技有限公司',
        type: 2
      }
      tt.navigateTo({
        url: '/pages/web/index?data=' + JSON.stringify(data),
      })
    } if (type == 4) {
      tt.showToast({
        title: '此功能尚未开发完成，敬请期待！', //提示的内容
        duration: 2000, //持续的时间
        icon: 'none', //图标有success、error、loading、none四种
      })
    }
  },
  Privacy() { //隐私条款
    tt.navigateTo({
      url: '/pages/privacy/index',
    })
  },
  // PostLikeArticle: function (e) {
  //   console.log(e[0].currentTarget);
  //   // let GetItem = e[0].currentTarget.dataset.item
  //   this.setData({
  //     GetItem: e[0].currentTarget.dataset.item
  //   })
  //   console.log(this.data.GetItem);
  //   if (!tt.getStorageSync('authUserInfo')) {
  //     this.setData({
  //       login: true
  //     })
  //     return
  //   }
  //   let url = baseUrl + User.coursePay
  //   let data = {
  //     dbName: app.globalData.dbName,
  //     money: (this.data.GetItem.money * 100).toFixed(),
  //     courseId: this.data.GetItem.id,
  //     userId: tt.getStorageSync('authUserInfo').id ? tt.getStorageSync('authUserInfo').id : "",
  //     openId: tt.getStorageSync('authUserInfo').openId ? tt.getStorageSync('authUserInfo').openId : ""
  //   }
  //   let that = this;
  //   tt.showLoading({
  //     title: '加载中..',
  //     mask: true
  //   })
  //   request({
  //     url,
  //     data
  //   }).then(res3 => {
  //     if (res3.data.code == '1') {
  //       tt.hideLoading()
  //       let data = res3.data.record
  //       console.log(data);
  //       tt.requestPayment({
  //         timeStamp: data.timeStamp,
  //         nonceStr: data.nonceStr,
  //         package: data.package,
  //         signType: 'MD5',
  //         paySign: data.paySign,
  //         success(res) {
  //           tt.showToast({
  //             title: '支付成功', //提示的内容
  //             duration: 2000, //持续的时间
  //             icon: 'success', //图标有success、error、loading、none四种
  //             mask: true //显示透明蒙层 防止触摸穿透
  //           })
  //           that.getSolution2ById(GetItem.id)
  //         },
  //         fail: () => {
  //           tt.showToast({
  //             title: '取消支付', //提示的内容
  //             duration: 2000, //持续的时间
  //             icon: 'error', //图标有success、error、loading、none四种
  //             mask: true //显示透明蒙层 防止触摸穿透
  //           })
  //           that.getSolution2ById(that.data.GetItem.id)
  //         },
  //         complete: (err) => {
  //         }
  //       })
  //     } else {
  //     }
  //   })
  // },
  getSolution2ById(id) {
    let url = GET.get_course_by_id
    let data = {
      id: id,
      type: 3,
      userId: tt.getStorageSync('authUserInfo').id ? tt.getStorageSync('authUserInfo').id : ""
    }
    let that = this;
    httpGet(
      url,
      data
    ).then(res3 => {
      if (res3.code == '1') {
        that.setData({
          kcxq: res3.record
        })
      } else {
        that.setData({
          kcxq: {}
        })
      }
    })
  },
  // 获取jsCode值
  getJscode() {
    let that = this
    tt.login({
      success(res) {
        that.setData({
          jsCode: res.code
        })
      }
    })
  },
  onLoad(options) {
    this.getJscode()
  },
  getHomeImages() {
    let url = baseUrl + User.getHomeImages
    let data = {
      dbName: app.globalData.dbName,
      area: 9
    }
    request({
      url,
      data
    }).then(res3 => {
      if (res3.data.code == '1') {

        this.setData({
          HomeImageslist: res3.data.records
        })
      }


    })
  },
  consigneeNameInput(e) {
    this.setData({
      KL: e.detail.value
    })
  },
  xrkl() {
    let authUserInfo = tt.getStorageSync('authUserInfo')
    if (!authUserInfo) {
      this.setData({
        login: true
      })
      return
    }
    if (this.data.KL == '') {
      tt.showToast({
        title: '请先输入口令！', //提示的内容
        duration: 2000, //持续的时间
        icon: 'none', //图标有success、error、loading、none四种
      })
      return
    }
    let url = baseUrl + User.checkWord
    let data = {
      dbName: app.globalData.dbName,
      word: this.data.KL
    }
    let that = this;
    request({
      url,
      data
    }).then(res3 => {
      if (res3.data.code == '1') {
        tt.setStorageSync('KLxx', res3.data.record)
        this.setData({
          srkl: false,
          KL: ''
        })
        tt.navigateTo({
          url: '/pages/XPLL/MDJC/index?kcindex=' + this.data.kcindex,
        })

      } else {
        tt.showToast({
          title: res3.data.msg, //提示的内容
          duration: 2000, //持续的时间
          icon: 'none', //图标有success、error、loading、none四种
        })
      }

    })
  },
  xrkl1() {
    this.setData({
      srkl: false
    })
  },
  gokjxs(e) {
    let authUserInfo = tt.getStorageSync('authUserInfo')
    if (!authUserInfo) {
      this.setData({
        login: true
      })
      return
    }
    let item = e.currentTarget.dataset.item
    console.log(item);
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    // let id = item.id
    this.setData({
      kcindex: index
    })
    // if (!wx.getStorageSync('KLxx') && item.id == 2) {
    // 	this.setData({
    // 		srkl: true
    // 	})
    // 	return
    // }

    tt.navigateTo({
      url: '/pages/XPLL/MDJC/index?kcindex=' + index,
    })
    // wx.navigateTo({
    // 	url: '/pages/XPLL/KCXQ/index?id='+id +'&type='+type,
    // })

  },
  gogkkc(e) {
    let authUserInfo = tt.getStorageSync('authUserInfo')
    if (!authUserInfo) {
      this.setData({
        login: true
      })
      return
    }
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    tt.navigateTo({
      url: '/pages/XPLL/KCXQ/index?id=' + id + '&type=' + type,
    })

  },
  ggkc() {
    let authUserInfo = tt.getStorageSync('authUserInfo')
    if (!authUserInfo) {
      this.setData({
        login: true
      })
      return
    }
    tt.navigateTo({
      url: '/pages/XPLL/QBGC/index',
    })
  },
  gomdjc() {
    this.setData({
      kcindex: 0
    })
    if (!tt.getStorageSync('KLxx')) {
      this.setData({
        srkl: true
      })
      return
    }
    tt.navigateTo({
      url: '/pages/XPLL/MDJC/index?kcindex=' + 0,
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
    this.getSolution1()
    this.getSolution2()
    this.getSolution3()
  },
  NogetUserInfo() {
    this.setData({
      login: false,
    })
  },
  getSolution1() {
    let url = GET.get_top_course_1
    let data = {
      brandId: tt.getStorageSync('KLxx').brandCode ? tt.getStorageSync('KLxx').brandCode : ''
    }
    let that = this;
    httpGet(
      url,
      data
    ).then(res3 => {
      if (res3.code == '1') {
        let yspz = [
          {
            pic: 'https://cdn.juesedao.cn/mdy/b19fb5b6bee3452f99348bf4c44a7cb5',
            bacolor1: "#2BA6DB",
            bacolor2: "#4BC7FC",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/74070d07422f4191b286825224a38807',
            bacolor1: "#3C78FD",
            bacolor2: "#4B96FC",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/6bf3a2b2a6384bb9b3837d102f2c3c96',
            bacolor1: "#F1823A",
            bacolor2: "#F99324",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/2a65a5e4bc2a4b1b9602848680d279bc',
            bacolor1: "#9566F4",
            bacolor2: "#AF7CFD",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/d01afc8a4506430296d4d5938b71a9b0',
            bacolor1: "#F1B33A",
            bacolor2: "#F9D724",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/100fdc3e7c374abb9352b4667d484004',
            bacolor1: "#636ED6",
            bacolor2: "#7C89FD",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/ba21f5f3b25a48c0a2457e1820f03ec5',
            bacolor1: "#2BA6DB",
            bacolor2: "#4BC7FC",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/1da2dd7ce85c4713b2ae4b8dec3a6965',
            bacolor1: "#3C78FD",
            bacolor2: "#4B96FC",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/059e6d54cace4440a7bebf129ad9fbbf',
            bacolor1: "#F1823A",
            bacolor2: "#F99324",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/943c8b73b9bd42298012b1e02119140b',
            bacolor1: "#9566F4",
            bacolor2: "#AF7CFD",
          }

        ]
        for (let i = 0; i < res3.records.length; i++) {
          // 检查kclist[i]是否存在，以避免在kclist较短时出错  
          if (yspz[i]) {
            res3.records[i].pic = yspz[i].pic;
            res3.records[i].bacolor1 = yspz[i].bacolor1;
            res3.records[i].bacolor2 = yspz[i].bacolor2;
            // 可以继续添加其他属性  
          }
          // 如果kclist[i]不存在（即kclist比a短），则不执行上述操作  
          // 但由于我们是在遍历a的长度，所以这种情况不会发生  
        }


        that.setData({
          kclist: res3.records
        })
      } else {
        that.setData({
          kclist: []
        })
      }

    })
  },
  getSolution2() {
    let url = GET.get_top_course_2
    let that = this;
    httpGet(
      url
    ).then(res3 => {
      if (res3.code == '1') {

        that.setData({
          KGKCLIST: res3.records
        })
      } else {
        that.setData({
          KGKCLIST: []
        })
      }

    })
  }, getSolution3() {
    let url = GET.get_top_course_3
    let data = {
      userId: tt.getStorageSync('authUserInfo').id ? tt.getStorageSync('authUserInfo').id : ""
    }
    let that = this;
    httpGet(
      url,
      data
    ).then(res3 => {
      if (res3.code == '1') {
        let yspz = [
          {
            pic: 'https://cdn.juesedao.cn/mdy/81254ee70b5e48939d46a076b7c78a94',
            bacolor1: "#444084",
            bacolor2: "#76749B",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/72b17132b534424d88c36c6b49cd46c4',
            bacolor1: "#40847C",
            bacolor2: "#749B99",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/0537fad48fc142149c82335ada58e41d',
            bacolor1: "#844C40",
            bacolor2: "#9B8274",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/81254ee70b5e48939d46a076b7c78a94',
            bacolor1: "#444084",
            bacolor2: "#76749B",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/72b17132b534424d88c36c6b49cd46c4',
            bacolor1: "#40847C",
            bacolor2: "#749B99",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/0537fad48fc142149c82335ada58e41d',
            bacolor1: "#844C40",
            bacolor2: "#9B8274",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/81254ee70b5e48939d46a076b7c78a94',
            bacolor1: "#444084",
            bacolor2: "#76749B",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/72b17132b534424d88c36c6b49cd46c4',
            bacolor1: "#40847C",
            bacolor2: "#749B99",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/0537fad48fc142149c82335ada58e41d',
            bacolor1: "#844C40",
            bacolor2: "#9B8274",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/81254ee70b5e48939d46a076b7c78a94',
            bacolor1: "#444084",
            bacolor2: "#76749B",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/72b17132b534424d88c36c6b49cd46c4',
            bacolor1: "#40847C",
            bacolor2: "#749B99",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/0537fad48fc142149c82335ada58e41d',
            bacolor1: "#844C40",
            bacolor2: "#9B8274",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/81254ee70b5e48939d46a076b7c78a94',
            bacolor1: "#444084",
            bacolor2: "#76749B",
          },
          {
            pic: 'https://cdn.juesedao.cn/mdy/72b17132b534424d88c36c6b49cd46c4',
            bacolor1: "#40847C",
            bacolor2: "#749B99",
          }, {
            pic: 'https://cdn.juesedao.cn/mdy/0537fad48fc142149c82335ada58e41d',
            bacolor1: "#844C40",
            bacolor2: "#9B8274",
          },

        ]
        for (let i = 0; i < res3.records.length; i++) {
          // 检查kclist[i]是否存在，以避免在kclist较短时出错  
          if (yspz[i]) {
            res3.records[i].pic = yspz[i].pic;
            res3.records[i].bacolor1 = yspz[i].bacolor1;
            res3.records[i].bacolor2 = yspz[i].bacolor2;
            // 可以继续添加其他属性  
          }
          // 如果kclist[i]不存在（即kclist比a短），则不执行上述操作  
          // 但由于我们是在遍历a的长度，所以这种情况不会发生  
        }
        this.setData({
          FFKCLIST: res3.records
        })
        that.setData({
          FFKCLIST: res3.records
        })
      } else {
        that.setData({
          FFKCLIST: []
        })
      }

    })
  },
  goxzss() {
    tt.navigateBack({
      delta: 1 // 表示返回上一页  
    })
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

  onTabImgTap(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({
      currentTabImg: idx
    });
  },

  onNativeTabTap(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({
      currentTab: idx
    });
  },

  onBlankTabTap(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({
      currentTab: idx
    });
  },

  onCustomTabTap(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({
      currentTab: idx
    });
  },

  onCardBtnTap(e) {
    const idx = e.currentTarget.dataset.index;
    tt.showToast({ title: '点击了第' + (idx + 1) + '个教程', icon: 'none' });
  },
})