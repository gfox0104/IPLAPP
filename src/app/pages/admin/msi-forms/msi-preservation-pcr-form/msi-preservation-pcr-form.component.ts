import { Component, Input, OnInit } from '@angular/core';
import { MSI_PCR_PreservationFormMasterModel, MSI_Preservation_SubjectProperty,MSI_Preservation_ConditionReport } from './msi-preservation-pcr-form-model';
import { MsiPreservationPcrFormService } from './msi-preservation-pcr-form-service';




@Component({
  selector: 'app-msi-preservation-pcr-form',
  templateUrl: './msi-preservation-pcr-form.component.html',
  styleUrls: ['./msi-preservation-pcr-form.component.scss'],
})
export class MsiPreservationPcrFormComponent implements OnInit {
  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:MSI_PCR_PreservationFormMasterModel[];
  // PCR_History: MSI_PCR_PreservationFormMasterModel =
  //   new MSI_PCR_PreservationFormMasterModel();
  MSIGarassSubjectPropertyPcrFormModel: MSI_PCR_PreservationFormMasterModel =
    new MSI_PCR_PreservationFormMasterModel();
  MSI_Preservation_SubjectProperty: MSI_Preservation_SubjectProperty =
    new MSI_Preservation_SubjectProperty();
  MSI_Preservation_ConditionReport: MSI_Preservation_ConditionReport =
    new MSI_Preservation_ConditionReport();

  conditionList: { Id: number; Name: string }[];
  EstimetDamagesList: { Id: number; Name: string }[];
  DamagesList: { Id: number; Name: string }[];
  OccupancyList: { Id: number; Name: string }[];
  OccupancyVerifiedByList: { Id: number; Name: string }[];
  WinterizedByList: { Id: number; Name: string }[];
  WinterizeCompletenessList: { Id: number; Name: string }[];
  isddlDisabled: boolean = true;

  isLoading: boolean;
  button = 'Save';
  constructor(
    private msiPreservationPcrFormService: MsiPreservationPcrFormService
  ) {}

  ngOnInit(): void {
    if (this.WorkorderId > 0) {
      this.GetMsiPreservationPcrForm();
    }

    // this.getMsiGrassData()
    this.ddlConditionList();
    this.ddlDamagesList();
    this.ddlEstimetDamagesList();
    this.ddlOccupancyStatusList();
    this.ddlOccupancyVerifiedByList();
    this.ddlWinterizedByList();
    this.ddlWinterizeCompletenessList();
  }

  ddlConditionList() {
    this.conditionList = [
      {
        Id: 1,
        Name: 'Good',
      },
      {
        Id: 2,
        Name: 'Fair',
      },
      {
        Id: 3,
        Name: 'Poor',
      },
    ];
  }

  ddlDamagesList() {
    this.DamagesList = [
      {
        Id: 1,
        Name: 'Yes',
      },
      {
        Id: 2,
        Name: 'No',
      },
      {
        Id: 3,
        Name: 'Unable To Verify',
      },
    ];
  }

