import { Component } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  public menuItems: any[];
  isFolded: boolean;
  isSideNavDark: boolean;
  isExpand: boolean;
  currentUser;
  permission;
  constructor(
    private themeService: ThemeConstantService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchUser();

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.themeService.isMenuFoldedChanges.subscribe(
      (isFolded) => (this.isFolded = isFolded)
    );
    this.themeService.isExpandChanges.subscribe(
      (isExpand) => (this.isExpand = isExpand)
    );
    this.themeService.isSideNavDarkChanges.subscribe(
      (isDark) => (this.isSideNavDark = isDark)
    );
  }

  ngAfterViewInit(): void {
    /* Collapsed Menu dropdown */
    let submenus = document.querySelectorAll('.ant-menu li.ant-menu-submenu');
    let direction = document.querySelector('html').getAttribute('dir');
    submenus.forEach((item) => {
      item.addEventListener('mouseover', function () {
        let menuItem = this;
        let menuItemRect = menuItem.getBoundingClientRect();
        let submenuWrapper = menuItem.querySelector(
          '.side-nav ul.ant-menu-sub'
        );
        if (submenuWrapper) {
          submenuWrapper.style.top = `${menuItemRect.top}px`;
          if (direction === 'ltr') {
            submenuWrapper.style.left = `${
              menuItemRect.left + Math.round(menuItem.offsetWidth * 0.75) + 10
            }px`;
          } else if (direction === 'rtl') {
            submenuWrapper.style.right = `${
              Math.round(menuItem.offsetWidth * 0.75) + 10
            }px`;
          }
        }
      });
    });
  }

  closeMobileMenu(): void {
    if (window.innerWidth < 992) {
      this.isFolded = false;
      this.isExpand = !this.isExpand;
      this.themeService.toggleExpand(this.isExpand);
      this.themeService.toggleFold(this.isFolded);
    }
  }
  fetchUser() {
    this.apiService.getInfomation().subscribe((res) => {
      this.currentUser = res[0];
      this.fetchPerission();
    });
  }
  fetchPerission() {
    this.apiService
      .getPermission({ id: this.currentUser.roleID })
      .subscribe((res) => {
        this.permission = res;

        let result = []
        this.permission.forEach((item) => {
          const found = ROUTES.find((route) => route.id == (item))
          if(found) {
            result.push(found)
          }
        })
        this.menuItems = result
      });
  }
}
