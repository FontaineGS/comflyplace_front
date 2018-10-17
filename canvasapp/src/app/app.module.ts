import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasViewComponent } from './component/canvas-view/canvas-view.component';
import { RouterModule, Routes} from '@angular/router' ; 

const appRoutes : Routes = [
  {path : 'main', component : CanvasViewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CanvasViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
