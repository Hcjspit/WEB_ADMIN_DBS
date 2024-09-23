import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexLegend,
  ApexResponsive
} from 'ng-apexcharts';
import { Subscription, UnsubscriptionError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProdLineService } from 'src/app/services/prod-line/prod-line.service';
import { BigScreenData, DefectData, OutputData, TopLineData } from 'src/app/entities/line-data.entity';
import { ClockComponent } from '../../components/clock/clock.component';
import { ChangeDetectorRef } from '@angular/core';
import { resetChart } from '../../utils/function';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart | undefined;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  colors: string[];
  stroke: ApexStroke;
  grid: ApexGrid;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-avg-tracking-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './avg-tracking-chart.component.html',
  styleUrl: './avg-tracking-chart.component.scss'
})
export class AvgTrackingChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private reconnectSubscription: Subscription = new Subscription();
  private resetChartSubscription: Subscription = new Subscription();

  //ARRAYS FOR STORING  DATA
  public avgTimeProcessingArray: number[] = [];

  //PERCENTAGE AND VALUES FOR SMALL CHARTS
  avgCheckedQty: number = 0;
  percentage: number = 0;
  target: number = 0;

  @ViewChild('chart') chart!: ChartComponent;
  avgTimeProcessingChart: Partial<ChartOptions>;

  chartDB: any;

  // graph color change with theme color mode change
  preset = ['#4680FF'];
  monthlyColor = ['#4680FF', '#8996a4'];
  incomeColors = ['#4680FF', '#E58A00', '#2CA87F', '#b5ccff'];

  constructor(
    private prodLineService: ProdLineService,
    private cdr: ChangeDetectorRef
  ) {
    this.avgTimeProcessingChart = {
      chart: { type: 'bar', height: 50, sparkline: { enabled: true } },
      colors: ['#E58A00'],
      plotOptions: { bar: { columnWidth: '80%' } },
      series: [
        {
          data: []
        }
      ],
      xaxis: { crosshairs: { width: 1 } },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return '';
            }
          }
        },
        marker: { show: false }
      }
    };
  }

  ngOnInit(): void {
    this.subscribeToData();

    this.reconnectSubscription = this.prodLineService.reconnect$.subscribe(() => {});

    this.resetChartSubscription = this.prodLineService.resetChart$.subscribe(() => {
      resetChart(this.avgTimeProcessingArray, this.cdr);
    });
  }

  subscribeToData() {
    this.dataSubscription.unsubscribe();
    this.dataSubscription = this.prodLineService.lineDataUpdates$.subscribe((update: { data: BigScreenData; realTime: string } | null) => {
      if (update) {
        this.updateChart(update.data);
        this.calculateAvg();
      }
    });
  }

  updateChart(data: BigScreenData): void {
    this.avgTimeProcessingArray.push(data.AVG_TRACKING!);
    if (this.avgTimeProcessingArray.length > 12) {
      this.avgTimeProcessingArray.shift();
      this.target = data.TARGET!;
    }
    this.avgTimeProcessingChart.series = [{ data: this.avgTimeProcessingArray }];
  }

  calculateAvg(): void {
    const sum = this.avgTimeProcessingArray.reduce((acc, value) => acc + value, 0);
    this.avgCheckedQty = sum / this.avgTimeProcessingArray.length;
    this.percentage = (this.avgCheckedQty / this.target) * 100;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.reconnectSubscription.unsubscribe();
    this.resetChartSubscription.unsubscribe();
  }
}
