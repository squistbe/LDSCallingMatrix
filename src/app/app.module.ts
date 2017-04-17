// Angular Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// Ionic Modules
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Providers
import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';
import { UnitService } from '../providers/unit-service';
import { UploadService } from '../providers/upload-service';
import { OrgService } from '../providers/org-service';
import { CallingStatusService} from '../providers/calling-status-service';

// Pages
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage, JoinUnitPage, CreateUnitPage } from '../pages/welcome/welcome';
import { MembersPage } from '../pages/members/members';
import { AddMembersPage } from '../pages/members/add-members';
import { MyProfilePage } from '../pages/my-profile/my-profile';

// Modals
import { EditCallingModal } from '../modals/edit-calling/edit-calling';
import { AddCallingModal } from '../modals/add-calling/add-calling';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    Login,
    RegisterPage,
    WelcomePage,
    JoinUnitPage,
    CreateUnitPage,
    AddMembersPage,
    MembersPage,
    MyProfilePage,

    EditCallingModal,
    AddCallingModal
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserModule,
    IonicStorageModule.forRoot()
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
    AddMembersPage,
    MembersPage,
    MyProfilePage,

    EditCallingModal,
    AddCallingModal
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    SplashScreen,
    StatusBar,
    AuthService,
    UserService,
    UnitService,
    UploadService,
    OrgService,
    CallingStatusService
  ]
})

export class AppModule {}
