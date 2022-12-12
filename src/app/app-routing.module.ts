import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { LoginComponent } from '@modules/login/login.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { MainMenuComponent } from '@pages/main-menu/main-menu.component';
import { SubMenuComponent } from '@pages/main-menu/sub-menu/sub-menu.component';
import { GoodsManageComponent } from '@pages/goods-manage/goods-manage.component';
import { GoodsTypeManageComponent } from '@pages/goods-type-manage/goods-type-manage.component';
import { DepartmentManageComponent } from '@pages/department-manage/department-manage.component';
import { JobManageComponent } from '@pages/job-manage/job-manage.component';
import { EmployeeManageComponent } from '@pages/employee-manage/employee-manage.component';
import { JobModulesManageComponent } from '@pages/job-modules-manage/job-modules-manage.component';
import { PccesCodeManageComponent } from '@pages/pcces-code-manage/pcces-code-manage.component';
import { ProjectStepManageComponent } from '@pages/project-step-manage/project-step-manage.component';
import { WorkTypeManageComponent } from '@pages/work-type-manage/work-type-manage.component';
import { ProjectTypeManageComponent } from '@pages/project-type-manage/project-type-manage.component';
import { ScopeDescriptionManageComponent } from '@pages/scope-description-manage/scope-description-manage.component';
import { RuleDescriptionManageComponent } from '@pages/rule-description-manage/rule-description-manage.component';
import { ContractTypeManageComponent } from '@pages/contract-type-manage/contract-type-manage.component';
import { FunctionModuleManageComponent } from '@pages/function-module-manage/function-module-manage.component';
import { LicenseTypeManageComponent } from '@pages/license-type-manage/license-type-manage.component';
import { SupplierTypeManageComponent } from '@pages/supplier-type-manage/supplier-type-manage.component';
import { PaymentTypeManageComponent } from '@pages/payment-type-manage/payment-type-manage.component';
import { SupplierManageComponent } from '@pages/supplier-manage/supplier-manage.component';
import { SupplierCareManageComponent } from '@pages/supplier-care-manage/supplier-care-manage.component';

import { FormManageComponent } from '@pages/form-manage/form-manage.component';
import { FormTaskComponent } from '@pages/form-task/form-task.component';
import {FormTaskProcessComponent} from '@pages/form-task-process/form-task-process.component';

import { ProjectManageComponent } from '@pages/project-manage/project-manage.component';
import { MaterialManageComponent } from '@pages/material-manage/material-manage.component';
import { ProjectDataManageComponent } from '@pages/project-data-manage/project-data-manage.component';

import { DailyReportManageComponent } from '@pages/daily-report-manage/daily-report-manage.component';
import { DailyReportEditComponent } from '@pages/daily-report-manage/daily-report-edit/daily-report-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: 'sub-menu-1',
        component: SubMenuComponent
      },
      {
        path: 'sub-menu-2',
        component: BlankComponent
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'GoodsManage',
        component: GoodsManageComponent
      },
      {
        path: 'GoodsTypeManage',
        component: GoodsTypeManageComponent
      },
      {
        path: 'Job',
        component: JobManageComponent
      },
      {
        path: 'Department',
        component: DepartmentManageComponent
      },
      {
        path: 'Employee',
        component: EmployeeManageComponent
      },
      {
        path: 'LicenseType',
        component: LicenseTypeManageComponent
      },

      {
        path: 'JobModules',
        component: JobModulesManageComponent
      },
      {
        path: 'PccesCode',
        component: PccesCodeManageComponent
      },
      {
        path: 'ProjectStep',
        component: ProjectStepManageComponent
      },
      {
        path: 'WorkType',
        component: WorkTypeManageComponent
      },
      {
        path: 'ProjectType',
        component: ProjectTypeManageComponent
      },
      {
        path: 'ScopeDescription',
        component: ScopeDescriptionManageComponent
      },
      {
        path: 'RuleDescription',
        component: RuleDescriptionManageComponent
      },
      {
        path: 'ContractType',
        component: ContractTypeManageComponent
      },
      {
        path: 'FunctionModule',
        component: FunctionModuleManageComponent
      },
      {
        path: 'SupplierType',
        component: SupplierTypeManageComponent
      },
      {
        path: 'Supplier',
        component: SupplierManageComponent
      },
      {
        path: 'SupplierCare',
        component: SupplierCareManageComponent
      },

      {
        path: 'PaymentType',
        component: PaymentTypeManageComponent
      },
      {
        path: 'formManage',
        component: FormManageComponent
      },
      {
        path: 'formTask/:id',
        component: FormTaskComponent
      },
      {
          path: 'formTask/:id/:formTaskId/:taskStatusId/:detail',
          component: FormTaskProcessComponent
      },
      {
        path: 'ProjectManage',
        component: ProjectManageComponent
      },
      {
        path: 'Material/:id',
        component: MaterialManageComponent
      },
      {
        path: 'ProjectData/:id',
        component: ProjectDataManageComponent
      }
      ,
      {
        path: 'DailyReport/:id',
        component: DailyReportManageComponent
      }
      ,
      {
        path: 'DailyReportEdit/:id',
        component: DailyReportEditComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    canActivate: [NonAuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
