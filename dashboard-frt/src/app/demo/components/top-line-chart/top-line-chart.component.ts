// angular import
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
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
  selector: 'app-top-line-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './top-line-chart.component.html',
  styleUrl: './top-line-chart.component.scss'
})
export class TopLineChartComponent {
  private dataSubscription: Subscription = new Subscription();
  private reconnectSubscription: Subscription = new Subscription();
  private resetChartSubscription: Subscription = new Subscription();
  private darkModeSubscription: Subscription = new Subscription();
  private intervalId: any;

  //ARRAY FOR TOP LINE DATA
  topLines: TopLineData[] = [];

  @ViewChild('chart') chart!: ChartComponent;
  topLineDataChart: Partial<ChartOptions>;

  chartDB: any;

  preset = ['#4680FF'];
  monthlyColor = ['#4680FF', '#8996a4'];
  incomeColors = ['#4680FF', '#E58A00', '#2CA87F', '#b5ccff'];

  public isDarkMode!: boolean;

  constructor(
    private prodLineService: ProdLineService,
    private cdr: ChangeDetectorRef,
    private darkModeService: DarkModeService
  ) {
    this.topLineDataChart = {
      chart: {
        height: 440,
        type: 'donut'
      },
      series: [],
      legend: {
        show: true,
        position: 'bottom',
        labels: {
          colors: this.getLabelColor(this.darkModeService.currentMode)
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true
              },
              value: {
                show: true,
                color: this.getLabelColor(this.darkModeService.currentMode)
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.subscribeToData();
    this.reconnectSubscription = this.prodLineService.reconnect$.subscribe(() => {});

    this.resetChartSubscription = this.prodLineService.resetChart$.subscribe(() => {
      resetChart(this.topLines, this.cdr);
    });

    this.intervalId = setInterval(() => {
      this.requestData();
    }, 120000);

    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
      this.updateChartLegend(isDarkMode);
    });
  }

  subscribeToData() {
    this.requestData();
    this.dataSubscription.unsubscribe();
    this.dataSubscription = this.prodLineService.topLineDataUpdates$.subscribe((data) => {
      if (data) {
        this.topLineDataChart.series = data.series;
        this.topLineDataChart.labels = data.labels;
        this.cdr.detectChanges();
      } else {
        console.error('Data not found');
      }
    });
  }

  getLabelColor(isDarkMode: boolean): string {
    return isDarkMode ? '#ffffff' : '#000000';
  }

  updateChartLegend(isDarkMode: boolean): void {
    const labelColor = this.getLabelColor(isDarkMode);

    this.topLineDataChart.legend = {
      ...this.topLineDataChart.legend,
      labels: {
        colors: labelColor
      }
    };

    this.topLineDataChart.plotOptions = {
      ...this.topLineDataChart.plotOptions,
      pie: {
        ...this.topLineDataChart.plotOptions?.pie,
        donut: {
          ...this.topLineDataChart.plotOptions?.pie?.donut,
          labels: {
            ...this.topLineDataChart.plotOptions?.pie?.donut?.labels,
            value: {
              ...this.topLineDataChart.plotOptions?.pie?.donut?.labels?.value,
              color: labelColor
            }
          }
        }
      }
    };
    this.cdr.detectChanges();
  }

  requestData() {
    this.prodLineService.requestTop4LinesData();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.reconnectSubscription.unsubscribe();
    this.resetChartSubscription.unsubscribe();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
