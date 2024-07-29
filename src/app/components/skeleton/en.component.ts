import { Component, QueryList, ViewChildren } from '@angular/core';
import { NzCodeBoxComponent } from '../../shared/components/codebox.component';

@Component({
  selector     : 'nz-demo-skeleton',
  preserveWhitespaces: false,
  templateUrl  : './en.html'
})
export class NzDemoSkeletonEnComponent {
  expanded = false;
  @ViewChildren(NzCodeBoxComponent) codeBoxes: QueryList<NzCodeBoxComponent>;

  goLink(link: string): void {
    if (window) {
      window.location.hash = link;
    }
  }

  expandAllCode(): void {
    this.expanded = !this.expanded;
    this.codeBoxes.forEach(code => {
      code.nzExpanded = this.expanded;
      code.expandCode(this.expanded);
      code.check();
    });
  }

}