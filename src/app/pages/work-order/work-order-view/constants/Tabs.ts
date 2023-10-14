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
    title: `All Work Order`,
    id: 'workorder-tab',
    link: 'workorder',
    active: true,
    tabhidep:false
  },
  {
    title: 'WO Completion Tracker',
    id: 'wocomplentiontracker-tab',
    link: 'wocomplentiontracker',
    active: false,
    tabhidep:false
  },
  {
    title: 'New Contractror Tracker',
    id: 'newcontractrortracker-tab',
    link: 'newcontractrortracker',
    active: false,
    tabhidep:false
  },
]
