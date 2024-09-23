import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { ProdLineService } from 'src/app/services/prod-line/prod-line.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { OutputData } from 'src/app/entities/line-data.entity';
import { resetChart } from '../../utils/function';

@Component({
  selector: 'app-finished-product-tab',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './finished-product-tab.component.html',
  styleUrl: './finished-product-tab.component.scss'
})
export class FinishedProductTabComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private dataLineSubscription: Subscription = new Subscription();
  private reconnectSubscription: Subscription = new Subscription();
  private resetChartSubscription: Subscription = new Subscription();
  private intervalId: any;

  //ARRAY FOR OUTPUT AND KEY
  outputAndKey: OutputData[] = [];
  outputAndKeyLine: OutputData[] = [];

  constructor(
    private prodLineService: ProdLineService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToData();

    this.reconnectSubscription = this.prodLineService.reconnect$.subscribe(() => {});

    this.resetChartSubscription = this.prodLineService.resetChart$.subscribe(() => {
      resetChart(this.outputAndKey, this.cdr);
      resetChart(this.outputAndKeyLine, this.cdr);
    });

    this.intervalId = setInterval(() => {
      this.requestData();
    }, 120000);
  }

  subscribeToData() {
    this.requestData();
    this.dataSubscription.unsubscribe();
    this.dataSubscription = this.prodLineService.outputDataUpdates$.subscribe((data: OutputData[] | null) => {
      if (data) {
        this.outputAndKey = data;
        this.cdr.detectChanges();
      } else {
        console.error('Data not found');
      }
    });

    this.dataLineSubscription.unsubscribe();
    this.dataLineSubscription = this.prodLineService.outputLineDataUpdates$.subscribe((data: OutputData[] | null) => {
      if (data) {
        this.outputAndKeyLine = data;
        this.cdr.detectChanges();
      } else {
        console.error('Data not found');
      }
    });
  }

  requestData() {
    this.prodLineService.requestOutputAndKeyData();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.dataLineSubscription.unsubscribe();
    this.reconnectSubscription.unsubscribe();
    this.resetChartSubscription.unsubscribe();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
