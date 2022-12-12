import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getuid } from 'process';
import { UUID } from 'angular2-uuid';
import { api_url } from './api_config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  async getMenu1(groupId) {
    try {
      const menus = await this.http.get(
        api_url + '/menu1/?id=' + groupId
      );
      return menus;
    } catch (error) {
      console.log(error);
    }
  }
  async getMenu2(groupId) {
    try {
      const menus = await this.http.get(
        api_url + '/menu2/?id=' + groupId
      );
      return menus;
    } catch (error) {
      console.log(error);
    }
  }

  getBtnRight(moduleId) {
    try {
      const menus = this.http.get(
        api_url + '/permission/' + moduleId
      );
      return menus;
    } catch (error) {
      console.log(error);
    }
  }

  //Goods
  async getGoods(goodTypeId) {
    try {
      const goods = this.http.get(
        api_url + '/api/Goods/?id=' + goodTypeId
      );
      return goods;
    } catch (error) {
      console.log(error);
    }
  }

  addGoods(goodsName, goodsTypeId, goodsRemark) {
    try {
      // const headers = {
      //     'Access-Control-Allow-Origin': '*',
      //     Accepts: 'application/json',
      //     'Content-Type': 'application/json; charset=utf-8'
      // };
      const result = this.http.post(api_url + '/api/Goods/', {
        goodsName: goodsName,
        goodsTypeId: goodsTypeId,
        goodsRemark: goodsRemark,
        createTime: ''
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editGoods(id, goodsName, goodsTypeId, goodsRemark) {
    try {
      const result = this.http.patch(api_url + '/api/Goods/', {
        id: id,
        goodsName: goodsName,
        goodsTypeId: goodsTypeId,
        goodsRemark: goodsRemark,
        createTime: ''
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteGoods(id) {
    try {
      const result = this.http.delete(api_url + '/api/Goods/?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //GoodTypes
  async getGoodTypes() {
    try {
      const goodTypes = this.http.get(api_url + '/api/GoodTypes/');
      return goodTypes;
    } catch (error) {
      console.log(error);
    }
  }

  addGoodTypes(goodsTypeName) {
    try {
      const result = this.http.post(api_url + '/api/GoodTypes/', {
        goodsTypeName: goodsTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editGoodTypes(id, goodsTypeName) {
    try {
      const result = this.http.patch(api_url + '/api/GoodTypes/', {
        id: id,
        goodsTypeName: goodsTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteGoodTypes(id) {
    try {
      const result = this.http.delete(
        api_url + '/api/GoodTypes/?id=' + id
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //Jobs
  async getJobs(page = '', size = '', sort = 'rank') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const jobs = this.http.get(api_url + '/job?' + query);
      return jobs;
    } catch (error) {
      console.log(error);
    }
  }

  addJobs({ jobName, jobCode, rank }) {
    try {
      const result = this.http.post(api_url + '/job/', {
        jobName: jobName,
        jobCode: jobCode,
        rank: rank,
        //  modules: modules
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getJob(id) {
    try {
      const Job = this.http.get(api_url + '/job/' + id);
      return Job;
    } catch (error) {
      console.log(error);
    }
  }

  editJobs(id, { jobName, jobCode, rank }) {
    try {
      const result = this.http.post(api_url + '/job/' + id, {
        jobName: jobName,
        jobCode: jobCode,
        rank: rank
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteJobs(id, d = false) {
    try {
      const result = this.http.delete(api_url + '/job/' + id, {
        body: {
          delete: d
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //pccesCodes
  async getPccesCodes(page = '', size = '', sort = '_id') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const pccesCodes = this.http.get(api_url + '/pccesCode?' + query);
      return pccesCodes;
    } catch (error) {
      console.log(error);
    }
  }

  addPccesCodes({ _id, itemKind, description, unit }) {
    try {
      const result = this.http.post(api_url + '/pccesCode/', {
        _id: _id,
        itemKind: itemKind,
        description: description,
        unit: unit
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editPccesCodes(id, { itemKind, description, unit }) {
    try {
      const result = this.http.post(api_url + '/pccesCode/' + id, {
        itemKind: itemKind,
        description: description,
        unit: unit
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deletePccesCodes(id) {
    try {
      const result = this.http.delete(api_url + '/pccesCode/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //ProjectSteps
  async getProjectSteps(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const ProjectSteps = this.http.get(
        api_url + '/projectStep?' + query
      );
      return ProjectSteps;
    } catch (error) {
      console.log(error);
    }
  }

  addProjectSteps({ stepNo, stepName, stepClass }) {
    try {
      const result = this.http.post(api_url + '/projectStep/', {
        stepNo: stepNo,
        stepName: stepName,
        stepClass: stepClass
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editProjectSteps(id, { stepNo, stepName, stepClass }) {
    try {
      const result = this.http.post(api_url + '/projectStep/' + id, {
        stepNo: stepNo,
        stepName: stepName,
        stepClass: stepClass
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteProjectSteps(id, d = false) {
    try {
      const result = this.http.delete(api_url + '/projectStep/' + id, {
        body: {
          delete: d
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //WorkTypes
  async getWorkTypes(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const WorkTypes = this.http.get(api_url + '/workType?' + query);
      return WorkTypes;
    } catch (error) {
      console.log(error);
    }
  }

  getWorkType(id) {
    try {
      const WorkType = this.http.get(api_url + '/workType/' + id);
      return WorkType;
    } catch (error) {
      console.log(error);
    }
  }

  addWorkTypes({ workTypeName, enable }) {
    try {
      const result = this.http.post(api_url + '/workType/', {
        workTypeName: workTypeName,
        enable: true
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editWorkTypes(id, { workTypeName, enable }) {
    try {
      const result = this.http.post(api_url + '/workType/' + id, {
        workTypeName: workTypeName,
        enable: enable
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteWorkTypes(id) {
    try {
      const result = this.http.delete(api_url + '/workType/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //ProjectTypes
  async getProjectTypes(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const ProjectTypes = this.http.get(
        api_url + '/projectType?' + query
      );
      return ProjectTypes;
    } catch (error) {
      console.log(error);
    }
  }

  addProjectTypes({ projectTypeName }) {
    try {
      const result = this.http.post(api_url + '/projectType/', {
        projectTypeName: projectTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editProjectTypes(id, { projectTypeName }) {
    try {
      const result = this.http.post(api_url + '/projectType/' + id, {
        projectTypeName: projectTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteProjectTypes(id) {
    try {
      const result = this.http.delete(api_url + '/projectType/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //ContractTypes
  getContractTypes(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const ContractTypes = this.http.get(
        api_url + '/contractType?' + query
      );
      return ContractTypes;
    } catch (error) {
      console.log(error);
    }
  }

  addContractTypes({ contractTypeName }) {
    try {
      const result = this.http.post(api_url + '/contractType/', {
        contractTypeName: contractTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editContractTypes(id, { contractTypeName }) {
    try {
      const result = this.http.post(api_url + '/contractType/' + id, {
        contractTypeName: contractTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteContractTypes(id) {
    try {
      const result = this.http.delete(api_url + '/contractType/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //FunctionModules
  async getFunctionModules(page = '', size = '', sort = 'sort') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const FunctionModule = this.http.get(
        api_url + '/functionModule?' + query
      );
      return FunctionModule;
    } catch (error) {
      console.log(error);
    }
  }

  getFunctionModule(id) {
    try {
      const FunctionModule = this.http.get(
        api_url + '/functionModule/' + id
      );
      return FunctionModule;
    } catch (error) {
      console.log(error);
    }
  }

  addFunctionModules({
    moduleName,
    controllerName,
    parameter,
    rootFunctionId,
    level,
    menuClass,
    sort
  }) {
    try {
      const result = this.http.post(api_url + '/functionModule/', {
        moduleName: moduleName,
        controllerName: controllerName,
        parameter: JSON.parse(parameter),
        rootFunctionId: rootFunctionId,
        level: level,
        menuClass: menuClass
        // sort:sort
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editFunctionModules(
    id,
    {
      moduleName,
      controllerName,
      parameter,
      rootFunctionId,
      level,
      menuClass,
      sort
    }
  ) {
    try {
      const result = this.http.post(api_url + '/functionModule/' + id, {
        moduleName: moduleName,
        controllerName: controllerName,
        parameter: JSON.parse(parameter),
        rootFunctionId: rootFunctionId,
        level: level,
        menuClass: menuClass
        //sort:sort
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteFunctionModules(id, d = false) {
    try {
      const result = this.http.delete(api_url + '/functionModule/' + id, {
        body: {
          delete: d
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //ScopeDescriptions
  async getScopeDescriptions(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const ScopeDescriptions = this.http.get(
        api_url + '/scopeDescription?' + query
      );
      return ScopeDescriptions;
    } catch (error) {
      console.log(error);
    }
  }

  addScopeDescriptions({ scopeDescriptionTitle, htmlCode }) {
    try {
      const result = this.http.post(api_url + '/scopeDescription/', {
        scopeDescriptionTitle: scopeDescriptionTitle,
        htmlCode: htmlCode
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editScopeDescriptions(id, { scopeDescriptionTitle, htmlCode }) {
    try {
      const result = this.http.post(api_url + '/scopeDescription/' + id, {
        scopeDescriptionTitle: scopeDescriptionTitle,
        htmlCode: htmlCode
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteScopeDescriptions(id) {
    try {
      const result = this.http.delete(
        api_url + '/scopeDescription/' + id
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //RuleDescriptions
  async getRuleDescriptions(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const RuleDescriptions = this.http.get(
        api_url + '/ruleDescription?' + query
      );
      return RuleDescriptions;
    } catch (error) {
      console.log(error);
    }
  }

  addRuleDescriptions({ ruleDescriptionTitle, htmlCode }) {
    try {
      const result = this.http.post(api_url + '/ruleDescription/', {
        ruleDescriptionTitle: ruleDescriptionTitle,
        htmlCode: htmlCode
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editRuleDescriptions(id, { ruleDescriptionTitle, htmlCode }) {
    try {
      const result = this.http.post(api_url + '/ruleDescription/' + id, {
        ruleDescriptionTitle: ruleDescriptionTitle,
        htmlCode: htmlCode
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteRuleDescriptions(id) {
    try {
      const result = this.http.delete(api_url + '/ruleDescription/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //Departments
  async getDepartments(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const Departments = this.http.get(
        api_url +
        '/department?' +
        query +
        '&sort=rootDepartmentName,asc&sort=level,asc&sort=sort,asc'
      );
      return Departments;
    } catch (error) {
      console.log(error);
    }
  }

  getDepartment(id) {
    try {
      const Department = this.http.get(api_url + '/department/' + id);
      return Department;
    } catch (error) {
      console.log(error);
    }
  }

  addDepartments({ depName, level, depCode, depChineseCode, rootDepartmentId, sort }) {
    try {
      const result = this.http.post(api_url + '/department/', {
        depName: depName,
        level: level,
        depCode: depCode,
        depChineseCode: depChineseCode,
        rootDepartmentId: rootDepartmentId,
        sort: sort
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editDepartments(id, { depName, level, depCode, depChineseCode, rootDepartmentId, sort }) {
    try {
      const result = this.http.post(api_url + '/department/' + id, {
        depName: depName,
        level: level,
        depCode: depCode,
        depChineseCode: depChineseCode,
        rootDepartmentId: rootDepartmentId,
        sort: sort
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteDepartments(id, d = false) {
    try {
      const result = this.http.delete(api_url + '/department/' + id, {
        body: {
          delete: d
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //Employees
  async getEmployees(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const Employees = this.http.get(api_url + '/employee?' + query);
      return Employees;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeesAll(page = '', size = '', sort = '', licenseTypeId) {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const Employees = this.http.post(api_url + '/employee/all?' + query, {
        licenseTypeId: licenseTypeId
      });
      return Employees;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeesByDepartment(depId) {
    try {
      const Employees = this.http.get(api_url + '/employee/byDepartment/' + depId);
      return Employees;
    } catch (error) {
      console.log(error);
    }
  }

  getEmployee(id) {
    try {
      const Employee = this.http.get(api_url + '/employee/' + id);
      return Employee;
    } catch (error) {
      console.log(error);
    }
  }

  addEmployees({
    empName,
    boss,
    account,
    email,
    departmentId,
    birthday,
    onBoardDate,
    gender,
    personalNo,
    jobList,
    employeeSeal
  }) {
    try {
      const result = this.http.post(api_url + '/employee/', {
        empName: empName,
        boss: boss,
        empGUID: UUID.UUID(),
        account: account,
        password: '',
        email: email,
        createDate: new Date(),
        departmentId: departmentId,
        birthday: birthday,
        onBoardDate: onBoardDate,
        gender: gender,
        personalNo: personalNo,
        jobList: jobList,
        employeeSeal: employeeSeal,
        lock: false
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editEmployees(
    id,
    empName,
    boss,
    password,
    email,
    lock,
    expireDate,
    departmentId,
    birthday,
    onBoardDate,
    gender,
    personalNo,
    jobList,
    empGUID,
    account,
    createDate,
    lockDate,
    phone,
    address,
    expertise,
    interest,
    contactList,
    licenseList,
    employeePic,
    employeeSeal
  ) {
    try {
      const result = this.http.post(api_url + '/employee/' + id, {
        empName: empName,
        boss: boss,
        password: password,
        email: email,
        lock: lock,
        expireDate: expireDate,
        departmentId: departmentId,
        birthday: birthday,
        onBoardDate: onBoardDate,
        gender: gender,
        personalNo: personalNo,
        jobList: jobList,

        empGUID: empGUID,
        account: account,
        createDate: createDate,
        lockDate: lockDate,

        phone: phone,
        address: address,
        expertise: expertise,
        interest: interest,
        contactList: contactList,
        licenseList: licenseList,
        employeePic: employeePic,
        employeeSeal: employeeSeal
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteEmployees(id) {
    try {
      const result = this.http.delete(api_url + '/employee/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //JobModuleses
  async getJobModuleses(page = '', size = '', sort = 'sort', JobId = "") {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const JobModuleses = this.http.post(
        api_url + '/jobModules/all?' + query, {
        jobId: JobId
      }
      );
      return JobModuleses;
    } catch (error) {
      console.log(error);
    }
  }

  getJobModules(id) {
    try {
      const JobModule = this.http.get(api_url + '/jobModules/' + id);
      return JobModule;
    } catch (error) {
      console.log(error);
    }
  }

  addJobModuleses({
    jobId,
    moduleId,
    insert,
    update,
    delete1,
    showInMenu,
    sort
  }) {
    try {
      const result = this.http.post(api_url + '/jobModules/', {
        jobId: jobId,
        moduleId: moduleId,
        insert: insert,
        update: update,
        delete: delete1,
        showInMenu: showInMenu,
        sort: sort
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editJobModuleses(
    id,
    { jobId, moduleId, insert, update, delete1, showInMenu, sort }
  ) {
    try {
      const result = this.http.post(api_url + '/jobModules/' + id, {
        jobId: jobId,
        moduleId: moduleId,
        insert: insert,
        update: update,
        delete: delete1,
        showInMenu: showInMenu,
        sort: sort
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteJobModuleses(id) {
    try {
      const result = this.http.delete(api_url + '/jobModules/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //LicenseTypes
  async getLicenseTypes(page = '', size = '', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const LicenseTypes = this.http.get(
        api_url + '/licenseType?' + query
      );
      return LicenseTypes;
    } catch (error) {
      console.log(error);
    }
  }

  addLicenseTypes({ licenseTypeName }) {
    try {
      const result = this.http.post(api_url + '/licenseType/', {
        licenseTypeName: licenseTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editLicenseTypes(id, { licenseTypeName }) {
    try {
      const result = this.http.post(api_url + '/licenseType/' + id, {
        licenseTypeName: licenseTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteLicenseTypes(id, d = false) {
    try {
      const result = this.http.delete(api_url + '/licenseType/' + id, {
        body: {
          delete: d
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //SupplierTypes
  async getSupplierTypes(page = '', size = '10000', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const SupplierTypes = this.http.get(
        api_url + '/supplierType?' + query
      );
      return SupplierTypes;
    } catch (error) {
      console.log(error);
    }
  }

  getSupplierType(id) {
    try {
      const SupplierType = this.http.get(api_url + '/supplierType/' + id);
      return SupplierType;
    } catch (error) {
      console.log(error);
    }
  }

  addSupplierTypes({ typeName }) {
    try {
      const result = this.http.post(api_url + '/supplierType/', {
        typeName: typeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editSupplierTypes(id, { typeName }) {
    try {
      const result = this.http.post(api_url + '/supplierType/' + id, {
        typeName: typeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteSupplierTypes(id, d = false) {
    try {
      const result = this.http.delete(api_url + '/supplierType/' + id, {
        body: {
          delete: d
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //Suppliers
  getSuppliers(
    page = '',
    size = '10000',
    sort = '',
    locationName = [],
    workTypeId = []
  ) {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const Suppliers = this.http.post(
        api_url + '/supplier/all?' + query,
        {
          locationName: locationName,
          workTypeId: workTypeId
        }
      );
      return Suppliers;
    } catch (error) {
      console.log(error);
    }
  }


  addSuppliers({
    supplierName,
    businessNo,
    codeName,
    contactName,
    contactPhone,
    badRecord,
    email,
    supplierTypeId,
    workersNum,
    locationItem,
    address,
    workTypeIdList,
    locationAreaList,
    employeeId,
    remark,
    supplierBankData,
    supplierCareList
  }) {
    try {
      const result = this.http.post(api_url + '/supplier/', {
        supplierName: supplierName,
        businessNo: businessNo,
        codeName: codeName,
        contactName: contactName,
        contactPhone: contactPhone,
        badRecord: badRecord,
        email: email,
        supplierTypeId: supplierTypeId,
        workersNum: workersNum,
        locationItem: locationItem,
        address: address,
        workTypeIdList: workTypeIdList,
        locationAreaList: locationAreaList,
        employeeId: employeeId,
        remark: remark,
        supplierBankData: supplierBankData,

        disableDay: null,
        disableRemark: '',
        supplierCareList: supplierCareList,
        enable: true,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editSuppliers(id,
    { supplierName,
      businessNo,
      codeName,
      contactName,
      contactPhone,
      badRecord,
      email,
      supplierTypeId,
      workersNum,
      locationItem,
      address,
      workTypeIdList,
      locationAreaList,
      employeeId,
      remark,
      supplierBankData,
      disableDay,
      disableRemark,
      supplierCareList,
      enable }) {
    try {
      const result = this.http.post(api_url + '/supplier/' + id, {
        supplierName: supplierName,
        businessNo: businessNo,
        codeName: codeName,
        contactName: contactName,
        contactPhone: contactPhone,
        badRecord: badRecord,
        email: email,
        supplierTypeId: supplierTypeId,
        workersNum: workersNum,
        locationItem: locationItem,
        address: address,
        workTypeIdList: workTypeIdList,
        locationAreaList: locationAreaList,
        employeeId: employeeId,
        remark: remark,
        supplierBankData: supplierBankData,

        disableDay: disableDay,
        disableRemark: disableRemark,
        supplierCareList: supplierCareList,
        enable: enable
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteSuppliers(id) {
    try {
      const result = this.http.delete(api_url + '/supplier/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //SupplierCares
  getSupplierCares(
    locationName = [],
    employeeId = [],
    supplierId = []
  ) {
    try {
      const SupplierCares = this.http.post(
        api_url + '/supplier/findSupplierCare?',
        {
          locationName: locationName,
          employeeId: employeeId,
          supplierId: supplierId
        }
      );
      return SupplierCares;
    } catch (error) {
      console.log(error);
    }
  }

  getSupplierContract(
    page = '',
    size = '10000',
    sort = '',
    id = ''
  ) {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const SupplierContract = this.http.get(
        api_url + '/supplier/findSupplierContract/' + id + "?" + query
      );
      return SupplierContract;
    } catch (error) {
      console.log(error);
    }
  }

  //Locations
  async getLocations(page = '', size = '10000', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const Locations = this.http.get(api_url + '/locations?' + query);
      return Locations;
    } catch (error) {
      console.log(error);
    }
  }

  //Areas
  getArea(id) {
    try {
      const Areas = this.http.get(api_url + '/locations/' + id);
      return Areas;
    } catch (error) {
      console.log(error);
    }
  }

  //Banks
  async getBanks(page = '', size = '10000', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const Banks = this.http.get(api_url + '/banks?' + query);
      return Banks;
    } catch (error) {
      console.log(error);
    }
  }

  getBank(id) {
    try {
      const Bank = this.http.get(api_url + '/banks/' + id);
      return Bank;
    } catch (error) {
      console.log(error);
    }
  }

  //PaymentTypes
  async getPaymentTypes(page = '', size = '10000', sort = '') {
    try {
      var query = '';
      if (page != '') {
        query += '&page=' + page;
      }
      if (size != '') {
        query += '&size=' + size;
      }
      if (sort != '') {
        query += '&sort=' + sort;
      }
      const PaymentTypes = this.http.get(
        api_url + '/paymentType?' + query
      );
      return PaymentTypes;
    } catch (error) {
      console.log(error);
    }
  }

  addPaymentTypes({ paymentTypeName }) {
    try {
      const result = this.http.post(api_url + '/paymentType/', {
        paymentTypeName: paymentTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  editPaymentTypes(id, { paymentTypeName }) {
    try {
      const result = this.http.post(api_url + '/paymentType/' + id, {
        paymentTypeName: paymentTypeName
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deletePaymentTypes(id) {
    try {
      const result = this.http.delete(api_url + '/paymentType/' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //Situations
  async getSituations() {
    try {
      const Situations = this.http.get(
        api_url +
        '/project/situation'
      );
      return Situations;
    } catch (error) {
      console.log(error);
    }
  }


  //upload
  uploadData(formData) {
    try {
      const result = this.http.post(api_url + '/upload/', formData);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  uploadData1(formData): Observable<HttpEvent<any>> {
    try {
      const result = new HttpRequest('POST', api_url + '/upload/', formData,
        {
          reportProgress: true,
          responseType: 'json'
        });
      return this.http.request(result);
    } catch (error) {
      console.log(error);
    }
  }

  //download
  download(path) {
    try {
      const result = this.http.get(api_url + '/download?path=' + path, {
        responseType: 'arraybuffer'
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  downLoadFile(data, type) {
    var blob = new Blob([data], { type: type.toString() });
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('檔案下載失敗!');
    }
  }

  downLoadFileToBase64(data) {
    var binary = '';
    var bytes = new Uint8Array(data);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpg;base64,' + window.btoa(binary);
  }
}
