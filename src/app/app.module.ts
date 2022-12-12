import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { HeaderComponent } from '@modules/main/header/header.component';
import { FooterComponent } from '@modules/main/footer/footer.component';
import { MenuSidebarComponent } from '@modules/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '@pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesComponent } from '@modules/main/header/messages/messages.component';
import { NotificationsComponent } from '@modules/main/header/notifications/notifications.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfigModule } from '@modules/dialog/modal-config.module';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UserComponent } from '@modules/main/header/user/user.component';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { LanguageComponent } from '@modules/main/header/language/language.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { SubMenuComponent } from './pages/main-menu/sub-menu/sub-menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { ControlSidebarComponent } from './modules/main/control-sidebar/control-sidebar.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/reducer';
import { uiReducer } from './store/ui/reducer';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { defineCustomElements } from '@profabric/web-components/loader';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import { GoodsManageComponent } from './pages/goods-manage/goods-manage.component';
import { GoodsAddComponent } from './pages/goods-manage/goods-add/goods-add.component';
import { GoodsEditComponent } from './pages/goods-manage/goods-edit/goods-edit.component';
import { GoodsTypeManageComponent } from './pages/goods-type-manage/goods-type-manage.component';
import { GoodsTypeAddComponent } from './pages/goods-type-manage/goods-type-add/goods-type-add.component';
import { GoodsTypeEditComponent } from './pages/goods-type-manage/goods-type-edit/goods-type-edit.component';
import { JobManageComponent } from './pages/job-manage/job-manage.component';
import { JobAddComponent } from './pages/job-manage/job-add/job-add.component';
import { JobEditComponent } from './pages/job-manage/job-edit/job-edit.component';
import { PccesCodeManageComponent } from './pages/pcces-code-manage/pcces-code-manage.component';
import { ProjectStepManageComponent } from './pages/project-step-manage/project-step-manage.component';
import { WorkTypeManageComponent } from './pages/work-type-manage/work-type-manage.component';
import { ProjectTypeManageComponent } from './pages/project-type-manage/project-type-manage.component';
import { ScopeDescriptionManageComponent } from './pages/scope-description-manage/scope-description-manage.component';
import { RuleDescriptionManageComponent } from './pages/rule-description-manage/rule-description-manage.component';
import { ContractTypeManageComponent } from './pages/contract-type-manage/contract-type-manage.component';
import { FunctionModuleManageComponent } from './pages/function-module-manage/function-module-manage.component';
import { ProjectStepAddComponent } from './pages/project-step-manage/project-step-add/project-step-add.component';
import { ProjectStepEditComponent } from './pages/project-step-manage/project-step-edit/project-step-edit.component';
import { WorkTypeAddComponent } from './pages/work-type-manage/work-type-add/work-type-add.component';
import { WorkTypeEditComponent } from './pages/work-type-manage/work-type-edit/work-type-edit.component';
import { ProjectTypeAddComponent } from './pages/project-type-manage/project-type-add/project-type-add.component';
import { ProjectTypeEditComponent } from './pages/project-type-manage/project-type-edit/project-type-edit.component';
import { ContractTypeAddComponent } from './pages/contract-type-manage/contract-type-add/contract-type-add.component';
import { ContractTypeEditComponent } from './pages/contract-type-manage/contract-type-edit/contract-type-edit.component';
import { FunctionModuleAddComponent } from './pages/function-module-manage/function-module-add/function-module-add.component';
import { FunctionModuleEditComponent } from './pages/function-module-manage/function-module-edit/function-module-edit.component';
import { ScopeDescriptionAddComponent } from './pages/scope-description-manage/scope-description-add/scope-description-add.component';
import { ScopeDescriptionEditComponent } from './pages/scope-description-manage/scope-description-edit/scope-description-edit.component';
import { RuleDescriptionAddComponent } from './pages/rule-description-manage/rule-description-add/rule-description-add.component';
import { RuleDescriptionEditComponent } from './pages/rule-description-manage/rule-description-edit/rule-description-edit.component';
import { DepartmentManageComponent } from './pages/department-manage/department-manage.component';
import { EmployeeManageComponent } from './pages/employee-manage/employee-manage.component';
import { JobModulesManageComponent } from './pages/job-modules-manage/job-modules-manage.component';
import { DepartmentAddComponent } from './pages/department-manage/department-add/department-add.component';
import { DepartmentEditComponent } from './pages/department-manage/department-edit/department-edit.component';
import { EmployeeAddComponent } from './pages/employee-manage/employee-add/employee-add.component';
import { EmployeeEditComponent } from './pages/employee-manage/employee-edit/employee-edit.component';
import { EmployeeDisabledComponent } from './pages/employee-manage/employee-disabled/employee-disabled.component';
import { ContactCardComponent } from './pages/employee-manage/contact-card/contact-card.component';
import { LicenseCardComponent } from './pages/employee-manage/license-card/license-card.component';
import { JobModulesAddComponent } from './pages/job-modules-manage/job-modules-add/job-modules-add.component';
import { JobModulesEditComponent } from './pages/job-modules-manage/job-modules-edit/job-modules-edit.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LicenseTypeManageComponent } from './pages/license-type-manage/license-type-manage.component';
import { LicenseTypeAddComponent } from './pages/license-type-manage/license-type-add/license-type-add.component';
import { LicenseTypeEditComponent } from './pages/license-type-manage/license-type-edit/license-type-edit.component';
import { SupplierTypeManageComponent } from './pages/supplier-type-manage/supplier-type-manage.component';
import { SupplierTypeAddComponent } from './pages/supplier-type-manage/supplier-type-add/supplier-type-add.component';
import { SupplierTypeEditComponent } from './pages/supplier-type-manage/supplier-type-edit/supplier-type-edit.component';
import { PaymentTypeManageComponent } from './pages/payment-type-manage/payment-type-manage.component';
import { PaymentTypeAddComponent } from './pages/payment-type-manage/payment-type-add/payment-type-add.component';
import { PaymentTypeEditComponent } from './pages/payment-type-manage/payment-type-edit/payment-type-edit.component';
import { SupplierManageComponent } from './pages/supplier-manage/supplier-manage.component';
import { SupplierAddComponent } from './pages/supplier-manage/supplier-add/supplier-add.component';
import { LocationAreaCardComponent } from './pages/supplier-manage/location-area-card/location-area-card.component';
import { SupplierEditComponent } from './pages/supplier-manage/supplier-edit/supplier-edit.component';
import { SupplierContractComponent } from './pages/supplier-manage/supplier-contract/supplier-contract.component';
import { SupplierCareListComponent } from './pages/supplier-manage/supplier-care-list/supplier-care-list.component';
import { SupplierDisabledComponent } from './pages/supplier-manage/supplier-disabled/supplier-disabled.component';
import { PccesCodeAddComponent } from './pages/pcces-code-manage/pcces-code-add/pcces-code-add.component';
import { PccesCodeEditComponent } from './pages/pcces-code-manage/pcces-code-edit/pcces-code-edit.component';
import { SupplierLocationAreaListComponent } from './pages/supplier-manage/supplier-location-area-list/supplier-location-area-list.component';
import { SupplierBankDataComponent } from './pages/supplier-manage/supplier-bank-data/supplier-bank-data.component';
import { FormManageComponent } from '@pages/form-manage/form-manage.component';
import { FormAddComponent } from '@pages/form-manage/form-add/form-add.component';
import { FormEditComponent } from '@pages/form-manage/form-edit/form-edit.component';
import { FormSectionComponent } from './pages/form-manage/form-section/form-section.component';
import { FormFlowComponent } from './pages/form-manage/form-flow/form-flow.component';
import { FormFlowTemplateComponent } from './pages/form-manage/form-flow/form-flow-template/form-flow-template.component';
import { FormTaskComponent } from './pages/form-task/form-task.component';
import { PurchaseFormAddComponent } from './pages/form-task/purchase-form/purchase-form-add/purchase-form-add.component';
import { ProjectDataManageComponent } from './pages/project-data-manage/project-data-manage.component';
import { MaterialCardComponent } from './pages/project-data-manage/material-card/material-card.component';
import { RelatedPersonnelCardComponent } from './pages/project-data-manage/related-personnel-card/related-personnel-card.component';
import { ProjectCardComponent } from './pages/project-data-manage/project-card/project-card.component';
import { MaterialManageComponent } from './pages/material-manage/material-manage.component';
import { MaterialEditComponent } from './pages/material-manage/material-edit/material-edit.component';
import { ProjectManageComponent } from './pages/project-manage/project-manage.component';
import { ProjectAddComponent } from './pages/project-manage/project-add/project-add.component';
import { ProjectEditComponent } from './pages/project-manage/project-edit/project-edit.component';
import { ProjectStepComponent } from './pages/project-manage/project-step/project-step.component';
import { ProjectMaterialComponent } from './pages/project-manage/project-material/project-material.component';
import { ProjectDailyReportComponent } from './pages/project-manage/project-dailyreport/project-dailyreport.component';
import { ProjectDailyReportContentComponent } from './pages/project-manage/project-dailyreport/project-dailyreport-content/project-dailyreport-content.component';
import { ProjectReceiptComponent } from './pages/project-manage/project-receipt/project-receipt.component';
import { ProjectContractComponent } from './pages/project-manage/project-contract/project-contract.component';
import { ProjectProgressComponent } from './pages/project-manage/project-progress/project-progress.component';
import { FormTaskProcessComponent } from './pages/form-task-process/form-task-process.component';
import { PurchaseFormComponent } from './pages/form-task/purchase-form/purchase-form.component';
import { PurchaseFormProcessComponent } from './pages/form-task-process/purchase-form-process/purchase-form-process.component';

