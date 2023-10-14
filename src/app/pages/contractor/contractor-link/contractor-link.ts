interface ContractorLink {
  title: string;
  images: string;
  routerLink: string;
}

export const ContractorLinks: ContractorLink[] =[
  {
    title: 'Documents',
  	images: '../../../../assets/icons/resources/document_icon.png',
    routerLink: '/contractors/document'
  },
  {
    title: 'Memos',
    images: '../../../../assets/icons/resources/memo_icon.png',
    routerLink: '/contractors/memo'
  },
  {
    title: 'Create Memo',
    images: '../../../../assets/icons/resources/create_memo.png',
    routerLink: '/contractors/creatememo'
  },
  {
    title: 'Coverage Map',
    images: '../../../../assets/icons/resources/coverage_map.png',
    routerLink: '/contractors/coveragemap'
  },
  {
    title: 'Live Map',
    images: '../../../../assets/icons/resources/live_map.png',
    routerLink: '/contractors/livemap'
  },
  {
    title: 'Scorecards',
    images: '../../../../assets/icons/resources/score_card.png',
    routerLink: '/contractors/scorecards'
  },
  {
    title: 'Professional Services',
    images: '../../../../assets/icons/resources/professional_services.png',
    routerLink: '/contractors/professionalservices'
  },
]
