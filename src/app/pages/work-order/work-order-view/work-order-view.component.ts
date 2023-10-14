import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbPopover, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, of } from "rxjs";
import { SafeStyle } from '@angular/platform-browser';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge
} from "rxjs/operators";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FieldSettingsModel } from '@syncfusion/ej2-dropdowns';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { CompositeFilterDescriptor, process } from '@progress/kendo-data-query';
import {
  WorkOderViewModel,
  WorOrderColumnjson,
  WorkOrderActions,
  SaveFilterWorkOrder
} from "./work-order-view-model";
import { SaveWorkOrderViewServices } from "./work-order-view-service";
import { ClientResultOldPhotoServices } from "../../client-result/client-result-photo/client-result-photo-old.service";
import { ClientResultPhotoModel } from "../../client-result/client-result-photo/client-result-photo-model";
import { ClientResultServices } from "../../client-result/client-result/client-result.service";
import { TaskBidMasterModel } from '../../client-result/client-result/client-result-model';
import { EncrDecrService } from "../../../services/util/encr-decr.service";
import { CommonStatusDTO } from '../../client-result/common-client-header/common-status-model'
import { Filters, InitialColumns, SearchArrayobj } from './constants';
import { getStatusColor } from 'src/app/models/status-model';
import { IplAppModalContent } from "src/app/components";
import { NgxSpinnerService } from "ngx-spinner";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent, GridComponent, GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { AddInstructionServices } from "../../admin/instruction-work-order/add-instruction/add-Instruction.service";
import { AddInstructionModel } from "../../admin/instruction-work-order/add-instruction/add-instruction-model";
import { WorkOrderDrodownServices } from "src/app/services/util/dropdown.service";
import { AddUserServices } from "../../user/add-user/add-user.service";
import { ContractorMapState } from "../../user/add-user/add-user-model";
import { ExcelExportData } from "@progress/kendo-angular-excel-export";
import { DropdownModel } from "../../models/dropdown-model";
import { Tabs } from "./constants/Tabs";
import { FilterDescriptor } from '@progress/kendo-data-query';
// interface GridDataResult {
//   chkdata: boolean;
//   data: any;
//   total: number;
// }
interface ExtendedGridDataResult extends GridDataResult {
  chkdata: boolean;
}

