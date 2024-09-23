import { Component } from '@angular/core';
import { LineSelectorComponent } from '../../components/line-selector/line-selector.component';
import { WorkedPiecesService } from 'src/app/services/worked-pieces/worked-pieces.service';
import { WorkedPiecesComponent } from '../../components/worked-pieces/worked-pieces.component';
@Component({
  selector: 'app-worked-pieces-table',
  standalone: true,
  imports: [LineSelectorComponent, WorkedPiecesComponent],
  templateUrl: './worked-pieces-table.component.html',
  styleUrl: './worked-pieces-table.component.scss'
})
export class WorkedPiecesTableComponent {}
