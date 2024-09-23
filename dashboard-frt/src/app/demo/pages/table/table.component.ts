import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SmallTableComponent } from '../../components/small-table/small-table.component';
import { BigTableComponent } from '../../components/big-table/big-table.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, SharedModule, SmallTableComponent, BigTableComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {}
