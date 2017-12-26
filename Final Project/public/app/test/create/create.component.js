System.register(['@angular/core', '@angular/router', '../test.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, test_service_1;
    var CreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (test_service_1_1) {
                test_service_1 = test_service_1_1;
            }],
        execute: function() {
            CreateComponent = (function () {
                function CreateComponent(_router, _testService) {
                    this._router = _router;
                    this._testService = _testService;
                    this.test = {};
                }
                CreateComponent.prototype.create = function () {
                    var _this = this;
                    alert('Thank you for submitting a form! We will be getting back to you with more information shortly!');
                    this._testService
                        .create(this.test)
                        .subscribe(function (createdTest) { return _this._router.navigate(['/',
                        createdTest._id]); }, function (error) { return _this.errorMessage = error; });
                };
                CreateComponent = __decorate([
                    core_1.Component({
                        selector: 'create',
                        templateUrl: 'app/test/create/create.template.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, test_service_1.TestService])
                ], CreateComponent);
                return CreateComponent;
            }());
            exports_1("CreateComponent", CreateComponent);
        }
    }
});
//# sourceMappingURL=create.component.js.map