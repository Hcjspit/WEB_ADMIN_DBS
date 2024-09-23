// Angular import
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

// Project import
import { menus } from 'src/app/demo/data/menu';
import { Navigation } from 'src/app/@theme/types/navigation';
import { productionLines } from 'src/app/@theme/types/navigation';
import { LayoutService } from 'src/app/@theme/services/layout.service';
import { environment } from 'src/environments/environment';
import { ProdLineService } from 'src/app/services/prod-line/prod-line.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  // public props
  @ViewChild('sidebar') sidebar!: MatDrawer;
  @Output() lineSelected = new EventEmitter<string>();
  menus = menus;
  menuItems: Navigation[] = menus;
  modeValue: MatDrawerMode = 'side';
  currentApplicationVersion = environment.appVersion;
  private intervalId: any;
  selectedLineId: string | null = '';
  private readonly initialInterval = 1500;
  private readonly extendedInterval = 120000; // 2 minutes
  private dataArray: any[] = [];
  private maxDataCount = 12;
  private subscriptions: Subscription[] = [];
  isSidebarOpened: boolean = false;
  isCollapseMenuOpened: boolean = false;

  // Constructor
  constructor(
    private breakpointObserver: BreakpointObserver,
    private layoutService: LayoutService,
    private prodLineService: ProdLineService
  ) {}

  // life cycle event
  ngOnInit() {
    this.subscriptions.push(
      this.breakpointObserver.observe(['(min-width: 1025px)', '(max-width: 1024.98px)']).subscribe((result) => {
        this.modeValue = result.breakpoints['(max-width: 1024.98px)'] ? 'over' : 'side';
      })
    );

    this.subscriptions.push(
      this.layoutService.layoutState.subscribe(() => {
        this.sidebar.toggle();
      })
    );

    this.populateMenuItems();
  }

  private populateMenuItems(): void {
    const selectLineMenu = this.menuItems[0].children?.find((item) => item.id === 'Select-Line');
    if (selectLineMenu) {
      selectLineMenu.children = productionLines.map((line) => ({
        id: line.id,
        title: line.name,
        type: 'item',
        classes: 'nav-item',
        onClick: () => this.selectLine(line.id, line.name)
      }));
    }
  }

  selectLine(id_linea: string, line_name: string): void {
    if (this.selectedLineId !== id_linea) {
      this.selectedLineId = id_linea;

      this.prodLineService.resetChart();
      this.prodLineService.requestLineData(this.selectedLineId);

      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      this.dataArray = [];

      this.intervalId = setInterval(() => {
        this.prodLineService.requestLineData(this.selectedLineId);
        this.addAllData();
      }, this.initialInterval);

      this.prodLineService.setSelectedLine(line_name);
      this.sidebar.close();
      this.isCollapseMenuOpened = false;
    }
  }

  private addAllData() {
    const newData = this.prodLineService.topLineDataUpdates$;
    this.updateDataArray(newData);
  }

  private updateDataArray(newData: any) {
    this.dataArray.push(newData);
    console.log(`Aggiunto dato: ${newData}`);
    console.log(`Array attuale: ${this.dataArray}`);

    if (this.dataArray.length >= this.maxDataCount) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.prodLineService.requestLineData(this.selectedLineId);
      }, this.extendedInterval);
      console.log('Array ha raggiunto i 12 elementi. Modifica intervallo a 2 minuti.');
    }
  }

  toggleCollapseMenu(): void {
    this.isCollapseMenuOpened = !this.isCollapseMenuOpened;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.selectedLineId = null;
  }
}
