import { GET } from "../../api/GET"
import { getDataSet } from "../../utils"
import { httpGet, request } from "../../utils/request"

const app = getApp()

Page({
	data: {
		historyList: [
			{ year: '2018年', desc: '蜜多云科技公司创办' },
			{ year: '2020年', desc: '推出智慧门店性能1.0' },
			{ year: '2021年', desc: '推出全链数智MEDOMC' },
			{ year: '2022年', desc: '服务客户突破1000家' },
			{ year: '2023年', desc: 'AI数字化升级' },
		],
		user: {} as any,
		companyProfile: {} as any,
		articleList: [],
		historyMarqueePaused: false,
	},
	onLoad: function () {
		this.getUserInfo()
		this.getArticleList()
		this.getCompanyProfile()
	},
	async getUserInfo() {
		const { record } = await httpGet(GET.my_card_info, {
			phone: 18823234667
		})
		this.setData({
			user: record
		})
	},
	async getArticleList() {
		const { record } = await httpGet(GET.home_article_list)
		this.setData({
			articleList: record
		})
	},
	async getCompanyProfile() {
		const { record } = await httpGet(GET.company_profile)
		this.setData({
			companyProfile: record
		})
	},
	openUserAddress() {
		tt.openLocation({
			latitude: parseFloat(this.data.companyProfile?.positionLatitude),
			longitude: parseFloat(this.data.companyProfile?.positionLongitude),
			scale: 16,
			address: this.data.user?.address
		})
	},
	openPhoneCall() {
		tt.makePhoneCall({
			phoneNumber: this.data.user?.phone,
		});
	},
	copyWechatAccount(){
		tt.setClipboardData({
			data: this.data.user.wxcode,
		});
	},
	navigateToWeb(e: any) {
		const { url } = getDataSet(e)
		tt.navigateTo({
			url: "/pages/web/web?url=" + url,
		});
	}

}
)
