import {
  Component,
  OnInit,
  ComponentRef,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  ViewContainerRef,
  Inject
} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormmngapiService} from '@services/formmngapi.service';
import Swal from 'sweetalert2';

import {FormFlowTemplateComponent} from './form-flow-template/form-flow-template.component'
import { FormSectionComponent } from '../form-section/form-section.component';

@Component({
  selector: 'app-form-flow',
  templateUrl: './form-flow.component.html',
  styleUrls: ['./form-flow.component.scss']
})
export class FormFlowComponent implements OnInit {
  @Input() form_id;
  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;
  child_unique_key = 0;
  child_unique_key_arr = [];
  formFlowComponents = Array<ComponentRef<FormFlowTemplateComponent>>()

  public formFlows = [];
  public formSectionList = [];
  public departmentList = [];
  public employeeList = [];
  public jobList = [];
  temp_var = "";
  max_flowNo = 1;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: FormmngapiService,
    private CFR: ComponentFactoryResolver
  ) { }
  ngOnInit(): void {
    this.reloadData();
  }
  async reloadData() {
    (await this.apiService.getFormFlow(this.form_id)).subscribe((res) => {
      this.child_unique_key_arr = [];
      this.formFlowComponents = [];
      this.container.clear();
        this.formFlows = res.formFlows;
        this.formSectionList = res.formSections;
        this.departmentList = res.deps.map(x=>{x.depName = '—'.repeat(x.level)+x.depName; return x;});
        this.employeeList = res.emps;
        this.jobList = res.jobs;
        let endFlow = res.formFlows.length-1;
        let max_val = Math.max.apply(Math,res.formFlows.map((item,i)=>{
          let arrowSwitch = i == 0? 'first' : i == endFlow ? 'last' : 'middle';
          this.addNewFormFlow(item,arrowSwitch);
          return item.formFlowNo;
        }));


        if(max_val != -Infinity){
          this.max_flowNo = Number(max_val)+1;
        }

        // this.formSection.get('formSectionNo').setValue(this.max_sectionNo);
    });
  }
  saveFormSection(type:String){
    console.log(type);
  }
  addNewFormFlow(formFlowData,orderindex){
    let addtype = 'add';
    let formFlowNo = this.max_flowNo;
    if(formFlowData != null){
      addtype = 'edit';
      formFlowNo = formFlowData.formFlowNo;
    }
    let componentFactory = this.CFR.resolveComponentFactory(FormFlowTemplateComponent);
    let childComponentRef = this.container.createComponent(componentFactory);
    let childComponent = childComponentRef.instance;
    childComponent.form_id = this.form_id;
    childComponent.orderindex = orderindex;
    childComponent.addtype = addtype;
    childComponent.formFlowNo = formFlowNo;
    childComponent.formFlowData = formFlowData;
    // childComponent.tableData = this.formSectionList;
    childComponent.tableData = JSON.parse(JSON.stringify(this.formSectionList));
    childComponent.departmentList = this.departmentList;
    childComponent.employeeList = this.employeeList;
    childComponent.jobList = this.jobList;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;
    // add reference for newly created component
    this.formFlowComponents.push(childComponentRef);
    this.child_unique_key_arr.push(childComponent.unique_key);
    if(formFlowData == null){
      this.max_flowNo++;
    }
  }

  removeFormFlow(key: number) {
    if (this.container.length < 1) return;

    let componentRef = this.formFlowComponents.filter(
      x => x.instance.unique_key == key
    )[0];

    if(componentRef.instance.formFlowData != null){
      Swal.fire({
        title: '確定要刪除流程資料?',
        // text: 'Really, Would you delete this record?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: "#17a2b8",
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        focusCancel: true
      }).then((result) => {
        if (result.value) {
          let flow_id = componentRef.instance.formFlowData._id;
          this.apiService.deleteFormFlow(this.form_id,flow_id).subscribe((res) => {
            let vcrIndex: number = this.container.indexOf(componentRef as any);
            vcrIndex = this.child_unique_key_arr.indexOf(key);
            // removing component from container
            this.container.remove(vcrIndex);
            this.child_unique_key_arr.splice(vcrIndex, 1);

            // removing component from the list
            this.formFlowComponents = this.formFlowComponents.filter(
              x => x.instance.unique_key !== key
            );
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log();
        }
      })
    }else{
      let vcrIndex: number = this.container.indexOf(componentRef as any);
      vcrIndex = this.child_unique_key_arr.indexOf(key);
      // removing component from container
      this.container.remove(vcrIndex);
      this.child_unique_key_arr.splice(vcrIndex, 1);

      // removing component from the list
      this.formFlowComponents = this.formFlowComponents.filter(
        x => x.instance.unique_key !== key
      );
    }
  }
  changeFormFlowOrder(key: number,direction:String){
    const ind = this.child_unique_key_arr.indexOf(key);
    const myCompo = this.formFlowComponents[ind];
    let next_ind = Number(ind)+1;
    if(direction == 'up'){
      if(ind == 0) return;
      next_ind = Number(ind)-1;
    }
    else if(ind == this.child_unique_key_arr.length-1){
      return;
    }
    const otherCompo = this.formFlowComponents[next_ind];
    this.apiService.changeFlowOrder(this.form_id,[
        {
          _id:myCompo.instance.formFlowData._id,
          sort:otherCompo.instance.formFlowData.sort
        },
        {
          _id:otherCompo.instance.formFlowData._id,
          sort:myCompo.instance.formFlowData.sort
        }
      ]).subscribe((res) => {
      this.reloadData();
    });
    // this.formFlowComponents[ind] = this.formFlowComponents[next_ind];
    // this.formFlowComponents[next_ind] = tmpcompo;
    // this.child_unique_key_arr[ind] = this.child_unique_key_arr[next_ind];
    // this.child_unique_key_arr[next_ind] = key;
  }
}
