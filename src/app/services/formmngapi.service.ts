import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {api_url} from './api_config'

@Injectable({
  providedIn: 'root'
})
export class FormmngapiService {
  // public api_url = 'http://59.125.142.83:8084';

  constructor(
    private http: HttpClient
  ) { }

  async getProjectSteps(): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/projectStep');
        return result;
    } catch (error) {
        console.log(error);
    }
  }
  addFormData(postData): Observable<any> {
      try {
          const result = this.http.post(
              api_url + '/formManage',
              postData
          );
          return result;
      } catch (error) {
          console.log(error);
      }
  }
  editFormData(id, postData): Observable<any> {
      try {
          const result = this.http.post(
              api_url + '/formManage/' + id,
              postData
          );
          return result;
      } catch (error) {
          console.log(error);
      }
  }
  async getFormData(): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/formManage');
        return result;
    } catch (error) {
        console.log(error);
    }
  }
  delete(id: String): Observable<any> {
      try {
          const result = this.http.delete(api_url + '/formManage/' + id);
          return result;
      } catch (error) {
          console.log(error);
      }
  }
  /**
   * Form Section
   * @param id
   * @returns
   */
  async getFormSection(id:String): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/formSection/'+ id);
        return result;
    } catch (error) {
        console.log(error);
    }
  }
  addFormSection(formid,postData,type): Observable<any> {
      try {
          const result = this.http.post(
              api_url + '/formSection/'+type+'/'+formid,
              postData
          );
          return result;
      } catch (error) {
          console.log(error);
      }
  }
  deleteFormSection(form_id: String,section_id): Observable<any> {
      try {
          const result = this.http.delete(api_url + '/formSection/' + form_id+'/'+section_id);
          return result;
      } catch (error) {
          console.log(error);
      }
  }
  /**
   * Form Flows
   * @param id
   * @returns
   */
  async getFormFlow(id:String): Promise<Observable<any>> {
    try {
        const result = this.http.get(api_url + '/formFlow/init/'+ id);
        return result;
    } catch (error) {
        console.log(error);
    }
  }
  addFormFlow(formid,postData,type): Observable<any> {
      try {
          const result = this.http.post(
              api_url + '/formFlow/'+type+'/'+formid,
              postData
          );
          return result;
      } catch (error) {
          console.log(error);
      }
  }
  deleteFormFlow(form_id: String,flow_id): Observable<any> {
      try {
          const result = this.http.delete(api_url + '/formFlow/' + form_id+'/'+flow_id);
          return result;
      } catch (error) {
          console.log(error);
      }
  }
  changeFlowOrder(form_id: String,data): Observable<any> {
      try {
          const result = this.http.post(api_url + '/formFlow/sort/'+form_id, data);
          return result;
      } catch (error) {
          console.log(error);
      }
  }
}
