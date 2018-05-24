

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { MyHttpInterceptor } from './services/my-http-interceptor'

//animations
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

//loading spinner
import { LoadingModule } from 'ngx-loading';


//pipes
import { DecimalPipe } from '@angular/common';
import { CapitalizePipe, CapitalizeEachWord } from './components/pipes/capitalize/capitalize.pipe';

//bootstrap modules
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//services
import {SortArrayService} from './services/sort-array.service';
import {DolartodayApiService} from './services/dolartoday-api.service'
import { RestService } from './services/rest-service';
import { AlertService } from './services/alert.service';
import { AppRoutingModule } from './app-routing.module';
import {AuthGuard} from './auth-guard.service'
import { NonAuthGuard } from './non-auth-guard.service'
import { TransactionsResolverService } from './services/transactions-resolver/transactions-resolver.service';
import { BrokerResolverService } from './services/broker-resolver/broker-resolver.service'
import {UserService} from './services/user.service';
import { OwnerGuardService } from './owner-guard.service';
import { sharedService } from './services/shared-service';


// import { RouterModule } from '@angular/router';
// import { appRoutes} from './routes';

import { AppComponent } from './app.component';
import { BuyformComponent } from './components/buyform/buyform.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { SellFormComponent } from './components/sell-form/sell-form.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { BrokerProfileComponent } from './components/broker-profile/broker-profile.component';
import { AddBrokerFormComponent } from './components/add-broker-form/add-broker-form.component';
import { AddAgencyComponent } from './components/add-agency/add-agency.component';
import { RecoverPassFormComponent } from './components/recover-pass-form/recover-pass-form.component';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RecoverPassComponent } from './components/views/recover-pass/recover-pass.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';

import { SaleDetailsComponent } from './components/sale-details/sale-details.component';
import { SearchDatesComponent } from './components/search-dates/search-dates.component';
import { AnalyzeMultModalComponent } from './components/analyze-mult-modal/analyze-mult-modal.component';
import { FundirMultModalComponent } from './components/fundir-mult-modal/fundir-mult-modal.component';
import { MassSellModalComponent } from './components/mass-sell-modal/mass-sell-modal.component';
import { WeightConvertPipe, WeightConvertPipeInverse } from './components/pipes/weight-convert/weight-convert.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlertComponent } from './directives/alert/alert.component';
import { AnalizeMeltComponent } from './components/analize-melt/analize-melt.component';
import { CustomMinValidatorDirective } from './directives/validators/custom-min-validator.directive';
import { CustomMaxValidatorDirective } from './directives/validators/custom-max-validator.directive';
import { ChooseCompanyComponent } from './components/views/choose-company/choose-company.component';
import { BrokersComponent } from './components/views/brokers/brokers.component';
import { EmpresaInfoComponent } from './components/views/empresa-info/empresa-info.component';
import {EqualValidator} from './directives/validators/equal-validator.directive';
import { ForbiddenNameDirective } from './directives/validators/forbidden-name.directive';
import { BrokerBalancesComponent } from './components/broker-balances/broker-balances.component';
import { AddBrokerBalanceModalComponent } from './components/add-broker-balance-modal/add-broker-balance-modal.component';
import { AddExistingBrokerComponent } from './components/add-existing-broker/add-existing-broker.component';
import { ForbiddenCedulaDirective } from './directives/validators/forbidden-cedula.directive';
import { ForbiddenEmailDirective } from './directives/validators/forbidden-email.directive';
import { AbonoDetailModalComponent } from './components/abono-detail-modal/abono-detail-modal.component';





@NgModule({
  declarations: [
    AppComponent,
    BuyformComponent,
    LoginformComponent,
    SellFormComponent,
    TransactionsTableComponent,
    BrokerProfileComponent,
    AddBrokerFormComponent,
    AddAgencyComponent,
    RecoverPassFormComponent,
    LandingPageComponent,
    RecoverPassComponent,
    DashboardComponent,
    NavbarComponent,
    TransactionDetailsComponent,
    CapitalizePipe,
    CapitalizeEachWord,
    SaleDetailsComponent,
    SearchDatesComponent,
    AnalyzeMultModalComponent,
    FundirMultModalComponent,
    MassSellModalComponent,
    WeightConvertPipe,
    WeightConvertPipeInverse,
    PageNotFoundComponent,
    AlertComponent,
    AnalizeMeltComponent,
    CustomMinValidatorDirective,
    CustomMaxValidatorDirective,
    ChooseCompanyComponent,
    BrokersComponent,
    EmpresaInfoComponent,
    EqualValidator,
    ForbiddenNameDirective,
    BrokerBalancesComponent,
    AddBrokerBalanceModalComponent,
    AddExistingBrokerComponent,
    ForbiddenCedulaDirective,
    ForbiddenEmailDirective,
    AbonoDetailModalComponent,
  ],
  entryComponents: [
  	BuyformComponent,
  	SellFormComponent,
  	TransactionDetailsComponent,
  	SaleDetailsComponent,
  	SearchDatesComponent,
    FundirMultModalComponent,
    AnalyzeMultModalComponent,
    MassSellModalComponent,
    AnalizeMeltComponent,
    AddBrokerFormComponent,
    BrokerBalancesComponent,
    AddBrokerBalanceModalComponent,
    AddExistingBrokerComponent,
    AbonoDetailModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingModule
	// RouterModule.forRoot(
	//       appRoutes,
	//       { enableTracing: true } // <-- debugging purposes only
	// )
  ],
  providers: [
  	DolartodayApiService,
    DecimalPipe,
    WeightConvertPipe,
    CapitalizeEachWord,
    WeightConvertPipeInverse,
    RestService,
    AlertService,
    NonAuthGuard,
    TransactionsResolverService,
    BrokerResolverService,
    AuthGuard,
    SortArrayService,
    UserService,
    OwnerGuardService,
    sharedService,
    //{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true },
    { 
        provide: HTTP_INTERCEPTORS, 
        useClass: MyHttpInterceptor, 
        multi: true 
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
