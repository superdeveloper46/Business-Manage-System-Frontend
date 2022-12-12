import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnInit,
    ViewChild,
    Injectable,
    Input
} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {
    openCloseAnimation,
    rotateAnimation
} from './form-flow-template.animations';
import {FormFlowComponent} from '../form-flow.component';
import {Subject} from 'rxjs';
import {FormmngapiService} from '@services/formmngapi.service';
// import { state } from '@angular/animations';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-form-flow-template',
    templateUrl: './form-flow-template.component.html',
    styleUrls: ['./form-flow-template.component.scss'],
    animations: [openCloseAnimation, rotateAnimation]
})
@Injectable()
export class FormFlowTemplateComponent implements OnInit {
    public unique_key: number;
    public parentRef: FormFlowComponent;

    dtTrigger: Subject<any> = new Subject<any>();
    dtOptions: DataTables.Settings = {
        pagingType: 'full_numbers',
        pageLength: 5,
        stateSave: true,
        // order: [[2, 'desc']],
        ordering: false
    };
    @ViewChild(DataTableDirective, {static: true})
    dtElement: DataTableDirective;

    public isExpandable: boolean = false;
    @HostBinding('class.nav-item') isNavItem: boolean = true;
    @HostBinding('class.menu-open') isMenuExtended: boolean = false;
    public isMainActive: boolean = false;
    public isOneOfChildrenActive: boolean = false;

    public orderindex = 'middle';
    public addtype = 'add';
    public form_id = null;
    public formFlowNo: any = 1;
    public formFlowData = null;
    @Input() tableData = [];
    public departmentList = [];
    public employeeList = [];
    public jobList = [];

    filteredEmployeeList = [];
    max_sectionNo = 1;
    defaultData = [];
    selectedFlowTypeId = '1';
    selectedFlowTypeName = 'direct supervisor';
    _id = null;
    sort = 1;
    targetId = '';
    targetName = '';
    selectedDepId = null;
    selectedJobId = null;
    selectedManDepId = null;
    selectedEmpId = null;
    flowTypeList = [
        {id: '1', text: '直屬主管'},
        {id: '2', text: '上一站直屬主管'},
        {id: '3', text: '選擇部門'},
        {id: '4', text: '選擇職務'},
        {id: '5', text: '選擇人員'},
        {id: '6', text: '開單者'},
        {id: '7', text: '專案工地主任'},
        {id: '8', text: '專案主管'},
        {id: '9', text: '專案執行採發'}
    ];
    constructor(
        public apiService: FormmngapiService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.isExpandable = true;
        this.calculateIsActive();
        this.defaultData = this.tableData;
        if (this.formFlowData != null) {
            this._id = this.formFlowData._id;
            this.formFlowNo = this.formFlowData.formFlowNo;
            this.selectedFlowTypeId = this.formFlowData.flowType;
            this.selectedFlowTypeName =
                this.flowTypeList[Number(this.selectedFlowTypeId) - 1].text;
            this.targetId = this.formFlowData.targetId;
            this.sort = this.formFlowData.sort;
            if (this.selectedFlowTypeId == '5') {
                let selectedEmp = this.employeeList.filter(
                    (x) => this.targetId == x._id
                );
                if (selectedEmp.length > 0) {
                    this.selectedManDepId = selectedEmp[0].departmentId;
                    this.targetName = selectedEmp[0].empName;
                    this.changeManDep(this.selectedManDepId, false);
                }
            } else if (this.selectedFlowTypeId == '4') {
                let temp = this.jobList.filter((x) => this.targetId == x._id);
                if (temp.length > 0) {
                    this.targetName = temp[0].jobName;
                }
            } else if (this.selectedFlowTypeId == '3') {
                let temp = this.departmentList.filter(
                    (x) => this.targetId == x._id
                );
                if (temp.length > 0) {
                    this.targetName = temp[0].depName.replaceAll('—', '');
                }
            }
            if (this.targetName != '') this.targetName = '—' + this.targetName;
            this.refreshData();
        }
    }
    async reloadData() {
        this.dtTrigger.next(null);
    }

    refreshData() {
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        for (var j in this.defaultData) {
            for (var i in this.formFlowData.sectionRightList) {
                var tmp = this.formFlowData.sectionRightList[i];
                if (tmp.formSectionId == this.defaultData[j]._id) {
                    this.defaultData[j]['allowEdit'] = tmp.allowEdit;
                    this.defaultData[j]['allowShow'] = tmp.allowShow;
                }
            }
            // var newObject = this.tableData[j];
            // this.defaultData.push(newObject);
        }
        // dtInstance.destroy();
        // this.dtTrigger.next(null);
        // });
    }

