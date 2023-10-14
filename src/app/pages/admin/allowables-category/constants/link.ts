interface AllowablesLink {
  title: string;
  images: string;
  routerLink: string;
}

export const AllowablesLinks: AllowablesLink[] =[
  
  {
    title: 'Allowables Category',
    images: '../../../../assets/icons/allow-cat.png',
    routerLink: '/home/allowables/addcategory'
  },
  {
    title: 'Allowables',
    images: '../../../../assets/icons/allowables.jpg',
    routerLink: '/home/allowables/details'
  },
]
