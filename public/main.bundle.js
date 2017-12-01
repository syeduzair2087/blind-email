webpackJsonp([2,5],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_voice_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(voiceService, authService, changeDetector) {
        this.voiceService = voiceService;
        this.authService = authService;
        this.changeDetector = changeDetector;
        this.loading = false;
    }
    LoginComponent.prototype.playIntro = function () {
        var _this = this;
        this.voiceService.speak('Welcome to blind email system, please login to continue. Click the button, or say login after the beep', 'female', function () {
            _this.loading = false;
            _this.changeDetector.detectChanges();
        }, function () { return setTimeout(function () {
            _this.voiceInput.call(_this);
        }, 250); });
    };
    LoginComponent.prototype.voiceInput = function () {
        var _this = this;
        this.voiceService.listen()
            .then(function (result) {
            console.log(result);
            if (_this.voiceService.keywordMatch(result, 'login')) {
                _this.voiceService.speak('Logging in.');
                _this.authService.login()
                    .subscribe(function (result) { return window.location.assign(result.url); });
            }
            else {
                _this.voiceService.speak('Sorry, i was not able to get that. Please try again!', 'female', null, _this.voiceInput.bind(_this));
                return;
            }
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        console.log('Login screen');
        this.playIntro();
    };
    LoginComponent.prototype.clickLogin = function () {
        console.log('click');
        this.voiceService.cancelVoice();
        this.authService.login()
            .subscribe(function (result) { return window.location.assign(result.url); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__(337),
        styles: [__webpack_require__(325)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_voice_service__["a" /* VoiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_voice_service__["a" /* VoiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["q" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["q" /* ChangeDetectorRef */]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_buffer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_buffer__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmailService = (function () {
    function EmailService(http) {
        this.http = http;
    }
    EmailService.prototype.apiUrl = function (endpoint) {
        return "http://127.0.0.1:3000/api/v1/" + endpoint;
    };
    EmailService.prototype.fetchEmail = function () {
        return this.http.post(this.apiUrl('email/get'), {}, {
            withCredentials: true
        }).map(function (response) { return response.json(); });
    };
    EmailService.prototype.decodeEmail = function (encodedEmail) {
        return (new __WEBPACK_IMPORTED_MODULE_2_buffer__["Buffer"](encodedEmail, 'base64')).toString();
    };
    return EmailService;
}());
EmailService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], EmailService);

var _a;
//# sourceMappingURL=email.service.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_cookie__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HomeGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeGuard = (function () {
    function HomeGuard(cookieService, router) {
        this.cookieService = cookieService;
        this.router = router;
    }
    HomeGuard.prototype.canActivate = function () {
        if (this.cookieService.get('token'))
            return true;
        this.router.navigate(['login']);
        return false;
    };
    return HomeGuard;
}());
HomeGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_cookie__["b" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_cookie__["b" /* CookieService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object])
], HomeGuard);

var LoginGuard = (function () {
    function LoginGuard(cookieService, router) {
        this.cookieService = cookieService;
        this.router = router;
    }
    LoginGuard.prototype.canActivate = function () {
        if (!this.cookieService.get('token'))
            return true;
        this.router.navigate(['home']);
        return false;
    };
    return LoginGuard;
}());
LoginGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_cookie__["b" /* CookieService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_cookie__["b" /* CookieService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _d || Object])
], LoginGuard);

var _a, _b, _c, _d;
//# sourceMappingURL=guard.service.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_voice_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_auth_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_email_service__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShellComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShellComponent = (function () {
    function ShellComponent(voiceService, authService, router, emailService, changeDetector) {
        this.voiceService = voiceService;
        this.authService = authService;
        this.router = router;
        this.emailService = emailService;
        this.changeDetector = changeDetector;
        this.speaking = true;
        this.listening = false;
    }
    ShellComponent.prototype.emailMenuInput = function (emails) {
        var _this = this;
        this.toggleListen(true);
        this.voiceService.listen()
            .then(function (result) {
            _this.toggleListen(false);
            console.log(result);
            if (_this.voiceService.keywordMatch(result, 'number')) {
                if ('parts' in emails.messages[parseInt(result) - 1].payload) {
                    var mail = _this.emailService.decodeEmail((emails.messages[parseInt(result) - 1]).payload.parts[0].body.data);
                    _this.toggleSpeak(true);
                    _this.voiceService.speak(mail, 'female', null, function () {
                        return _this.voiceService.speak('I have finished reading your email. Please speak another number, or more, to fetch more emails', 'female', null, function () {
                            _this.toggleSpeak(false);
                            _this.emailMenuInput(emails);
                        });
                    });
                }
                else {
                    var mail = _this.emailService.decodeEmail((emails.messages[parseInt(result) - 1]).payload.body.data);
                    _this.toggleSpeak(true);
                    _this.voiceService.speak(mail, 'female', null, function () {
                        return _this.voiceService.speak('I have finished reading your email. Please speak another number, or more, to fetch more emails', 'female', null, function () {
                            _this.toggleSpeak(false);
                            _this.emailMenuInput(emails);
                        });
                    });
                }
                console.log('Email', _this.emailService.decodeEmail((emails.messages[parseInt(result) - 1]).payload.parts[0].body.data));
            }
            else if (_this.voiceService.keywordMatch(result, 'return')) {
                return (function () {
                    _this.toggleSpeak(true);
                    _this.voiceService.speak('Returning to previous menu.', 'female', null, function () {
                        _this.toggleSpeak(false);
                        _this.playMenu();
                    });
                })();
            }
            else {
                _this.toggleSpeak(true);
                _this.voiceService.speak('Sorry, i was not able to get that, please try again!', 'female', null, function () {
                    return (function () {
                        _this.toggleSpeak(false);
                        _this.emailMenuInput(emails);
                    })();
                });
            }
        });
    };
    ShellComponent.prototype.emailMenu = function (emails) {
        var _this = this;
        this.toggleSpeak(true);
        this.voiceService.speak('Your emails have been fetched. Please speak a number between 1 and 10, or more, to fetch more emails', 'female', null, function () {
            _this.voiceService.speak('Speak return, to return to previous menu', 'female', null, function () {
                _this.toggleSpeak(false);
                _this.emailMenuInput(emails);
            });
        });
    };
    ShellComponent.prototype.voiceInput = function () {
        var _this = this;
        this.toggleListen(true);
        this.voiceService.listen()
            .then(function (result) {
            _this.toggleListen(false);
            console.log(result);
            if (_this.voiceService.keywordMatch(result, 'logout')) {
                _this.toggleSpeak(true);
                _this.voiceService.speak('Logging out', 'female', null, function () {
                    _this.toggleSpeak(false);
                    _this.authService.logout().subscribe(function (response) {
                        console.log(response);
                        _this.router.navigate(['login']);
                    });
                });
            }
            else if (_this.voiceService.keywordMatch(result, 'repeat')) {
                _this.playMenu();
                return;
            }
            else if (_this.voiceService.keywordMatch(result, 'fetchMail')) {
                _this.toggleSpeak(true);
                _this.voiceService.speak('Fetching emails. Please wait.', 'female', null, function () {
                    _this.toggleSpeak(false);
                    _this.emailService.fetchEmail()
                        .subscribe(function (result) {
                        console.log(result);
                        _this.emailMenu(result.data);
                    });
                });
                return;
            }
            else {
                _this.toggleSpeak(true);
                _this.voiceService.speak('Sorry, i was not able to get that. Please try again!', 'female', null, function () {
                    _this.toggleSpeak(false);
                    _this.voiceInput();
                });
                return;
            }
        });
    };
    ShellComponent.prototype.playIntro = function () {
        var intro = 'You have successfully logged in. Please use the menu to navigate. Speak one of the following options.';
        this.voiceService.speak(intro, 'female', null, this.playMenu.bind(this));
    };
    ShellComponent.prototype.playMenu = function () {
        var _this = this;
        var menu = 'Check mail, to check your email. Send mail, to send email. Logout, to logout of the system. Or repeat, to repeat the menu.';
        this.toggleSpeak(true);
        this.voiceService.speak(menu, 'female', null, function () {
            _this.toggleSpeak(false);
            _this.voiceInput();
        });
    };
    ShellComponent.prototype.ngOnInit = function () {
        this.playIntro();
    };
    ShellComponent.prototype.clickLogout = function () {
    };
    ShellComponent.prototype.toggleSpeak = function (toggle) {
        this.speaking = toggle;
        this.changeDetector.detectChanges();
    };
    ShellComponent.prototype.toggleListen = function (toggle) {
        this.listening = toggle;
        this.changeDetector.detectChanges();
    };
    return ShellComponent;
}());
ShellComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        selector: 'app-shell',
        template: __webpack_require__(339),
        styles: [__webpack_require__(327)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_voice_service__["a" /* VoiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_voice_service__["a" /* VoiceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_app_services_email_service__["a" /* EmailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_services_email_service__["a" /* EmailService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["q" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["q" /* ChangeDetectorRef */]) === "function" && _e || Object])
], ShellComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=shell.component.js.map

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 248;


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(267);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login_component__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_shell_shell_component__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_guard_service__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_0__login_login_component__["a" /* LoginComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4_app_services_guard_service__["a" /* LoginGuard */]] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_3_app_shell_shell_component__["a" /* ShellComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4_app_services_guard_service__["b" /* HomeGuard */]] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_services_voice_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(voiceService) {
        this.voiceService = voiceService;
        this.title = 'app works!';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].fromEvent(document.getElementsByTagName('body'), 'keyup')
            .filter(function ($event) { return $event['key'] == 'q'; })
            .subscribe(function ($event) {
            _this.voiceService.cancelVoice();
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(336),
        styles: [__webpack_require__(324)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0_app_services_voice_service__["a" /* VoiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_app_services_voice_service__["a" /* VoiceService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_routing_module__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_login_login_module__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shell_shell_module__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_guard_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_cookie__ = __webpack_require__(332);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6_app_login_login_module__["a" /* LoginModule */],
            __WEBPACK_IMPORTED_MODULE_7_app_shell_shell_module__["a" /* ShellModule */],
            __WEBPACK_IMPORTED_MODULE_0__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_9_ngx_cookie__["a" /* CookieModule */].forRoot()
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8_app_services_guard_service__["a" /* LoginGuard */], __WEBPACK_IMPORTED_MODULE_8_app_services_guard_service__["b" /* HomeGuard */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_voice_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_component__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_shared_module__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_auth_service__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4_app_shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__login_component__["a" /* LoginComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_0__services_voice_service__["a" /* VoiceService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_auth_service__["a" /* AuthService */]
        ]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () {
    };
    return LoadingComponent;
}());
LoadingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-loading',
        template: __webpack_require__(338),
        styles: [__webpack_require__(326)]
    }),
    __metadata("design:paramtypes", [])
], LoadingComponent);

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_loading_component__ = __webpack_require__(264);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__loading_loading_component__["a" /* LoadingComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__loading_loading_component__["a" /* LoadingComponent */]
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shell_component__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_voice_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_email_service__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShellModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ShellModule = (function () {
    function ShellModule() {
    }
    return ShellModule;
}());
ShellModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__shell_component__["a" /* ShellComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3_app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_voice_service__["a" /* VoiceService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_email_service__["a" /* EmailService */]
        ]
    })
], ShellModule);

