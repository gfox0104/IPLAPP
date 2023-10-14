interface AdminLink {
  title: string;
  images: string;
  routerLink: string;
}

export const AdminLinks: AdminLink[] =[

  {
    title: 'Company Settings',
    images: '../../../../assets/icons/company-setting.png',
    routerLink: '/home/company/companyinfo/new'
  },
  {
    title: 'Clients',
    images: '../../../../assets/icons/client-logo.png',
    routerLink: '/home/client/viewclientcompanies'
  },
  {
    title: 'Users',
    images: '../../../../assets/icons/users.png',
    routerLink: '/home/user/viewduser'
  },
  {
    title: 'View Groups',
    images: '../../../../assets/icons/view-group.png',
    routerLink: '/home/group/viewgroups'
  },
  {
    title: 'Contractor Categories',
    images: '../../../../assets/icons/contractor_categories.png',
    routerLink: '/home/contractor-category'
  },
  {
    title: 'QC Alerts',
    images: '../../../../assets/icons/qc_alert.png',
    routerLink: '#'
  },
  {
    title: 'Email Templates',
    images: '../../../../assets/icons/email-teemplate.png',
    routerLink: '/home/email-template'
  },

  {
    title: 'Customers',
    images: '../../../../assets/icons/customers-list.png',
    routerLink: '/home/customer/viewcustomer'
  },
  {
    title: 'States',
    images: '../../../../assets/icons/state-list-icon.png',
    routerLink: '/home/state/viewstate'
  },
  {
    title: 'Work Types',
    images: '../../../../assets/icons/work_type_icon.png',
    routerLink: '/home/worktype/viewworktypecate'
  },
  {
    title: 'Custom Photo Label ',
    images: '../../../../assets/icons/image_label_icon.png',
    routerLink: '/home/customphoto/labelview'
  },
  {
    title: 'Auto Assign',
    images: '../../../../assets/icons/auto-assign-icon.png',
    routerLink: '#'
  },
  {
    title: 'Rush',
    images: '../../../../assets/icons/rush-icon.png',
    routerLink: '/home/rush/viewrush'
  },
  {
    title: 'Categories',
    images: '../../../../assets/icons/categories-icon.png',
    routerLink: '/home/category/viewmaincategory'
  },
  {
    title: 'Work Order Settings',
    images: '../../../../assets/icons/work_order_setting.png',
    routerLink: '/home/workordersettings'
  },
  // {
  //   title: 'General Settings',
  //   iclass: 'fa fa-cog',
  //   routerLink: '/home/generalsettings'
  // },
  {
    title: 'Add Task',
    images: '../../../../assets/icons/task_icoon.png',
    routerLink: '/home/task/bidinvoiceitemviewtask'
  },
  {
    title: 'Loan Type',
    images: '../../../../assets/icons/loan_type.png',
    routerLink: '/home/loan/viewloantype'
  },
  {
    title: 'Damages',
    images: '../../../../assets/icons/damages_icon.png',
    routerLink: '/home/damage/viewdamage'
  },
  {
    title: 'UOM Settings',
    images: '../../../../assets/icons/uom_setting.png',
    routerLink: '/home/uom/viewuom'
  },
  {
    title: 'Auto Import',
    images: '../../../../assets/icons/auto-import-icon.png',
    routerLink: '/home/autoimport/viewautoimport'
  },
  {
    title: 'Auto Instruction',
    images: '../../../../assets/icons/auto-instruction.png',
    routerLink: '/home/autoinstruction/viewinstruction'
  },


  // {
  //   title: 'Contact Details',
  //   iclass: 'fas fa-address-card',
  //   routerLink: '/home/contact/viewcontactus'
  // },
  {
    title: 'Forms',
    images: '../../../../assets/icons/forms.png',
  //  routerLink: '/home/forms'
    routerLink: '/home/forms/menu'
  },
  // {
  //   title: 'Ipl Company',
  //   iclass: 'fas fa-anchor',
  //   routerLink: '/home/iplcompany/viewiplcompany'
  // }

  // {
  //   title: 'Contact Details',
  //   images: '../../../../assets/icons/contact_detail_icon.png',
  //   routerLink: '/home/viewcontactus'
  // },

  {
    title: 'Tracking Details',
    images: '../../../../assets/icons/tracking_icon.png',
    routerLink: '/home/user-tracking'
  },
  {
    title: 'Photo Header Templates',
    images: '../../../../assets/icons/photo_header_template.png',
    routerLink: '/home/photo/viewphotoheader'
  },
  {
    title: 'Contractor Scorecard settings',
    images: '../../../../assets/icons/score_icon.png',
    routerLink: '/home/contractor-scorecard-setting'
  },
  {
    title: 'Contractor accounts payable settings',
    images: '../../../../assets/icons/account_payable_icon.png',
    routerLink: '/home/contractor-Account-payable-settings'
  },
  {
    title: 'Client Configuration',
    images: '../../../../assets/icons/client_configration.png',
    routerLink: '/home/clientconfiguration/viewclientconfiguration'
  },
  {
    title: 'Live User Location',
    images: '../../../../assets/icons/users.png',
    routerLink: '/home/liveUserLocation/Liveuser'
  },
  {
    title: 'Allowables',
    images: '../../../../assets/icons/users.png',
    routerLink: '/home/allowables/category'
  },
  {
    title: 'Restore WorkOrder',
    images: '../../../../assets/icons/work_type_icon.png',
    routerLink: '/home/restoreworkorder/viewrestoreorder'
  },

  {
    title: 'Loan Status',
    images: '../../../../assets/icons/personal_loan.png',
    routerLink: '/home/viewloanstatus/Loan'
  },
  {
    title: 'Occupancy Status',
    images: '../../../../assets/icons/occupancy-status.png',
    routerLink: '/home/viewoccupancystatus/OccupancyStatus'
  },
  {
    title: 'Property Alert',
    images: '../../../../assets/icons/property-alert.png',
    routerLink: '/home/viewpropertyalert/Propertys'
  },
  {
    title: 'Property Type',
    images: '../../../../assets/icons/property-type.png',
    routerLink: '/home/viewpropertytype/PropertyType'
  },
  {
    title: 'Lot Pricing Filter',
    images: '../../../../assets/icons/personal_loan.png',
    routerLink: '/home/viewLotPricingfilter/LotPricing'
  },
  {
    title: 'Property Lock Reason',
    images: '../../../../assets/icons/padlock.png',
    routerLink: '/home/viewpropertylockreason'
  },

  {
    title: 'Background Provider',
    images: '../../../../assets/icons/provider.png',
    routerLink: '/home/viewBackgroundprovider/BackgroundProviders'
  },

  // {
  //   title: 'Access User Log',
  //   images: '../../../../assets/icons/provider.png',
  //   routerLink: '/home/viewAccessUser/Viewaccessuserlog'
  // },

  {
    title: 'Work Settings',
    images: '../../../../assets/icons/work_order_setting.png',
    routerLink: '/home/worksetting/worksettings'
  },

  {
    title: 'Work Columns Test',
    images: '../../../../assets/icons/view-group.png',
    routerLink: '/home/workcolumnstest/WorkColumnsTests'
  },



]
