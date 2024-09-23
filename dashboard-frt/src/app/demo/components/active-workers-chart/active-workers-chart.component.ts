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
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

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
  selector: 'app-active-workers-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './active-workers-chart.component.html',
  styleUrl: './active-workers-chart.component.scss'
})
export class ActiveWorkersChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private reconnectSubscription: Subscription = new Subscription();
  private resetChartSubscription: Subscription = new Subscription();

  //ARRAYS FOR STORING  DATA
  public activeCadreArray: number[] = [];

  //PERCENTAGE AND VALUES FOR SMALL CHARTS
  avgActiveMachines: number = 0;
  avgActiveCadre: number = 0;
  percentageCadre: number = 0;

  @ViewChild('chart') chart!: ChartComponent;
  activeCadreChart: Partial<ChartOptions>;

  chartDB: any;

  // graph color change with theme color mode change
  preset = ['#4680FF'];
  monthlyColor = ['#4680FF', '#8996a4'];
  incomeColors = ['#4680FF', '#E58A00', '#2CA87F', '#b5ccff'];

  constructor(
    private prodLineService: ProdLineService,
    private cdr: ChangeDetectorRef,
    private darkModeService: DarkModeService
  ) {
    this.activeCadreChart = this.getChartOptions(this.darkModeService.currentMode);
  }

  getChartOptions(isDarkMode: boolean): Partial<ChartOptions> {
    return {
      chart: {
        type: 'bar',
        height: 50,
        sparkline: { enabled: true }
      },
      colors: ['#2CA87F'],
      plotOptions: {
        bar: { columnWidth: '80%' }
      },
      series: [
        {
          data: this.activeCadreArray
        }
      ],
      xaxis: { crosshairs: { width: 1 } },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light',
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
      resetChart(this.activeCadreArray, this.cdr);
    });

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.updateChartTheme(isDarkMode);
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
    this.activeCadreArray.push(data.ACTIVE_CADRE!);
    if (this.activeCadreArray.length > 12) {
      this.activeCadreArray.shift();
      this.avgActiveCadre = data.ACTIVE_CADRE!;
      this.avgActiveMachines = data.TOTAL_MACHINES!;
    }
    this.activeCadreChart.series = [{ data: this.activeCadreArray }];
  }
  updateChartTheme(isDarkMode: boolean) {
    const newOptions = this.getChartOptions(isDarkMode);
    this.chart.updateOptions(newOptions, false, true);
    this.cdr.detectChanges();
  }

  calculateAvg(): void {
    const sum = this.activeCadreArray.reduce((acc, value) => acc + value, 0);
    this.avgActiveCadre = sum / this.activeCadreArray.length;
    this.percentageCadre = (this.avgActiveCadre / this.avgActiveMachines) * 100;
    console.log(this.avgActiveCadre, this.avgActiveMachines, this.percentageCadre);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.reconnectSubscription.unsubscribe();
    this.resetChartSubscription.unsubscribe();
  }
}
