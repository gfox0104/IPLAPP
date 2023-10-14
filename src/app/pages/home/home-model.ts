export class HomeModel{
  workOrder_ID:string = "";
  Status:string = "";
  username:string = "";
  token:string = "";

  address1:string = "";
  attribute7:string = "";
  attribute8:string = "";

  city:string = "";

  clientInstructions:string = "";
  clientStatus:string = "";
  controlConfig:string = "";
  country:string = "";
  currUserId:string = "";
  description:string = "";

  reference:string = "";

  source_wo_id:string = "";
  source_wo_number:string = "";
  source_wo_provider:string = "";

  state:string = "";
  status:string = "";

  workOrderNumber:string = "";

   zip:string = "";
}

export class WorkOderViewModel{
  workOrder_ID:string = "";
  workOrderNumber:string = "";
  workOrderInfo:string = "";
  address1:string = "";
  address2:string = "";
  city:string = "";
  state:string = "";
  zip:string = "";
  country:string = "";
  options:string = "";
  reference:string = "";
  description:string = "";
  instructions:string = "";
  status:string = "";
  dueDate:string = "";
  startDate:string = "";
  clientInstructions:string = "";
  clientStatus:string = "";
  clientDueDate:string = "";
  gpsLatitude:string = "";
  gpsLongitude:string = "";
  attribute7:string = "";
  attribute8:string = "";
  attribute9:string = "";
  attribute10:string = "";
  attribute11:string = "";
  attribute12:string = "";
  attribute13:string = "";
  attribute14:string = "";
  attribute15:string = "";
  source_wo_provider:string = "";
  source_wo_number:string = "";
  source_wo_id:string = "";
  controlConfig:string = "";
  services_Id:string = "";
}

interface OpenOrder {
  status: string;
  pastDue: number;
  future: number;
  total: number;
}

interface Column {
  title: string;
  field: string;
  statusId?: number;
  width?: number;
  
}

export const OrderColumns: Column[] = [
  {
    title: 'Status',
    field: 'Status_Name',
    width: 120
  },
  {
    title: 'Past Due',
    field: 'PastStatusCount',
    width: 80
  },
  {
    title: 'Future',
    field: 'FutureStatusCount',
    width: 80
  },
  {
    title: 'Total',
    field: 'countval',
    width: 80
  }
]
export const OrderColumns1: Column[] = [
  {
    title: 'Client',
    field: 'Client_Company_Name',
    width: 50
  },
  {
    title: 'Past Due',
    field: 'Pastdue',
    width: 30
  },
  {
    title: 'Future',
    field: 'Future',
    width: 30
  },
  {
    title: 'Total',
    field: 'Total',
    width: 30
  }
]
export const Status = [
  {
    Status_Name: 'Unassigned',
  },
  {
    Status_Name: 'Assigned',
  },
  {
    Status_Name: 'Field Complete',
  },
  {
    Status_Name: 'Approved',
  },
]
export const OpenOrders = [
  {
    Status_Name: 'Unassigned',
    pastDue: 1,
    future: 9,
    statusId: 1
  },
  {
    Status_Name: 'Assigned',
    pastDue: 3,
    future: 33,
    statusId: 2
  },
  // {
  //   Status_Name: 'Read',
  //   pastDue: 9,
  //   future: 14,
  //   statusId: 3
  // },
  {
    Status_Name: 'Field Complete',
    pastDue: 5,
    future: 5,
    statusId: 5
  },
  {
    Status_Name: 'Office Approved',
    pastDue: 3,
    future: 1,
    statusId: 6
  }
]

export const CompanyColumns: Column[] = [
  {
    title: 'Client',
    field: 'Client_Company_Name',
    width: 160
  },
  {
    title: 'Unassigned',
    field: 'Unassigned_count',
    statusId: 1,
    width: 80
  },
  {
    title: 'Assigned',
    field: 'Assigned_count',
    statusId: 2,
    width: 80
  },
  {
    title: 'Field Complete',
    field: 'Field_Complete_count',
    statusId: 5,
    width: 100
  },
  {
    title: 'Office Approved',
    field: 'Office_Approved_count',
    statusId: 6,
    width: 100
  },
  {
    title: 'Total',
    field: 'Total_count',
    width: 80
  }
]

interface Invoice {
  Client_Company_Name: string;
  Firstval: number;
  Secondval: number;
  Thirdval: number;
  Fourthval: number;
}

export const InvoiceColumns: Column[] = [
  {
    title: 'Client',
    field: 'Client_Company_Name'
  },
  {
    title: '< 30 Days',
    field: 'Firstval'
  },
  {
    title: '30 - 60 Days',
    field: 'Secondval'
  },
  {
    title: '60 - 90 Days',
    field: 'Thirdval'
  },
  {
    title: '90+ Days',
    field: 'Fourthval'
  }
]

export const OpenInvoices: Invoice[] = [
  {
    Client_Company_Name: 'Five Brothers',
    Firstval: 18225,
    Secondval: 42099.75,
    Thirdval: 88830.47,
    Fourthval: 97713.52
  },
  {
    Client_Company_Name: 'MCS',
    Firstval: 15113,
    Secondval: 34991.03,
    Thirdval: 73662.27,
    Fourthval: 81028.50
  },
  {
    Client_Company_Name: 'MSI',
    Firstval: 16442.2,
    Secondval: 37981.02,
    Thirdval: 80139.95,
    Fourthval: 88153.95
  },
]
interface Clients {
  client: string;
  complete: number;
  assinged: number;
  unassigned: number;
  approved: number;
}
export const ClientsColumns: Column[] = [
  {
    title: 'Client',
    field: 'Client_Company_Name'
  },
  {
    title: 'Field Complete',
    field: 'Field_Complete_count'
  },
  {
    title: 'Assigned',
    field: 'Assigned_count'
  },
  {
    title: 'Unassigned',
    field: 'Unassigned_count'
  },
  {
    title: 'Office Approved',
    field: 'Office_Approved_count'
  }
]

export const OpenClients: Clients[] = [
  {
    client: 'AZZzz',
    complete: 6,
    assinged: 103,
    unassigned: 2,
    approved: 2
  },
  {
    client: 'mcm',
    complete: 7,
    assinged: 60,
    unassigned: 0,
    approved: 0
  },
  {
    client: 'Training Company Mike Brown',
    complete: 3,
    assinged: 38,
    unassigned: 14,
    approved: 0
  },
  {
    client: 'Five Brothers Import ID :mo1069',
    complete: 4,
    assinged: 20,
    unassigned: 22,
    approved: 0
  },
  {
    client: 'Assero',
    complete: 0,
    assinged: 27,
    unassigned: 3,
    approved: 2
  },
]
interface Months {
  month: string;
  complete: number;
  assinged: number;
  unassigned: number;
  approved: number;
}
export const OpenLine: Months[] = [
  {
    month: 'Jan',
    complete: 5,
    assinged: 6,
    unassigned: 2,
    approved: 4
  },
  {
    month: 'Feb',
    complete: 3,
    assinged: 5,
    unassigned: 12,
    approved: 2
  },
  {
    month: 'MAR',
    complete: 9,
    assinged: 4,
    unassigned: 7,
    approved: 8
  },
  {
    month: 'APR',
    complete: 6,
    assinged: 3,
    unassigned: 4,
    approved: 2
  },
  {
    month: 'May',
    complete: 7,
    assinged: 8,
    unassigned: 16,
    approved: 9
  }
]
