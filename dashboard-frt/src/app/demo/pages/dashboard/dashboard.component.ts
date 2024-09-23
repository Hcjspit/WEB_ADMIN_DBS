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
import { CheckedQtyChartComponent } from '../../components/checked-qty-chart/checked-qty-chart.component';
import { AvgTrackingChartComponent } from '../../components/avg-tracking-chart/avg-tracking-chart.component';
import { ActiveMachinesChartComponent } from '../../components/active-machines-chart/active-machines-chart.component';
import { ActiveWorkersChartComponent } from '../../components/active-workers-chart/active-workers-chart.component';
import { EfficiencyPercChartComponent } from '../../components/efficiency-perc-chart/efficiency-perc-chart.component';
import { FinishedProductTabComponent } from '../../components/finished-product-tab/finished-product-tab.component';
import { TopDefectsTabComponent } from '../../components/top-defects-tab/top-defects-tab.component';
import { TopLineChartComponent } from '../../components/top-line-chart/top-line-chart.component';
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
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NgApexchartsModule,
    ClockComponent,
    CheckedQtyChartComponent,
    ActiveMachinesChartComponent,
    AvgTrackingChartComponent,
    ActiveWorkersChartComponent,
    EfficiencyPercChartComponent,
    FinishedProductTabComponent,
    TopDefectsTabComponent,
    TopLineChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  isDarkMode: boolean = false;
  selectedLine: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private prodLineService: ProdLineService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.prodLineService.selectedLine$.subscribe((line) => {
        this.selectedLine = line;
      })
    );

    this.subscriptions.push(
      this.darkModeService.darkMode$.subscribe((isDark) => {
        this.isDarkMode = isDark;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
