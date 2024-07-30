import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './ant-icons.component.html',
})
export class AntIconComponent implements OnInit {
  isLoading = true;
  showContent = false;
  faIcons: string[] = [];
  antdIcons: string[] = [];

  constructor(private http: HttpClient) {}
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
    this.http
      .get<any>(
        'assets/data/icons/ant.json'
      )
      .subscribe((data) => {
        this.antdIcons = data.antdIcons;
        const headers = new HttpHeaders();
        headers.set('Accept', 'image/svg+xml');

        // this.antdIcons.forEach((item) => {
        //   this.http
        //     .get(
        //       'assets/outline/' +
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
