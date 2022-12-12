import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url } from './api_config'

@Injectable({
  providedIn: 'root'
})
export class FormTaskProcessApiService {
  constructor(
    private http: HttpClient
  ) { }

  async getFormTaskDetailData(formTaskId, taskStatusId): Promise<Observable<any>> {
    try {
      const result = this.http.get(api_url + '/formTask/detail/' + formTaskId + "/" + taskStatusId);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addScopeDescription(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addScopeDescription',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addRuleDescription(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addRuleDescription',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addIllustration(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addIllustration',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addCalculation(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addCalculation',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addRemark(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addRemark',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addPccesData(formData, formTaskId) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addPccesData/' + formTaskId,
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deletePccesData(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/deletePccesData',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editPurchaseForm(formData, formTaskId) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/editPurchaseForm/' + formTaskId,
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getPccesCodeData(value): Promise<Observable<any>> {
    try {
      const result = this.http.get(api_url + '/formTaskProcess/getPccesCodeData/' + value);
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  updatePccesDataQuantity(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/updatePccesDataQuantity',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addInquiryData(formData, formTaskId, supplierId) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addInquiryData/' + formTaskId + "/" + supplierId,
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addInquiryDetailData(formData, formTaskId, inquiryDataId) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addInquiryDetailData/' + formTaskId + "/" + inquiryDataId,
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addInquiryDetailPriceData(price, formTaskId, inquiryDataId, inquiryDetailDataId) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addInquiryDetailPriceData/' + formTaskId + "/" + inquiryDataId + "/" + inquiryDetailDataId + "/" + price,
        {}
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteInquiryData(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/deleteInquiryData',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  addInquiryQuotation(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/addInquiryQuotation',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  updateInquiryDataPriority(formData) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/updateInquiryDataPriority',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  createContractNo(formData) {
    try {
      const result = this.http.post(
        api_url + '/contract/createContractNo',
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  updateContractDetailData(contractForm, id) {
    try {
      const result = this.http.post(
        api_url + '/contract/updateContractDetailData/' + id,
        contractForm
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getNextSingers(formTaskId, flowType, targetId, creatorId) {
    try {
      const result = this.http.get(api_url + '/formTaskProcess/nextSigners/' + formTaskId + "/" + flowType + "/" + targetId + "/" + creatorId);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getAlreadySingers(formTaskId, creatorId) {
    try {
      const result = this.http.get(api_url + '/formTaskProcess/alreadySigners/' + formTaskId + "/" + creatorId);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  formAction(data) {
    try {
      const result = this.http.post(
        api_url + '/formTaskProcess/formAction',
        data
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  uploadData(formData): Observable<HttpEvent<any>> {
    try {
      const req = new HttpRequest('POST', api_url + '/upload/', formData,
        {
          reportProgress: true,
          responseType: 'json'
        });
      return this.http.request(req);
    } catch (error) {
      console.log(error);
    }
  }

  async getPccesF5() {
    try {
      const result = this.http.get(api_url + '/pccesCode/findItemCode');
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getPccesChapCode(CodeSection, ChapCode, selfRowValue) {
    try {
      ChapCode = (ChapCode.toString().length == 1) ? "0" + ChapCode : ChapCode;
      var query = ChapCode + "/" + CodeSection;
      if (selfRowValue != "") {
        query += "/" + selfRowValue;
      }
      const result = this.http.get(api_url + '/pccesCode/getCodeSection/' + query);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getPccesById(code) {
    try {
      const result = this.http.get(api_url + '/pccesCode/' + code);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
