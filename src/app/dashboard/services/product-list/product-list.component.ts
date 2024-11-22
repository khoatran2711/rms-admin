import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import tableData from '../../../../assets/data/pages/table-data.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  serviceID;
  host = 'http://localhost:8080';
  isEditting: boolean = false;
  seller: any;
  productData = [];
  filterData = {
    name: '',
  };
  pageData = {
    totalDocs: 1,
    limit: 10,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  };
  serviceData;
  tabData: { key: string; label: string }[];
  productForm: FormGroup;
  isOpenProductModal: boolean = false;
  isConfirmLoading: boolean = false;
  originData = [];
  //Dropdown Data
  // appItems = items.appItems;
  //Tab
  sellingTab: string = 'today';
  handleClick(tab: string): void {
    this.sellingTab = tab;
  }
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.serviceID = this.route.snapshot.params['Serviceid'];
    this.seller = tableData.bestSeller;
    this.tabData = [
      { key: 'today', label: 'Today' },
      { key: 'week', label: 'Week' },
      { key: 'month', label: 'Month' },
    ];
  }

  ngOnInit(): void {
    console.log(this.serviceID);
    this.getServiceData(this.serviceID);
    this.makeForm();
    this.fetchProductData();
  }
  getServiceData(id) {
    this.apiService.getService(id).subscribe((res) => {
      this.serviceData = res[0];
      console.log(this.serviceData);
    });
  }
  fetchProductData() {
    this.apiService
      .listProduct({ serviceID: this.serviceID })
      .subscribe((res) => {
        this.productData = res['data'];
        this.originData = res['data'];
        this.pageData = res['pageData'];
      });
  }
  makeForm(d?) {
    return (this.productForm = this.fb.group({
      id: [d?.id],
      name: [d?.name || '', Validators.required],
      price: [d?.price || '', Validators.required],
      serviceID: [d?.serviceID || this.serviceID],
      decscription: [d?.decscription || ''],
      imgUrl: [
        d?.imgUrl || 'https://placehold.co/250x200',
        Validators.required,
      ],
    }));
  }
  openProductModal(id?) {
    if (id) {
      this.apiService.getProduct(id).subscribe((res) => {
        this.makeForm(res[0]);
        this.isOpenProductModal = true;
        this.isEditting = true;
      });
      return;
    }
    this.makeForm();
    this.isOpenProductModal = true;
    this.isEditting = false;
    return;
  }
  closeProductModal() {
    this.isOpenProductModal = false;
  }
  submitProductForm() {
    if (this.productForm.valid) {
      let id = this.productForm.get('id').value;
      let productData = this.productForm.value;
      if (id) {
        this.apiService.updateProduct(productData).subscribe((_) => {
          this.isOpenProductModal = false;
          this.fetchProductData();
        });
        return;
      }
      this.apiService.createProduct(productData).subscribe((_) => {
        this.isOpenProductModal = false;
        this.fetchProductData();
      });
      return;
    }
  }
  onUploadImage(event) {
    let fileInput = event.target.files[0];
    if (fileInput) {
      let formdata = new FormData();
      formdata.set('file', fileInput);
      this.apiService.uploadIMG(formdata).subscribe((res) => {
        this.productForm.get('imgUrl').setValue(res);
      });
    }
  }
  onDeleteProduct(id) {
    this.apiService.deleteProduct(id).subscribe((_) => {
      this.fetchProductData();
    });
  }
  filterProductData(e) {
    if (e == '') {
      this.fetchProductData();
      return;
    }
    const filterData = this.originData.filter((item) => {
      return item.name.includes(e);
    });
    this.productData = filterData;
    return;
  }
}
