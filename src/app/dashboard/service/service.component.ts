import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  showServiceForm = false;
  serviceForm: FormGroup;
  serviceData = [];
  host = environment.base_URL;
  isConfirmLoading = false;
  constructor(private apiService: ApiService, private fb: FormBuilder) {}
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
  }

  fetchServiceData() {
    this.apiService.listService({}).subscribe(res => {
      this.serviceData = res;
      console.log(res);
    });
  }
  submitServiceForm() {
    if (this.serviceForm.valid) {
      let id = this.serviceForm.get('id').value;
      let serviceData = this.serviceForm.value;
      if (id) {
        this.apiService.updateService(serviceData).subscribe((_) => {
          this.showServiceForm = false;
          this.fetchServiceData();
          return;
        });
      }
      this.apiService.createService(serviceData).subscribe((_) => {
        this.showServiceForm = false;
        this.fetchServiceData();
      });
    }
    return;
  }
  openServiceForm(id?) {
    if (id) {
      this.apiService.getService(id).subscribe((res) => {
        this.createServiceForm(res);
        this.showServiceForm = true;
        return;
      });
    }
    this.showServiceForm = true;
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
}
