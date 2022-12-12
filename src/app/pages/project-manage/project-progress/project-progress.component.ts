import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import { RightService } from '@services/right.service';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.scss']
})
export class ProjectProgressComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getRight: any;
  RightObj: {};

  public result;
  constructor(
    public activeModal: NgbActiveModal,
    public rightService: RightService,
    public helperService: HelperService,
    public apiService: ApiService,
    private modalService: NgbModal,
  ) {
    this.getRight = this.rightService.getRight();}

  dtTrigger: Subject<any> = new Subject<any>();


  TabActive1 = true;
  TabActive2 = false;
  TabActive3 = false;
  TabActive4 = false;
  Title1="";
  Title2="";
  Title3="";
  Title4="";

  ngOnInit(): void {
    this.dtOptions = this.helperService.setDtOptions();
    this.RightObj = this.getRight['__zone_symbol__value'];

    this.changeTab(1);

    this.initStepBar();

  }

  initStepBar(){
    var data =[['工程部-李進良', '採發部-蕭慧慈', '採發部-沈月蘭', '採發部-蕭慧慈', '結案歸檔'],
    ['工程部-李進良', '工管部-謝逸民', '採發部-沈月蘭', '採發部-蕭慧慈', '工程部-李進良', '工管部-謝逸民', '總經理辦公室-范冰冰', '結案歸檔'],
    ['工程部-李進良', '工管部-謝逸民', '工程部-李進良', '工管部-謝逸民', '總經理辦公室-范冰冰', '結案歸檔'],
    ['工程部-李進良', '工管部-謝逸民', '工管部-謝逸民', '總經理辦公室-范冰冰', '結案歸檔']];

    var data2 =[['2022/01/01', '2022/01/02', '2022/01/03', '', ''],
    ['2022/01/01', '2022/01/02', '2022/01/03', '', '', '', '', ''],
    ['2022/01/01', '2022/01/02', '2022/01/03', '', '', ''],
    ['2022/01/01', '2022/01/02', '2022/01/03', '', '']];


for(var i=1 ; i<= 4 ; i++){
  (<any>$("#stepbar"+i)).stepbar({
    items: data[i - 1],
    dates: data2[i - 1],
    color: '#ccc',
    fontColor: '#000',
    selectedColor: '#2AA7C4',
    selectedFontColor: '#fff',
    current: 3
  });
}
  }
  changeTab(tabIndex) {
    switch (tabIndex) {
      case 1:
        this.TabActive1 = true;
        this.TabActive2 = false;
        this.TabActive3 = false;
        this.TabActive4 = false;
        this.Title1="CC001-P001-泥做工程";
        break;
      case 2:
        this.TabActive1 = false;
        this.TabActive2 = true;
        this.TabActive3 = false;
        this.TabActive4 = false;
        this.Title2="777";
        break;
      case 3:
        this.TabActive1 = false;
        this.TabActive2 = false;
        this.TabActive3 = true;
        this.TabActive4 = false;
        this.Title3="CC001-自001-油漆工程";
        break;
      case 4:
        this.TabActive1 = false;
        this.TabActive2 = false;
        this.TabActive3 = false;
        this.TabActive4 = true;
        this.Title4="CC001-P001-泥做工程";
        break;
    }


  }
}
