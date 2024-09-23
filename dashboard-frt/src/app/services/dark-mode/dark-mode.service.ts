import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public darkModeSubject = new BehaviorSubject<boolean>(this.getInitialMode());
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.updateBodyClass(this.darkModeSubject.value);
  }

  toggleDarkMode() {
    const currentMode = this.darkModeSubject.value;
    const newMode = !currentMode;
    this.darkModeSubject.next(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    this.updateBodyClass(newMode);
    // console.log('Dark mode toggled:', newMode); // Debug
  }

  private getInitialMode(): boolean {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  }

  private updateBodyClass(isDarkMode: boolean) {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    console.log('Body class updated:', isDarkMode); // Debug
  }

  get currentMode(): boolean {
    return this.darkModeSubject.value;
  }
}
