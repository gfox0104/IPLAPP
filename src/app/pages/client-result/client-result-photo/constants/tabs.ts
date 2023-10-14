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
    title: 'Work Orders Photo',
    id: 'workordersphoto-tab',
    link: 'workordersphoto',
    active: true,
    tabhidep:false
  },
  {
    title: 'Photo Analysis',
    id: 'photoanalysis-tab',
    link: 'photoanalysis',
    active: false,
    tabhidep:false
  },
  {
    title: 'Photo History',
    id: 'photohistory-tab',
    link: 'photohistory',
    active: false,
    tabhidep:false
  },

  {
    title: 'Photo Data',
    id: 'photodata-tab',
    link: 'photodata',
    active: false,
    tabhidep:false
  },
]
