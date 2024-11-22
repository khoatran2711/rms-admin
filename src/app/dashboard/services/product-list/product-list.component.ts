import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import tableData from '../../../../assets/data/pages/table-data.json';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  serviceID;
  seller: any;
  tabData: { key: string; label: string }[];
  productForm: FormGroup;
  isOpenProductModal: boolean = false;
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
    this.makeForm();
    this.fetchProductData();
  }
  fetchProductData() {
    this.apiService
      .listProduct({ serviceID: this.serviceID })
      .subscribe((res) => {
        console.log(res);
      });
  }
  makeForm(d?) {
    return (this.productForm = this.fb.group({
      name: [d?.name || ''],
      price: [d?.price || ''],
      serviceID: [d?.serviceID || this.serviceID],
      description: [d?.description || ''],
      imgUrl: [d?.imgUrl || ''],
    }));
  }
  openProductModal(id?) {
    if (id) {
      this.apiService.getProduct(id).subscribe((res) => {
        this.makeForm(res);
        this.isOpenProductModal = true;
      });
      return;
    }
    this.makeForm();
    this.isOpenProductModal = true;
    return;
  }
  closeProductModal() {
    this.isOpenProductModal = false;
  }
}
