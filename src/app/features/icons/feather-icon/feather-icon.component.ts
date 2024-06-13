import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  templateUrl: './feather-icon.component.html',
})

export class FeatherIconComponent implements OnInit {
  isLoading = true;
  showContent = false;
  iconNames: string[];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    // Simulate loading time
    this.loadData();
    this.loadIconNames();
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
  loadIconNames() {
    this.http.get<any>('https://hexadash-angular.vercel.app/assets/data/icons/feather.json').subscribe(data => {
      this.iconNames = data;
      // this.iconNames.forEach((item) => {
      //   this.http
      //     .get(
      //       'https://hexadash-angular.vercel.app/assets/images/svg/feather/' +
      //         item +
      //         '.svg'
      //     )
      //     .subscribe({
      //       next: (res) => res,
      //       error: (err) => {
      //         const svgData = {
      //           svgTag: err.error.text,
      //           svgName: item
      //         }
      //         this.http.post("http://localhost:8080/api/v1/common/svgSave",svgData).subscribe(_=>_)
      //       },
      //     });
      // });
    });
  }

}
