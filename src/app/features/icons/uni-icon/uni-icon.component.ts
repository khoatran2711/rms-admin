import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  templateUrl: './uni-icon.component.html',
})

export class UniIconComponent implements OnInit {
  isLoading = true;
  showContent = false;
  icons: any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    // Simulate loading time
    this.loadData();
    this.loadIcons();
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
  loadIcons() {
    this.http.get<any>('assets/data/icons/uni.json').subscribe(data => {
      this.icons = data;
      // this.icons.forEach((item) => {
      //   this.http
      //     .get(
      //       'assets/images/svg/unicons-line/' +
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