//# sourceMappingURL=shell.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VoiceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VoiceService = (function () {
    function VoiceService() {
        this.voiceKeywords = {
            login: [
                'login', 'sign in', 'authenticate'
            ],
            logout: [
                'logout', 'log out', 'sign out'
            ],
            repeat: [
                'repeat', 'repeat menu'
            ],
            fetchMail: [
                'fetch email', 'fetch mail', 'check email', 'check mail', 'get mail', 'get email', 'email'
            ],
            number: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
            ],
            return: [
                'return', 'back', 'go back'
            ]
        };
    }
    VoiceService.prototype.keywordMatch = function (input, key) {
        return this.voiceKeywords[key].includes(input);
    };
    // getNumberIndex(number: string) {
    //   return this.voiceKeywords.number.indexOf(number);
    // }
    VoiceService.prototype.speak = function (text, voice, onload, onend) {
        if (voice === void 0) { voice = 'female'; }
        var msg = new SpeechSynthesisUtterance(text);
        msg.rate = 1.1;
        msg.pitch = 1.2;
        // let voiceInterval = setInterval(() => {
        // let voices = window.speechSynthesis.getVoices();
        // if (voices.length) {
        // if (onload) {
        //   console.log('fn onload', onload);
        //   onload();
        // }
        // clearInterval(voiceInterval);
        // let msg = new SpeechSynthesisUtterance(text);
        // voice == 'male' ? msg.voice = voices[50] : msg.voice = voices[49];
        if (onend) {
            console.log('fn onend', onend);
            msg.onend = onend;
        }
        // console.log(msg.onend);
        // msg.rate = 2.0;
        window.speechSynthesis.speak(msg);
        // }
        // }, 250)
    };
    VoiceService.prototype.beep = function () {
        var beep = new Audio();
        beep.src = './assets/beep.mp3';
        beep.load();
        beep.play();
    };
    VoiceService.prototype.listen = function () {
        this.beep();
        return new Promise(function (resolve, reject) {
            var input = '';
            var rec = new webkitSpeechRecognition();
            rec.onstart = function () {
                console.log('Listening...');
            };
            rec.onresult = function (e) {
                console.log('Found result');
                console.log(e);
                input = e.results[0][0].transcript;
            };
            rec.onend = function (e) {
                console.log('Listening end');
                console.log(e);
                resolve(input);
            };
            rec.start();
        });
    };
    VoiceService.prototype.cancelVoice = function () {
        if (window.speechSynthesis.speaking)
            window.speechSynthesis.cancel();
    };
    return VoiceService;
}());
VoiceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], VoiceService);

