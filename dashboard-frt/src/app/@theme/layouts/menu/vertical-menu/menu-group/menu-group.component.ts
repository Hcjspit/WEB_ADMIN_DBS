// Angular import
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// project import
import { NavigationItem } from 'src/app/@theme/types/navigation';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-group-vertical',
  templateUrl: './menu-group.component.html',
  styleUrls: ['./menu-group.component.scss']
})
export class MenuGroupVerticalComponent implements OnInit, OnDestroy {
  // public props
  private darkModeSubscription: Subscription = new Subscription();
  public isDarkMode!: boolean;

  // All Version in Group Name
  @Input() item!: NavigationItem;

  // Constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private darkModeService: DarkModeService
  ) {}

  // Life cycle events
  ngOnInit() {
    // at reload time active and trigger link
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
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
      this.updateMenuGroupColors(isDarkMode);
    });

    this.isDarkMode = this.darkModeService.currentMode;
    this.updateMenuGroupColors(this.isDarkMode);
  }

  updateMenuGroupColors(isDarkMode: boolean): void {
    const textColor = this.getTextColor(isDarkMode);

    document.documentElement.style.setProperty('--text-color', textColor);
  }

  getTextColor(isDarkMode: boolean): string {
    return isDarkMode ? '#fff' : '#000';
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }
}
