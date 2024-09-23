import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Subscription } from 'rxjs';
import { ProdLineService } from 'src/app/services/prod-line/prod-line.service';
import { ChangeDetectorRef } from '@angular/core';
import { DefectData } from 'src/app/entities/line-data.entity';
import { resetChart } from '../../utils/function';

@Component({
  selector: 'app-top-defects-tab',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './top-defects-tab.component.html',
  styleUrl: './top-defects-tab.component.scss'
})
export class TopDefectsTabComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private reconnectSubscription: Subscription = new Subscription();
  private resetChartSubscription: Subscription = new Subscription();

  //ARRAY FOR TOP DEFECTS
  defects: DefectData[] = [];

  //ARRAY FOR EMPTY DATA
  placeholders: number[] = [];

  constructor(
    private prodLineService: ProdLineService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToData();

    this.reconnectSubscription = this.prodLineService.reconnect$.subscribe(() => {});

    this.resetChartSubscription = this.prodLineService.resetChart$.subscribe(() => {
      resetChart(this.defects, this.cdr);
    });
  }

  subscribeToData() {
    this.dataSubscription.unsubscribe();
    this.dataSubscription = this.prodLineService.defectDataUpdates$.subscribe((data: DefectData[] | null) => {
      if (data) {
        this.defects = data;
        this.calculatePlaceholders();
        this.cdr.detectChanges();
      } else {
        console.error('Data not found');
      }
    });
  }

  calculatePlaceholders(): void {
    const placeholderCount = 3 - this.defects.length;
    this.placeholders = Array(placeholderCount).fill(0);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.reconnectSubscription.unsubscribe();
    this.resetChartSubscription.unsubscribe();
  }
}
