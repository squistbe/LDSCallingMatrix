// Angular Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

// Ionic Modules
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Providers
import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';

// Pages
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage, JoinOrgModal, CreateOrgModal } from '../pages/welcome/welcome';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    Login,
    RegisterPage,
    WelcomePage,
    JoinOrgModal,
    CreateOrgModal
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
    JoinOrgModal,
    CreateOrgModal
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    AuthService,
    Storage,
    UserService
  ]
})

export class AppModule {}
