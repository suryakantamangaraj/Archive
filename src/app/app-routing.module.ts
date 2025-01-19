import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //useHash: false  // Disable hash routing
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
