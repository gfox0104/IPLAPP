import { Tab } from "../../client-result/common-client-result/constants/tabs";



export const Tabs: Tab[] = [
  {
    title: `Edit WorkOrder`,
    id: 'edit-tab',
    link: 'invtpast',
    active: true,
    tabhidep:false
  },
  {
    title: `Delete WorkOrder`,
    id: 'deleted-tab',
    link: 'invbidhistory',
    active: false,
    tabhidep:false
  },
  
]