//# sourceMappingURL=voice.service.js.map

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
// imports


// module
exports.push([module.i, ".loading-bg {\n    position: absolute;\n    width: 100%;\n    height: 100vh;\n    background-color: rgba(0, 0, 0, 0.8);\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    z-index: 99999;\n}\n\n.loading-spinner {\n    color: whitesmoke;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
// imports


// module
exports.push([module.i, ".home-bg {\n    position: absolute;\n    width: 100%;\n    height: 100vh;\n    /* background-color: rgba(0, 0, 0, 0.8); */\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    z-index: 99999;\n}\n\n.home-bg i {\n    color: whitesmoke\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 336:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 337:
/***/ (function(module, exports) {

module.exports = "<app-loading *ngIf=\"loading\"></app-loading>\n<div *ngIf=\"!loading\">\n  <div class=\"row text-center\">\n    <img src=\"./assets/blind-email-logo.png\" alt=\"\" style=\"margin:272px 0px 72px 0px\" class=\"animated fadeInDown\">\n  </div>\n  <div class=\"row text-center\">\n    <button class=\"btn btn-primary btn-lg animated fadeInUp\" (click)=\"clickLogin()\">Get Started</button>\n  </div>\n</div>"

/***/ }),

/***/ 338:
/***/ (function(module, exports) {

module.exports = "<div class=\"loading-bg\">\n    <i class=\"fa fa-spinner fa-pulse fa-4x fa-fw loading-spinner\"></i>\n</div>"

/***/ }),

/***/ 339:
/***/ (function(module, exports) {

module.exports = "<div class=\"home-bg row\">\n    <i class=\"fa fa-fw fa-5x fa-volume-up animated pulse infinite\" *ngIf=\"speaking\"></i>\n    <i class=\"fa fa-fw fa-5x fa-volume-off\" *ngIf=\"!speaking\"></i>\n    <i class=\"fa fa-fw fa-5x fa-microphone animated pulse infinite\" *ngIf=\"listening\"></i>\n    <i class=\"fa fa-fw fa-5x fa-microphone-slash\" *ngIf=\"!listening\"></i>\n</div>"

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.apiUrl = function (endpoint) {
        return "http://127.0.0.1:3000/api/v1/" + endpoint;
    };
    AuthService.prototype.login = function () {
        return this.http.get(this.apiUrl('email/login'))
            .map(function (response) { return response.json(); });
    };
    AuthService.prototype.logout = function () {
        return this.http.get(this.apiUrl('email/logout'))
            .map(function (response) { return response.json(); });
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(249);


/***/ })

},[625]);
//# sourceMappingURL=main.bundle.js.map