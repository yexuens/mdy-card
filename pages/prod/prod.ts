import { GET } from "../../api/GET";
import { httpGet } from "../../utils/request";

// d:\Dy\mdy-card\mdy-card\pages\prod\prod.ts
Page({
  data: {
    tabList: ['数字营销', '数字化系统', '企业智能体', '多语言', '资源甄选'],
    currentTab: 0,
    scrollToView: '',
    sectionTops: [],
    showContentDatas: [],
    currentSelectColumnID: '',
    nothave: false,
    tabBarSticky: false,
    navBarHeight: 0, // 系统导航栏高度
    tabBarHeight: 0, // tab栏高度
    tabScrollLeft: 0,
    scrollLeft1: 0,
    scrollLeft2: 200, // 第二行初始偏移
    scrollTimer: null,
    line1Items: ['工艺合规校验', '实时报价引擎', '智能客服', '智能养护顾问', '工程参数咨询', '智能选品推荐', '营销素材生成', '智能库存调度', '市场需求预测'],
    line2Items: ['智能选品推荐', '营销素材生成', '智能库存调度', '市场需求预测', '工艺合规校验', '实时报价引擎', '智能客服', '智能养护顾问', '工程参数咨询'],
    marquee0Style1: '',
    marquee1Style1: '',
    marquee2Style1: '',
    marquee3Style1: '',
    marquee0Style2: '',
    marquee1Style2: '',
    marquee2Style2: '',
    marquee3Style2: '',
    recommendAll: [],
    recommendOdd: [],
    recommendEven: [],
    recommendDots: [],

  },
  onLoad: function (options) {
    // 获取系统导航栏高度
    const systemInfo = tt.getSystemInfoSync();
    const menuButtonInfo = tt.getMenuButtonBoundingClientRect();
    const navBarHeight = menuButtonInfo.bottom + 8; // 导航栏底部位置 + 额外间距

    // 获取tabBar高度
    const query = tt.createSelectorQuery();
    query.select('#tabBar').boundingClientRect();
    query.exec(res => {
      const tabBarHeight = res[0] ? res[0].height : 0;
      this.setData({
        navBarHeight,
        tabBarHeight
      });
    });
    this.getRecommend('', '推荐')
    // 初始化跑马灯滚动
    this.setData({ scrollLeft1: 0, scrollLeft2: 0 });
  },
  getRecommend(e, name) {
    const that = this
    httpGet(
      GET.product_recommend
    ).then(res3 => {
      if (res3.code == "1") {
        const all = res3.record;
        const recommendTop = [];
        const recommendBottom = [];
        all.forEach((item, idx) => {
          if (idx % 2 === 0) {
            recommendTop.push(item);
          } else {
            recommendBottom.push(item);
          }
        });
        // 计算每个圆点的 left，数量与编号一致
        const cardWidth = 260;
        const cardGap = 32;
        const recommendDots = all.map((_, idx) => {
          return { left: idx * (cardWidth + cardGap) + cardWidth / 2 };
        });
        const sectionBLineWidth = all.length > 0 ? all.length * cardWidth + (all.length - 1) * cardGap : 0;
        const sectionBLineLeft = recommendDots.length > 0 ? recommendDots[0].left : 0;
        const sectionBLineRealWidth = recommendDots.length > 1 ? recommendDots[recommendDots.length - 1].left - recommendDots[0].left : 0;
        that.setData({
          showContentDatas: all,
          recommendTop,
          recommendBottom,
          recommendAll: recommendTop.concat(recommendBottom),
          nothave: false,
          recommendOdd: all.filter((_, idx) => idx % 2 === 0),
          recommendEven: all.filter((_, idx) => idx % 2 === 1),
          recommendDots,
          sectionBLineWidth,
          sectionBLineLeft,
          sectionBLineRealWidth,
        })
      } else {
        that.setData({
          nothave: true
        })
      }
    })
  },
  Picture(e) {
    const item = e.currentTarget.dataset.item;
    tt.navigateTo({
      url: '/pages/product/picture/picture?banner=' + item.image + '&id=' + item.id,
    })
  },
  // 获取各个section的位置信息
  getSectionPositions() {
    const query = tt.createSelectorQuery();
    ['sectionA', 'sectionB', 'sectionC', 'sectionD'].forEach(id => {
      query.select('#' + id).boundingClientRect();
    });
    query.exec(res => {
      const sectionTops = res.map(r => r.top);
      this.setData({ sectionTops });
    });
  },
  onShareTimeline: function (res) {
    var that = this;
    return {
      title: `产品`,
      query: "",
      success: function (res) { },
    };
  },
  onReady: function () {
    const scrollSpeed = 0.3;
    const interval = 30;
    this.data.scrollTimer = setInterval(() => {
      let { scrollLeft1, scrollLeft2 } = this.data;
      const that = this;
      // line1Items
      tt.createSelectorQuery().select('.marquee-scroll-1 .marquee-content').boundingClientRect(rect1 => {
        tt.createSelectorQuery().select('.marquee-scroll-1').boundingClientRect(viewRect1 => {
          if (rect1 && viewRect1 && rect1.width > 0) {
            const contentWidth1 = rect1.width / 2;
            if (scrollLeft1 >= contentWidth1) {
              scrollLeft1 = 0;
            } else {
              scrollLeft1 += scrollSpeed;
            }
            that.setData({ scrollLeft1 });
          }
        }).exec();
      }).exec();
      // line2Items
      tt.createSelectorQuery().select('.marquee-scroll-2 .marquee-content').boundingClientRect(rect2 => {
        tt.createSelectorQuery().select('.marquee-scroll-2').boundingClientRect(viewRect2 => {
          if (rect2 && viewRect2 && rect2.width > 0) {
            const contentWidth2 = rect2.width / 2;
            if (scrollLeft2 >= contentWidth2) {
              scrollLeft2 = 0;
            } else {
              scrollLeft2 += scrollSpeed;
            }
            that.setData({ scrollLeft2 });
          }
        }).exec();
      }).exec();
    }, interval);

    let that = this
    that.startMarquee(1, 'line1Items', 'marqueeContain1', 'marqueeText1')
    that.startMarquee(2, 'line2Items', 'marqueeContain2', 'marqueeText2')

    // 获取各个section的位置信息
    this.getSectionPositions();
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
        // tebshow:true
        tebshow: true

      })
    }
  },
  onTabTap(e) {
    const index = e.currentTarget.dataset.index;
    const sectionIds = ['sectionA', 'sectionB', 'sectionC', 'sectionD', 'sectionE'];
    const targetId = sectionIds[index];
    const query = tt.createSelectorQuery();
    query.select('#' + targetId).boundingClientRect();
    query.select('.page-scroll').scrollOffset();
    this.setData({ currentTab: index });
    query.exec(res => {
      if (res[0] && res[1]) {
        const sectionTop = res[0].top;
        const scrollOffset = res[1].scrollTop;
        const offset = this.data.tabBarSticky
          ? 0
          : (this.data.tabBarHeight || 0) + 0;
        const targetScrollTop = scrollOffset === 0
          ? sectionTop - offset
          : scrollOffset + sectionTop - offset;
        this.setData({
          scrollTop: targetScrollTop - 40
        });
      }
    });
  },
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;

    // 获取sectionA的位置
    const query = tt.createSelectorQuery();
    query.select('#sectionA').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(res => {
      if (res[0] && res[1]) {
        const sectionABottom = res[0].bottom + res[1].scrollTop;
        // 当滚动位置超过sectionA底部时，设置tabBar为sticky
        if (scrollTop >= sectionABottom && !this.data.tabBarSticky) {
          this.setData({ tabBarSticky: true });
        } else if (scrollTop < sectionABottom && this.data.tabBarSticky) {
          this.setData({ tabBarSticky: false });
        }
      }
    });
    // 处理当前section的显示
    const sectionQuery = tt.createSelectorQuery();
    ['sectionA', 'sectionB', 'sectionC', 'sectionD', 'sectionE'].forEach(id => {
      sectionQuery.select('#' + id).boundingClientRect();
    });
    sectionQuery.exec(res => {
      const sections = res.map(r => r.top);
      const currentIndex = sections.findIndex(top => top >= 0);
      if (currentIndex !== -1 && currentIndex !== this.data.currentTab) {
        this.setData({
          currentTab: currentIndex
        });
      }
    });
  },
  _handleTabBarSticky(scrollTop) {
    // tabBar吸顶时，scrollTop >= tabBar初始top
    if (scrollTop >= this.tabBarTop && !this.data.tabBarSticky) {
      this.setData({ tabBarSticky: true });
    } else if (scrollTop < this.tabBarTop && this.data.tabBarSticky) {
      this.setData({ tabBarSticky: false });
    }
  },
  startMarquee(line, arrName, containId, textId) {
    let that = this
    if (that.data[arrName].length > 0) {
      let fns = [],
        query = tt.createSelectorQuery(),
        fn1 = new Promise((resolve, reject) => {
          query.select('#' + containId).boundingClientRect(rect => {
            resolve(rect.width)
          }).exec()
        }),
        fn2 = new Promise((resolve, reject) => {
          query.select('#' + textId).boundingClientRect(rect => {
            resolve(rect.width)
          }).exec()
        })
      fns.push(fn1)
      fns.push(fn2)
      Promise.all(fns).then(res => {
        let containWidth = Math.ceil(res[0]),
          textWidth = Math.ceil(res[1])
        if (textWidth < containWidth) {
          let data = that.data[arrName]
          that.setData({
            [arrName]: [...data, ...data]
          }, () => {
            that.startMarquee(line, arrName, containId, textId)
          })
        } else {
          let speed = 3, // 滚动速度
            transTime = Math.ceil((textWidth * 10 * speed) / containWidth) / 10
          that.setData({
            ['marquee0Style' + line]: 'width: ' + textWidth + 'px;',
            ['marquee1Style' + line]: 'animation-duration: ' + transTime + 's;',
            ['marquee2Style' + line]: 'animation-duration: ' + (transTime * 2) + 's;',
            ['marquee3Style' + line]: 'animation-duration: ' + (transTime * 2) + 's;animation-delay: ' + transTime + 's;'
          })
        }
      })
    }
  },
})