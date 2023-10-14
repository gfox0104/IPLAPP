import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inputs } from '@syncfusion/ej2-angular-dropdowns/src/drop-down-list/dropdownlist.component';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';

@Component({
  selector: 'app-message-right-side-bar',
  templateUrl: './message-right-side-bar.component.html',
  styleUrls: ['./message-right-side-bar.component.scss']
})
export class MessageRightSideBarComponent implements OnInit {

  @Input() threadType:string;
  @Input() chatWithName:string;
  @Input() WorkOrderIPLNo:any;
  @Input() Address:string;
  @Input() ModelObj:any;
  @Input() WorkType:any;
  @Input() WorkOrderNumber:string;
  @Input() Client:string;
  @Input() fileList: { [File: string]: any; } = [];
  @Input() linkList:any;
  @Input() showAddMemberButton:boolean;
  @Output() AddMember = new EventEmitter();
  
  decuser: any;
  IsclientNOtshow: boolean = true;
 
  constructor(private EncrDecr: EncrDecrService) { 
    if(localStorage.getItem('usertemp_') != null)
    {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval  = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser  =JSON.parse(decval) ;

      switch (this.decuser[0].GroupRoleId) {
        case 1:
          {
            break;
          }
          case 2:
          {
            this.IsclientNOtshow=false;
            break;
          }
          case 3:
          {
            break;
          }
          case 4:
          {
            break;
          }
          case 5:
          {
            break;
          }
        }
    }


   
}

  ngOnInit(): void {
  }
  getFileName = (filePath) => {
    var file: any = filePath.split("/");
    var fileName = file[5];
    var afileName: any = fileName.split("?");
    var name = afileName[0];
    var fname = name.replace(/%20/g, " ");
    return fname;
  }
  onAddmemberclick() {
    this.AddMember.emit();
  }
  excludeImageFiles(file) {
    if(file.includes('.jpg') || file.includes('.png')|| file.includes('.gif')|| file.includes('.jpeg'))
    {
      return false
    }
    else
    {
      return true;
    }
  }

}
