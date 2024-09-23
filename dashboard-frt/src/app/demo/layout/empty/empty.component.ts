// angular import
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();
  isDarkMode!: boolean;
  impageUrl: string = '';

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.updateTheme();
    });
  }

  updateTheme(): void {
    this.impageUrl = this.isDarkMode ? 'assets/images/Logo_SD_EstesoB_Nero.png' : 'assets/images/Logo_SD_EstesoAzzurro.png';
  }
}
