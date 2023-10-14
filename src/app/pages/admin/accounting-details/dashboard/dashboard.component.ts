import { Component, OnInit } from '@angular/core';
import { DashboardServices } from './dashboard-service';

import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Dashboard_Input_DTO, Dashboard } from './dashboard-model';
import { AccountingServices } from '../accounting-details.service';
import { type } from 'os';
import { finalize } from 'rxjs/operators';

const DEFAULT_COLORS = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC',
];

const DEFAULT_ICONS = [
  'fa fa-line-chart',
  'fa fa-bar-chart',
  'fa fa-pie-chart',
  'fa fa-area-chart',
];

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardServices: DashboardServices,
    private AccountingServices: AccountingServices
  ) {}
  stats: any = []; //for statistic component
  balanceByAccountChartData: Array<any> = [];
  ProfitLossArray: any[] = [];
  input: Dashboard_Input_DTO = new Dashboard_Input_DTO();
  SelectedProfitLoss: string = '30 Day';
  ExpensesArray: any[] = [];
  SelectedExpenses: string = '30 Day';
  IncomeArray: any[] = [];
  SelectedIncome: string = '30 Day';
  DashboardList;
  DefaultDashBoard: any;
  
  Dashboard: Dashboard = new Dashboard();
  ExpensesData: Array<any> = [];
  ExpensesDetails: any;
  ngOnInit(): void {
    const self = this;
    self.input.ExpensesDate = self.AccountingServices.getLastYearDate();
    self.input.IncomeDate = self.AccountingServices.getLastYearDate();
    self.input.ProfitLossDate = self.AccountingServices.getLastYearDate();
    self.input.IsProfitLossChanges = true;
    self.input.IsExpensesTypeChanges = true;
    self.input.IsIncomeTypeChanges = true;
    self.GetDefaultDashBoard(self.input);
    
    this.ProfitLossArray = [
      { Id: 0, Name: '30 Day' },
      { Id: 1, Name: '6 Month' },
      { Id: 2, Name: 'Last Year' },
    ];
    this.ExpensesArray = [
      { Id: 0, Name: '30 Day' },
      { Id: 1, Name: '6 Month' },
      { Id: 2, Name: 'Last Year' },
    ];
    this.IncomeArray = [
      { Id: 0, Name: '30 Day' },
      { Id: 1, Name: '6 Month' },
      { Id: 2, Name: 'Last Year' },
    ];
  }
  GetDefaultDashBoard(input: Dashboard_Input_DTO) {
    const self = this;
    self.dashboardServices
      .GetDefaultDashBoard(input)
      .pipe(finalize(() => (self.input.IsProfitLossChanges = false)))
      .pipe(finalize(() => (self.input.IsExpensesTypeChanges = false)))
      .pipe(finalize(() => (self.input.IsIncomeTypeChanges = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.DefaultDashBoard = result.Data;
          self.ExpensesDetails = [];
          self.ExpensesData = [];
          self.ExpensesDetails = self.DefaultDashBoard.Expenses.List;
          let pieData = self.ExpensesDetails.map((account) => account.Amount);
          let pieColors = self.configureDefaultColours(pieData);
          self.ExpensesDetails.map((status, idx) => {
            self.ExpensesData.push({
              Name: status.AccountName,
              value: status.Amount,
              color: pieColors[idx],
            });
          });
        }
      });
  }
  changeDashbaordData(Type, Data) {
    const self = this;
    switch (Data) {
      case 0:
        self.input.IsProfitLossChanges = true;
        self.input.ProfitLossType = Type;
        switch (Type) {
          case 0:
            self.input.ProfitLossDate = self.AccountingServices.getLastYearDate();
            break;
          case 1:
            self.input.ProfitLossDate = self.AccountingServices.GetLastThreeMonthDate();
            break;
          case 2:
            self.input.ProfitLossDate = self.AccountingServices.GetLastSixMonthDate();
            break;
        }
        break;
      case 1:
        self.input.IsExpensesTypeChanges = true;
        self.input.ExpensesType = Type;
        switch (Type) {
          case 0:
            self.input.ExpensesDate = self.AccountingServices.getLastYearDate();
            break;
          case 1:
            self.input.ExpensesDate = self.AccountingServices.GetLastThreeMonthDate();
            break;
          case 2:
            self.input.ExpensesDate = self.AccountingServices.GetLastSixMonthDate();
            break;
        }
        break;
      case 2:
        self.input.IsIncomeTypeChanges = true;
        self.input.IncomeType = Type;
        switch (Type) {
          case 0:
            self.input.IncomeDate = self.AccountingServices.getLastYearDate();
            break;
          case 1:
            self.input.IncomeDate = self.AccountingServices.GetLastThreeMonthDate();
            break;
          case 2:
            self.input.IncomeDate = self.AccountingServices.GetLastSixMonthDate();
            break;
        }
        break;
    }
    self.GetDefaultDashBoard(this.input);
  }
  setupStatsData() {
    let iconsArray = this.configureDefaultIcons(this.DashboardList);
    let colorArray = this.configureDefaultColours(this.DashboardList);

    this.stats = this.DashboardList.map((a, idx) => {
      return {
        label: a.AccountName,
        value: a.Amount,
        icon: iconsArray[idx],
        colour: colorArray[idx],
      };
    });
  }
  SelectProfitLoss(Id, Name) {
    this.SelectedProfitLoss = Name;
    this.Dashboard.ProfitLoss = Id;
    this.changeDashbaordData(Id, 0);
  }
  SelectExpenses(Id, Name) {
    this.SelectedExpenses = Name;
    this.Dashboard.Expenses = Id;
    this.changeDashbaordData(Id, 1);
  }
  SelectIncome(Id, Name) {
    this.SelectedIncome = Name;
    this.Dashboard.Income = Id;
    this.changeDashbaordData(Id, 2);
  }
  setupChartData() {
    let pieData = this.DashboardList.map((account) => account.Amount);
    let pieColors = this.configureDefaultColours(pieData);
    this.DashboardList.map((status, idx) => {
      this.balanceByAccountChartData.push({
        Name: status.AccountName,
        value: status.Amount,
        color: pieColors[idx],
      });
    });
  }

  //Utitlity methods
  private configureDefaultColours(data: number[]): string[] {
    let customColours = [];
    if (data.length) {
      customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      });
    }
    return customColours;
  }
  private configureDefaultIcons(data: number[]): string[] {
    let customIcons = [];
    if (data.length) {
      customIcons = data.map((element, idx) => {
        return DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
      });
    }
    return customIcons;
  }
  public labelContent(e: any): string {
    return e.category;
  }
  public labelAmount(e: any): string {
    return e.value;
  }
  public pielabelContent(e: any): string {
    return e.category;
  }
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