import { DetailSectionComponent } from './pages/form-task-process/detail-section/detail-section.component';
import { ScopeDescriptionComponent } from './pages/form-task-process/purchase-form-process/scope-description/scope-description.component';
import { RuleDescriptionComponent } from './pages/form-task-process/purchase-form-process/rule-description/rule-description.component';
import { PccesAddComponent } from './pages/form-task-process/purchase-form-process/pcces-add/pcces-add.component';
import { PurchaseFormEditComponent } from './pages/form-task-process/purchase-form-process/purchase-form-edit/purchase-form-edit.component';
import { InquiryAddComponent } from './pages/form-task-process/purchase-form-process/inquiry-add/inquiry-add.component';
import { InquiryDetailAddComponent } from './pages/form-task-process/purchase-form-process/inquiry-detail-add/inquiry-detail-add.component';
import { ContractAddComponent } from './pages/form-task-process/purchase-form-process/contract-add/contract-add.component';
import { ActionComponent } from './pages/form-task-process/action/action.component';

import { DailyReportManageComponent } from './pages/daily-report-manage/daily-report-manage.component';
import { DailyReportMonthReportComponent } from './pages/daily-report-manage/daily-report-month-report/daily-report-month-report.component';
import { DailyReportEditComponent } from './pages/daily-report-manage/daily-report-edit/daily-report-edit.component';
import { SpecialConstractionCardComponent } from './pages/daily-report-manage/special-constraction-card/special-constraction-card.component';
import { MaterialManageCardComponent } from './pages/daily-report-manage/material-manage-card/material-manage-card.component';
import { SupplierContractCardComponent } from './pages/daily-report-manage/supplier-contract-card/supplier-contract-card.component';
import { DocumentCardComponent } from './pages/daily-report-manage/document-card/document-card.component';
import { SupplierCareManageComponent } from './pages/supplier-care-manage/supplier-care-manage.component';
import { EmployeeViewComponent } from './pages/employee-manage/employee-view/employee-view.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

