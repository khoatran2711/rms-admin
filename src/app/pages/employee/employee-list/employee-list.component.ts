import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppsService } from 'src/app/shared/services/apps.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TableService } from 'src/app/shared/services/table.service';
// import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  view: string = 'contactGridView';
  ContactGridRaw: any[];
  ContactGrid: any[];
  searchInput: string;
  isLoading = true;
  showContent = false;
  startValue: Date | null = null;
  endValue: Date | null = null;
  employeeData = [];
  originData = [];
  constructor(
    private ContactGridSvc: AppsService,
    private modalService: NzModalService,
    private tablesvc: TableService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.ContactGridSvc.getContactGridJson().subscribe((data) => {
      this.ContactGridRaw = data;
      this.ContactGrid = data;
    });
    this.fetchEmployeeData();
    // Simulate loading time
    this.loadData();
  }
  fetchEmployeeData() {
    this.apiService.listEmployee({}).subscribe((res) => {
      // this.employeeData = res['data'];
      // this.originData = res['data'];
      this.employeeData = res;
      this.originData = res;
    });
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  search() {
    const data = this.ContactGridRaw;
    this.ContactGrid = this.tablesvc.search(this.searchInput, data);
  }

  onToUpsert(id?) {
    if (id) {
      this.router.navigate(['dashboard/employee/upsert', id]);
      return;
    }
    this.router.navigate(['dashboard/employee/upsert']);
  }

  // Checkbox
  log(value: string[]): void {
  }

  // Calendar
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {
  }
  getImgURL(url) {
    if (url) {
      return `${this.apiService.host}${url}`;
    }
    return 'assets/images/avatars/thumbs.png';
  }
  onDeleteEmployee(id) {
    this.modalService.confirm({
      nzTitle: 'Do you Want to delete this employee?',
      nzContent: 'When clicked the OK button, employee will be deleted',
      nzOnOk: () => {
        this.apiService.deleteEmployee(id).subscribe((_) => {
          this.notificationService.createNotification({
            type: 'error',
            title: 'Deleted',
            message: 'Employee deleted successfully',
            position: 'bottomRight',
          });
          this.fetchEmployeeData();
          this.loadData();
        });
      },
    })

  }
}
