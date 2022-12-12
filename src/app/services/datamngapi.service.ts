import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatamngapiService {
    public api_url = 'http://59.125.142.83:8082';

    constructor(private http: HttpClient) {}

    addData(postData): Observable<any> {
        try {
            const result = this.http.post(
                this.api_url + '/dataManage/',
                postData
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    editData(id, postData): Observable<any> {
        try {
            const result = this.http.post(
                this.api_url + '/dataManage/' + id,
                postData
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getData_(): Promise<Observable<any>> {
        try {
            const result = this.http.get(this.api_url + '/dataManage');
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getData(value: String[], value1: String[]): Promise<Observable<any>> {
        try {
            const result = this.http.post(this.api_url + '/dataManage/all', {
                value: value,
                value1: value1
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    delete(id: String): Observable<any> {
        try {
            const result = this.http.delete(this.api_url + '/dataManage/' + id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
