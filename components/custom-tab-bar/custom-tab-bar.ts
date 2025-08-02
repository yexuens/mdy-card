
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#ff0000",
    list: [
      {
        iconPath: 'https://cdn.juesedao.cn/mdy/25b52927cd494ed4b55b628de07e6672',
        selectedIconPath: 'https://cdn.juesedao.cn/mdy/9d10e3dbf0bd4e929a4ef9e0c548a607',
        pagePath: '/pages/index/index',
        text: '互相认识',
      },
      {
        iconPath: 'https://cdn.juesedao.cn/mdy/742e425f05ec4906a41d2825f580aaf2',
        selectedIconPath: 'https://cdn.juesedao.cn/mdy/25b8276af48b4e5db6ee02a846f781f3',
        pagePath: '/pages/prod/prod',
        text: '做什么的',
      },
      // {
      //   iconPath: 'https://cdn.juesedao.cn/mdy/fae7efbe163c4ab58640006451177b0e',
      //   selectedIconPath: 'https://cdn.juesedao.cn/mdy/0dbcb734e92b4e0cb5d779323cb3acc9',
      //   pagePath: '/pages/course/course',
      //   text: '新派流量',
      // },
      {
        iconPath: 'https://cdn.juesedao.cn/mdy/eaddb7fe305141749306a4aa516bc8aa',
        selectedIconPath: 'https://cdn.juesedao.cn/mdy/2e3d391370694f3782bd007011d2f6e1',
        pagePath: '/pages/solution/solution',
        text: '最近忙啥',
      },
      {
        iconPath: 'https://cdn.juesedao.cn/mdy/9f4f8f66a49e4d6fa1b1abf64c099201',
        selectedIconPath: 'https://cdn.juesedao.cn/mdy/462bb21b785c409185d5617ceabbf02d',
        pagePath: '/pages/moments/moments',
        text: '联系我们',
      },
    ],
  },
  pageLifetimes: {
    show: function () {
      let that = this
      that.tebshow()
      console.log("新页面的tabbar为：" + tt.getStorageSync("tabbar") || 0);
      this.setData({
        selected: tt.getStorageSync("tabbar") || 0
      })
    },
  },
  created() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const currentPath = currentPage.route; // 当前页面路径，如 pages/index/index
    const currentIdx = this.data.list.findIndex(item => item.pagePath.endsWith(currentPath))
    const _tab = tt.getStorageSync("tabbar")
    if (_tab != currentIdx) {
      tt.setStorageSync("tabbar", 0)
    }
  },
  methods: {
    tebshow() {
      var authUserInfo = tt.getStorageSync('authUserInfo');
      this.setData({
        tebshow: true
      })
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      console.log(data);

      const url = data.path
      this.setData({
        selected: data.index
      })
      tt.setStorageSync("tabbar", data?.index);
      tt.switchTab({ url })
    }
  }
})
