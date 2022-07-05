import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuHttpService} from '@services/auth/menu-http.service';

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

  constructor(private menuHttpService: MenuHttpService) {

  }

  ngOnInit(): void {
    this.getMenus();
  }

  test() {
    this.closed = !this.closed;
  }

  showSubMenu(id: number = 0) {
    this.showedMenu = !this.showedMenu;
    if (id != null) {
      document.getElementById(id?.toString())!.className = this.showedMenu ? 'showMenu' : '';
    }

  }

  closeSide() {
    this.closed = !this.closed;
  }

  getMenus() {
    // this.menuHttpService.getMenusByRole().subscribe(
    //   response => {
    //     this.items = response.data;
    //   }, error => {
    //     console.log(error);
    //   }
    // )
  }

}
