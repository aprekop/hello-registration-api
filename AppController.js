"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var Knex = require("knex");
var class_validator_1 = require("class-validator");
var AppController = /** @class */ (function () {
    function AppController() {
        this.knex = Knex({
            debug: true,
            client: 'mssql',
            connection: {
                host: 'helloregistration.c9zzrp18lpz9.us-east-2.rds.amazonaws.com',
                user: 'helloUser',
                password: 'helloWorld!',
                database: 'Registration'
            }
        });
    }
    AppController.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select()
                            .from('User')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppController.prototype.post = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(user);
                        newUser = JSON.parse(user);
                        if (!this.checkData(newUser)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.knex
                                .insert({
                                'firstName': newUser.firstName,
                                'lastName': newUser.lastName,
                                'address1': newUser.address1,
                                'address2': newUser.address2,
                                'city': newUser.city,
                                'state': newUser.state,
                                'zip': newUser.zip,
                                'country': newUser.country
                            })
                                .into('User')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { status: 'success' }];
                    case 2: return [2 /*return*/, { status: 'error' }];
                }
            });
        });
    };
    AppController.prototype.getTest = function () {
        return { value: 'test' };
    };
    AppController.prototype.checkData = function (user) {
        var validator = new class_validator_1.Validator();
        //First Name
        if (!validator.isDefined(user.firstName) || !validator.maxLength(user.firstName, 50)) {
            return false;
        }
        //Last Name
        if (!validator.isDefined(user.lastName) || !validator.maxLength(user.lastName, 50)) {
            return false;
        }
        //Address 1
        if (!validator.isDefined(user.address1) || !validator.maxLength(user.address1, 100)) {
            return false;
        }
        //City
        if (!validator.isDefined(user.city) || !validator.maxLength(user.city, 50)) {
            return false;
        }
        //State
        if (!validator.isDefined(user.state) || !validator.maxLength(user.state, 2)) {
            return false;
        }
        //Zip
        if (!validator.isDefined(user.zip) || !validator.length(user.zip, 5, 5)) {
            return false;
        }
        //Country
        if (!validator.isDefined(user.country)) {
            return false;
        }
        return true;
    };
    __decorate([
        routing_controllers_1.Get()
    ], AppController.prototype, "getAll", null);
    __decorate([
        routing_controllers_1.Post(),
        __param(0, routing_controllers_1.Body())
    ], AppController.prototype, "post", null);
    __decorate([
        routing_controllers_1.Get('/test')
    ], AppController.prototype, "getTest", null);
    AppController = __decorate([
        routing_controllers_1.Controller('/users')
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
//# sourceMappingURL=AppController.js.map