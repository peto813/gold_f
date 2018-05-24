import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { NonAuthGuard } from './non-auth-guard.service';
import { OwnerGuardService } from './owner-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrokerProfileComponent } from './components/broker-profile/broker-profile.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { RecoverPassComponent } from './components/views/recover-pass/recover-pass.component';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { ChooseCompanyComponent } from './components/views/choose-company/choose-company.component';
import { BrokersComponent } from './components/views/brokers/brokers.component';
import { EmpresaInfoComponent } from './components/views/empresa-info/empresa-info.component';

//RESOLVERS
import { BrokerResolverService }   from './services/broker-resolver/broker-resolver.service';
import { TransactionsResolverService }   from './services/transactions-resolver/transactions-resolver.service';


const appRoutes: Routes = [
   { path: '', component: LandingPageComponent,data:{title:'Bienvenido', returnUrl:'http://localhost:8000/rest-auth/login'} },//, canActivate:[NonAuthGuard]
   { path: 'forgot_password', component: RecoverPassComponent, canActivate:[NonAuthGuard] },
   { 
     path: 'dashboard',
     component: DashboardComponent,
     canActivate:[AuthGuard],
     resolve:{
       transactions:TransactionsResolverService
     }
   },
   { 
     path: 'choose_company',
     component: ChooseCompanyComponent,
     canActivate:[AuthGuard]
     // resolve:{
     //   transactions:TransactionsResolverService
     // }
   },
   { 
     path: 'brokers',
     component: BrokersComponent,
     canActivate:[AuthGuard, OwnerGuardService],
     resolve:{
       brokers:BrokerResolverService
     }
   },
   { 
     path: 'empresa',
     component: EmpresaInfoComponent,
     canActivate:[AuthGuard]
     // resolve:{
     //   transactions:TransactionsResolverService
     // }
   },
   { path: 'perfil_broker', component: BrokerProfileComponent, canActivate:[AuthGuard] },
   { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
  // providers: [
  //   TransactionsResolverService
  // ]
})
export class AppRoutingModule {}