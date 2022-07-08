import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from 'primeng/api';
import {AuthService, AuthHttpService, MenuHttpService} from '@services/auth';
import {MessageService} from "@services/core";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {
  display = false;
  items: MenuItem[] = [];
  showNav: boolean = true;

  constructor(private menuHttpService: MenuHttpService,
              private authHttpService: AuthHttpService, private messageService: MessageService,
              private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: this.authService.auth.name,
        icon: 'pi pi-fw pi-user',
        items: [
          {label: this.authService.auth.name},
          {label: this.authService.role?.name},
          {
            label: 'Mi Perfil',
            icon: 'pi pi-fw pi-users',
            // routerLink:['/footer']
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-fw pi-sign-out',
            routerLink: ['javascript:void(0)'],
            command: () => this.logout()
          }
        ]
      }
    ];
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

  logout() {
    this.authHttpService.logout().subscribe(response => {
      this.router.navigate(['/authentication/login'])
    });
  }
}
