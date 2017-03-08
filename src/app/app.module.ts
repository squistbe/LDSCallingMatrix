// Angular Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

// Ionic Modules
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Providers
import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';
import { OrgService } from '../providers/org-service';

// Pages
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage, JoinOrgPage, CreateOrgPage } from '../pages/welcome/welcome';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    Login,
    RegisterPage,
    WelcomePage,
    JoinOrgPage,
    CreateOrgPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    Login,
    RegisterPage,
    WelcomePage,
    JoinOrgPage,
    CreateOrgPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Storage,
    AuthService,
    UserService,
    OrgService
  ]
})

export class AppModule {}
