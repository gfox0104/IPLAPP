interface SupportLink {
  stitle: string;
  image: string;
  routerLink: string;
}

export const SupportLinks: SupportLink[] =[
  {
    stitle: 'Support',
    image: '../../../../assets/images/large_icons/support.png',
    routerLink: '/support/supportdetail/tickethistory/history'
  }, 
  {
    stitle: 'Video Training',
    image: '../../../../assets/images/large_icons/video_training.png',
    routerLink: '/support/video/training'
  },
  {
    stitle: 'Documentation',
    image: '../../../../assets/images/large_icons/documentation.png',
    routerLink: '/support/doc/documentation'
  },  
  {
    stitle: 'Downloads',
    image: '../../../../assets/images/large_icons/download.png',
    routerLink: '/support/download/downloaddata'
  },
  {
    stitle: 'Suggestion Box',
    image: '../../../../assets/images/large_icons/suggestion.png',
    routerLink: '/support/box/suggestion'
  },
  {
    stitle: 'Contact Us',
    image: '../../../../assets/images/large_icons/contactEmail.png',
    routerLink: '/support/contact/contactus'
  },
  {
    stitle: 'Billing',
    image: '../../../../assets/images/large_icons/billing_icon.png',
    routerLink: '/support/billingdetails/billing'
  },
 
]
