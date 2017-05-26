"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ionic_angular_1 = require("ionic-angular");
var status_bar_1 = require("@ionic-native/status-bar");
var splash_screen_1 = require("@ionic-native/splash-screen");
var app_component_1 = require("./app.component");
var login_1 = require("../pages/login/login");
var auth_service_1 = require("../providers/auth-service");
var user_service_1 = require("../providers/user-service");
var mocks_1 = require("../mocks");
var comp;
var fixture;
describe('Component: Root Component', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.MyApp],
            providers: [
                status_bar_1.StatusBar,
                splash_screen_1.SplashScreen,
                {
                    provide: ionic_angular_1.NavController,
                    useClass: mocks_1.NavMock
                },
                {
                    provide: auth_service_1.AuthService,
                    useClass: mocks_1.AuthMock
                },
                {
                    provide: user_service_1.UserService,
                    userClass: mocks_1.UserMock
                }
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.MyApp);
        comp = fixture.componentInstance;
    });
    afterEach(function () {
        fixture.destroy();
        comp = null;
    });
    it('is created', function () {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    it('initialises with a root page of Login', function () {
        expect(comp['rootPage']).toBe(login_1.Login);
    });
});
