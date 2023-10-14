import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import * as Chart from 'chart.js';
import 'chartjs-plugin-datalabels';

import { HomeModel, OrderColumns, CompanyColumns, OpenInvoices, InvoiceColumns, OpenOrders, OpenClients, ClientsColumns, Status, OpenLine, OrderColumns1 } from "./home-model";
import { HomepageServices } from "./home.service";
import { MessagingDetailsService } from '../client-result/message-details/message-details.service';
import { EncrDecrService } from '../../services/util/encr-decr.service';
import { getStatusColor } from 'src/app/models/status-model';
import { ChartModel, PieChartModel, StackBarChartModel, StackHorizontalChartModel, LineChartModel } from './chart-model';
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { Keepalive } from "@ng-idle/keepalive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  HomeModelobj: HomeModel = new HomeModel();
  currentMessage = new BehaviorSubject(null);
  formUsrLoginGroup: UntypedFormGroup; // create obj
  message: any;
  orderColumns = OrderColumns;
  orderColumns1 = OrderColumns1;
  openOrders = OpenOrders;
  openOrdersByStatus: Array<any> = [];
  openOrdersByCompany: Array<any> = [];
  openOrderInvoices: Array<any> = [];
  openLine = OpenLine;
  status = Status;
  companyColumns = CompanyColumns;
  chartLabels: Array<string> = [];
  tempPast = [0, 100, 3, 20, 6, 20, 13, 115];
  ordersByCompany: Array<any> = [];
  companyName: Array<any> = [];
  companyUnassigned:  Array<any> = [];
  companyAssigned:  Array<any> = [];
  companyComplete:  Array<any> = [];
  companyApprove:  Array<any> = [];
  companyTotal:  Array<any> = [];
  companyNameInvoice: Array<any> = [];
  invoiceFirstval: Array<any> = [];
  invoiceSecondval: Array<any> = [];
  invoiceThirdval: Array<any> = [];
  invoiceFourthval: Array<any> = [];
  pastStatus: Array<any> = [];
  futureStatus: Array<any> = [];
  invoicePieChart: Array<any> = [];
  pastStatus1: Array<any> = [];
  futureStatus1: Array<any> = [];
  backgroundColors = ['#4473C3', '#F07C2E', '#A5A5A5', '#FABF02'];
  barColors = ['#426FC4', '#E78035', '#FBC207', '#6FAE43'];
  statusColors: Array<string> = [];
  statusColors1: Array<string> = [];
  decuser: any;
  invoiceColumns = InvoiceColumns;
  openInvoices = OpenInvoices;
  openClients = OpenClients;
  clientsColumns = ClientsColumns;
  statusStackColors = ['#426FC4', '#E78035'];

  public statusBarColors = (point): string => {
    // this is what i want to return ...
    return this.colors[point.index];
  }
  public statusDonutData: Array<any> = [];;
  public labelContent(e: any): string {
    return e.category;
  }
  public colors = ['#DAEF56', '#FAC39A', '#BDC0ED', '#E4C2E5'];

  clientName : Array<any> = [];

  OfficeResulth:boolean = false;
  processorh:boolean = false;
  tabhide:boolean = false;


  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  @ViewChild('idleUserBox', { static: false }) idleUserModal: ElementRef;
  constructor(
    private xHomeServices: HomepageServices,
    private formBuilder: UntypedFormBuilder,
    private xRoute: Router,
    private xdatabase: AngularFireDatabase,
    private messagingService: MessagingDetailsService,
    private angularFireMessaging: AngularFireMessaging,
    private EncrDecr: EncrDecrService,
    private idle: Idle, private keepalive: Keepalive,
    private modalService: NgbModal,
    private authService: AuthService,
  ) {
    if(localStorage.getItem('usertemp_') != null)
    {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval  = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser  =JSON.parse(decval) ;
     // console.log('group',this.decuser)

      switch (this.decuser[0].GroupRoleId) {
        case 1:
          {
            this.OfficeResulth = false;
            this.processorh= false;
            this.tabhide = false;

            break;
          }
          case 2:
            {
              this.OfficeResulth = true;
              this.processorh= false;
              this.tabhide = true;

              break;
            }
            case 3:
              {
                this.OfficeResulth = false;
                 this.processorh= false;
                 this.tabhide = false;

                break;
              }
              case 4:
                {
                  this.OfficeResulth = false;
                  this.processorh= false;
                  this.tabhide = false;

                  break;
                }
                case 5:
                  {
                    this.OfficeResulth = false;
                    this.processorh= false;
                    this.tabhide = true;

                    break;
                  }
        }
    }
  }

  ngOnInit() {

    this.IdleUserManagement();
    //debugger
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    //this.clientName = localStorage.getItem('trackfoldername').split("_");
    let demo = this.EncrDecr.get('123456$#@$^@1ERF', (localStorage.getItem('trackfoldername')));
    this.clientName = demo.replace('_', " ")
    //console.log('client name', this.clientName)
    this.formUsrLoginGroup = this.formBuilder.group({
      Eamilname: ["", Validators.required],
      passwordname: ["", Validators.required]
    });
    this.getchartdata();
    // this.setDoughnutData();
  }

  onRecieveMessage() {
    this.angularFireMessaging.messages.subscribe(
      ({ data }: { data: any }) => {
       // console.log("new message received: ", data)
      },
      err => console.log(err),
    );
  }

  getchartdata() {
    //debugger
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);
    }

    this.xHomeServices.GetChartDetails(this.HomeModelobj).subscribe(response => {
//debugger
      // console.log('chart',response);
      this.ordersByCompany = response[1];
      this.ordersByCompany.forEach(company => {
        this.companyName.push(company.Client_Company_Name);
        this.companyUnassigned.push(company.Unassigned_count);
        this.companyAssigned.push(company.Assigned_count);
        this.companyComplete.push(company.Field_Complete_count);
        this.companyApprove.push(company.Office_Approved_count);
      })
      this.openOrdersByStatus = response[4];
     // console.log('chart data', this.openOrdersByStatus);
      this.openOrdersByStatus.forEach((status, index) => {
        this.pastStatus.push(status);
        this.pastStatus.push({"Status_Name": status.Status_Name, "value": status.PastStatusCount, "color": this.colors[index]});
        this.futureStatus.push(status);
        this.futureStatus.push({"Status_Name": status.Status_Name, "value": status.FutureStatusCount, "color": this.colors[index]});


      })
//debugger
      //added by unnati
      this.openOrdersByCompany =response[6];
      this.openOrdersByCompany.forEach((status, index) => {
        this.pastStatus1.push(status);
        this.pastStatus1.push({"Client_Company_Name": status.Client_Company_Name, "value": status.Pastdue, "color": this.colors[index]});
        this.futureStatus1.push(status);
        this.futureStatus1.push({"Client_Company_Name": status.Client_Company_Name, "value": status.Future, "color": this.colors[index]});


      })

     // console.log("past", this.pastStatus)
      this.openOrderInvoices = response[5];
      this.openOrderInvoices.forEach(company => {
        this.invoicePieChart.push({client: company.Client_Company_Name, total: company.Firstval+company.Secondval+company.Thirdval })

      })

    });
  }

  setDoughnutData() {
    this.openOrdersByStatus.forEach(order => {
      this.chartLabels.push(order.Status_Name);

    });

    let pastValues = [];
    let futureValues = [];

    this.openOrdersByStatus.forEach((order, index) => {
      this.statusColors.push(getStatusColor(order.Status_ID));
      pastValues.push(order.PastStatusCount);
      futureValues.push(order.FutureStatusCount);

    });


  }


  //added by unnati
  SetCompanyData(){
    this.openOrdersByCompany.forEach(order => {

      this.chartLabels.push(order.Client_Company_Name);
    });


    let pastValues1 = [];
    let futureValues1 = [];

    this.openOrdersByCompany.forEach((order, index) => {

      pastValues1.push(order.Pastdue);
      futureValues1.push(order.Future);

    });
  }

  setStackBarData() {
    let stackhorizontalCanvas: any = document.getElementById('stack-horizontal-bar');
    const ctxh = stackhorizontalCanvas.getContext('2d');

    let statushorizontalChart: any = new StackHorizontalChartModel().chart;
    statushorizontalChart.data.labels = this.ordersByCompany.map(item => (item.Client_Company_Name));

    this.clientsColumns.forEach((item, index) => {
      if (index === 0) return;
      statushorizontalChart.data.datasets.push({
        label: item.title,
        data: this.ordersByCompany.map(e => (e[item.field])),
        backgroundColor: this.barColors[index-1]
      })
    });
    statushorizontalChart.options.title.text = 'Clients';

    new Chart(ctxh, statushorizontalChart);

    // status invoice bar chart
    let invoiceBarCanvas: any = document.getElementById('stack-bar-invoice');
    const ctxi = invoiceBarCanvas.getContext('2d');

    let invoiceBarChart: any = new StackBarChartModel().chart;
    invoiceBarChart.data.labels = this.openOrderInvoices.map(item => (item.Client_Company_Name));

    this.invoiceColumns.forEach((item, index) => {
      if (index === 0) return;
      invoiceBarChart.data.datasets.push({
        label: item.title,
        data: this.openOrderInvoices.map(e => (e[item.field])),
        backgroundColor: this.barColors[index-1]
      })
    });
    invoiceBarChart.options.title.text = 'Aging Graph';

    new Chart(ctxi, invoiceBarChart);
  }

  setPieData() {
    //open invoice
    const canvasInvoice: any = document.getElementById('pie-invoice');
    const ctxi = canvasInvoice.getContext('2d');
    let invoiceChart: any = new PieChartModel().chart;
    invoiceChart.data.labels = this.openOrderInvoices.map(item => (item.Client_Company_Name));
    invoiceChart.data.datasets[0].data = this.openOrderInvoices.map(item => (
      Number(item.Firstval) + Number(item.Secondval) + Number(item.Thirdval) + Number(item.Fourthval)
    ).toFixed(2));
    invoiceChart.options.title.text = 'Total Amount Due';
    new Chart(ctxi, invoiceChart);
  }
  colorCode(statusId) {
    if (!statusId) return;
    let color = getStatusColor(statusId);
    return color;
  }
  IdleUserManagement(){

      // Convert Minute to Second
      var IdleTimerInSecond=parseInt((parseFloat(environment.userIdleManage.IdleTimer)*60).toString());
      var countDownTimeInSecond=parseInt((parseFloat(environment.userIdleManage.countDownTime)*60).toString());

     // sets an idle timeout of 5 seconds, for testing purposes.
     this.idle.setIdle(IdleTimerInSecond);
     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
     this.idle.setTimeout(countDownTimeInSecond);
     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

     this.idle.onIdleEnd.subscribe(() => {
       this.idleState = 'No longer idle.'
      //  console.log(this.idleState);
       this.reset();
     });

     this.idle.onTimeout.subscribe(() => {
       this.idleState = 'Timed out!';
       this.timedOut = true;
      //  console.log(this.idleState);
      this.logout()
     });

     this.idle.onIdleStart.subscribe(() => {
         this.idleState = 'You\'ve gone idle!'
        //  console.log(this.idleState);
        this.modalService.open(this.idleUserModal, { size: "sm", ariaLabelledBy: "modal-basic-title" }).result.then(result => { }, reason => { });
     });

     this.idle.onTimeoutWarning.subscribe((countdown) => {
       this.idleState = 'You will time out in ' + countdown + ' seconds!'
      //  console.log(this.idleState);
     });

     // sets the ping interval to 15 seconds
     this.keepalive.interval(15);

     this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

     this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  stay() {
    this.modalService.dismissAll();
    this.reset();
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  logout() {
    this.authService
        .AddUserAccessLogLogoutPost()
        .subscribe(response => {
          this.authService.logout();
          localStorage.removeItem('usertemp_');
          localStorage.removeItem('tempadmin');
          localStorage.removeItem('trackfoldername');
          localStorage.removeItem('UserTracking');
          localStorage.removeItem('UserTrackingTime');
          localStorage.removeItem('TOKEN');
          localStorage.removeItem('TOKEN');
          localStorage.clear();
          this.xRoute.navigate(['/']);
          this.modalService.dismissAll();
        });
  }

}