defineCustomElements();
registerLocaleData(localeEn, 'en-EN');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesComponent,
    NotificationsComponent,
    UserComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    LanguageComponent,
    MainMenuComponent,
    SubMenuComponent,
    MenuItemComponent,
    ControlSidebarComponent,
    SidebarSearchComponent,
    GoodsManageComponent,
    GoodsTypeManageComponent,
    JobManageComponent,
    PccesCodeManageComponent,
    GoodsAddComponent,
    GoodsEditComponent,
    GoodsTypeAddComponent,
    GoodsTypeEditComponent,
    JobAddComponent,
    JobEditComponent,
    PccesCodeManageComponent,
    ProjectStepManageComponent,
    WorkTypeManageComponent,
    ProjectTypeManageComponent,
    ScopeDescriptionManageComponent,
    RuleDescriptionManageComponent,
    ContractTypeManageComponent,
    FunctionModuleManageComponent,
    ProjectStepAddComponent,
    ProjectStepEditComponent,
    WorkTypeAddComponent,
    WorkTypeEditComponent,
    ProjectTypeAddComponent,
    ProjectTypeEditComponent,
    ContractTypeAddComponent,
    ContractTypeEditComponent,
    FunctionModuleAddComponent,
    FunctionModuleEditComponent,
    ScopeDescriptionAddComponent,
    ScopeDescriptionEditComponent,
    RuleDescriptionAddComponent,
    RuleDescriptionEditComponent,
    ModalComponent,
    DepartmentManageComponent,
    EmployeeManageComponent,
    JobModulesManageComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeDisabledComponent,
    LicenseCardComponent,
    ContactCardComponent,
    JobModulesAddComponent,
    JobModulesEditComponent,
    LicenseTypeManageComponent,
    LicenseTypeAddComponent,
    LicenseTypeEditComponent,
    SupplierTypeManageComponent,
    SupplierTypeAddComponent,
    SupplierTypeEditComponent,
    PaymentTypeManageComponent,
    PaymentTypeAddComponent,
    PaymentTypeEditComponent,
    SupplierManageComponent,
    SupplierAddComponent,
    LocationAreaCardComponent,
    SupplierEditComponent,
    PccesCodeAddComponent,
    PccesCodeEditComponent,
    SupplierLocationAreaListComponent,
    SupplierBankDataComponent,
    PccesCodeEditComponent,
    FormManageComponent,
    FormAddComponent,
    FormEditComponent,
    FormSectionComponent,
    FormFlowComponent,
    FormFlowTemplateComponent,
    FormTaskComponent,
    PurchaseFormAddComponent,
    SupplierContractComponent,
    SupplierCareListComponent,
    SupplierDisabledComponent,
    ProjectDataManageComponent,
    ProjectCardComponent,
    RelatedPersonnelCardComponent,
    MaterialManageComponent,
    MaterialEditComponent,
    MaterialCardComponent,
    ProjectManageComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    ProjectStepComponent,
    ProjectMaterialComponent,
    ProjectDailyReportComponent,
    ProjectDailyReportContentComponent,
    ProjectReceiptComponent,
    ProjectContractComponent,
    ProjectProgressComponent,
    FormTaskProcessComponent,
    PurchaseFormComponent,
    PurchaseFormProcessComponent,
    DetailSectionComponent,
    ScopeDescriptionComponent,
    RuleDescriptionComponent,
    PccesAddComponent,
    PurchaseFormEditComponent,
    InquiryAddComponent,
    InquiryDetailAddComponent,
    ContractAddComponent,
    ActionComponent,
    DailyReportManageComponent,
    DailyReportMonthReportComponent,
    DailyReportEditComponent,
    SpecialConstractionCardComponent,
    MaterialManageCardComponent,
    SupplierContractCardComponent,
    DocumentCardComponent,
    SupplierCareManageComponent,
    EmployeeViewComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ auth: authReducer, ui: uiReducer }),
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    NgSelect2Module,
    MatCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    ProfabricComponentsModule,
    NgbModule,
    NgbdModalConfigModule,
    AngularEditorModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
