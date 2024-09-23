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
import { Subscription } from 'rxjs';
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
  selector: 'app-checked-qty-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './checked-qty-chart.component.html',
  styleUrl: './checked-qty-chart.component.scss'
})
export class CheckedQtyChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private reconnectSubscription: Subscription = new Subscription();
  private resetChartSubscription: Subscription = new Subscription();

  //ARRAY FOR STORING DATA
  public checkedQtyArray: number[] = [];

  //PERCENTAGE AND VALUES FOR SMALL CHARTS
  avgCheckedQty: number = 0;
  percentage: number = 0;
  target: number = 0;

  //PUBLIC PROPS
  @ViewChild('chart') chart!: ChartComponent;
  checkedQtyChart: Partial<ChartOptions>;

  chartDB: any;

  //GRAPH COLOR
  preset = ['#4680FF'];
  monthlyColor = ['#4680FF', '#8996a4'];
  incomeColors = ['#4680FF', '#E58A00', '#2CA87F', '#b5ccff'];

  constructor(
    private prodLineService: ProdLineService,
    private cdr: ChangeDetectorRef
  ) {
    this.checkedQtyChart = {
      chart: { type: 'bar', height: 50, sparkline: { enabled: true } },

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
      resetChart(this.checkedQtyArray, this.cdr);
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
    this.checkedQtyArray.push(data.CHECKED_QTY);
    if (this.checkedQtyArray.length > 12) {
      this.checkedQtyArray.shift();
      this.target = data.TARGET!;
    }
    this.checkedQtyChart.series = [{ data: this.checkedQtyArray }];
  }

  calculateAvg(): void {
    const sum = this.checkedQtyArray.reduce((acc, value) => acc + value, 0);
    this.avgCheckedQty = sum / this.checkedQtyArray.length;
    this.percentage = (this.avgCheckedQty / this.target) * 100;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.reconnectSubscription.unsubscribe();
    this.resetChartSubscription.unsubscribe();
  }
}
