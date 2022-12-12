import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RightService {

  constructor(
    public apiService: ApiService,
    private router: Router,
  ) { }

  public async getRight() {
    this.router.url;
    var RightObj = { "insert": true, "update": true, "delete": true };

    (await this.apiService.getFunctionModules()).subscribe((res) => {

      var AllfunctionModules = res as any;
      var routingName = "/" + this.router.url.split('/')[1];
      AllfunctionModules = AllfunctionModules.filter(s => s.controllerName === routingName);

      if (AllfunctionModules.length === 1) {
        var moduleId = AllfunctionModules[0]._id;
        (this.apiService.getBtnRight(moduleId)).subscribe((res2) => {
          RightObj["insert"] = res2[0]['insert'];
          RightObj["update"] = res2[0]['update'];
          RightObj["delete"] = res2[0]['delete'];
        })
      }
    });
    return RightObj;
  }
}
