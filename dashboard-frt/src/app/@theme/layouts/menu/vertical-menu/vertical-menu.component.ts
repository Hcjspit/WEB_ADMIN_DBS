// Angular import
import { Component, Input, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// project import
import { NavigationItem } from 'src/app/@theme/types/navigation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss']
})
export class VerticalMenuComponent implements OnInit {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();
  isDarkMode!: boolean;
  imageUrl: string = '';
  // public props
  @Input() menus!: NavigationItem[];

  // Constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private authService: AuthService,
    private router: Router,
    private darkModeService: DarkModeService
  ) {}

  // public method
  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.updateTheme();
    });
  }

  updateTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    this.imageUrl = this.isDarkMode ? 'assets/images/Logo_SD_EstesoB_Nero.png' : 'assets/images/Logo_SD_EstesoAzzurro.png';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  accountList = [
    {
      icon: 'ti ti-user',
      title: 'My Account'
    },
    {
      icon: 'ti ti-settings',
      title: 'Settings'
    },
    {
      icon: 'ti ti-lock',
      title: 'Lock Screen'
    },
    {
      icon: 'ti ti-power',
      title: 'Logout'
    }
  ];
}
