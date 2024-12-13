import { Component, OnInit } from '@angular/core';
import overviewData from '../../../assets/data/pages/demo-one/overviewData.json';
import items from '../../../assets/data/global/dropdown.json';
import chartOption from './chartData.json';
import chartGrowth from './chartGrowthOptions.json';
import { ApiService } from 'src/app/shared/services/api.service';
import moment, { months } from 'moment';
import { format } from 'date-fns';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartOptions;
  public chartGrowthOptions;

  sellingTab: string = 'week';
  sellingReportTab: string = 'week';
  selectedDate = [];
  selectedDateReport = [];
  today = moment().format('DD/MM/YYYY');
  isLoading = true;
  showContent = false;
  appItems = items.appItems;
  appOverviewData = overviewData;
  filteredOverviewData = [];
  orderData = [];
  filterSaleReport = {
    start: null,
    end: null,
    type: 'week',
  };
  statusObject = {
    Payment: {
      title: 'Payment',
      color: 'active',
    },
    Waitting: {
      title: 'Waitting',
      color: 'warning',
    },
    CheckOuted: {
      title: 'Check Outed',
      color: 'primary',
    },
    Canceled: {
      title: 'Canceled',
      color: 'danger',
    },
  };
  filterGrowthReport = {
    start: null,
    end: null,
    type: 'week',
  };
  filterOrderData = {
    page: 1,
    limit:5,
  }
  totalCountServiceOrder = 0;
  totalCountBookingOrder = 0;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.initDate('report');
    this.initDate('growth');
    // Simulate loading time
    this.fetchOverviewData();
    this.loadData();
    this.generateSevenDay();
    this.fetchOrderData()
  }
  initDate(type) {
    const today = moment().format('YYYY-MM-DD');
    const sevenDayAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
    if (type === 'report') {
      this.selectedDateReport = [sevenDayAgo, today];
      this.filterSaleReport.start = moment(sevenDayAgo).startOf('day').unix();
      this.filterSaleReport.end = moment(today).endOf('day').unix();
      this.filterSaleReport.type = 'week';
      this.fetchSaleReportData();
      return;
    }
    this.selectedDate = [sevenDayAgo, today];
    this.filterGrowthReport.start = moment(sevenDayAgo).startOf('day').unix();
    this.filterGrowthReport.end = moment(today).endOf('day').unix();
    this.filterGrowthReport.type = 'week';
    this.fetchGrowthReportData();
    return;
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
  makeSaleReportData(data?) {
    const { series, xaxis, ...rest } = chartOption;
    this.chartOptions = {
      ...rest,
      series: data?.series || series,
      xaxis: data?.xaxis || xaxis,
    };
  }
  makeGrowthData(data) {
    const { series, xaxis, ...rest } = chartGrowth.chartGrowth;
    this.chartGrowthOptions = {
      ...rest,
      series: data.series,
      xaxis: data.xaxis,
    };
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
  fetchOrderData() {
    this.apiService.listOrder(this.filterOrderData).subscribe((res) => {
      this.orderData = res.data;
      this.filterOrderData = { ...this.filterOrderData, ...res.pageData };
      console.log(this.filterOrderData);
    });
  }

  handleClick(tab: string, type): void {
    if (type === 'selling') {
      this.sellingTab = tab;
      if (tab === 'week') {
        this.initDate('growth');
      }
      if (tab === 'month') {
        this.filterGrowthReport.type = 'month';
        this.fetchGrowthReportData();
      }
      return;
    }

    this.filterSaleReport.type = tab;
    if (tab === 'week') {
      this.initDate('report');
    }
    if (tab === 'month') {
      this.filterSaleReport.type = 'month';
      this.fetchSaleReportData();
    }
    return;
  }
  onReportDateChange(e) {
    if (e.length != 2) {
      return;
    }
    const today = moment(this.today).startOf('day').unix();
    const sevenDayAgo = moment(this.today)
      .subtract(7, 'days')
      .startOf('day')
      .unix();
    this.selectedDateReport = e;
    this.filterSaleReport.start = moment(e[0], 'DD/MM/YYYY')
      .startOf('day')
      .unix();
    this.filterSaleReport.end = moment(e[1], 'DD/MM/YYYY').endOf('day').unix();
    if (
      this.filterSaleReport.start != sevenDayAgo ||
      this.filterSaleReport.end != today
    ) {
      this.filterSaleReport.type = 'days';
      this.fetchSaleReportData();
      return;
    }
    this.filterSaleReport.type = 'week';
    this.fetchSaleReportData();

    return;
  }
  onGrowthDateChange(e) {
    if (e.length != 2) {
      return;
    }
    this.selectedDate = e;
    this.filterGrowthReport.start = moment(e[0], 'DD/MM/YYYY')
      .startOf('day')
      .unix();
    this.filterGrowthReport.end = moment(e[1], 'DD/MM/YYYY')
      .endOf('day')
      .unix();
    if (this.filterGrowthReport.type === 'week') {
      this.fetchGrowthReportData();
      return;
    }
    this.fetchGrowthReportData();
    return;
  }
  generateListDate(start, end) {
    let dateList = [];
    let startDate = moment(start * 1000);
    let endDate = moment(end * 1000);
    while (startDate <= endDate) {
      dateList.push(startDate.format('DD-MM-YYYY'));
      startDate.add(1, 'days');
    }
    return dateList;
  }
  generateListMonth() {
    const monthList = [];
    const start = moment().startOf('year');
    const end = moment().endOf('year');

    while (start.isSameOrBefore(end, 'month')) {
      monthList.push(start.format('MM-YYYY'));
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
    return result;
  }

  fetchSaleReportData() {
    const filter = this.filterSaleReport;
    if (filter.type === 'month') {
      this.apiService.getSaleReport(filter).subscribe((data) => {
        if (data) {
          const listMonths = this.generateListMonth();
          const fullMonthData = this.insertEmptyData(data, listMonths);
          console.log('fullMonthData', fullMonthData);
          const { seriesData, dates } = this.transformData(
            fullMonthData,
            'report'
          );
          this.totalCountBookingOrder = seriesData[1]?.data.reduce(
            (a, b) => a + b,
            0
          );
          this.totalCountServiceOrder = seriesData[0]?.data.reduce(
            (a, b) => a + b,
            0
          );
          const formattedData = this.formatChartData(seriesData, listMonths);

          this.makeSaleReportData(formattedData);
          return;
        }
        return;
      });
      return;
    }
    this.apiService.getSaleReport(filter).subscribe((data) => {
      if (data) {
        const listDates = this.generateListDate(filter.start, filter.end);
        const fullDateData = this.insertEmptyData(data, listDates);
        const { seriesData, dates } = this.transformData(
          fullDateData,
          'report'
        );
        this.totalCountBookingOrder = seriesData[1]?.data.reduce(
          (a, b) => a + b,
          0
        );
        this.totalCountServiceOrder = seriesData[0]?.data.reduce(
          (a, b) => a + b,
          0
        );
        const formattedData = this.formatChartData(seriesData, listDates);
        this.makeSaleReportData(formattedData);
        return;
      }
      return;
    });
    return;
  }
  fetchGrowthReportData() {
    if (this.filterGrowthReport.type === 'month') {
      this.apiService
        .getSaleReport(this.filterGrowthReport)
        .subscribe((data) => {
          if (data) {
            const listMonths = this.generateListMonth();
            const fullMonthData = this.insertEmptyData(data, listMonths);
            console.log('fullMonthData', fullMonthData);
            const { seriesData, dates } = this.transformData(
              fullMonthData,
              'growth'
            );
            const formattedData = this.formatChartData(seriesData, listMonths);
            console.log('seriesData', formattedData);

            this.makeGrowthData(formattedData);
            return;
          }
          return;
        });
      return;
    }
    this.apiService.getSaleReport(this.filterGrowthReport).subscribe((data) => {
      if (data) {
        const listDates = this.generateListDate(
          this.filterGrowthReport.start,
          this.filterGrowthReport.end
        );
        const fullDateData = this.insertEmptyData(data, listDates);
        const { seriesData, dates } = this.transformData(
          fullDateData,
          'growth'
        );
        console.log('seriesData', seriesData);
        const formattedData = this.formatChartData(seriesData, listDates);
        console.log('formattedData', formattedData);
        this.makeGrowthData(formattedData);
        return;
      }
      return;
    });
  }
  insertEmptyData(data, listDates) {
    const result = [];
    listDates.forEach((date) => {
      const found = data.find((item) => item.date == date);
      if (found) {
        const foundedData = {
          date: found.date,
          bookings: [
            {
              type: 'service',
              orderCount: found.bookings[0]?.orderCount || 0,
              totalAmount: found.bookings[0]?.totalAmount || 0,
            },
            {
              type: 'booking',
              orderCount: found.bookings[1]?.orderCount || 0,
              totalAmount: found.bookings[1]?.totalAmount || 0,
            },
          ],
        };
        result.push(foundedData);
        return;
      }
      result.push({
        date: date,
        bookings: [
          { type: 'service', orderCount: 0, totalAmount: 0 },
          { type: 'booking', orderCount: 0, totalAmount: 0 },
        ],
      });
    });
    return result;
  }
  formatChartData(seriesData, categoryData) {
    const result = {
      series: [
        {
          name: seriesData[0].name,
          data: seriesData[0].data,
          color: '#7811FF',
        },
        {
          name: seriesData[1].name,
          data: seriesData[1].data,
          color: '#00AAFF',
        },
      ],
      xaxis: {
        crosshairs: {
          show: false,
        },
        labels: {
          style: {
            colors: [
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
              '#747474',
            ],
            fontSize: '14px',
            fontFamily: '"Jost", sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
        },
        categories: categoryData,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        convertedCatToNumeric: true,
      },
    };
    return result;
  }
  transformData = (data, type) => {
    const dates = data.map((item) => item.date);
    const groupedData = {};
    data.forEach((item) => {
      item.bookings.forEach((booking) => {
        if (type === 'report') {
          if (!groupedData[booking.type]) {
            groupedData[booking.type] = { name: booking.type, data: [] };
          }
          groupedData[booking.type].data.push(booking.orderCount);
        }
        if (type === 'growth') {
          if (!groupedData[booking.type]) {
            groupedData[booking.type] = { name: booking.type, data: [] };
          }
          groupedData[booking.type].data.push(booking.totalAmount);
        }
      });
    });
    const seriesData = Object.values(groupedData) as any;
    console.log(seriesData);
    return { seriesData, dates };
  };

}
