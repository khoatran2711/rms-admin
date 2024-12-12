import { Component, OnInit } from '@angular/core';
import overviewData from '../../../assets/data/pages/demo-one/overviewData.json';
import items from '../../../assets/data/global/dropdown.json';
import chartOption from './chartData.json';
import chartGrowth from './chartGrowthOptions.json';
import { ApiService } from 'src/app/shared/services/api.service';
import moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartGrowthOptions;
  public chartOptions;
  public chartGrowthOptions2;
  public chartGrowthOptions3;
  sellingTab: string = 'today';
  sellingReportTab: string = 'days';
  selectedDate = [];
  selectedDateReport = [];
  today = moment().format('DD/MM/YYYY');
  isLoading = true;
  showContent = false;
  appItems = items.appItems;
  appOverviewData = overviewData;
  filteredOverviewData = [];
  filterSaleReport = {
    start: null,
    end: null,
    type: 'days',
  };
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    // Simulate loading time
    this.fetchOverviewData();
    this.fetchChartData();
    this.loadData();
    this.fetchGrowtChartData();
    this.generateSevenDay();
    console.log(this.generateListMonth());
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
  fetchChartData() {
    this.chartOptions = { ...chartOption };
  }
  fetchOverviewData() {
    this.apiService.getOverviewData().subscribe((data) => {
      if (data) {
        this.filteredOverviewData = data;
        return;
      }
      return;
    });
  }
  fetchGrowtChartData() {
    console.log(chartGrowth);
    this.chartGrowthOptions = chartGrowth.chartGrowth;
    this.chartGrowthOptions2 = chartGrowth.chartGrowth2;
    this.chartGrowthOptions3 = chartGrowth.chartGrowth3;
  }
  handleClick(tab: string, type): void {
    if (type === 'selling') {
      this.sellingTab = tab;
      return;
    }
    this.sellingReportTab = tab;
    return;
  }
  onReportDateChange(e) {
    console.log(e.length);
    if (e.length != 2) {
      return;
    }
    const today = moment(this.today).startOf('day').unix();
    const sevenDayAgo = moment(this.today)
      .subtract(7, 'days')
      .startOf('day')
      .unix();
    console.log(e);
    this.selectedDateReport = e;

    this.filterSaleReport.start = moment(e[0], 'DD/MM/YYYY')
      .startOf('day')
      .unix();
    this.filterSaleReport.end = moment(e[1], 'DD/MM/YYYY')
      .startOf('day')
      .unix();
    console.log(this.filterSaleReport);
    console.log(today);
    console.log(sevenDayAgo);
    if (
      this.filterSaleReport.start != sevenDayAgo ||
      this.filterSaleReport.end != today
    ) {
      this.filterSaleReport.type = 'days';
      return;
    }
    this.filterSaleReport.type = 'week';
    return;
    // this.fetchSaleReportData();
  }
  onGrowthDateChange(e) {}
  generateListDate(start, end) {
    console.log(start);
    console.log(end);
    let dateList = [];
    let startDate = moment(start * 1000);
    let endDate = moment(end * 1000);
    console.log(startDate);
    console.log(endDate);
    while (startDate <= endDate) {
      dateList.push(startDate.format('DD/MM/YYYY'));
      startDate.add(1, 'days');
    }
    return dateList;
  }
  generateListMonth() {
    const monthList = [];
    const start = moment().startOf('year');
    const end = moment().endOf('year');

    while (start.isSameOrBefore(end, 'month')) {
      monthList.push(start.format('MM/YYYY'));
      start.add(1, 'month');
    }

    return monthList;
  }
  generateSevenDay() {
    let result = [];
    const sevenDayAgo = moment(this.today)
      .subtract(7, 'days')
      .startOf('day')
      .unix();
    const today = moment(this.today).startOf('day').unix();
    result = this.generateListDate(sevenDayAgo, today);
    console.log(result);
    return result;
  }

  fetchSaleReportData() {
    const filter = this.filterSaleReport;
    this.apiService.getSaleReport(filter).subscribe((data) => {
      if (data) {
        console.log(data);
        return;
      }
      return;
    });
  }
}
