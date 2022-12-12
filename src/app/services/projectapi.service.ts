import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getuid } from 'process';
import { UUID } from 'angular2-uuid';
import { api_url } from './api_config';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http: HttpClient) { }

  async getAllProject(): Promise<Observable<any>> {
    try {
      const project = this.http.get(
        api_url + '/project/'
      );
      return project;
    } catch (error) {
      console.log(error);
    }
  }

  async getProject(projectId): Promise<Observable<any>> {
    try {
      const project = this.http.get(
        api_url + '/project/' + projectId
      );
      return project;
    } catch (error) {
      console.log(error);
    }
  }

  addProject_EmployDetail(postData, id) {
    try {
      const result = this.http.post(api_url + '/project/createEmployDetail/' + id, postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteProject_EmployDetail(id, sub_id) {
    try {
      const result = this.http.post(api_url + '/project/deleteEmployDetail/' + id + "/" + sub_id, null);
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  async getDailyReport(projectId): Promise<Observable<any>> {
    try {
      const dailyReport = this.http.get(
        api_url + '/dailyReport/' + projectId
      );
      return dailyReport;
    } catch (error) {
      console.log(error);
    }
  }

  addProject_MaterialDetail(postData) {
    try {
      const result = this.http.post(api_url + '/material/create/', postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteProject_MaterialDetail(id) {
    try {
      const result = this.http.delete(api_url + '/material/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addProject_ProposalDetail(postData) {
    try {
      const result = this.http.post(api_url + '/proposal/create/', postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteProject_ProposalDetail(id) {
    try {
      const result = this.http.delete(api_url + '/proposal/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getDailyReportById(dailyReportId): Promise<Observable<any>> {
    try {
      const dailyReport = this.http.get(
        api_url + '/dailyReport/detail/' + dailyReportId
      );
      return dailyReport;
    } catch (error) {
      console.log(error);
    }
  }

  async getConstructionLogTypes(): Promise<Observable<any>> {
    try {
      const constructionLogType = this.http.get(
        api_url + '/constructionLogTypes?size=30'
      );
      return constructionLogType;
    } catch (error) {
      console.log(error);
    }
  }

  addDailyReport(postData) {
    try {
      const result = this.http.post(api_url + '/dailyReport/create', postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addDailyReport_SpecialConstraction(postData, id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/createSpecialConstraction/' + id, postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteDailyReport_SpecialConstraction(id, sub_id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/deleteSpecialConstraction/' + id + "/" + sub_id, null);
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  addDailyReport_MaterialManage(postData, id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/createMaterialManage/' + id, postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteDailyReport_MaterialManage(id, sub_id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/deleteMaterialManage/' + id + "/" + sub_id, null);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addDailyReport_SupplierContract(postData, id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/createSupplierContract/' + id, postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteDailyReport_SupplierContract(id, sub_id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/deleteSupplierContract/' + id + "/" + sub_id, null);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addDailyReport_Document(postData, id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/createDocument/' + id, postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteDailyReport_Document(id, sub_id) {
    try {
      const result = this.http.post(api_url + '/dailyReport/deleteDocument/' + id + "/" + sub_id, null);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getMaterial(projectId): Promise<Observable<any>> {
    try {
      const project = this.http.get(
        api_url + '/material/' + projectId
      );
      return project;
    } catch (error) {
      console.log(error);
    }
  }


  async getProposal(projectId): Promise<Observable<any>> {
    try {
      const project = this.http.get(
        api_url + '/proposal/' + projectId
      );
      return project;
    } catch (error) {
      console.log(error);
    }
  }

  editMaterial(postData, id) {
    try {
      const result = this.http.post(api_url + '/material/update/' + id, postData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

}
