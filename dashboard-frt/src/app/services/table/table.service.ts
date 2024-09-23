import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BigScreenData, TopLineData, DefectData, OutputData } from '../../entities/line-data.entity';
import { environment } from 'src/environments/environment';
import { BigTable, SmallTable, WorkedPiecesTable } from 'src/app/entities/table.entity';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private socket: Socket;
  private smallTableDataSubject = new BehaviorSubject<SmallTable | null>(null);
  private bigTableDataSubject = new BehaviorSubject<BigTable[] | null>(null);
  private reconnectSubject = new Subject<void>();
  private resetTableSubject = new Subject<void>();

  constructor() {
    this.socket = io(environment.socketUrl);

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.reconnectSubject.next();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('smallTableDataResponse', (data: SmallTable) => {
      // console.log('WebSocketSmallTableData data:', data);
      this.smallTableDataSubject.next(data);
    });

    this.socket.on('bigTableDataResponse', (data: BigTable[]) => {
      // console.log('WebSocketBigTableData data:', data);
      this.bigTableDataSubject.next(data);
    });

    this.socket.on('error', (err: any) => {
      console.log('Socket error', err);
    });
  }

  requestTableData(): void {
    this.socket.emit('requestTableData');
  }

  get smallTableDataUpdates$(): Observable<SmallTable | null> {
    return this.smallTableDataSubject.asObservable();
  }

  get bigTableDataUpdates$(): Observable<BigTable[] | null> {
    return this.bigTableDataSubject.asObservable();
  }

  get reconnect$(): Observable<void> {
    return this.reconnectSubject.asObservable();
  }

  get resetTable$(): Observable<void> {
    return this.resetTableSubject.asObservable();
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  resetTable(): void {
    this.resetTableSubject.next();
  }

  clearAll(): void {
    this.socket.off('smallTableDataResponse');
    this.socket.off('bigTableDataResponse');
  }

  ngOnDestroy(): void {
    this.clearAll();
    this.socket.disconnect();
  }
}
