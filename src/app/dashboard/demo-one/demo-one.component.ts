import { Component } from '@angular/core';
import overviewData from '../../../assets/data/pages/demo-one/overviewData.json';
import items from '../../../assets/data/global/dropdown.json';
import chartOption from './chartData.json'
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexStates,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  states: ApexStates;
};
@Component({
  templateUrl: './demo-one.component.html',
})
export class DemoOneDashboardComponent {
  public chartOptions;

  isLoading = true;
  showContent = false;
  appItems = items.appItems;
  appOverviewData = overviewData;
  filteredOverviewData;
  ngOnInit() {
    // Simulate loading time
    this.fetchOverviewData();
    this.fetchChartData();
    this.loadData();
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
  fetchChartData() {
    this.chartOptions = {...chartOption}
  }
  fetchOverviewData() {
    let filteredOverviewData;
    console.log(this.appOverviewData);
    if (this.appOverviewData != null) {
      filteredOverviewData = this.appOverviewData.filter(
        (item) => (item.id as any) >= 1 && (item.id as any) <= 4
      );
      this.filteredOverviewData = filteredOverviewData;
      return;
    }
    return;
  }

}
