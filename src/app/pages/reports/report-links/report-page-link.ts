interface ReportLink {
	rtitle: string;
	images: string;
	routerLink: string;
}

export const ReportLinks: ReportLink[] = [{
		rtitle: 'Contractor Reports',
		images: '../../../../assets/icons/report_icons/contrator_report_icon.png',
		routerLink: '/report/contractorreports'
	},
	{
		rtitle: 'Advanced Reports',
		images: '../../../../assets/icons/report_icons/advanced_report_icon.png',
		routerLink: '/report/advancereport/Advreports'
	},
	{
		rtitle: 'Accounts Payable Reports',
		images: '../../../../assets/icons/report_icons/account_payapl_icon.png',
		routerLink: '/report/accountpayable/reportsdetails'
	},
]
