import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: 'notfound', component: NotFoundComponent },  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    HttpClientModule    
  ],
  exports: [RouterModule]  
})
export class AppRoutingModule {}
