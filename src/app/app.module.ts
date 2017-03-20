// Angular Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

// Ionic Modules
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Providers
import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';
import { UnitService } from '../providers/unit-service';
import { UploadService } from '../providers/upload-service';
import { OrgService } from '../providers/org-service';

// Pages
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage, JoinUnitPage, CreateUnitPage } from '../pages/welcome/welcome';
import { MembersPage } from '../pages/members/members';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    Login,
    RegisterPage,
    WelcomePage,
    JoinUnitPage,
    CreateUnitPage,
    MembersPage
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
    JoinUnitPage,
    CreateUnitPage,
    MembersPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Storage,
    AuthService,
    UserService,
    UnitService,
    UploadService,
    OrgService
  ]
})

export class AppModule {}
