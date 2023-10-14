import { Tab } from '../../common-client-result/constants/tabs';


export const Tabs: Tab[] = [
  {
    title: `Past WO's`,
    id: 'invtpast-tab',
    link: 'invtpast',
    active: true,
    tabhidep:false
  },
  {
    title: 'Bid History',
    id: 'invbidhistory-tab',
    link: 'invbidhistory',
    active: false,
    tabhidep:false
  },
  {
    title: 'Completion History',
    id: 'invinvoicehistory-tab',
    link: 'invinvoicehistory',
    active: false,
    tabhidep:false
  },
  {
    title: 'Damage History',
    id: 'invdamagehistory-tab',
    link: 'invdamagehistory',
    active: false,
    hidden: false,
    tabhidep:false
  },
  {
    title: 'Appliance History',
    id: 'invappliance-tab',
    link: 'invappliance',
    active: false,
    tabhidep:false
  },
  {
    title: 'Violation History',
    id: 'invviolationhistory-tab',
    link: 'invviolationhistory',
    active: false,
    tabhidep:false
  },
  {
    title: 'Hazard History',
    id: 'invvhazardhistory-tab',
    link: 'invvhazardhistory',
    active: false,
    tabhidep:false
  },
  {
    title: 'Contractor Invoice History',
    id: 'contractorinvoicehistory-tab',
    link: 'contractorinvoice',
    active: false,
    tabhidep:false
  },
  {
    title: 'Client Invoice History',
    id: 'clientinvoicehistory-tab',
    link: 'clientinvoice',
    active: false,
    tabhidep:false
  }
]