    public handleMainMenuAction() {
        if (this.isExpandable) {
            this.toggleMenu();
            return;
        }
    }

    public toggleMenu() {
        this.isMenuExtended = !this.isMenuExtended;
    }
    public calculateIsActive() {
        this.isMainActive = true;
        this.isOneOfChildrenActive = true;
        if (!this.isMainActive && !this.isOneOfChildrenActive) {
            this.isMenuExtended = false;
        }
    }
    changeFormFlowTitle(id) {
        this.selectedFlowTypeId = id;
        this.targetId = '';
        this.targetName = '';
        if (id == '3') {
            if (this.departmentList.length > 0) {
                this.targetId = this.departmentList[0]._id;
                this.targetName = '—' + this.departmentList[0].depName;
            }
        } else if (id == '4') {
            if (this.jobList.length > 0) {
                this.targetId = this.jobList[0]._id;
                this.targetName = '—' + this.jobList[0].jobName;
            }
        } else if (id == '5') {
            if (this.departmentList.length > 0) {
                this.selectedManDepId = this.departmentList[0]._id;
                this.changeManDep(this.departmentList[0]._id, true);
            }
        }
        this.selectedFlowTypeName =
            this.flowTypeList[Number(this.selectedFlowTypeId) - 1].text;
    }

    remove_me() {
        this.parentRef.removeFormFlow(this.unique_key);
    }
    saveData() {
        if (
            ['1', '2', '6', '7', '8', '9'].indexOf(this.selectedFlowTypeId) ==
                -1 &&
            this.targetId == ''
        ) {
            Swal.fire({
                title: '* Item should be selected!',
                icon: 'info'
            });
            return;
        }
        let data = {
            formFlowNo: this.formFlowNo,
            formId: this.form_id,
            flowType: this.selectedFlowTypeId,
            targetId: this.targetId,
            sort: this.formFlowNo,
            sectionRightList: this.tableData.map((x) => {
                return {
                    formSectionId: x._id,
                    allowEdit: x.allowEdit || false,
                    allowShow: x.allowShow || false
                };
            })
        };

        this._id == null ? '' : (data['_id'] = this._id);
        this._id == null
            ? (data['sort'] = this.formFlowNo)
            : (data['sort'] = this.sort);

        this.apiService
            .addFormFlow(this.form_id, data, this.addtype)
            .subscribe((res) => {
                this.toastr.success('儲存成功!');
                this.addtype = 'edit';
                this.parentRef.reloadData();
            });
    }

    changeMyOrder(direction) {
        this.parentRef.changeFormFlowOrder(this.unique_key, direction);
    }

    setAllowEdit(checked: boolean, row_id) {
        this.tableData = this.tableData.map((x) => {
            if (x._id == row_id) {
                x.allowEdit = checked;
                if (checked) x.allowShow = checked;
            } else if (x.allowEdit == undefined) x.allowEdit = false;
            return x;
        });
    }
    setAllowShow(checked: boolean, row_id) {
        this.tableData = this.tableData.map((x) => {
            if (x._id == row_id) x.allowShow = checked;
            else if (x.allowShow == undefined) x.allowShow = false;
            return x;
        });
    }
    changeCombo(id_type, value) {
        this.targetId = value;
        let selectedOption: any = {};
        switch (id_type) {
            case 'dep':
                selectedOption = this.departmentList.filter(
                    (x) => x._id == value
                )[0];
                this.targetName = selectedOption.depName.replaceAll('—', '');
                break;
            case 'job':
                selectedOption = this.jobList.filter((x) => x._id == value)[0];
                console.log(selectedOption);
                this.targetName = selectedOption.jobName;
                break;
            case 'emp':
                selectedOption = this.filteredEmployeeList.filter(
                    (x) => x._id == value
                )[0];
                this.targetName = selectedOption.empName;
                break;
            default:
                break;
        }
        if (this.targetName != '') this.targetName = '—' + this.targetName;
    }
    changeManDep(_id, flag) {
        let selected_dep: any = this.departmentList.filter(
            (x) => x._id == _id
        )[0];
        let dep_scope = this.departmentList.filter(
            (x) => x.depCode.indexOf(selected_dep.depCode) > -1
        );
        this.filteredEmployeeList = this.employeeList.filter(
            (x) => dep_scope.map((e) => e._id).indexOf(x.departmentId) > -1
        );
        if (flag) {
            this.targetId = '';
            this.targetName = '';
            if (this.filteredEmployeeList.length > 0) {
                this.targetId = this.filteredEmployeeList[0]._id;
                this.targetName = '—' + this.filteredEmployeeList[0].empName;
            }
        }
    }
}
