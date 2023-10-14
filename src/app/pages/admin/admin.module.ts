import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from '@progress/kendo-angular-grid';
import { SharedModule } from 'src/app/shared.module';
import { AccessGuardService as AccessGuard } from '../../services/access/access-guard.service';
import {} from '../admin/company-info/add-company-info/add-company-info.module';













const routes: Routes = [
  {
    path: 'forms',
    loadChildren: () =>
      import('../admin/pcr-form/pcr-form.module').then((m) => m.PcrFormModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Forms' } },
  },
  {
    path: 'adminlinkpage',
    loadChildren: () =>
      import('../admin/admin-link/admin-link.module').then(
        (m) => m.AdminLinkPageModule
      ),
    // canActivate: [AccessGuard],
    // data: {role: {number: 1, page_name: 'AdminALL'}}
  },
  {
    path: 'workordersettings',
    loadChildren: () =>
      import('../home/work-order-settings/work-order-settings.module').then(
        (m) => m.WorkOrderSettingsPageModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Work Order Setting' } },
  },
  {
    path: 'worktype',
    loadChildren: () =>
      import(
        '../admin/work-type/work-type-category/work-type-category.module'
      ).then((m) => m.ViewWorkTypeCategoryModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Work Types' } },
  },
  {
    path: 'client',
    loadChildren: () =>
      import(
        '../admin/client-companies/view-client-companies/view-client-companies.module'
      ).then((m) => m.ViewClientCompaniesModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Add Client' } },
  },
  {
    path: 'company',
    loadChildren: () =>
      import(
        '../admin/company-info/view-company-info/view-company-info.module'
      ).then((m) => m.ViewCompanyInfoModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Company Settings' } },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../user/view-user/view-user.module').then(
        (m) => m.UserViewModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'View User' } },
  },
  {
    path: 'group',
    loadChildren: () =>
      import('../../pages/user/view-groups/view-groups.module').then(
        (m) => m.ViewGroupsModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Add User Groups' } },
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('../admin/customer/view-customer/view-customer.module').then(
        (m) => m.ViewCustomerModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Customers' } },
  },
  {
    path: 'state',
    loadChildren: () =>
      import('../admin/state/view-state/view-state.module').then(
        (m) => m.ViewStateModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'States' } },
  },
  // {
  //   path: 'Occupancy',
  //   loadChildren: () =>
  //     import('../admin/Occupancy-Status/view-occupancy-status/view-occupancy.module').then(
  //       (m) => m.ViewOccupancyModule
  //     ),
  //   canActivate: [AccessGuard],
  //   data: { role: { number: 1, page_name: 'Occupancy Status' } },
  // },
  // {
  //   path: 'Property',
  //   loadChildren: () =>
  //     import('../admin/Property-type/view-property-type/view-property.module').then(
  //       (m) => m.viewpropertyModule
  //     ),
  //   canActivate: [AccessGuard],
  //   data: { role: { number: 1, page_name: 'Property Type' } },
  // },
  // {
  //   path: 'PropertyAlert',
  //   loadChildren: () =>
  //     import('../admin/Property-Alert/view-property-alert/view-property-alert.module').then(
  //       (m) => m.ViewPropertyAlertModule
  //     ),
  //   canActivate: [AccessGuard],
  //   data: { role: { number: 1, page_name: 'Property Alert' } },
  // },
  // {
  //   path: 'LoanStatus',
  //   loadChildren: () =>
  //     import('../admin/Loan-Status/view-loan-status/view-Loan-status.module').then(
  //       (m) => m.ViewLoanStatusModule
  //     ),
  //   canActivate: [AccessGuard],
  //   data: { role: { number: 1, page_name: 'Loan Status' } },
  // },
  {
    path: 'customphoto',
    loadChildren: () =>
      import(
        '../admin/custom-photo-label/view-custom-photo-label/view-custom-photo-label.module'
      ).then((m) => m.ViewCustomPhotoLabelModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Custom Photo Labels' } },
  },
  {
    path: 'rush',
    loadChildren: () =>
      import('../admin/rush/view-rush/view-rush.module').then(
        (m) => m.ViewRushModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Create Rush' } },
  },
  {
    path: 'serviceLink',
    loadChildren: () =>
      import('../admin/Service-Links-Form/service-link-form.module').then(
        (m) => m.ServiceLinkModule
      ),
    // canActivate: [AccessGuard],
    // data: { role: { number: 1, page_name: 'Create Rush' } },
  },
  {
    path: 'category',
    loadChildren: () =>
      import(
        '../admin/main-category/view-main-category/view-main-category.module'
      ).then((m) => m.ViewMainCategoryModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Categories' } },
  },
  {
    path: 'loan',
    loadChildren: () =>
      import('../admin/loan-type/view-loan-type/view-loan-type.module').then(
        (m) => m.ViewLoanTypeModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Loan Type' } },
  },
  {
    path: 'damage',
    loadChildren: () =>
      import('../admin/damage/view-damage/view-damage.module').then(
        (m) => m.ViewDamageModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Damages' } },
  },
  {
    path: 'uom',
    loadChildren: () =>
      import('../admin/uom/view-UOM/view-UOM.module').then(
        (m) => m.ViewUOMModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'UOM Settings' } },
  },
  {
    path: 'autoimport',
    loadChildren: () =>
      import(
        '../admin/auto-import-work-order/view-import-work-order/view-import-work-order.module'
      ).then((m) => m.ViewAutoImportWoModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Auto Import' } },
  },
  {
    path: 'task',
    loadChildren: () =>
      import('../admin/bid-invoice-task/bid-invoice-task.module').then(
        (m) => m.BidInvoiceItemViewTaskModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Add Task' } },
  },
  {
    path: 'photo',
    loadChildren: () =>
      import(
        '../admin/photo-header-template/view-photoheader/view-photoheader.module'
      ).then((m) => m.ViewPhotoHeaderModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Photo Header Tempalte' } },
  },
  {
    path: 'generalsettings',
    loadChildren: () =>
      import('../home/general-settings/general-settings.module').then(
        (m) => m.GeneralSettingsModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'General Setting' } },
  },
  {
    path: 'autoinstruction',
    loadChildren: () =>
      import(
        '../admin/instruction-work-order/view-instruction/view-Instruction.module'
      ).then((m) => m.ViewInstructionModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Auto Instructions' } },
  },
  {
    path: 'email-template',
    loadChildren: () =>
      import('../admin/email-template/email-template.module').then(
        (m) => m.EmailTemplateModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Email Templates' } },
  },

  {
    path: 'contractor-category',
    loadChildren: () =>
      import(
        '../admin/contractor-category/contractor-category/contractor-category.module'
      ).then((m) => m.ContractorCategoryModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Add Contractor Categories' } },
  },

  {
    path: 'user-tracking',
    loadChildren: () =>
      import('../admin/user-tracking/user-tracking.module').then(
        (m) => m.UserTrackingModule
      ),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Tracking Details' } },
  },
  {
    path: 'contractor-scorecard-setting',
    loadChildren: () =>
      import(
        '../admin/contractor-scorecard-setting/contractor-scorecard.module'
      ).then((m) => m.ContractorScoreCardSettingModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Scorecard settings' } },
  },
  {
    path: 'viewcontactus',
    loadChildren: () =>
      import('../admin/contact-details/view-contact-us.module').then(
        (m) => m.ViewContactUsModule
      ),
    // canActivate: [AccessGuard],
    // data: {role: {number: 1, page_name: 'View Contactus'}}
  },
  {
    path: 'contractor-Account-payable-settings',
    loadChildren: () =>
      import(
        '../admin/con-account-payable-settings/con-account-payable-settings.module'
      ).then((m) => m.ContractorAccountSettingModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Contractor payment sett' } },
  },
  {
    path: 'clientconfiguration',
    loadChildren: () =>
      import(
        '../admin/Client-configuration/client-configuration-view/client-configuration-view.module'
      ).then((m) => m.ViewClientConfigurationModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Damages' } },
  },
  // {
  //   path: 'support',
  //   loadChildren: () =>
  //     import(
  //       '../admin/support-ticket/view-support-ticket/view-support-ticket.module'
  //     ).then((m) => m.ViewSupportTicketModule),

  // },

  {
    path: '',
    redirectTo: 'adminlinkpage',
    pathMatch: 'full',
  },



  {
    path: 'liveUserLocation',
    loadChildren:()=>
    import('../admin/live-user-location/live-user-location.module').then((m)=>m.LiveUserLocationModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Live User Location' } },
  },
  {
    path: 'allowables',
    loadChildren: () =>
      import(
        '../admin/allowables-category/view-allowables-category/allowables-category.module'
      ).then((m) => m.ViewAllowableModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Allowables' } },
  },
  {
    path: 'allowables',
    loadChildren: () =>
      import(
        '../admin/allowables-details/view-allowables/allowables-details.module'
      ).then((m) => m.ViewAllowableDetailsModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Allowables' } },
  },
  {
    path: 'bulkupload',
    loadChildren: () =>
      import(
        '../admin/bulk-upload/bulk-upload.module'
      ).then((m) => m.BulkUploadModule),

  },
  {
    path: 'restoreworkorder',
    loadChildren: () =>
      import(
        '../admin/restore-workorders/restore-workorders.module'
      ).then((m) => m.RestoreWorkOrderModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Restore WorkOrder' } },
  },
  {
    path: 'viewloanstatus',
    loadChildren: () =>
      import('../admin/Loan-Status/view-loan-status/view-Loan-status.module').then((m) => m.ViewLoanStatusModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Loan Status' } },
  },
  {
    path: 'viewoccupancystatus',
    loadChildren: () =>
      import('../admin/Occupancy-Status/view-occupancy-status/view-occupancy.module').then((m) => m.ViewOccupancyModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Occupancy Status' } },
  },

  {
    path: 'viewpropertyalert',
    loadChildren: () =>
      import('../admin/Property-Alert/view-property-alert/view-property-alert.module').then((m) => m.ViewPropertyAlertModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Property Alert' } },
  },
  {
    path: 'viewpropertytype',
    loadChildren: () =>
      import('../admin/Property-type/view-property-type/view-property.module').then((m) => m.viewpropertyModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Property Type' } },
  },
  {
    path: 'viewLotPricingfilter',
    loadChildren: () =>
      import('../admin/Lot-Pricing-Filter/view-lot-pricing-filter/view-Lot-Pricing.Module').then((m) => m.ViewLotPricingfilterModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Lot Pricing Filter' } },
  },
  {
    path: 'viewpropertylockreason',
    loadChildren: () =>
      import('../admin/Property-Lock-Reason/property-lock-reason/property-lock-reason.module').then((m) => m.PropertyLockReasonModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Property Lock Reason' } },
  },
  {
    path: 'viewBackgroundprovider',
    loadChildren: () =>
      import('../admin/Background-Provider/view-background-provider/view-background-provider-module').then((m) => m.ViewBackgroundProviderModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Background Provider' } },
  },
  {
    path: 'viewAccessUser',
    loadChildren: () =>
      import('../admin/Access-user-log/view-access-user-log/view-access-user-log-module').then((m) => m.ViewAccessuserlogModule),
    // canActivate: [AccessGuard],
    // data: { role: { number: 1, page_name: 'Lot Pricing Filter' } },
  },
  {
    path: 'worksetting',
    loadChildren: () =>
      import('../admin/work-setting/work-setting.module').then((m) => m.WorksettingModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'Work Settings Page' } },
  },
  {
    path: 'workcolumnstest',
    loadChildren: () =>
      import('../admin/work-columns-test/work-columns-test.module').then((m) => m.WorkColumnsTestModule),
    canActivate: [AccessGuard],
    data: { role: { number: 1, page_name: 'WorkOrder Columns' } },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    GridModule,
    SharedModule
  ],
  declarations: [
  
    
  
   
  
    
  
    
  ],
})
export class AdminModule {}
