import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router, private authService: AuthService ) { }
  isLoggedIn(): boolean {
    // console.log(this.authService.isLoggedIn);
    return this.authService.isLoggedIn();
  }
  isAdmin(): boolean {
    // console.log(this.authService.isLoggedIn);
    return this.authService.getIsAdmin();
  }

  logout(): void {
    const submenu = document.querySelector('#submenu');
    submenu?.classList.remove('sidebar-activo');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isClosed: boolean = true;
  openSidebar() {
    const submenu = document.querySelector('#submenu');
    const changeIcon = document.querySelector('#changeIcon');
    if (this.isClosed === true) {
      changeIcon?.classList.remove('bi', 'bi-list');
      changeIcon?.classList.add('bi', 'bi-x-lg');
      submenu?.classList.add('sidebar-activo');
      this.isClosed = false;
      // Si esta abierto el menu, saco el icono de la cruz y cierro el menu
    } else {
      changeIcon?.classList.remove('bi', 'bi-x-lg');
      changeIcon?.classList.add('bi', 'bi-list');
      submenu?.classList.remove('sidebar-activo');
      this.isClosed = true;
    }
  }
  closeSidebar() {
    const changeIcon = document.querySelector('#changeIcon');
    const submenu = document.querySelector('#submenu');
    changeIcon?.classList.remove('bi', 'bi-x-lg');
    changeIcon?.classList.add('bi', 'bi-list');
    submenu?.classList.remove('sidebar-activo');
    this.isClosed = true;
  }
  changeFontSize(px: any) {
    document.documentElement.style.fontSize = px + 'px';
    console.log(document.documentElement.style, px);
  }

  handleEnterKey(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      const targetElement = event.target as HTMLElement;
      if (targetElement.tagName === 'A' && targetElement.classList.contains('nav-link')) {
        const linkText = targetElement.textContent?.trim();
        console.log(`Se presionó Enter en el enlace: ${linkText}`);
      }
    }
  }
}
