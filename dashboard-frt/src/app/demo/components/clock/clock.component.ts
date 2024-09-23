import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from 'src/app/@theme/components/card/card.component';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit, OnDestroy {
  time: Date = new Date();
  private timerId: any;

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
