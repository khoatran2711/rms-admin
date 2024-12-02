import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ApiService } from 'src/app/shared/services/api.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-booking-service',
  templateUrl: './booking-service.component.html',
  styleUrls: ['./booking-service.component.scss'],
})
export class BookingServiceComponent implements OnInit {
  host = 'http://localhost:8080';
  date = null;
  submited = false;
  productData = [];
  serviceData = [];
  serviceSelected;
  productSelected;
  isVisible = false;
  productAddForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchServiceData();
    this.fetchProductData();
  }
  showModal(id) {
    console.log('id', id);
    this.apiService.getProduct(id).subscribe((res: any) => {
      console.log('res', res);
      this.productSelected = res[0];
      const data = {
        product: this.productSelected,
        quantity: 1,
        usageDate: null,
      };
      this.makeProductForm(data);
      this.isVisible = true;
    });
  }
  fetchServiceData() {
    this.apiService.listService({}).subscribe((res: any) => {
      console.log('res', res);
      this.serviceData = res;
    });
  }
  fetchProductData() {
    this.apiService.listProduct({}).subscribe((res: any) => {
      console.log('res', res);
      this.productData = res.data;
    });
  }
  filterByOption(e) {
    console.log('e', e);
    this.apiService.listProduct({ serviceID: e }).subscribe((res: any) => {
      this.productData = res.data;
    });
  }
  handleCancel() {
    this.isVisible = false;
  }
  makeProductForm(d?) {
    this.productAddForm = this.fb.group({
      product: [d?.product, [Validators.required]],
      quantity: [d?.quantity, [Validators.required]],
      usageDate: [d?.usageDate, [Validators.required]],
    });
  }
  onChangeProduct(e) {
    console.log('productSelected', this.productSelected);
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1?.id === o2?.id;
  }
  dateChange(e) {
    this.productAddForm.patchValue({
      usageDate: moment(e).unix(),
    });
    console.log(this.productAddForm.value);
  }
  submitAddProductForm() {
    let cartdata = this.orderService.getProductInfo() || [];
    let productAddData = this.productAddForm.value;
    console.log('productAddData', productAddData);
    productAddData['totalPrice'] =
      Number(productAddData.product.price) * Number(productAddData.quantity);

    this.submited = true;

    let check = cartdata.find(
      (item) => item.product.id == productAddData.product.id
    );
    if (check) {
      check.quantity = Number(check.quantity) + Number(productAddData.quantity);
      check.totalPrice =
        Number(check.totalPrice) * Number(productAddData.totalPrice);
    } else {
      cartdata.push(productAddData);
    }
    this.orderService.saveProductInfo(cartdata);
    this.resetForm();

    this.handleCancel();
  }
  resetForm() {
    this.productAddForm.reset();
    this.date = null;
  }
  previous(){
    this.router.navigate(['/dashboard/booking/select-room']);
  }
}