  ddlEstimetDamagesList() {
    this.EstimetDamagesList = [
      {
        Id: 1,
        Name: 'Less than $1,500',
      },
      {
        Id: 2,
        Name: '$1,500 - $3,000',
      },
      {
        Id: 3,
        Name: '$3,001 - $5,000',
      },
      {
        Id: 4,
        Name: '$5,001 - $10,000',
      },
      {
        Id: 5,
        Name: '$10,001 - $15,000',
      },
      {
        Id: 6,
        Name: '$15,001 - $20,000',
      },
      {
        Id: 7,
        Name: 'Greater than $20,000',
      },
    ];
  }
  ddlOccupancyStatusList() {
    this.OccupancyList = [
      {
        Id: 1,
        Name: '1. OWNER OCCUPIED',
      },
      {
        Id: 2,
        Name: '2. OCCUPIED',
      },
      {
        Id: 3,
        Name: '3. TENANT OCCUPIED',
      },
      {
        Id: 4,
        Name: '4. VACANT SECURE',
      },
      {
        Id: 5,
        Name: '5. VACANT UNSECURE',
      },
      {
        Id: 6,
        Name: '6. PARTIALLY VACANT',
      },
      {
        Id: 7,
        Name: '7. UNABLE TO VERIFY',
      },
      {
        Id: 8,
        Name: '8. SECURITY GATE',
      },
      {
        Id: 9,
        Name: '9. BAD ADDRESS',
      },
      {
        Id: 10,
        Name: '10. VACANT LOT',
      },
    ];
  }
  ddlOccupancyVerifiedByList() {
    this.OccupancyVerifiedByList = [
      {
        Id: 1,
        Name: '1. DIRECT CONTACT',
      },
      {
        Id: 2,
        Name: '2. VISUAL',
      },
      {
        Id: 3,
        Name: '3. NEIGHBOR',
      },
      {
        Id: 4,
        Name: '4. MAILBOX',
      },
      {
        Id: 5,
        Name: '5. UTILITIES',
      },
      {
        Id: 6,
        Name: '6. PERSONAL ITEMS',
      },
      {
        Id: 7,
        Name: '7. REALTOR',
      },
      {
        Id: 8,
        Name: '8. SECURITY GUARD',
      },
      {
        Id: 9,
        Name: '9. MANAGER',
      },
    ];
  }
  ddlWinterizedByList() {
    this.WinterizedByList = [
      {
        Id: 1,
        Name: 'FAFS',
      },
      {
        Id: 2,
        Name: 'FIVE BROTHERS',
      },
      {
        Id: 3,
        Name: 'LPS',
      },
      {
        Id: 4,
        Name: 'MCS',
      },
      {
        Id: 5,
        Name: 'MSI',
      },
      {
        Id: 6,
        Name: 'NFR',
      },
      {
        Id: 7,
        Name: 'OTHER',
      },
    ];
  }
  ddlWinterizeCompletenessList() {
    this.WinterizeCompletenessList = [
      {
        Id: 1,
        Name: 'Fully Winterized',
      },
      {
        Id: 2,
        Name: 'Not Winterized',
      },
      {
        Id: 3,
        Name: 'partially Winterized',
      },
      {
        Id: 4,
        Name: 'Unknown',
      },
    ];
  }
  OnthereDamagesChanged(event) {
    let val = event;
    if (event.target.selectedIndex == 1) {
      this.isddlDisabled = false;
    } else {
      this.isddlDisabled = true;
    }
  }

  TabVal: Number = 1;
  TabClickMethod(TabNo: Number): void {
    switch (this.TabVal) {
      case 1:
        //alert('this tab '+this.TabVal);
        this.FormButton1(false); //property form
        break;

      case 2:
        this.ViolationSubmit(false);
        break;

      case 3:
        this.SecuringSubmit(false);
        break;

      case 4:
        this.SubmitWinterization(false);
        break;

      case 5:
        this.YardMaintananceSubmit(false);
        break;

      case 6:
        this.DebrisSubmit(false);
        break;

      case 7:
        this.PcrRoofData(false);
        break;

      case 8:
        this.PcrPoolData(false);
        break;

      case 9:
        this.PostUtilitiesSubmit(false);
        break;

      case 10:
        this.ApplianceSubmit(false);
        break;

      case 11:
        this.AddPCRDamage(false);
        break;

      case 12:
        this.PCRConveyancesave(false);
        break;

      default:
        break;
    }
    this.TabVal = TabNo;
  }
  FormButton1(arg0: boolean) {}

  ViolationSubmit(arg0: boolean) {}

  SecuringSubmit(arg0: boolean) {}
  SubmitWinterization(arg0: boolean) {}
  YardMaintananceSubmit(arg0: boolean) {}
  DebrisSubmit(arg0: boolean) {}
  PcrRoofData(arg0: boolean) {}
  PcrPoolData(arg0: boolean) {}
  PostUtilitiesSubmit(arg0: boolean) {}
  ApplianceSubmit(arg0: boolean) {}
  AddPCRDamage(arg0: boolean) {}
  PCRConveyancesave(arg0: boolean) {}

