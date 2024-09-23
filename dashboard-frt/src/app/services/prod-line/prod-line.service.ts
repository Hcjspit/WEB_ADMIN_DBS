import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BigScreenData, TopLineData, DefectData, OutputData } from '../../entities/line-data.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdLineService implements OnDestroy {
  private socket: Socket;
  private lineDataSubject = new BehaviorSubject<{ data: BigScreenData; realTime: string } | null>(null);
  private defectDataSubject = new BehaviorSubject<DefectData[] | null>(null);
  private topLineDataSubject = new BehaviorSubject<{ labels: string[]; series: number[] } | null>(null);
  private outputDataSubject = new BehaviorSubject<OutputData[] | null>(null);
  private outputLineDataSubject = new BehaviorSubject<OutputData[] | null>(null);
  private reconnectSubject = new Subject<void>();
  private resetChartSubject = new Subject<void>();
  private selectedLineSubject = new BehaviorSubject<string | null>(null);
  selectedLine$ = this.selectedLineSubject.asObservable();

  constructor() {
    this.socket = io(environment.socketUrl);

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.reconnectSubject.next();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('allDataResponse', (data: BigScreenData) => {
      const adjtime = new Date(Date.now() + 2 * (60 * 60 * 1000));
      const realTime = adjtime.toJSON();
      // console.log('WebSocketAllData data:', data);
      this.lineDataSubject.next({ data, realTime });
    });

    this.socket.on('top3DefectsResponse', (data: DefectData[] | null) => {
      console.log('WebSocketDefect data:', data);
      this.defectDataSubject.next(data);
    });

    this.socket.on('top4LineResponse', (data: TopLineData[]) => {
      // console.log('WebSocketTopLine data:', data);
      const labels = data.map((item) => item.CD_LINEA).filter((label) => label !== undefined) as string[];
      const series = data.map((item) => item.CHECKED_QTY).filter((series) => series !== undefined) as number[];
      this.topLineDataSubject.next({ labels, series });
    });

    this.socket.on('outputAndKeyResponse', (data: OutputData[] | null) => {
      // console.log('WebSocketOutputData data:', data);
      this.outputDataSubject.next(data);
    });

    this.socket.on('outputAndKeyLineResponse', (data: OutputData[] | null) => {
      console.log('WebSocketOutputLineData data: ', data);
      this.outputLineDataSubject.next(data);
    });

    this.socket.on('error', (err: any) => {
      console.log('Socket error', err);
    });
  }

  //Emit event that charge all Chart and Table
  requestLineData(id_linea: string | null): void {
    this.socket.emit('requestLineData', { cd_linea: id_linea });
  }

  requestOutputAndKeyData(): void {
    this.socket.emit('requestOutputAndKeyData');
  }

  requestTop4LinesData(): void {
    this.socket.emit('requestTop4LinesData');
  }

  get lineDataUpdates$(): Observable<{ data: BigScreenData; realTime: string } | null> {
    return this.lineDataSubject.asObservable();
  }

  get defectDataUpdates$(): Observable<DefectData[] | null> {
    return this.defectDataSubject.asObservable();
  }

  get topLineDataUpdates$(): Observable<{ labels: string[]; series: number[] } | null> {
    return this.topLineDataSubject.asObservable();
  }

  get outputDataUpdates$(): Observable<OutputData[] | null> {
    return this.outputDataSubject.asObservable();
  }

  get outputLineDataUpdates$(): Observable<OutputData[] | null> {
    return this.outputLineDataSubject.asObservable();
  }

  get reconnect$(): Observable<void> {
    return this.reconnectSubject.asObservable();
  }

  get resetChart$(): Observable<void> {
    return this.resetChartSubject.asObservable();
  }

  getCurrentLineData(): { data: BigScreenData; realTime: string } | null {
    return this.lineDataSubject.value;
  }

  setSelectedLine(line: string) {
    this.selectedLineSubject.next(line);
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

  resetChart(): void {
    this.resetChartSubject.next();
  }

  clearAll(): void {
    this.socket.off('allDataResponse');
    this.socket.off('top3DefectsResponse');
    this.socket.off('top4LineResponse');
    this.socket.off('outputAndKeyResponse');
    this.socket.off('outputAndKeyLineResponse');
  }

  ngOnDestroy(): void {
    this.clearAll();
    this.socket.disconnect();
  }
}
