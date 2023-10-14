export class CommonStatusDTO {
    Status_ID: Number = 0;
    Status_Name: String = '';
    Status_IsActive: boolean = true;
    whereclause: String = '';
    mydata: boolean = false;
    Type: Number = 1;
    ChangeStatus: string = '';
    filterstausarr: any;
    PageNumber:number = 0;
    NoofRows: number = 0;
    Skip:number = 0;
    FilterData:string ='';
}
