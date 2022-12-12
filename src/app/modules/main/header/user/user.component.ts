import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
import { TokenStorageService } from '@services/token-storage.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user = {
    picture: "",
    // email:"admin",
    // createdAt:"123123",
    EmpNo: "",
    EmpName: "",
    DepName: ""
  };

  constructor(
    public apiService: ApiService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    var getUser = this.tokenStorage.getUser();
    // this.user = this.authService.user;
    // this.user = {
    //     picture:"/assets/img/default-profile.png",
    //     email:"admin",
    //     createdAt:"123123"
    // }
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
    })
  }

  logout() {
    this.authService.logout();
  }

  formatDate(date) {
    return DateTime.fromISO(date).toFormat('dd LLL yyyy');
  }
}
