import { Injectable } from '@angular/core';

import moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}
  timestampToDate(timestamp, format = 'DD/MM/YYYY') {
    let date = moment.unix(timestamp).format(format);
    return date;
  }
  dateToTimestamp(date) {
    return moment(date).format('x');
  }
}
