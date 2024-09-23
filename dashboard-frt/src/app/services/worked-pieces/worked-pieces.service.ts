import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, of } from 'rxjs';
import { WorkedPiecesTable } from 'src/app/entities/table.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkedPiecesService {
  private apiUrl = environment.httpUrls.workedPiecesApiUrl;
  private lineSubject: BehaviorSubject<{
    cd_linea: string;
    row_limit: number;
    filters: { style?: string; stage?: string; name?: string };
  }> = new BehaviorSubject<{
    cd_linea: string;
    row_limit: number;
    filters: { style?: string; stage?: string; name?: string };
  }>({ cd_linea: '', row_limit: 25, filters: {} }); // Default line selection
  private workedPiecesDataSubject: BehaviorSubject<WorkedPiecesTable[]> = new BehaviorSubject<WorkedPiecesTable[]>([]);

  constructor(private http: HttpClient) {
    this.lineSubject.subscribe((request) => {
      if (request) {
        const { cd_linea, row_limit, filters } = request;
        this.getWorkedPiecesTableData(cd_linea, row_limit, filters)
          .pipe(
            catchError((error) => {
              if (error.status === 404) {
                console.error(`No data found for line ${cd_linea}`);
              } else {
                console.error(`Error fetching data for line ${cd_linea} and filters ${JSON.stringify(filters)}:`, error);
              }
              this.workedPiecesDataSubject.next([]);
              return of([]);
            })
          )
          .subscribe((data) => {
            console.log(`Data received for line ${cd_linea} with limit ${row_limit}:`, data);
            this.workedPiecesDataSubject.next(data);
          });
      }
    });
  }

  getWorkedPiecesTableData(
    cd_linea: string,
    row_limit: number,
    filters: { style?: string; stage?: string; name?: string }
  ): Observable<WorkedPiecesTable[]> {
    let params = new HttpParams().set('limit', row_limit.toString());
    if (filters.style) {
      params = params.set('style', filters.style);
    }
    if (filters.stage) {
      params = params.set('stage', filters.stage);
    }
    if (filters.name) {
      params = params.set('name', filters.name);
    }
    console.log(`Fetching data for line ${cd_linea} with limit ${row_limit} and filters: ${JSON.stringify(filters)}`);
    return this.http.get<WorkedPiecesTable[]>(`${this.apiUrl}/${cd_linea}`, { params });
  }

  selectLine(cd_linea: string, row_limit: number, filters: { style?: string; stage?: string }): void {
    console.log(`Line selected: ${cd_linea} with limit ${row_limit} and filters: ${JSON.stringify(filters)}`);
    this.lineSubject.next({ cd_linea, row_limit, filters });
  }

  get workedPiecesDataUpdates$(): Observable<WorkedPiecesTable[]> {
    return this.workedPiecesDataSubject.asObservable();
  }
}
