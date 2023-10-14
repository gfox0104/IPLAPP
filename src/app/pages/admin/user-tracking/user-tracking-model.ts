interface TrackModel {
    from: string,
    to?: string,


  }

  export const ReportDetails: TrackModel[] =[
    {
      from: 'Invoice Date From',
    },
    {
      from: 'Sent To Client From'
    },
    {
      from: 'Ready For Office From'
    }
  ]

  export class trackmodeldata{
    User_Track_IsActive: boolean;
    User_Track_UserID: Number = 0;
    fromDate: any;
    toDate: any;
    PageNumber : number = 1;
    NoofRows:number = 20;
  }


