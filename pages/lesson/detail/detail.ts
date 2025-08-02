// import { request } from "@douyin-microapp/typings/api/request";
// import { User } from "../../../api/user";
// import { httpGet } from "../../../utils/request";

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     kcxq: {},
//     xsxs: true,
//     kccs: {},
//     controls: true,
//     jsCode: '',
//     sffx: true,
//     sfczkl: false,
//     priceName: "",
//     loginData: {
//       openId: "",
//       brandId: 2,
//       userId: "",
//       storeStatus: "",
//       storeId: "",
//       token: "",
//       wxName: "",
//       wxPhoto: "",
//       name: "",
//       role: 0,
//       phone: "",
//       number: "",
//       sex: "",
//       address: ''
//     },
//     KL: '',
//     //存储计时器
//     setInter: '',
//     num: 1,
//     ztbf: false
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   queryTime() {
//     const that = this;

//     that.data.setInter = setInterval(function () {

//       var numVal = that.data.num + 1;
//       that.setData({
//         num: numVal
//       });

//     }, 1000)
//   },
//   onLoad(options) {
//     if (options.type == 2) {
//       this.setData({
//         priceName: "免费课程"
//       })
//     } else if (options.type == 3) {
//       this.setData({
//         priceName: "付费课程"
//       })
//     }
//     console.log(options.type);

//     this.getSolution2(options.id, options.type)
//     this.setData({
//       kccs: options
//     })
//   },
//   xrkl() {
//     if (this.data.KL == '') {
//       tt.showToast({
//         title: '请先输入口令！', //提示的内容
//         duration: 2000, //持续的时间
//         icon: 'none', //图标有success、error、loading、none四种
//       })
//       return
//     }
//     let url = User.checkWord
//     let data = {
//       word: this.data.KL
//     }
//     let that = this;
//     httpGet(
//       url,
//       data
//     ).then(res3 => {
//       if (res3.code == '1') {
//         tt.showToast({
//           title: res3.msg, //提示的内容
//           duration: 2000, //持续的时间
//           icon: 'none', //图标有success、error、loading、none四种
//         })
//         tt.setStorageSync('KLxx', res3.record)
//         this.setData({
//           sfczkl: false
//         })
//         this.getSolution2(that.data.kccs.id, that.data.kccs.type)

//       } else {
//         tt.showToast({
//           title: res3.msg, //提示的内容
//           duration: 2000, //持续的时间
//           icon: 'none', //图标有success、error、loading、none四种
//         })
//       }

//     })
//   },
//   xrkl1() {
//     this.setData({
//       sfczkl: false
//     })
//     return
//   },
//   consigneeNameInput(e) {
//     this.setData({
//       KL: e.detail.value
//     })
//   },
//   Privacy() { //隐私条款
//     tt.navigateTo({
//       url: '/pages/privacy/index',
//     })
//   },
//   goxzss() {
//     tt.navigateBack({
//       delta: 1 // 表示返回上一页  
//     })
//   },
//   bindfullscreenchange(event) {
//     console.log(event);
//     if (!event.detail.fullScreen) {
//       // 退出全屏
//       const videoContext = tt.createVideoContext('myVideo');
//       videoContext.pause()

//     }
//     else {

//     }
//   },
//   onPlay() {
//     const videoContext = tt.createVideoContext('myVideo');

//     if (!this.data.kcxq.unlock || this.data.kcxq.unlock == 1) {
//       videoContext.requestFullScreen();
//       this.setData({
//         xsxs: false
//       })
//       this.queryTime()
//     } else {
//       videoContext.pause();

//       tt.showToast({
//         title: '请先购买,在观看！',
//         icon: 'none',
//       });
//     }

//   },
//   onPause() {

//     clearInterval(this.data.setInter)

//   },
//   BFAN() {
//     if (!tt.getStorageSync('authUserInfo')) {
//       this.setData({
//         login: true
//       })
//       return
//     }

//     if (this.data.kcxq.fileType == 2) {
//       tt.showLoading({
//         title: '加载中',
//       })
//       // 使用wx.downloadFile下载PDF文件  
//       tt.downloadFile({
//         url: this.data.kcxq.fileUrl, // 替换为你的PDF文件URL  
//         success: function (res) {
//           // 文件下载成功后，获取文件的临时路径  
//           const filePath = res.tempFilePath;
//           // 使用wx.openDocument打开文件  
//           tt.openDocument({
//             filePath: filePath,
//             success: function (res) {
//               // 文件打开成功  
//               console.log('打开文档成功');
//               tt.hideLoading(); // 隐藏加载提示  
//             },
//             fail: function (err) {
//               // 文件打开失败  
//               console.error('打开文件失败', err);
//               tt.showToast({
//                 icon: 'none',
//                 title: '打开文件失败',
//               });
//             }
//           });
//         },
//         fail: function (err) {
//           // 文件下载失败  
//           console.error('下载文件失败', err);
//           tt.showToast({
//             icon: 'none',
//             title: '下载文件失败',
//           });
//         }
//       });
//     }
//     if (this.data.kcxq.fileType == 3) {
//       let data = {
//         linkUrl: this.data.kcxq.fileUrl,
//         title: this.data.kcxq.title,
//         type: 2
//       }
//       tt.navigateTo({
//         url: '/pages/web/index?data=' + JSON.stringify(data),
//       })

//     } else {
//       this.queryTime()
//       const videoContext = tt.createVideoContext('myVideo');
//       videoContext.play();
//     }

//   },

//   fxsb() {
//     if (!tt.getStorageSync('authUserInfo')) {
//       this.setData({
//         login: true
//       })
//       return
//     }
//   },
//   xzsc() {

//     if (!tt.getStorageSync('authUserInfo')) {
//       this.setData({
//         login: true
//       })
//       return
//     }
//     let url = User.collecCourse
//     let data = {
//       dbName: app.globalData.dbName,
//       courseId: this.data.kcxq.id,
//       courseType: this.data.kccs.type,
//       saveFlag: this.data.kcxq.collect ? 'edit' : 'add',
//       userId: tt.getStorageSync('authUserInfo').id ? wx.getStorageSync('authUserInfo').id : ""
//     }
//     let that = this;
//     httpGet(
//       url,
//       data
//     ).then(res3 => {
//       if (res3.code == '1') {
//         let kcxq = this.data.kcxq
//         kcxq.collect = res3.collect ? res3.collect : ''
//         this.setData({
//           kcxq: kcxq
//         })
//         tt.showToast({
//           title: res3.msg,
//           icon: 'none',
//           duration: 800
//         })
//       } else {
//         that.setData({
//           kcxq: {}
//         })
//       }

//     })
//   },
//   dkcpxx() {
//     if (this.data.kcxq.fileType == 2) {
//       tt.showLoading({
//         title: '加载中',
//       })
//       // 使用wx.downloadFile下载PDF文件  
//       tt.downloadFile({
//         url: this.data.kcxq.fileUrl, // 替换为你的PDF文件URL  
//         success: function (res) {
//           // 文件下载成功后，获取文件的临时路径  
//           const filePath = res.tempFilePath;
//           // 使用wx.openDocument打开文件  
//           wx.openDocument({
//             filePath: filePath,
//             success: function (res) {
//               // 文件打开成功  
//               console.log('打开文档成功');
//               wx.hideLoading(); // 隐藏加载提示  
//             },
//             fail: function (err) {
//               // 文件打开失败  
//               console.error('打开文件失败', err);
//               wx.showToast({
//                 icon: 'none',
//                 title: '打开文件失败',
//               });
//             }
//           });
//         },
//         fail: function (err) {
//           // 文件下载失败  
//           console.error('下载文件失败', err);
//           wx.showToast({
//             icon: 'none',
//             title: '下载文件失败',
//           });
//         }
//       });
//     }
//     if (this.data.kcxq.fileType == 3) {
//       let data = {
//         linkUrl: this.data.kcxq.fileUrl,
//         title: this.data.kcxq.title,
//         type: 2
//       }
//       wx.navigateTo({
//         url: '/pages/web/index?data=' + JSON.stringify(data),
//       })

//     }
//   },
//   getSolution2(id, type) {
//     console.log(id, type);
//     let url = baseUrl + User.getCourseById
//     let data = {
//       dbName: app.globalData.dbName,
//       id: id,
//       type: type,
//       userId: wx.getStorageSync('authUserInfo').id ? wx.getStorageSync('authUserInfo').id : ""
//     }
//     let that = this;
//     request({
//       url,
//       data
//     }).then(res3 => {
//       if (res3.data.code == '1') {
//         let detail = res3.data.record.detail || '';
//         // 将detail字符串按数字序号分割成数组
//         let detailList = detail.split(/\d+\./).filter(item => item.trim());

//         that.setData({
//           kcxq: {
//             ...res3.data.record,
//             detailList: detailList
//           }
//         })
//       }
//     })
//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow() {
//     this.setData({
//       login: wx.getStorageSync('authUserInfo') ? false : true,
//       sffx: wx.getStorageSync('authUserInfo') ? true : false
//     })

//     if (wx.getStorageSync('authUserInfo')) {
//       if (!wx.getStorageSync('KLxx')) {
//         this.setData({
//           sfczkl: true
//         })
//       }
//     }
//     this.getJscode()
//   },
//   getJscode() {
//     let that = this
//     wx.login({
//       success(res) {
//         that.setData({
//           jsCode: res.code
//         })
//       }
//     })
//   },
//   NogetUserInfo() {
//     this.setData({
//       login: false,
//       sffx: false
//     })
//   },
//   // 获取手机号
//   getPhoneNumber(e) {

//     let that = this
//     if (e.detail.errMsg.indexOf('ok') > -1) {
//       wx.login({
//         success(res) {
//           let url = baseUrl + User.getPhone
//           let data = {
//             dbName: app.globalData.dbName,
//             js_code: that.data.jsCode,
//             encryptedData: e.detail.encryptedData,
//             iv: e.detail.iv
//           }
//           request({
//             url,
//             data
//           }).then(res => {
//             if (res.data.code == "1") {
//               console.log(res.data);
//               that.setData({
//                 phoneFlag: true,
//                 ['loginData.phone']: res.data.phoneNumber,
//                 ['loginData.openId']: res.data.openid,
//                 ['Userinformation.phone']: res.data.phoneNumber
//               })
//               app.globalData.isPhone = true
//               that.login();

//               setTimeout(() => {
//                 wx.hideLoading()
//                 // wx.navigateBack()
//               }, 1000)
//             }
//           })
//         }
//       })
//     } else {
//       // wx.navigateBack()
//       wx.hideLoading()
//     }
//   },
//   // 登录
//   login() {
//     let that = this
//     let pages = getCurrentPages();
//     let url = baseUrl + User.wxLogin
//     let data = this.data.loginData
//     let {
//       address
//     } = wx.getStorageSync('dizdenlu')
//     data.address = !address ? '' : address
//     data.storeStatus = app.globalData.Scene

//     request({
//       url,
//       data
//     }).then(res => {
//       if (res.data.code == "1") {
//         // var a = {
//         //   address: "",
//         //   brandId: 2,
//         //   createTime: "2023-02-27 10:21:12",
//         //   id: 8,
//         //   integral: 0,
//         //   joinTime: "",
//         //   name: "",
//         //   openId: "o2jLp4tq7OG9euQ3lSLnMDzqZ-Ws",
//         //   phone: "",
//         //   role: 4,
//         //   score: 0,
//         //   storeStatus: 1001,
//         //   token: "990e67b930c04cd7a558ffdc88284fa2",
//         //   updateTime: "",
//         //   wxName: "开始.",
//         //   cs: '测试'
//         // }
//         // var b = wx.setStorageSync('authUserInfo', a)
//         wx.setStorageSync('authUserInfo', res.data.user);


//         this.setData({
//           login: false,
//           sffx: true
//         })
//         if (!wx.getStorageSync('KLxx')) {
//           this.setData({
//             sfczkl: true
//           })

//         }
//       }


//     })
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */

//   onHide() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload() {
//     var that = this;
//     //清除计时器  即清除setInter
//     clearInterval(that.data.setInter)
//     let authUserInfo = wx.getStorageSync('authUserInfo')

//     if (authUserInfo && that.data.num > 1) {
//       that.PostAccessRecord()

//     }
//   },
//   // 记录浏览足迹
//   PostAccessRecord() {
//     let that = this;
//     let url = baseUrl + User.addUserStudy
//     let data = {
//       dbName: dbName,
//       studyTime: that.data.num,
//       courseId: that.data.kcxq.id,
//       courseName: that.data.kcxq.title,
//       userId: wx.getStorageSync('authUserInfo').id ? wx.getStorageSync('authUserInfo').id : ''
//     }
//     request({
//       url,
//       data
//     }).then(res3 => {

//     })

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage() {

//     return {
//       title: this.data.kcxq.title,
//       path: '/pages/XPLL/KCXQ/index?id=' + this.data.kcxq.id + '&type=' + this.data.kccs.type,
//       imageUrl: this.data.kcxq.photo
//     }

//   }
// })