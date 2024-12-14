import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';

const routes: Routes = [
  {
    path: "room-list",
    component: RoomListComponent,
    data: {
      title: 'Room managermant',
    },
  },
  {
    path: "",
    component: RoomListComponent,
    data: {
      title: 'Room managermant',
    },
    // pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
