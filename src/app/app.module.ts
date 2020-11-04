import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BoxComponent } from './components/baseComponents/box/box.component';
import { GridComponent } from './components/grid/grid.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './services/db/config';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/baseComponents/button/button.component';
import { PlayComponent } from './pages/play/play.component';
import { EndComponent } from './pages/end/end.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoxComponent,
    GridComponent,
    LoginComponent,
    ButtonComponent,
    PlayComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