@Component({
  templateUrl: "./work-order-view.component.html",
  styleUrls: ["work-order-view.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class WorkOrderViewComponent implements OnInit {

  public source: Array<{ WF_QueryName: string, WF_PkeyID: number }> = [];
  public data: Array<{ WF_QueryName: string, WF_PkeyID: number }>;
  public defaultData: Array<{ WF_QueryName: string, WF_PkeyID: number }>;
  public WorkOderViewModelobj: WorkOderViewModel = new WorkOderViewModel();
  public WorOrderColumnjsonObj: WorOrderColumnjson = new WorOrderColumnjson();
  CommonStatusDTOObj: CommonStatusDTO = new CommonStatusDTO();
  AddInstructionModelObj: AddInstructionModel = new AddInstructionModel();
  WorkOrderActionsObj: WorkOrderActions = new WorkOrderActions();
  SaveFilterWorkOrderObj: SaveFilterWorkOrder = new SaveFilterWorkOrder();
  ClientResultPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel(); // task
  ContractorMapStateObj: ContractorMapState = new ContractorMapState();
  _drpdownmodelObj: DropdownModel = new DropdownModel();
  WorkTypeGroupList = [];
  CountyList = [];
  StateList = [];
  Cust_FilterList = [];
  Contr_FilterList = [];
  Proc_FilterList = [];
  Coord_FilterList = [];
  Client_FilterList = [];
  WorkType_FilterList = [];
  Loan_FilterList = [];
  Status_FilterList = [];
  title: string;

  StateValFlag = false;
  private originalGridData: any[];
  chkclick = true;
  filters = Filters;
  maxpagecountval: any;
  initialColumns = InitialColumns;
  searchArrayobj = SearchArrayobj;
  public dataA = [];
  public dataB = [];
  previousDataA = [];
  previousDataB = [];
  public fields: FieldSettingsModel = { text: 'Wo_Column_Name' };
  public columns = [];
  filter: any[];
  savedFilter: any[];
  loadFilterId: Number = 0;

  filterdata:any;
  filterName: String = "";
  checkAll: boolean = false;
  locked: boolean = false;
  selectedIPLNO;
  selectedAddress;
  selectedWorkOrder;
  user;
  resData: any;
  takevalue: number = 25;
  public alldataval: any[];
  // for status
  Statuslst: any;
  originalStatuslst: any;
  public selectedValue: Number = 0;
  decuser: any;
  tabhide: boolean = false;
  ContractorList: Array<any>;
  CordinatorList: Array<any>;
  ProcessorList: Array<any>;
  CompanyList: Array<any>;
  WorkTypeList: Array<any>;
  CategoryList: Array<any>;
  LoanTypeList: Array<any>;
  CustomerList: Array<any>;
  pagesizeval: any;
  public drpConList: Array<string>;
  public drpCoordinatorList: Array<string>;
  public drpProcessorList: Array<string>;
  public drpComList: Array<string>;
  public drpWTList: Array<string>;
  public drpCatList: Array<string>;
  public drpLoanTypeList: Array<string>;
  public drpCustomerList: Array<string>;
  public defaultConItem: { User_FirstName: string, User_pkeyID: number } = { User_FirstName: 'Select', User_pkeyID: 0 };
  public defaultComItem: { Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name: 'Select', Client_pkeyID: 0 };
  public defaultWTItem: { WT_WorkType: string, WT_pkeyID: number } = { WT_WorkType: 'Select', WT_pkeyID: 0 };
  public defaultCatItem: { Cat_Name: string, Cat_ID: number } = { Cat_Name: 'Select', Cat_ID: 0 };
  public defaultLoanTypeItem: { Loan_Type: string, Loan_pkeyId: number } = { Loan_Type: 'Select', Loan_pkeyId: 0 };
  public defaultCustomerItem: { Cust_Num_Number: string, Cust_Num_pkeyId: number } = { Cust_Num_Number: 'Select', Cust_Num_pkeyId: 0 };
  public defaultDataItem: { WF_QueryName: string, WF_PkeyID: number } = { WF_QueryName: 'Select', WF_PkeyID: 0 };
  MessageFlag: string;
  state: any;
  isFilterLoading = false;
  isHelpActive = false;
  filterdetails: any;

  ftbutton = "Save"; // buttom loading..
  @ViewChild('p2') public filterPopover: NgbPopover;
  @ViewChild('CordinatorPopover') public CordinatorPopover: NgbPopover;
  @ViewChild('CordinatorPopover') public ProcessorPopover: NgbPopover;
  @ViewChild('gridUser') gridUser: any;

  @ViewChild(GridComponent, { static: true })
  public grid: GridComponent;
  actionIPLNOs: Array<any>;
  UserDetailsType = 0;
  UserDetailsModal: any;
  tabs = Tabs;
  WorkOrderCount: any;

  constructor(
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
    private xRouter: Router,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private xClientResultServices: ClientResultServices,
    private EncrDecr: EncrDecrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private xAddInstructionServices: AddInstructionServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xAddUserServices: AddUserServices,
  ) {

    var encuser = JSON.parse(localStorage.getItem('usertemp_'));
    var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
    this.user = JSON.parse(decval);

    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);

      switch (this.decuser[0].GroupRoleId) {
        case 1:
          {
            this.tabhide = false;

            break;
          }
        case 2:
          {
            this.initialColumns[27].tab = 'true'
            this.tabhide = true;
            this.tabs[1].hidden = true;
            this.tabs[2].hidden = true;
            break;
          }
        case 3:
          {
            this.tabhide = false;
            break;
          }
        case 4:
          {
            this.tabhide = false;
            break;
          }
        case 5:
          {
            this.tabhide = false;
            break;
          }
      }
    }
    this.state = {

      take: 25,
      filter: { logic: 'and', filters: [{ field: 'workOrderNumber', operator: 'contains', value: '' }] },
      sort: [{ field: "", dir: "asc" }]
    };
    this.GetDropDowndata();
    this.getautoworkorderviewdata();
    this.allData = this.allData.bind(this);
  }
  NoofRowscoun = 200;
  pageSize = 200; // Number of items to display per page
  skip = 0; // Number of items to skip
  total = 0;
  PageValue = 1;

  ngOnInit() {
     debugger;
    this.spinner.show();
    this.GetWorkorderActionData();

  //   const savedState = localStorage.getItem('wo_grid_state');
  // if (savedState) {
  //   this.state = JSON.parse(savedState);
  //   this.skip = this.state.skip; // Initialize other necessary properties
  //   // Apply filters using this.state and any other required properties
  // }

  // const savedFilter = localStorage.getItem('wo_grid_filter');
  // if (savedFilter) {
  //   this.filterdatas = JSON.parse(savedFilter);
  //   // Delay the method call until the view is fully initialized
  //   setTimeout(() => {
  //     this.applyFiltersToColumns();
  //   });
  // }

  }

  ngAfterViewInit() {
    debugger
    const savedFilter = localStorage.getItem('wo_grid_filter');
    if (savedFilter) {
      this.filterdatas = JSON.parse(savedFilter);
      this.applyFiltersToColumns();
    }
  }

  applyFiltersToColumns() {
    debugger
    if (this.gridUser && this.gridUser.columns) {
      this.gridUser.columns.forEach((column) => {
        const field = column.field;
        if (this.filterdatas.hasOwnProperty(field)) {
          column.filter = this.filterdatas[field];
        }
      });

       
    }
  }

  

  handleFilter(value) {
    this.data = this.source.filter((s) => s.WF_QueryName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  getautoworkorderviewdata() {
     debugger;
    if (localStorage.getItem('Statuslst') != undefined && localStorage.getItem('Statuslst') != null && localStorage.getItem('Statuslst') != 'undefined') {
      this.Statuslst = JSON.parse(localStorage.getItem('Statuslst'))
      this.FilterData()
    }
    else {
      this.WorkOderViewModelobj.NoofRows = this.NoofRowscoun;
      this.WorkOderViewModelobj.Skip = 0;
      this.WorkOderViewModelobj.PageNumber = 1;
      this.WorkOderViewModelobj.Type = 1;
      this.xSaveWorkOrderViewServices
        .WorkorderViewPostData(this.WorkOderViewModelobj)
        .subscribe(Response => {
          console.log('sandip', Response)
          this.getGridData(Response[0]);
          this.cachedData[0] = this.gridData;

          this.WorkOrderCount = Response[1][0].workordercount;
          var maxpagecount = this.WorkOrderCount / this.NoofRowscoun
          // this.maxpagecountval = +maxpagecount.toFixed(0);
          this.maxpagecountval = Math.ceil(maxpagecount);
          // this.GlobalVariable = Response[1][0].workordercount;
          //console.log('this.GlobalVariable',this.GlobalVariable)
          this.typeval = 1;
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.CachedData(1, this.NoofRowscoun, 1);
          }, 5000);

        });
    }

  }
  typeval: number = 1;
  public gridData: GridDataResult[] = [];
  loadGridData(pageNumber: number, noOfRows: number, buttontype: number): void {
    //  debugger
    const pageIndex = pageNumber;

    if (this.cachedData[pageIndex - 1]) {
      this.getGridData(this.cachedData[pageIndex - 1]);
      if (buttontype == 1) {
        this.Nextbutton = true;
        if (this.maxpagecountval > this.cachedData.length) {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.CachedData(pageIndex, noOfRows, this.typeval);

          }, 5000);
        }
        else {
          if (pageIndex < this.maxpagecountval) {
            this.Nextbutton = false;
          }
        }
      }


    }
  }
  //   public pageChange(event: PageChangeEvent): void {
  //   // debugger
  //   // this.skip = event.skip;
  //   // this.loadGridData(this.skip,this.pageSize,0)
  // }


  Previousbutton: boolean = true;
  Nextbutton: boolean = true;
  goToPreviousPage(): void {
    //  debugger
    this.PageValue -= 1;
    if (this.PageValue == 1) {
      // disable button
      this.Previousbutton = true;
      this.Nextbutton = false;
    }
    else {
      // Enable button
      this.Previousbutton = false;
      this.Nextbutton = false;
    }
    this.loadGridData(this.PageValue, this.pageSize, 0);
  }

  // Nextbutton:boolean

  goToNextPage(): void {
    //  debugger
    this.PageValue += 1;
    if (this.PageValue >= this.maxpagecountval) {
      //Enable button
      this.Previousbutton = false;
      this.Nextbutton = true;
    }
    else {
      this.Previousbutton = false;
      this.Nextbutton = false;
      //disable button
    }
    this.loadGridData(this.PageValue, this.pageSize, 1);

  }


  public cachedData: any[] = [];
  CachedData(pageNumber: number, noOfRows: number, Type: number): void {
    //  debugger;
    const pageIndex = pageNumber;
    let noofrows = this.NoofRowscoun;
    if (Type == 1) {
      this.WorkOderViewModelobj.NoofRows = noofrows;
      this.WorkOderViewModelobj.Skip = this.skip;
      this.WorkOderViewModelobj.PageNumber = pageIndex + 1;
      this.WorkOderViewModelobj.Type = 1;
      if (pageIndex < this.maxpagecountval) {
        this.xSaveWorkOrderViewServices.WorkorderViewPostData(this.WorkOderViewModelobj)
          .subscribe((result: GridDataResult) => {
            const newData = result[0];
            const mergedData = this.cachedData.reduce((acc, val) => acc.concat(val), []).concat(newData);
            const filterdata = mergedData.filter((value, index, self) => self.findIndex(item => item.workOrder_ID === value.workOrder_ID) === index);
            const duplicateData = mergedData.filter((value, index, self) => self.findIndex(item => item.workOrder_ID === value.workOrder_ID) !== index);
            // console.log('duplicateData',duplicateData);
            this.cachedData[pageIndex] = filterdata;
            this.Nextbutton = false;

          });

      }
    }
    else if (Type == 5) {
      this.CommonStatusDTOObj.whereclause = JSON.stringify(this.Statuslst);
      this.CommonStatusDTOObj.NoofRows = this.NoofRowscoun;
      this.CommonStatusDTOObj.Skip = this.skip;
      this.CommonStatusDTOObj.PageNumber = pageIndex + 1;
      this.CommonStatusDTOObj.Type = 5;
      this.xSaveWorkOrderViewServices
        .FilterWoStatusPostData(this.CommonStatusDTOObj)
        .subscribe((result: GridDataResult) => {
          const newData = result[0];
          // console.log('newdata',result[0])
          const mergedData = this.cachedData.reduce((acc, val) => acc.concat(val), []).concat(newData);
          const filterdata = mergedData.filter((value, index, self) => self.findIndex(item => item.workOrder_ID === value.workOrder_ID) === index);
          const duplicateData = mergedData.filter((value, index, self) => self.findIndex(item => item.workOrder_ID === value.workOrder_ID) !== index);
          // console.log('duplicateData',duplicateData);
          this.cachedData[pageIndex] = filterdata;
          this.Nextbutton = false;

        })
    }
  }

  newarray: any = []
  getGridData(res) {
  //  debugger;
    this.newarray = [];
    this.originalGridData = res ? _.cloneDeep(res) : [];
    if (!this.originalGridData) return;
    this.originalGridData.forEach(item => {
      item.gpsLatitude = parseFloat(item.gpsLatitude);
      item.gpsLongitude = parseFloat(item.gpsLongitude);
      item.dueDate = new Date(item.dueDate);
      const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', item.workOrder_ID);

      if (this.user[0].GroupRoleId === 2) {
        item.ViewUrl = "/client/clientresultinstruction/" + btoa(encrypted);
      } else {
        item.ViewUrl = "/client/clientresultinstruction/" + btoa(encrypted);
      }
      item.ViewPhotosUrl = "/client/clientresultphoto/" + btoa(encrypted);
      this.initialColumns.forEach(e => {
        if (e.type === 'date') {
          item[e.field] = new Date(item[e.field]);
        }
      });
    });

    const gridDataResults: GridDataResult[] = this.originalGridData.map((item: any) => ({
      data: item,
      total: 0, // Assign a default value for the 'total' property if needed

    }));

    this.gridData = gridDataResults;
    // console.log('getGridData', this.gridData);
    for (let i = 0; i < this.gridData.length; i++) {
      this.newarray.push(this.gridData[i].data)
    }
    console.log('newarray', this.newarray);

    this.alldataval = this.newarray;
    this.gridData = this.alldataval;
    // console.log('alldataval',this.alldataval)
    this.locked = true;
  }
  //excel
  exportAsXLSX(): void {
    this.xSaveWorkOrderViewServices.exportAsExcelFile(this.alldataval, "WorkOrder");
  }

  ModelObj: any;
  BindData: any;
  // this code selected event row
  showDetails(event, dataItem) {
    this.ClientResultPhotoModelObj.IPLNO = dataItem.IPLNO;
    this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID = dataItem.workOrder_ID;
    this.ClientResultPhotoModelObj.Type = 1;
    this.ClientResultPhotoModelObj.Client_Result_Photo_ID = 0;

    this.AsycWaitPhotoscall();

    this.TaskBidMasterModelObj.workOrder_ID = this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.BindData = response[0][0];
        this.xClientResultServices.setPathParam(this.BindData);
        const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);

        let routeUrl;
        if (this.user[0].GroupRoleId === 2) {
          routeUrl = "/client/clientresultinstruction/" + btoa(encrypted);
        } else {
          routeUrl = "/client/clientresultinstruction/" + btoa(encrypted);
        }
        this.xRouter.navigate([routeUrl]);
      });
  }

  public modelx: any;
  // this code for auto complete search only
  @ViewChild("instance") instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  //public modelx: any;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focus$),
      merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
      map(term =>
        (term === ""
          ? this.searchArrayobj
          : this.searchArrayobj.filter(
            v => v.Name.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
        ).slice(0, 7)
      )
    );
  formatter = (x: { Name: string }) => x.Name;

  //  photos call photos call
  AsycWaitPhotoscall() {
    var promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 7000);
    });
  }

  // photos call
  GetClientImages() {
    this.xClientResultOldPhotoServices
      .ViewCLientImagesData(this.ClientResultPhotoModelObj)
      .subscribe(response => {
      });
  }

  SaveChangesColumn() {
    localStorage.removeItem("DataA");
    localStorage.removeItem("DataB");

    this.dataA = this.previousDataA;
    // console.log('sandip',this.previousDataA)
    this.dataB = this.previousDataB;
    this.columns = this.getActiveItems(this.dataA);

    localStorage.setItem("DataA", JSON.stringify(this.dataA));
    localStorage.setItem("DataB", JSON.stringify(this.dataB));

    this.WorOrderColumnjsonObj.WC_UserId = this.user[0].User_pkeyID;
    this.WorOrderColumnjsonObj.WC_Show_Column_Jsonarr = localStorage.getItem('DataA');
    this.WorOrderColumnjsonObj.WC_Hide_Column_Jsonarr = localStorage.getItem('DataB');

    this.xSaveWorkOrderViewServices
      .jsonColumnPostData(this.WorOrderColumnjsonObj)
      .subscribe(Response => {
        alert('Column record has been updated...');
      })
  }

  public onDropGroupA(args: any): void {
    if (args.destination) {
      this.previousDataA = args.source.currentData.filter(item => {
        return args.items.find(e => e.Keydata == item.Keydata) ? false : true;
      });
      this.previousDataB = args.destination.currentData;
    } else {
      this.previousDataA = args.source.currentData;
      this.previousDataB = this.dataB;
    }
  }

  public onDropGroupB(args: any): void {
    if (args.destination) {
      this.previousDataA = args.destination.currentData;
      this.previousDataB = args.source.currentData.filter(item => {
        return args.items.find(e => e.Keydata == item.Keydata) ? false : true;
      })
    } else {
      this.previousDataB = args.source.currentData;
      this.previousDataA = this.dataA;
    }
  }

  getActiveItems(currentItems) {
    let columns = [];
    currentItems.forEach(item => {
      let column = this.initialColumns.find(column => column.title === item['Wo_Column_Name']);
      if (columns.indexOf(column) === -1) {
        columns.push(column);
      }
    });
    return columns;
  }

  FilterData() {
    //  debugger
    this.cachedData = [];
    this.Previousbutton = true;
    this.Nextbutton = true;
    this.maxpagecountval = 0;
    localStorage.setItem("Statuslst", JSON.stringify(this.Statuslst));
    this.CommonStatusDTOObj.whereclause = JSON.stringify(this.Statuslst);
    this.spinner.show();
    this.CommonStatusDTOObj.NoofRows = this.NoofRowscoun;
    this.CommonStatusDTOObj.Skip = 0;
    this.CommonStatusDTOObj.PageNumber = 1;
    if (localStorage.getItem('wo_grid_state') != undefined && localStorage.getItem('wo_grid_state') != 'undefined') {
      var wo_grid_state = JSON.parse(localStorage.getItem('wo_grid_state'));
      console.log('Niral',wo_grid_state);
      if(wo_grid_state.filter != undefined && wo_grid_state.filter != 'undefined')
      {
        this.filterdata = JSON.stringify(wo_grid_state.filter.filters);
      }
      
    }
    this.CommonStatusDTOObj.FilterData = this.filterdata;
    console.log('Niral filter',this.filterdata);
    this.xSaveWorkOrderViewServices
      .FilterWoStatusPostData(this.CommonStatusDTOObj)
      .subscribe(response => {
        console.log('response filterdata',response)
        this.spinner.hide();
        this.getGridData(response[0]);
        this.cachedData[0] = this.gridData;
        var count = response[1][0].workordercount;
        // console.log('this.GlobalVariable',count)
        this.WorkOrderCount = response[1][0].workordercount;
        var maxpagecount = this.WorkOrderCount / this.NoofRowscoun
        this.maxpagecountval = Math.ceil(maxpagecount);
        // console.log('this.GlobalVariable',this. WorkOrderCount)
        if(this.WorkOrderCount > this.NoofRowscoun)
        {
          this.typeval = 5;
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.CachedData(1, this.NoofRowscoun, 5)
          }, 5000);
        }
       


      })


  }
  name: string;
