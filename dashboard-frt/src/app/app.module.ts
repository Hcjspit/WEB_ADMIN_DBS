// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './demo/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DarkModeService } from './services/dark-mode/dark-mode.service';
import { ProdLineService } from './services/prod-line/prod-line.service';
import { TableService } from './services/table/table.service';
import { WorkedPiecesService } from './services/worked-pieces/worked-pieces.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    NgApexchartsModule
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, DarkModeService, ProdLineService, TableService, WorkedPiecesService]
})
export class AppModule {}
