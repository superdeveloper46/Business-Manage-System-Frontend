import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {api_url} from './api_config'
@Injectable({
  providedIn: 'root'
})
export class FormtaskapiService {

  constructor(
    private http: HttpClient
  ) { }

  async getForm(param): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/formManage/'+param.formId);
        return result;
    } catch (error) {
        console.log(error);
    }
  }

  async getBasicData(param): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/formTask/init/'+param.formId);
        return result;
    } catch (error) {
        console.log(error);
    }
  }
  async getFormTask(param): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/formTask/filter/'+param.formId+'/'+param.taskStatusId);
        return result;
    } catch (error) {
        console.log(error);
    }
  }
  addFormTask(postData): Observable<any> {
      try {
          const result = this.http.post(
              api_url + '/formTask',
              postData
          );
          return result;
      } catch (error) {
          console.log(error);
      }
  }

    async getEmployeeById(empId): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/employee/'+empId);
        return result;
    } catch (error) {
        console.log(error);
    }
  }
}
