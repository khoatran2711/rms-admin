import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  showServiceForm = false;
  serviceForm: FormGroup;
  serviceData = [];
  ServiceFormTitle = 'Create Service';
  host = environment.base_URL;
  isConfirmLoading = false;
  isLoading = true;
  showContent = false;
  originData = [];
  searchName = '';
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NzModalService,
    private notificationService: NotificationService
  ) {}
  createServiceForm(d?) {
    this.serviceForm = this.fb.group({
      id: [d?.id],
      name: [d?.name, Validators.required],
      decscription: [d?.decscription, Validators.required],
      imageURL: [
        d?.imageURL || 'https://placehold.co/250x200',
        Validators.required,
      ],
    });
  }
  ngOnInit(): void {
    this.createServiceForm();
    this.fetchServiceData();
    this.loadData();
  }

  fetchServiceData() {
    this.apiService.listService({}).subscribe((res) => {
      this.serviceData = res;
      this.originData = res;
    });
  }
  submitServiceForm() {
    if (this.serviceForm.valid) {
      let id = this.serviceForm.get('id').value;
      this.modalService.confirm({
        nzTitle: `Do you Want to ${id ? 'Update' : 'Create'} this Service?`,
        nzContent: `Service Name: ${this.serviceForm.get('name').value}`,
        nzOnOk: () => {
          let serviceData = this.serviceForm.value;
          if (id) {
            this.apiService.updateService(serviceData).subscribe((_) => {
              this.showServiceForm = false;
              this.fetchServiceData();
              this.notificationService.createNotification({
                type: 'success',
                title: 'Service Updated',
                message: `Service ${serviceData.name} has been updated`,
                position: 'bottomRight',

              });
            });
            return;
          }
          this.apiService.createService(serviceData).subscribe((_) => {
            this.showServiceForm = false;
            this.fetchServiceData();
            this.notificationService.createNotification({
              type: 'success',
              title: 'Service Created',
              message: `Service ${serviceData.name} has been created`,
              position: 'bottomRight',

            });
          });
          return;
        },
      });
    }
  }
  openServiceForm(id?) {
    if (id) {
      this.apiService.getService(id).subscribe((res) => {
        this.createServiceForm(res[0]);
        this.ServiceFormTitle = 'Update Service';
        this.showServiceForm = true;
        this.cdr.detectChanges(); // to detect changes in the form
      });
      return;
    }
    this.ServiceFormTitle = 'Create Service';
    this.createServiceForm();
    this.showServiceForm = true;
    this.cdr.detectChanges(); // to detect changes in the form

    return;
  }
  closeServiceForm() {
    this.showServiceForm = false;
  }
  onUploadImage(event) {
    let fileInput = event.target.files[0];
    if (fileInput) {
      let formdata = new FormData();
      formdata.set('file', fileInput);
      this.apiService.uploadIMG(formdata).subscribe((res) => {
        this.serviceForm.get('imageURL').setValue(res);
      });
    }
  }
  getImgURL(url) {
    return `${this.host}${url}`;
  }
  onDeleteService(id) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this Service?',
      nzContent: 'Service will be deleted',
      nzOnOk: () => {
        this.apiService.deleteService(id).subscribe((_) => {
          this.fetchServiceData();
          this.notificationService.createNotification({
            type: 'error',
            title: 'Service Deleted',
            message: `Service has been deleted`,
            position: 'bottomRight',

          });
        });
      },
    });
  }
  filterServiceData(e) {
    if (e == '') {
      this.apiService.listService({}).subscribe((res) => {
        this.serviceData = res;
        this.originData = res;
      });
      return;
    }
    const serviceFiltered = this.originData.filter((service) => {
      return service.name.toLowerCase().includes(e.toLowerCase());
    });

    this.serviceData = serviceFiltered;
  }
  onViewProduct(id) {
    this.router.navigate(['dashboard/service/product', id]);
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
