// angular import
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DarkModeService } from './services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public props
  isSpinnerVisible = true;
  isDarkMode!: boolean;

  // constructor
  constructor(
    private router: Router,
    private darkModeService: DarkModeService
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
      console.log('Dark mode changed:', mode); //Debug
    });
  }

  toggleTheme() {
    console.log('Toggling theme'); // Debug
    this.darkModeService.toggleDarkMode();
  }
}
