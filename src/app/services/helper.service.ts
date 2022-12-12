import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Responsive from 'datatables.net-responsive/js/dataTables.responsive';
import { ToastrService } from 'ngx-toastr';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { api_url } from './api_config';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  elementRef: any;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  //Setting DataTables Option
  public setDtOptions(order = null) {
    if (order == null) {
      order = [];
    }
    var dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: order,
      stateSave: true,
      responsive: {
        details: {
          renderer: Responsive.renderer.listHiddenNodes()
        }
      }
    }
    return dtOptions;
  }


  //加密
  Encrypt(value) {
    try {
      const result = this.http.post(api_url + '/update/encrypt', {
        data: value,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //************* AutoSave *************/

  //Listen Element to AutoSave
  //一般input適用
  public AutoSave(renderer, nativeElement, collectionName, collectionId) {
    renderer.listen(nativeElement, 'change', async (event) => {
      var element = event.target; //物件
      var value = element.value; //改變的值
      var dataType = "String";
      var type = element.type; //資料格式
      switch (type) {
        case "number":
          if (value.indexOf(".") > -1) {
            dataType = "double";
          } else {
            dataType = "int";
          }
          break;
        case "radio":
          dataType = "Boolean";
          break;
        case "checkbox":
          dataType = "Boolean";
          break;
        case "date":
          dataType = "Date";
          break;
        default:
          dataType = "String";
          break;
      }
      if (type.indexOf("select") > -1 && (value == "true" || value == "false")) {
        dataType = "Boolean";
      }


      if (element.className.indexOf('updateDataByColumn') > -1) {

        //加密
        if (element.className.indexOf('updateEncrypt') > -1) {
          this.Encrypt(value)
            .subscribe((res) => {
              value = res['data'];
              this.getSaveType(collectionName, collectionId, element, value, dataType, type)
            })
        } else {
          this.getSaveType(collectionName, collectionId, element, value, dataType, type)
        }
      }
    })
  }

  public getSaveType(collectionName, collectionId, element, value, dataType, type) {
    var name = element.name; //欄位
    var label = (element.label != undefined) ? element.label : element.dataset.label;  //欄位名稱

    var whereObj = [];
    var where = { key: "_id", value: collectionId, subdocName: "" };

    //物件
    if (element.className.indexOf('updateDataByListColumn') > -1) {
      whereObj.push(where);
      label = (element.label != undefined) ? element.label : element.dataset.label;
      var subdocId = (element.subdocId != undefined) ? element.subdocId : element.dataset.subdocid;
      var subdocName = (element.subdocname != undefined) ? element.subdocname : element.dataset.subdocname;
      name = name.split('.')[1];
      if (type.indexOf("select") > -1 && element.dataset.selectname != undefined) {
        name = element.dataset.selectname;
      }
      whereObj.push({ key: "_id", value: subdocId, subdocName: subdocName });
      this.callUpdate(collectionName, whereObj, subdocId, name, value, label, dataType)
    }

    //物件獨立collection
    else if (element.className.indexOf('updateDataByListCollection') > -1) {
      collectionName = (element.collectionName != undefined) ? element.collectionName : element.dataset.collectionname;
      var subdocId = (element.subdocId != undefined) ? element.subdocId : element.dataset.subdocid;
      where = { key: "_id", value: subdocId, subdocName: "" };
      whereObj.push(where);

      if (type.indexOf("select") > -1) {
        name = element.dataset.selectname;
      }

      this.callUpdate(collectionName, whereObj, collectionId, name, value, label, dataType)

    } else {
      //一般input
      whereObj.push(where);

      if (type.indexOf("select") > -1) {
        name = element.dataset.selectname;
      }
      this.callUpdate(collectionName, whereObj, collectionId, name, value, label, dataType)
    }
  }

  //直接Call更新API
  //檔案適用
  public callUpdate(collectionName, whereObj, collectionId, colName, value, label, dataType) {
    if (whereObj === null && collectionId !== null) {
      whereObj = [];
      whereObj.push({ key: "_id", value: collectionId, subdocName: "" });
    }

    this.updateDataByColumn(
      collectionName,
      whereObj,
      colName,
      value,
      dataType
    )
      .subscribe((res) => {
        if (res['status'] === 'ok') {
          this.toastr.success(`「${label}」儲存成功`);
        } else {
          this.toastr.warning(`「${label}」儲存失敗，請重試一次`);
        }
      })
  }

  //updateDataByColumnAPI
  updateDataByColumn(collectionName, whereObj: {}, key, value, dataType) {
    try {
      const result = this.http.post(api_url + '/update/data', {
        collectionName: collectionName,
        where: whereObj,
        updates: {
          key: key,
          value: value,
          data_type: dataType
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  //************* AutoSave end *************/


  //************* AutoAddData *************/

  public AddDataByColumn(collectionName, subdocName, id) {
    try {
      const result = this.http.post(api_url + '/update/addData', {
        collectionName: collectionName,
        subdocName: subdocName,
        id: id
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //************* AutoAddData end *************/

    //************* AutoDelData *************/

    public DelDataByColumn(collectionName, id, subdocName,subdocNameId) {
      try {
        const result = this.http.post(api_url + '/update/delData', {
          collectionName: collectionName,
          id: id,
          subdocName: subdocName,
          subdocNameId: subdocNameId
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    }

    //************* AutoDelData end *************/
}