  SaveForm() {
    this.jsonModelObjStringify();
    this.PostMsiPreservationPcrForm();
  }
  jsonModelObjStringify() {
    this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_SubjectProperty =
      JSON.stringify(this.MSI_Preservation_SubjectProperty);
    this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_ConditionReport =
      JSON.stringify(this.MSI_Preservation_ConditionReport);
  }

  PostMsiPreservationPcrForm() {
    if (this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_PkeyId > 0) {
      this.MSIGarassSubjectPropertyPcrFormModel.Type = 2;
    } else {
      this.MSIGarassSubjectPropertyPcrFormModel.Type = 1;
    }
    this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_IsActive = true;
    this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_IsDelete = false;
    this.MSIGarassSubjectPropertyPcrFormModel.fwo_pkyeId = this.FWO_PkyeId;
    this.msiPreservationPcrFormService
      .PostMsiPreservationPcrForm(this.MSIGarassSubjectPropertyPcrFormModel)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_PkeyId =
            res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetMsiPreservationPcrForm() {
    this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_WO_ID =
      this.WorkorderId;
    this.MSIGarassSubjectPropertyPcrFormModel.Type = 3;
    this.msiPreservationPcrFormService
      .GetMsiPreservationPcrForm(this.MSIGarassSubjectPropertyPcrFormModel)
      .subscribe((res) => {
        // debugger;
        if (res[0].length > 0) {
          this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_PkeyId =
            res[0][0].MSI_Preservation_PkeyId;
          this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_WO_ID =
            res[0][0].MSI_Preservation_WO_ID;

          this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_SubjectProperty =
            JSON.parse(res[0][0].MSI_Preservation_SubjectProperty);
          this.MSI_Preservation_SubjectProperty =
            this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_SubjectProperty;

          this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_ConditionReport =
            JSON.parse(res[0][0].MSI_Preservation_ConditionReport);
          this.MSI_Preservation_ConditionReport =
            this.MSIGarassSubjectPropertyPcrFormModel.MSI_Preservation_ConditionReport;
        }
        if (res[1].length > 0) {

          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new MSI_PCR_PreservationFormMasterModel();
            convertedData.MSI_Preservation_SubjectProperty=JSON.parse(element.MSI_Preservation_SubjectProperty);
            convertedData.MSI_Preservation_ConditionReport=JSON.parse(element.MSI_Preservation_ConditionReport);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;

          // this.PCR_History.MSI_Preservation_SubjectProperty = JSON.parse(
          //   res[1][0].MSI_Preservation_SubjectProperty
          // );
          // this.PCR_History.MSI_Preservation_ConditionReport = JSON.parse(
          //   res[1][0].MSI_Preservation_ConditionReport
          // );
        }
      });
  }
  ShowDropdownValueInLabel(type, selectedValue) {
    var label = '';
    if (
      selectedValue != undefined &&
      selectedValue != null &&
      selectedValue > 0
    ) {
      if (type === 'conditionList') {
        var getObj = this.conditionList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else if (type === 'DamagesList') {
        var getObj = this.DamagesList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else if (type === 'EstimetDamagesList') {
        var getObj = this.EstimetDamagesList.filter(
          (x) => x.Id == selectedValue
        );
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else if (type === 'OccupancyList') {
        var getObj = this.OccupancyList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else if (type === 'OccupancyVerifiedByList') {
        var getObj = this.OccupancyList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else if (type === 'WinterizedByList') {
        var getObj = this.WinterizedByList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else if (type === 'WinterizeCompletenessList') {
        var getObj = this.WinterizeCompletenessList.filter(
          (x) => x.Id == selectedValue
        );
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else if (type === 'WinterizeCompletenessList') {
        var getObj = this.WinterizeCompletenessList.filter(
          (x) => x.Id == selectedValue
        );
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      } else {
        label = '';
      }
    }
    return label;
  }
}
