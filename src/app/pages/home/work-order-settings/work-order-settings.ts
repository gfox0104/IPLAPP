import { WorkOrderSettingsPageModel, GeneralWorkOrderSettingsModel } from "./work-order-settings-model";

interface WorkOrderCard {
  title: string;
  modelObj?: Object;
  fields: {
    label: string;
    type: string;
    routerLink?: string;
    model?: string;
    id?: string;
  }[]
}

export const WorkOrderSettings: WorkOrderCard[] = [

  {
    title: 'Work Order Settings',
    modelObj: null,
    fields: [
      {
        label: 'Allow duplicate work order numbers?',
        type: 'checkbox',
        model: 'WO_Sett_Allow_Dup_Num',
        id: '1233fds'
      },
      {
        label: 'Auto Increment "Go back" work order numbers.',
        type: 'checkbox',
        model: 'WO_Sett_Auto_Inc_GoBack',
        id: '12rewr33fds'
      },
      {
        label: 'Auto Increment "Need Info" work order numbers.',
        type: 'checkbox',
        model: 'WO_Sett_Auto_Inc_NeedInfo',
        id: '12ewrw33fds'
      },
      {
        label: 'Auto Increment duplicate work order numbers.',
        type: 'checkbox',
        model: 'WO_Sett_Auto_Inc_Dup',
        id: '12ewrwsdd33fds'
      },
      {
        label: 'Auto Increment recurring new work order numbers.',
        type: 'checkbox',
        model: 'WO_Sett_Auto_Inc_Recurring',
        id: '12ewrwsdsd33fds'
      },
      {
        label: 'Auto Assign work orders based on previous contractors at the property.',
        type: 'checkbox',
        model: 'WO_Sett_Auto_Assign',
        id: '12eu33fds'
      },
      {
        label: 'Detect pricing in work line items',
        type: 'checkbox',
        model: 'WO_Sett_Detect_Pricing',
        id: '12udfds'
      },
      {
        label: 'Remove dollar amounts from comments and work order line items',
        type: 'checkbox',
        model: 'WO_Sett_Remove_Doller',
        id: '12uufds'
      }
    ]
  },
  {
    title: 'General Settings',
    modelObj: null,
    fields: [
      {
        label: `"Field Complete" remove work order from contractor's queue`,
        type: 'checkbox',
        model: 'GW_Sett_Field_Complete',
        id: '12uedfds'
      },
      {
        label: 'Allow contractor to "Reject" work orders.',
        type: 'checkbox',
        model: 'GW_Sett_Allow_Contractor',
        id: '12ghjds'
      },
      {
        label: 'Assigned and Unread late. Send email alert',
        type: 'checkbox',
        model: 'GW_Sett_Assigned_Unread',
        id: '12ghjfgds'
      },
      {
        label: 'Allow estimated complete dates past the due date',
        type: 'checkbox',
        model: 'GW_Sett_Allow_Estimated',
        id: '1igffs'
      },
      {
        label: 'Require estimated complete date.',
        type: 'checkbox',
        model: 'GW_Sett_Require_Estimated',
        id: '1igsddwwdffs'
      },
      {
        label: 'Sent new work order alerts to assign co-ordinator.',
        type: 'checkbox',
        model: 'GW_Sett_Sent_Ass_Cooradinator',
        id: '1iguddfs'
      },
      {
        label: 'Send new work order alerts to assigned processor.',
        type: 'checkbox',
        model: 'GW_Sett_Sent_Ass_Processor',
        id: '1igudsfdfs'
      },
      {
        label: 'Send one email when assigning multiple work orders.',
        type: 'checkbox',
        model: 'GW_Sett_Sent_Email_Multiple',
        id: '1igudsdsddfs'
      },
      {
        label: 'Show office staff client name.',
        type: 'checkbox',
        model: 'GW_Sett_StaffName',
        id: '1iuytdfs'
      }
    ]
  }
]