//   resetFilter() {
//     debugger
// this.locked = false;
//     this.clearFilter();
//     this.state = {
//       // skip: 0,
//       take: this.takevalue,
//       filter: { logic: 'and', filters: [] },
//       sort: [{ field: "", dir: "asc" }]
//     };
//     localStorage.removeItem('Statuslst');
//     this.dataStateChange(this.state)
//     this.getautoworkorderviewdata();
//     this.Statuslst = _.cloneDeep(this.originalStatuslst);
//   }
  SaveData;
  inactivearr = [];
  GetWorkorderActionData() {
    //  debugger
    this.filters[0].data = [];
    this.WorkOrderActionsObj.Wo_Column_IsActive = true;
    this.xSaveWorkOrderViewServices
      .ActionData(this.WorkOrderActionsObj)
      .subscribe(response => {
        console.log('res',response)

        this.takevalue = response[2][3].Wc_Grid_ShortID;
        this.takevalue = this.takevalue == 0 ? 25 : this.takevalue;
        this.resData = response;
        console.log('resData',this.resData)

        this.LoanTypeList = response[3][4]; // Loan
        this.drpLoanTypeList = this.LoanTypeList;

        this.WorkTypeList = response[3][1]; //Work Type
        this.drpWTList = this.WorkTypeList;

        // this.LoanTypeList = response[3][10]; // Loan
        // this.drpLoanTypeList = this.LoanTypeList;
        // this.WorkTypeList = response[3][1]; //Work Type
        // this.drpWTList = this.WorkTypeList;

        this.Status_FilterList = response[1][0];
        var defaultstatu = {
          Status_ID: 0,
          Status_Name: "Select"
        }
        this.filters[0].data.push(defaultstatu);
        response[1][0].forEach(element => {
          this.filters[0].data.push(element);
        });

        this.CompanyList = response[3][0]; //Client
        this.drpComList = this.CompanyList;

        this.CategoryList = response[3][2]; //Category
        this.drpCatList = this.CategoryList;

        this.CordinatorList = response[3][7]; //Coordinator
        this.drpCoordinatorList = this.CordinatorList;

        this.ProcessorList = response[3][6]; //Processor
        this.drpProcessorList = this.ProcessorList;

        this.ContractorList = response[3][5]; //Contractor
        this.drpConList = this.ContractorList;

        this.CustomerList = response[3][3]; //Customer
        this.drpCustomerList = this.CustomerList;


        // this.filters[0].data =  response[1][0];
        // this.CompanyList = response[3][0]; //Client
        // this.drpComList = this.CompanyList;
        // this.CategoryList = response[3][2]; //Category
        // this.drpCatList = this.CategoryList;
        // this.CordinatorList = response[3][16]; //Coordinator
        // this.drpCoordinatorList = this.CordinatorList;
        // this.ProcessorList = response[3][15]; //Processor
        // this.drpProcessorList = this.ProcessorList;
        // this.ContractorList = response[3][14]; //Contractor
        // this.drpConList = this.ContractorList;
        // this.CustomerList = response[3][9]; //Customer
        // this.drpCustomerList = this.CustomerList;

        this.savedFilter = response[4][0];
        this.source = [];
        // debugger;
        this.savedFilter.forEach(filter => {
          if (filter.WF_IsLoad == true) {
            this.defaultData = [];
            this.defaultData = filter;
            this.loaddata = filter.WF_PkeyID;
            this.name = filter.WF_QueryName;
          }
          else {
            this.source.push(filter);
          }
        });
        this.data = this.source.slice();
        //niral
        if (localStorage.getItem('Statuslst') != undefined && localStorage.getItem('Statuslst') != null && localStorage.getItem('Statuslst') != 'undefined') {
          this.Statuslst = JSON.parse(localStorage.getItem('Statuslst'))
        }
        else {
          this.Statuslst = response[1][0];
        }

        this.originalStatuslst = _.cloneDeep(response[1][0]);
        //  debugger;
        this.dataA = response[2][0];
        this.inactivearr = response[2][1];
        this.previousDataA = this.dataA;
        this.dataB =  this.inactivearr;

        let inactiveColumns = this.initialColumns.filter(item => {
           return this.dataB.find(e => e['Wo_Column_Name'] === item.title) ? true : false
         });
         
        // let inactiveColumns = this.initialColumns.filter(item => {
        //   return this.dataA.find(e => e['Wo_Column_Name'] === item.title) ? false : true
        // });


        this.dataB = inactiveColumns.map(obj => {
          let rObj = {};
          rObj['Keydata'] = obj.field;
          rObj['type'] = 0;
          rObj['UserID'] = 0;
          rObj['Wo_Column_Name'] = obj.title;
          return rObj;
        });

        this.previousDataB = this.dataA;

        localStorage.removeItem("DataA");
        localStorage.removeItem("DataB");
        localStorage.setItem("DataA", JSON.stringify(this.dataA));
        localStorage.setItem("DataB", JSON.stringify(this.dataB));

        this.columns = [];
        this.dataA.forEach(obj => {
          this.columns.push(this.initialColumns.find(column => column.title === obj['Wo_Column_Name']));
        });
        if (response[2][2][0][0].WC_Query != null) {
          this.SaveData = JSON.parse(response[2][2][0][0].WC_Query);
          //console.log('get save filter', this.SaveData)
          for (let i = 0; i < this.SaveData.length; i++) {
            this.SaveFilterWorkOrderObj.workOrderNumber = this.SaveData[i].workOrderNumber;
            this.SaveFilterWorkOrderObj.status = this.SaveData[i].status;
            this.SaveFilterWorkOrderObj.dueDate = this.SaveData[i].dueDate;
            this.SaveFilterWorkOrderObj.city = this.SaveData[i].city;
            this.SaveFilterWorkOrderObj.state = this.SaveData[i].state;
            this.SaveFilterWorkOrderObj.zip = this.SaveData[i].zip;
            this.SaveFilterWorkOrderObj.IPLNO = this.SaveData[i].IPLNO;
            this.SaveFilterWorkOrderObj.Lotsize = this.SaveData[i].Lotsize;
            this.SaveFilterWorkOrderObj.Lock_Code = this.SaveData[i].Lock_Code;
            this.SaveFilterWorkOrderObj.Loan_Number = this.SaveData[i].Loan_Number;
            this.SaveFilterWorkOrderObj.Loan_Info = this.SaveData[i].Loan_Info;
            this.SaveFilterWorkOrderObj.address1 = this.SaveData[i].address1;
            this.SaveFilterWorkOrderObj.client = this.SaveData[i].client;
            this.SaveFilterWorkOrderObj.Work_Type = this.SaveData[i].Work_Type;
            this.SaveFilterWorkOrderObj.contractor = this.SaveData[i].contractor;
            this.SaveFilterWorkOrderObj.coordinator = this.SaveData[i].coordinator;
            this.SaveFilterWorkOrderObj.processor = this.SaveData[i].processor;
            this.SaveFilterWorkOrderObj.category = this.SaveData[i].category;
            this.SaveFilterWorkOrderObj.customer = this.SaveData[i].customer;
            this.SaveFilterWorkOrderObj.Filter_Name = this.SaveData[i].Filter_Name;
          }
        }
        this.spinner.hide()
        // debugger
        if (response[2][3].Wc_Grid_ShortID != 0) {

          //  debugger
          if (localStorage.getItem('wo_grid_state') != undefined) {
            var wo_grid_state = JSON.parse(localStorage.getItem('wo_grid_state'))
            this.state = {
              // skip: 0,
              take: this.takevalue,
              filter: wo_grid_state.filter,
              sort: wo_grid_state.sort
            }
          }
          else {
            this.state = {
              // skip: 0,
              take: this.takevalue,
              filter: { logic: 'and', filters: [] },
              sort: [{ field: "", dir: "asc" }]
            }
          }
        }
        else if (response[2][3].Wc_Grid_ShortID == 0) {
          // debugger;
          if (localStorage.getItem('wo_grid_state') != undefined) {
            var wo_grid_state = JSON.parse(localStorage.getItem('wo_grid_state'))
            this.state = {
              // skip: 0,
              take: this.takevalue,
              filter: wo_grid_state.filter,
              sort: wo_grid_state.sort
            }
          }
          else {
            this.state = {
              // skip: 0,
              take: this.takevalue,
              filter: { logic: 'and', filters: [] },
              sort: [{ field: "", dir: "asc" }]
            }
          }

        }
        else {
          this.state = { take: this.takevalue }
        }
      });
  }

  //Action checkbox grid
  workOrder_ID;
  checkRow() {
    //  debugger
    this.chkclick = this.gridData.filter((item: ExtendedGridDataResult) => item.chkdata).length === 0 ? true : false;
  }
  checkRowAll() {
    // debugger;
    this.checkAll = !this.checkAll;
    this.gridData.forEach((item: ExtendedGridDataResult) => item.chkdata = this.checkAll ? true : false);
    this.chkclick = this.gridData.filter((item: ExtendedGridDataResult) => item.chkdata).length === 0 ? true : false;
  }

  SelectRow(selectedData, content) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', selectedData.workOrder_ID);
    this.workOrder_ID = btoa(encrypted);

    this.modalService
      .open(content, { windowClass: "xlModal" })
      .result.then(result => {
      }, reason => { window.scroll(0, 0); });
  }

  navToPhoto(dataItem) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
    this.xRouter.navigate(["/client/clientresultphoto/" + btoa(encrypted)]);
  }

  // update action workorder data
  afterRecordUpdate() {
    //debugger;
    this.chkclick = true;
    this.getautoworkorderviewdata();
  }

  statusColor(statusId) {
    if (!statusId) return;
    return getStatusColor(parseInt(statusId));
  }

  public colorDate(date, field): SafeStyle {
    if (date === null || date === undefined || field !== 'dueDate') return;
    let dueDate = new Date(date);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dueDate > tomorrow) return;
    return dueDate >= today ? '#FCF998' : '#F09EA0';
  }

  sendMessage(dataItem, content) {
    this.workOrder_ID = dataItem.workOrder_ID;
    this.selectedIPLNO = dataItem.IPLNO;
    this.selectedAddress = dataItem.address1;
    this.selectedWorkOrder = dataItem.workOrderNumber;
    $('body').addClass('modal-open');
    this.modalService
      .open(content, { windowClass: "xlModal" })
      .result.then(result => { this.closeModal() }, reason => { this.closeModal() });
  }
  savedata = [];
  SaveFilter() {
    // debugger
    this.isFilterLoading = true;
    this.ftbutton = "Processing";
    var data = {
      workOrderNumber: this.SaveFilterWorkOrderObj.workOrderNumber,
      status: (this.SaveFilterWorkOrderObj.status).toString(),
      dueDate: this.SaveFilterWorkOrderObj.dueDate,
      city: this.SaveFilterWorkOrderObj.city,
      state: (this.SaveFilterWorkOrderObj.state).toString(),
      zip: this.SaveFilterWorkOrderObj.zip,
      IPLNO: this.SaveFilterWorkOrderObj.IPLNO,
      Lotsize: this.SaveFilterWorkOrderObj.Lotsize,
      Lock_Code: this.SaveFilterWorkOrderObj.Lock_Code,
      Loan_Number: this.SaveFilterWorkOrderObj.Loan_Number,
      Loan_Info: (this.SaveFilterWorkOrderObj.Loan_Info).toString(),
      address1: this.SaveFilterWorkOrderObj.address1,
      Client: this.SaveFilterWorkOrderObj.client,
      Contractor: this.SaveFilterWorkOrderObj.contractor,
      Cordinator: this.SaveFilterWorkOrderObj.coordinator,
      Processor: this.SaveFilterWorkOrderObj.processor,
      Category: this.SaveFilterWorkOrderObj.category,
      Customer_Number: this.SaveFilterWorkOrderObj.customer,
      WorkType: this.SaveFilterWorkOrderObj.Work_Type,
      Work_Type_Group: (this.SaveFilterWorkOrderObj.Work_Type_Group).toString(),
      County: (this.SaveFilterWorkOrderObj.County).toString(),
      WF_QueryName: this.filterName
    }
    if (data.WF_QueryName == "") {
      alert('Filter name is required!')
    }
    else {
      this.savedata.push(data);
      this.WorOrderColumnjsonObj.NoofRows = this.NoofRowscoun;
      this.WorOrderColumnjsonObj.Skip = 0;
      this.WorOrderColumnjsonObj.PageNumber = 1;
      this.WorOrderColumnjsonObj.Type = 1;
      this.WorOrderColumnjsonObj.WhereClause = JSON.stringify(this.savedata);
      this.WorOrderColumnjsonObj.WF_QueryName = data.WF_QueryName;
      this.xSaveWorkOrderViewServices.SaveFilterPostData(this.WorOrderColumnjsonObj)
        .subscribe(res => {
          this.isFilterLoading = false;
          this.ftbutton = "Save";
          if (res[1] == 1) {
            this.MessageFlag = "Filter saved...!";
            this.commonMessage();
            this.filterPopover.close();
            this.reset();
            this.GetWorkorderActionData();
          }
        })
    }

  }

  selectChangeHandler(event) {
    this.loadFilterId = event.WF_PkeyID;

  }
  loaddata: any;
  loadFilter() {
    this.spinner.show();
    this.xSaveWorkOrderViewServices.loadFilter(this.loadFilterId)
      .subscribe(res => {
        this.spinner.hide();
        this.loaddata = res[0];

        this.defaultData = [];
        this.getautoworkorderviewdata();
        this.GetWorkorderActionData();
      })
  }

  deleteFilter() {
    this.xSaveWorkOrderViewServices.DeleteFilter(this.loadFilterId)
      .subscribe(res => {
        this.getautoworkorderviewdata();
        this.GetWorkorderActionData();
      })
  }
  clearFilter() {
    // debugger
    this.loaddata = 0
    this.spinner.show();
    this.xSaveWorkOrderViewServices.ClearFilter()
      .subscribe(res => {

        this.GetWorkorderActionData();
        //debugger;
        this.defaultData = [];
        this.getautoworkorderviewdata();
        this.spinner.hide();
      })
  }
  clearFilter1() {
    this.reset();
  }
  ClearFilterData() {
    this.reset();

  }
  reset() {
    this.SaveFilterWorkOrderObj.workOrderNumber = '';
    this.SaveFilterWorkOrderObj.status = 0;
    this.SaveFilterWorkOrderObj.dueDate = '';
    this.SaveFilterWorkOrderObj.city = '';
    this.SaveFilterWorkOrderObj.state = 0;
    this.SaveFilterWorkOrderObj.zip = 0;
    this.SaveFilterWorkOrderObj.IPLNO = '';
    this.SaveFilterWorkOrderObj.Lotsize = '';
    this.SaveFilterWorkOrderObj.Lock_Code = '';
    this.SaveFilterWorkOrderObj.Loan_Number = '';
    this.SaveFilterWorkOrderObj.Loan_Info = 0;
    this.SaveFilterWorkOrderObj.address1 = '';
    this.SaveFilterWorkOrderObj.client = 0;
    this.SaveFilterWorkOrderObj.contractor = 0;
    this.SaveFilterWorkOrderObj.coordinator = 0;
    this.SaveFilterWorkOrderObj.processor = 0;
    this.SaveFilterWorkOrderObj.category = 0;
    this.SaveFilterWorkOrderObj.customer = 0;
    this.SaveFilterWorkOrderObj.Work_Type = 0;
    this.SaveFilterWorkOrderObj.Filter_Name = '';
    this.SaveFilterWorkOrderObj.Work_Type_Group = 0;
    this.SaveFilterWorkOrderObj.County = 0;
    this.filterName = "";
  }
  openMapPopover() {
    if ($('ngb-popover-window') !== undefined)
      $('ngb-popover-window').remove();
  }

  closeModal() {
    $('.modal').remove();
    $('.modal-backdrop').remove();
    $('body').attr('style', '');
    $('body').removeClass('modal-open');
  }
  contractorFilter(value) {
    if (value != '') {
      this.drpConList = this.ContractorList.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpConList = this.ContractorList.slice();
    }
  }
  coordinatorFilter(value) {
    if (value != '') {
      this.drpCoordinatorList = this.CordinatorList.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpCoordinatorList = this.CordinatorList.slice();
    }
  }
  processorFilter(value) {
    if (value != '') {
      this.drpProcessorList = this.ProcessorList.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpProcessorList = this.ProcessorList.slice();
    }
  }
  companyFilter(value) {
    var filteredcom = this.CompanyList.filter(function (el) {
      return el.Client_Company_Name != null;
    });
    if (value != '') {
      this.drpComList = filteredcom.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpComList = this.CompanyList.slice();
    }
  }
  WTFilter(value) {
    var filteredwt = this.WorkTypeList.filter(function (el) {
      return el.WT_WorkType != null;
    });
    if (value != '') {
      this.drpWTList = filteredwt.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpWTList = this.WorkTypeList.slice();
    }
  }
  CatFilter(value) {
    ////dfebugger;
    var filteredwt = this.CategoryList.filter(function (el) {
      return el.Cat_Name != null;
    });
    if (value != '') {
      this.drpCatList = filteredwt.filter((s) => s.Cat_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpCatList = this.CategoryList.slice();
    }
  }
  LoanTypeFilter(value) {
    var filteredwt = this.LoanTypeList.filter(function (el) {
      return el.Loan_Type != null;
    });
    if (value != '') {
      this.drpLoanTypeList = filteredwt.filter((s) => s.Loan_Type.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpLoanTypeList = this.LoanTypeList.slice();
    }
  }
  CustomerFilter(value) {
    var filteredwt = this.CustomerList.filter(function (el) {
      return el.Cust_Num_Number != null;
    });
    if (value != '') {
      this.drpCustomerList = filteredwt.filter((s) => s.Cust_Num_Number.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpCustomerList = this.CustomerList.slice();
    }
  }

  GetDropDowndata() {
    this.xAddInstructionServices
      .DropdownDataPost(this.AddInstructionModelObj)
      .subscribe(response => {
        // console.log('dropdown',response)

        if (response.length != 0) {

          this.Client_FilterList = response[0];
          let defaultclient = {
            Client_pkeyID: 0,
            Client_Company_Name: "Select"
          }
          this.filters[2].data.push(defaultclient);
          response[0].forEach(element => {
            this.filters[2].data.push(element);
          });

          this.WorkType_FilterList = response[1];
          let defaultwt = {
            WT_pkeyID: 0,
            WT_WorkType: "Select"
          }
          this.filters[5].data.push(defaultwt);
          response[1].forEach(element => {
            this.filters[5].data.push(element);
          });

          this.Loan_FilterList = response[2];
          let defaultlt = {
            Loan_pkeyId: 0,
            Loan_Type: "Select"
          }
          this.filters[4].data.push(defaultlt);
          response[2].forEach(element => {
            this.filters[4].data.push(element);
          });


          this.Cust_FilterList = response[3];
          let defaultctmr = {
            Cust_Num_pkeyId: 0,
            Cust_Num_Number: "Select"
          }
          this.filters[3].data.push(defaultctmr);
          response[3].forEach(element => {
            this.filters[3].data.push(element);
          });

          this.WorkTypeGroupList = response[4]; // work type group

          let defaultwtg = {
            Work_Type_Cat_pkeyID: 0,
            Work_Type_Name: "Select"
          }
          this.filters[6].data.push(defaultwtg);
          response[4].forEach(element => {
            this.filters[6].data.push(element);
          });
          this.GetDropDownCondata();
        }
      });
  }
  GetDropDownCondata() {
    this._drpdownmodelObj.Type = 1;     //change by sandip
    this.xWorkOrderDrodownServices    //change by sandip
      .DropdownGetWorkOrder(this._drpdownmodelObj)
      .subscribe(response => {
        // console.log('sun',response)

        let defaultstate = {
          IPL_StateID: 0,
          IPL_StateName: "Select"
        }
        this.filters[11].data.push(defaultstate);
        response[6].forEach(element => {
          this.filters[11].data.push(element);
        });
        this.StateList = response[6];

        this.Contr_FilterList = response[14]; //Contractor list
        let defaultcontr = {
          User_pkeyID: 0,
          User_FirstName: "Select"
        }
        this.filters[9].data.push(defaultcontr);
        response[14].forEach(element => {
          this.filters[9].data.push(element);
        });


        this.Coord_FilterList = response[15];
        let defaultcoor = {
          User_pkeyID: 0,
          User_FirstName: "Select"
        }
        this.filters[7].data.push(defaultcoor);
        response[15].forEach(element => {
          this.filters[7].data.push(element);
        });

        this.Proc_FilterList = response[16];
        let defaultpro = {
          User_pkeyID: 0,
          User_FirstName: "Select"
        }
        this.filters[8].data.push(defaultpro);
        response[16].forEach(element => {
          this.filters[8].data.push(element);
        });
      })
  }
  selectChange(arg, i) {
    if (i == true) {
      if (arg > 0) {
        this.StateValFlag = false

        this.ContractorMapStateObj.IPL_StateID = arg;
        this.xAddUserServices.UserCountyDetails(this.ContractorMapStateObj).subscribe(response => {
          //console.log('bg',response);
          this.filters[12].data = response[0];
          this.CountyList = response[0];
          let defaultcounty = {
            ID: 0,
            COUNTY: "Select"
          }
          this.filters[12].data.push(defaultcounty);
          response[0].forEach(element => {
            this.filters[12].data.push(element);
          });

        });
      }
      else {
        this.StateValFlag = true;
      }
    }

  }
  Filtermethod(drpName, event) {

    if (event != undefined && event != "") {
      if (drpName == "status") {
        var filteredcustomer = this.Status_FilterList.filter(function (el) {
          return el.Status_Name != "";
        });
        this.filters[0].data = filteredcustomer.filter((s) => s.Status_Name.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "state") {
        var filteredcustomer = this.StateList.filter(function (el) {
          return el.IPL_StateName != "";
        });
        this.filters[11].data = filteredcustomer.filter((s) => s.IPL_StateName.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "client") {
        var filteredcustomer = this.Client_FilterList.filter(function (el) {
          return el.Client_Company_Name != "";
        });
        this.filters[2].data = filteredcustomer.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "customer") {
        var filteredcustomer = this.Cust_FilterList.filter(function (el) {
          return el.Cust_Num_Number != "";
        });
        this.filters[3].data = filteredcustomer.filter((s) => s.Cust_Num_Number.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "Loan_Info") {
        var filteredcustomer = this.Loan_FilterList.filter(function (el) {
          return el.Loan_Type != "";
        });
        this.filters[4].data = filteredcustomer.filter((s) => s.Loan_Type.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "Work_Type") {
        var filteredcustomer = this.WorkType_FilterList.filter(function (el) {
          return el.WT_WorkType != "";
        });
        this.filters[5].data = filteredcustomer.filter((s) => s.WT_WorkType.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "Work_Type_Group") {
        var filteredcustomer = this.WorkTypeGroupList.filter(function (el) {
          return el.Work_Type_Name != "";
        });
        this.filters[6].data = filteredcustomer.filter((s) => s.Work_Type_Name.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "coordinator") {
        var filteredcustomer = this.Coord_FilterList.filter(function (el) {
          return el.User_FirstName != "";
        });
        this.filters[7].data = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "processor") {
        var filteredcustomer = this.Proc_FilterList.filter(function (el) {
          return el.User_FirstName != "";
        });
        this.filters[8].data = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

      if (drpName == "contractor") {
        var filteredcustomer = this.Contr_FilterList.filter(function (el) {
          return el.User_FirstName != "";
        });
        this.filters[9].data = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }


      if (drpName == "County") {
        var filteredcustomer = this.CountyList.filter(function (el) {
          return el.COUNTY != "";
        });
        this.filters[12].data = filteredcustomer.filter((s) => s.COUNTY.toLowerCase().indexOf(event.toLowerCase()) !== -1);
      }

    }
    else {
      if (drpName == "status") {
        this.filters[0].data = this.Status_FilterList.slice();
      }
      if (drpName == "state") {
        this.filters[11].data = this.StateList.slice();
      }
      if (drpName == "client") {
        this.filters[2].data = this.Client_FilterList.slice();
      }
      if (drpName == "customer") {
        this.filters[3].data = this.Cust_FilterList.slice();
      }
      if (drpName == "Loan_Info") {
        this.filters[4].data = this.Loan_FilterList.slice();
      }
      if (drpName == "Work_Type") {
        this.filters[5].data = this.WorkType_FilterList.slice();
      }
      if (drpName == "Work_Type_Group") {
        this.filters[6].data = this.WorkTypeGroupList.slice();
      }
      if (drpName == "coordinator") {
        this.filters[7].data = this.Coord_FilterList.slice();
      }
      if (drpName == "processor") {
        this.filters[8].data = this.Proc_FilterList.slice();
      }
      if (drpName == "contractor") { }
      this.filters[9].data = this.Contr_FilterList.slice();
    }
    if (drpName == "County") {
      this.filters[12].data = this.CountyList.slice();
    }
  }
  public filtersval: FilterDescriptor[] = [];
  filtervaldata = [];

  dataStateChange(state: DataStateChangeEvent): void {
      debugger
     
   // this.filtervaldata.push(this.state.filter.filters)
    // Remove the filter from the state to prevent automatic filtering
    //state.filter = null;  
    this.state = state;
    this.skip = state.skip; 

    // if (this.state.filter != undefined) {
    //   localStorage.setItem('filterdetail', JSON.stringify(this.state.filter.filters));
    // }
    if (this.state != undefined) {
      localStorage.setItem('wo_grid_state', JSON.stringify(this.state));
      console.log('this.state1',this.state)
    }
    if (this.state.take != 0) {
      this.GridShortDetails(this.state.take)
    }
   
  }

  filterdatas: { [fieldName: string]: FilterDescriptor } = {};

  onFilter(event: any): void {
    debugger
    const filters: FilterDescriptor[] = event.filters;
  
    // Clear the existing filterdatas object
    this.filterdatas = {};
  
    // Loop through the filters and assign them to the appropriate field
    filters.forEach((filter) => {
      if (typeof filter.value === 'string') {
        this.filterdatas[filter.value] = filter;
      }
    });
  
    localStorage.setItem('wo_grid_filter', JSON.stringify(this.filterdatas));
  }

  // public onFilter(event: any): void {
  //   const filter: FilterDescriptor[] = event.filters;
  //   this.filterdata = JSON.stringify(filter);
  //   localStorage.setItem('wo_grid_filter', this.filterdata);
  // }

  // public onFilter(event: any): void 
  // {
  //   debugger;
  //   // const filter: FilterDescriptor = event.Filter;
  //   const filter: FilterDescriptor = event.filters;
  //   this.filterdata=JSON.stringify(filter);
  //   console.log('sun1234',this.filterdata)
  // }
  public runFilter(): void {
    debugger;
    this.FilterData();
    
  }
  public onFilterChange(filter: FilterDescriptor): void {
    // Retrieve the filter information for the desired column
    debugger;
    const columnFilter = filter as FilterDescriptor;
    const filterval = []; 
    filterval.push(columnFilter);
    if (columnFilter) {
      // Apply your custom logic to handle the filter for the column
      if(this.filtersval.length==0)
      {
        this.filtersval.push(filterval[0].filters);
      } 
      else
      {
        const existingIndex = this.filtersval.findIndex(f => f[0].field === filterval[0].filters[0].field);
        if (existingIndex !== -1) {
          // If filter exists, update it
          this.filtersval[existingIndex] = filterval[0].filters;
        } else 
        {
          // If filter does not exist, insert it
          this.filtersval.push(filterval[0].filters);
        }
      }   
      
     //this.filtersval.push(filterval[0].filters);
      // Make the API call or perform any necessary action with the filter value
    }
  }

  onGridReady(grid: GridComponent) {
    this.grid = grid;
  }

  filtersvals: CompositeFilterDescriptor = {
    logic: 'and',
    filters: []
  };
  resetFilters() {
    debugger
    // Clear the custom filter value
    this.filtersvals.filters = [];
  
    // Reset the grid's filter value
    this.grid.filter = this.filtersvals;
  
    // Apply the changes to the grid
    this.grid.filterChange.emit(this.filtersvals);
    console.log('filtersvals',this.filtersvals)

    localStorage.removeItem('Statuslst');
        this.dataStateChange(this.state)
        this.getautoworkorderviewdata();
         this.Statuslst = _.cloneDeep(this.originalStatuslst);
  }
  

  public pageChange(event: any): void {
    // this.skip = event.skip;
    // this.state.skip = this.skip;
    // this.gridUser.data = this.newarray;
  }
  GridShortDetails(val) {
    //  debugger
    //console.log('short',val)
    this.WorOrderColumnjsonObj.Wc_Grid_ShortID = val;
    this.xSaveWorkOrderViewServices.SavePagePostData(this.WorOrderColumnjsonObj)
      .subscribe(res => {
        // console.log('res12', res)

      })
  }
  exportToExcel() {
    //debugger;
    this.grid.saveAsExcel();
  }

  public allData(): ExcelExportData {
    // debugger;
    const result: ExcelExportData = {
      // data: process(this.griddata, this.state).data,
      data: process(this.gridData, this.state).data,

    };
    //debugger;
    return result;
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  SetHelpFlag() {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }
  openMessageBox(dataItem, messageBox) {
    this.actionIPLNOs = [{ IPLNO: dataItem.IPLNO, WorkOrder_Id: dataItem.workOrder_ID }]
    this.modalService.open(messageBox, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  openECDNotesModal(dataItem, content) {
    this.actionIPLNOs = [{ IPLNO: dataItem.IPLNO, WorkOrder_Id: dataItem.workOrder_ID }]
    this.modalService.open(content, { windowClass: "lgModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  openWorkorderDetailModal(dataItem, content) {
    this.actionIPLNOs = [{ IPLNO: dataItem.IPLNO, WorkOrder_Id: dataItem.workOrder_ID }]
    this.modalService.open(content, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  closePopover(): void {
    if (this.UserDetailsType === 1) {

    }
    else if (this.UserDetailsType === 2) {
      if (this.CordinatorPopover.isOpen()) this.CordinatorPopover.close();
    }
    else if (this.UserDetailsType === 3) {
      if (this.ProcessorPopover.isOpen()) this.ProcessorPopover.close();
    }
  }
  openPopover(): void {
    // console.log('open' + this.CordinatorPopover.isOpen());
    if (!this.CordinatorPopover.isOpen()) this.CordinatorPopover.open();
  }
  openUserDetails(type, details) {
    this.UserDetailsType = type;
    this.UserDetailsModal = details;
    if (type === 1) {

    }
    else if (type === 2) {
      if (!this.CordinatorPopover.isOpen()) this.CordinatorPopover.open();
    }
    else if (type === 3) {
      if (!this.ProcessorPopover.isOpen()) this.ProcessorPopover.open();
    }
    //   if ($('ngb-popover-window') !== undefined)
    //     $('ngb-popover-window').remove();
    // }
  }
  SetColor(color) {
    if (color == null || color == "" || color == " " || color == "#FFFFFF" || color == "FFFFFF") {
      return "black"
    }
    else {
      return "#" + color;
    }
  }
  onClickTab(tab) {
    this.tabs.forEach((e) => {
      e.active = e === tab ? true : false;
    })
  }
  arr: any
  OpenWorkOrderLogHandler(workorderData) {
    this.arr = workorderData.IPLNO
    localStorage.setItem('getIPLNO', this.arr)
    this.xSaveWorkOrderViewServices.PostNewAccessLog(workorderData.workOrder_ID, 10)
      .subscribe(res => { })
  }
  
}

//
interface ModifiedRecords {
  addedRecords: { [key: string]: Object }[];
  deletedRecords: { [key: string]: Object }[];
  changedRecords: { [key: string]: Object }[];
}
