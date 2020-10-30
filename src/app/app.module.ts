import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BoxComponent } from './components/baseComponents/box/box.component';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [
    HomeComponent,
    BoxComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
