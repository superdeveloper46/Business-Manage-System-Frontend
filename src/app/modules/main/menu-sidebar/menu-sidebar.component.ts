import { filter } from 'rxjs/operators';
import { RightService } from '@services/right.service';
import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { TokenStorageService } from '@services/token-storage.service';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState>;
  public user = {
    picture: "",
    // email:"admin",
    // createdAt:"123123",
    EmpNo: "",
    EmpName: "",
    DepName: ""
  };
  public menu1;
  public menu2;

  constructor(
    public appService: AppService,
    public apiService: ApiService,
    private store: Store<AppState>,
    private tokenStorage: TokenStorageService
  ) { }

  async ngOnInit() {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
    });
    // this.user = this.appService.user;
    // this.user = {
    //   picture: "/assets/img/default-profile.png",
    //   email: "admin",
    //   createdAt: "123123"
    // };

    var getUser = this.tokenStorage.getUser();

    this.apiService.getEmployee(getUser.id).subscribe((res) => {
      var employee = res as any;
      var imgsrc = "";
      if (employee.employeePic != null && employee.employeePic != "" ) {
        this.apiService.download(employee.employeePic).subscribe((res) => {
          imgsrc = this.apiService.downLoadFileToBase64(res);
          this.user = {
            picture: imgsrc,
            EmpNo: employee.account,
            EmpName: employee.empName,
            DepName: employee.department.depName,
          }
        });

      } else {
        this.user = {
          picture: null,
          EmpNo: employee.account,
          EmpName: employee.empName,
          DepName: employee.department.depName,
        }
      }
    });


    // const auth_user = JSON.parse(window.localStorage.getItem('auth-user'));
    // this.menu = auth_user['menu1'];
    (await this.apiService.getMenu1(1)).subscribe((res) => {
      // console.log(res); //可以打開console看看資料室什麼
      this.menu1 = res;
      this.menu1.forEach(element => {
        element['children'].forEach(element2 => {
          if (element2['path'][0].indexOf("20221027171055566") > -1) {
            element2['path'][0] = "/ProjectData/" + element["_id"]
          }
          if (element2['path'][0].indexOf("20221027173542198") > -1) {
            element2['path'][0] = "/Material/" + element["_id"]
          }
          if (element2['path'][0].indexOf("20221027173957797") > -1) {
            element2['path'][0] = "/DailyReport/" + element["_id"]
          }
        });
      });

    });
    (await this.apiService.getMenu2(1)).subscribe((res) => {
      //console.log(res); //可以打開console看看資料室什麼

      this.menu2 = [];
      let ids_arr = [];
      for (let j in res) {
        for (let i in res[j].data) {
          let tmp = res[j].data[i];

          let id_ind = ids_arr.indexOf(tmp._id);
          if (id_ind == -1 && tmp.parent_id == '') {
            ids_arr.push(tmp._id);
            id_ind = ids_arr.indexOf(tmp._id);
            this.menu2[id_ind] = {
              name: tmp.name,
              path: [tmp.path],
              iconClasses: tmp.iconClasses,
              children: []
            }
          }
          let pid_ind = ids_arr.indexOf(tmp.parent_id);
          if (pid_ind > -1) {
            this.menu2[pid_ind].children.push({
              name: tmp.name,
              path: [tmp.path],
              iconClasses: tmp.iconClasses,
              children: []
            })
          }
        }
      }
      console.log(this.menu2);
    });
  }
}

export const MENU = [
  {
    name: 'Dashboard',
    iconClasses: 'fas fa-tachometer-alt',
    path: ['/']
  },
  {
    name: 'Blank',
    iconClasses: 'fas fa-file',
    path: ['/blank']
  },
  {
    name: 'Main Menu',
    iconClasses: 'fas fa-folder',
    children: [
      {
        name: 'Sub Menu',
        iconClasses: 'far fa-address-book',
        path: ['/sub-menu-1']
      },
      {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/sub-menu-2']
      }
    ]
  }
]
