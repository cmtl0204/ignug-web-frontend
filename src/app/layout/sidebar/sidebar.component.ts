import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {MenuHttpService} from '@services/auth/menu-http.service';
import {AuthHttpService} from "@services/auth";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "@shared/enums";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  display = false;
  items: MenuItem[] = [];
  showedMenu: boolean = false;
  closed: boolean = true;
  closedLock: boolean | null = null;

  constructor(private menuHttpService: MenuHttpService, private authHttpService: AuthHttpService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.getMenus();
  }

  showSubMenu(id: number = 0) {
    this.showedMenu = !this.showedMenu;
    if (id > 0) {
      document.getElementById(id?.toString())!.className = this.showedMenu ? 'showMenu' : '';
    }
  }

  getMenus() {
    // this.menuHttpService.getMenusByRole().subscribe(
    //   response => {
    //     this.items = response.data;
    //   }, error => {
    //     console.log(error);
    //   }
    // )

    this.items = [
      {
        label: 'Categories',
        icon: PrimeIcons.LIST,
        items: [
          {
            label: 'Category1',
            icon: PrimeIcons.BOX,
            routerLink: ['/categories'],
          },
          {
            label: 'Category2',
            icon: PrimeIcons.ANGLE_DOUBLE_RIGHT,
            routerLink: ['/categories'],
          },
        ]
      },
      {
        label: 'Users',
        icon: PrimeIcons.USERS,
        routerLink: ['/administration/users'],
      },
    ]
  }

  // lockMenu() {
  //   if (this.closedLock === 'lock') {
  //     this.closedLock = 'lock'
  //   } else {
  //     this.closedLock = 'lock'
  //   }
  //
  // }

  showCloseMenu() {
    if (!this.closedLock) {
      this.closed = !this.closed;
    }
  }

  closeMenu() {
    if (!this.closedLock) {
      this.closed = true;
    }
  }

  logout() {
    this.authHttpService.logout().subscribe();
  }

  redirectProfile() {
    this.router.navigateByUrl(AuthRoutesEnum.PROFILE);
  }
}
