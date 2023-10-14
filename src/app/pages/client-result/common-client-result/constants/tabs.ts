export interface Tab {
  title: string;
  id: string;
  link: string;
  active: boolean;
  hidden?: boolean;
  tabhidep: boolean;
}
export const Tabs: Tab[] = [
  {
    title: 'Create Bid',
    id: 'home2-tab',
    link: 'home2',
    active: false,
    tabhidep:false
  },
  {
    title: 'Create Completion',
    id: 'inscinvoice-tab',
    link: 'inscinvoice',
    active: false,
    tabhidep:false
  },
  {
    title: 'Add Damage',
    id: 'insdamage-tab',
    link: 'insdamage',
    active: false,
    tabhidep:false
  },

  {
    title: 'Add Appliance',
    id: 'Appliance-tab',
    link: 'Appliance',
    active: false,
    tabhidep:false
  },
  {
    title: 'Office Document',
    id: 'OfficeDocument-tab',
    link: 'OfficeDocument',
    active: false,
    tabhidep:false
  },
  {
    title: 'Repair Base',
    id: 'repair-tab',
    link: 'repair',
    active: false,
    tabhidep:false
  },
  {
    title: 'Add Violation',
    id: 'insviolation-tab',
    link: 'insviolation',
    active: false,
    tabhidep:false
  },
  {
    title: 'Add Hazard',
    id: 'inshazard-tab',
    link: 'inshazard',
    active: false,
    tabhidep:false
  }
]

export enum PrintTypes{

   Bid=1,
   Completion=2,
   Damage=3,
   Instruction=4,
   Violation=5,
   Hazard=6
}
