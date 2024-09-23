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
  selector: 'app-efficiency-perc-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './efficiency-perc-chart.component.html',
  styleUrl: './efficiency-perc-chart.component.scss'
})
export class EfficiencyPercChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private reconnectSubscription: Subscription = new Subscription();
  private resetChartSubscription: Subscription = new Subscription();

  //ARRAYS FOR STORING  DATA
  public efficiencyPercArray: { x: string; y: number }[] = [];

  //public props
  @ViewChild('chart') chart!: ChartComponent;
  efficiencyPercChart: Partial<ChartOptions>;

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
    this.efficiencyPercChart = {
      chart: {
        background: this.getBackgroundColor(this.darkModeService.currentMode),
        type: 'area',
        height: 370,
        toolbar: {
          show: true
        }
      },
      colors: ['#4680FF'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'vertical',
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: 1
      },
      grid: {
        strokeDashArray: 4
      },
      series: [
        {
          name: 'Efficiency-Perc',
          data: []
        }
      ],
      xaxis: {
        type: 'datetime',

        axisBorder: {
          show: false
        },

        labels: {
          format: 'HH:mm',
          style: {
            colors: this.getLabelColor(this.darkModeService.currentMode)
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: this.getLabelColor(this.darkModeService.currentMode)
          }
        }
      },
      tooltip: {
        enabled: true
      }
    };
  }

  ngOnInit(): void {
    this.subscribeToData();
    this.reconnectSubscription = this.prodLineService.reconnect$.subscribe(() => {});

    this.resetChartSubscription = this.prodLineService.resetChart$.subscribe(() => {
      resetChart(this.efficiencyPercArray, this.cdr);
    });

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.updateChartTheme(isDarkMode);
    });
  }

  subscribeToData() {
    this.dataSubscription.unsubscribe();
    this.dataSubscription = this.prodLineService.lineDataUpdates$.subscribe(
      (update: { data: BigScreenData; realTime: string } | null) => {
        if (update) {
          this.efficiencyPercArray.push({ x: update.realTime, y: update.data.EFFICIENCY_PERC! });
          this.efficiencyPercChart.series = [{ data: this.efficiencyPercArray }];
          if (this.efficiencyPercArray.length > 12) {
            this.efficiencyPercArray.shift();
          }
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.error('Error receiving data', error);
      }
    );
  }

  updateChartTheme(isDarkMode: boolean): void {
    const backgroundColor = this.getBackgroundColor(isDarkMode);
    const labelColor = this.getLabelColor(isDarkMode);
    // Clona le opzioni attuali e aggiorna il background
    this.efficiencyPercChart = {
      ...this.efficiencyPercChart,
      chart: {
        ...this.efficiencyPercChart.chart!,
        background: backgroundColor
      },
      xaxis: {
        ...this.efficiencyPercChart.xaxis,
        labels: {
          ...this.efficiencyPercChart.xaxis!.labels,
          style: {
            colors: labelColor
          }
        }
      },
      yaxis: {
        ...this.efficiencyPercChart.yaxis,
        labels: {
          ...this.efficiencyPercChart.yaxis!.labels,
          style: {
            colors: labelColor
          }
        }
      }
    };
    this.cdr.detectChanges();
  }

  getBackgroundColor(isDarkMode: boolean): string {
    return isDarkMode ? '#333' : '#fff';
  }

  getLabelColor(isDarkMode: boolean): string {
    return isDarkMode ? '#ffffff' : '#000000';
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.reconnectSubscription.unsubscribe();
    this.resetChartSubscription.unsubscribe();
  }
}
