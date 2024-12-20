import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
    data: {
      title: 'Room',
    },
  },
  {
    path: 'service',
    data: {
      title: 'Service',
    },
    loadChildren: () =>import("./services/services.module").then((m) => m.ServicesModule),
  },
  {
    path: 'employee',
    data: {
      title: 'Employee',
    },
    loadChildren: () =>import("./employee/employee.module").then((m) => m.EmployeeModule),
  },
  {
    path: 'booking',
    data: {
      title: 'Booking',
    },
    loadChildren: () =>import("./booking/booking.module").then((m) => m.BookingModule),
  },
  {
    path: 'order',
    data: {
      title: 'Order',
    },
    loadChildren: () =>import("./order/order.module").then((m) => m.OrderModule),
  }
  // {
  //     path: 'demo-one',
  //     component: DemoOneDashboardComponent,
  //     data: {
  //         title: 'Demo One ',
  //     }
  // },

  // {
  //     path: 'demo-three',
  //     component: DemoThreeComponent,
  //     data: {
  //         title: 'Demo Three',
  //     }
  // },
  // {
  //     path: 'demo-four',
  //     component: DemoFourComponent,
  //     data: {
  //         title: 'Demo Four',
  //     }
  // },
  // {
  //   path: 'demo-five',
  //   component: DemoFiveComponent,
  //   data: {
  //       title: 'Demo Five',
  //   }
  // },
  // {
  //   path: 'demo-six',
  //   component: DemoSixComponent,
  //   data: {
  //       title: 'Demo six',
  //   }
  // },
  // {
  //   path: 'demo-seven',
  //   component: DemoSevenComponent,
  //   data: {
  //       title: 'Demo seven',
  //   }
  // },
  // {
  //   path: 'demo-eight',
  //   component: DemoEightComponent,
  //   data: {
  //       title: 'Demo eight',
  //   }
  // },
  // {
  //   path: 'demo-nine',
  //   component: DemoNineComponent,
  //   data: {
  //       title: 'Demo nine',
  //   }
  // },
  // {
  //   path: 'demo-ten',
  //   component: DemoTenComponent,
  //   data: {
  //       title: 'Demo ten',
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
