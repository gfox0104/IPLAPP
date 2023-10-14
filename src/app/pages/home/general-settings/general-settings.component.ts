import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./general-settings.component.html"
})
export class GeneralSettingsComponent implements OnInit {
  TimezoneList: any;
  constructor(
    private xRouter: Router
  ) {
    this.TimezoneList = [
      { Id: "Central(CDT)", Name: "Central(CDT)" },
      { Id: "Eastern(EDT)", Name: "Eastern(EDT)" },
      { Id: "Mountain (MDT)", Name: "Mountain (MDT)" },
      { Id: "Pacific (PDT)", Name: "Pacific (PDT)" },
      { Id: "Hawaii (HST)", Name: "Hawaii (HST)" },
      { Id: "Guam (ChST)", Name: "Guam (ChST)" }
    ];
  }

  ngOnInit() {}

  // clear data
  GetLocal: any;
  AddNewClient() {
   
    if (this.GetLocal != null) {
      const pkeyuserId = this.GetLocal[0].User_pkeyID;
      var data = {
        pkeyuserId: pkeyuserId
      };

    
      this.xRouter.navigate(["/company/companyinfo"]);
    } else {
      var faltu = undefined;
     
      this.xRouter.navigate(["/company/companyinfo"]);
    }
  }
  // end code
}
