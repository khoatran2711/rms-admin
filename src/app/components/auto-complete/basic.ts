import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-auto-complete-basic',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="inline-flex">
      <input class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[5px] min-h-[37px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60 capitalize" placeholder="input here" nz-input [(ngModel)]="inputValue" (input)="onInput($event.target)" [nzAutocomplete]="auto" />
      <nz-autocomplete [nzDataSource]="options" nzBackfill #auto></nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteBasicComponent {
  inputValue: string;
  options: string[] = [];

  onInput(e: any): void {
    let value = e.value
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
