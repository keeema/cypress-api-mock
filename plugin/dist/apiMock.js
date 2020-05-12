module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./apiMock.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apiMock.ts":
/*!********************!*\
  !*** ./apiMock.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="common.d.ts" />
/// <reference types="cypress" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var http = __webpack_require__(/*! http */ "http");
function register(on, config) {
    config = Object.assign({ apiMockServer: { hostname: "127.0.0.1", hostPort: 3000 } }, config);
    startServer(config);
    on("task", {
        "api-mock:register": function (options) { return registerMock(options.pattern, options.response); },
        "api-mock:get-calls": function () { return getCalls(); },
        "api-mock:reset-calls": function () { return resetCalls(); },
        "api-mock:reset": function () { return reset(); },
    });
}
var mocks = new Map();
var calls = new Map();
function getCalls() {
    var result = {};
    calls.forEach(function (value, key) {
        if (result !== undefined)
            result[key] = value;
    });
    return result;
}
function resetCalls() {
    calls.clear();
    return null;
}
function reset() {
    resetCalls();
    mocks.clear();
    return null;
}
function registerMock(pattern, response) {
    mocks.set(pattern, response);
    return null;
}
function startServer(config) {
    var _this = this;
    var server = http.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, processRequest(req)];
                case 1:
                    _a.sent();
                    if (req.url !== undefined && mocks.has(req.url)) {
                        answer = prepareAnswer(req.url);
                        registerCall(req.url, answer);
                        answerOK(res, answer);
                    }
                    else {
                        answerNotFound(res);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    server.listen(config.apiMockServer.hostPort, config.apiMockServer.hostname, function () {
        log("Server running at http://" + config.apiMockServer.hostname + ":" + config.apiMockServer.hostPort + "/");
    });
}
function registerCall(url, answer) {
    var particularCalls = calls.get(url) || [];
    particularCalls.push(answer);
    calls.set(url, particularCalls);
}
function prepareAnswer(url) {
    var answer = mocks.get(url) || "";
    return typeof answer === "string" ? answer : JSON.stringify(answer);
}
function processRequest(req) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRequestData(req)];
                case 1:
                    data = _a.sent();
                    log("-> URL: " + req.url + " Data: " + data);
                    return [2 /*return*/, data];
            }
        });
    });
}
function answerOK(res, mockResult) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(mockResult);
    log("\x1b[32m" + ("<- Status: " + res.statusCode + " Response:" + mockResult));
}
function answerNotFound(res) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Mock not found");
    log("\x1b[31m" + ("<- Status: " + res.statusCode));
}
function getRequestData(req) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var allData = "";
                    req.on("data", function (data) { return (allData += data); });
                    req.on("end", function () { return resolve(allData); });
                })];
        });
    });
}
function log(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays(["API-MOCK", message], optionalParams, ["\x1b[0m"]));
}
module.exports = register;


/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBpTW9jay50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLG9DQUFvQztBQUNwQyxpQ0FBaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWpDLG1EQUE2QjtBQUU3QixTQUFTLFFBQVEsQ0FBQyxFQUF3QixFQUFFLE1BQThCO0lBQ3RFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU3RixXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7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QyxNQUFNLEVBQUUsVUFBQyxJQUFJLElBQUssUUFBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQztvQkFDNUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxjQUFPLENBQUMsT0FBTyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLEVBQUM7OztDQUNOO0FBRUQsU0FBUyxHQUFHLENBQUMsT0FBYTtJQUFFLHdCQUF3QjtTQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7UUFBeEIsdUNBQXdCOztJQUNoRCxPQUFPLENBQUMsR0FBRyxPQUFYLE9BQU8sa0JBQUssVUFBVSxFQUFFLE9BQU8sR0FBSyxjQUFjLEdBQUUsU0FBUyxJQUFFO0FBQ25FLENBQUM7QUFFRCxpQkFBUyxRQUFRLENBQUM7Ozs7Ozs7Ozs7OztBQ3hHbEIsaUMiLCJmaWxlIjoiYXBpTW9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBpTW9jay50c1wiKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb21tb24uZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cImN5cHJlc3NcIiAvPlxuXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyKG9uOiBDeXByZXNzLlBsdWdpbkV2ZW50cywgY29uZmlnPzogSUFwaU1vY2tDb25maWd1cmF0aW9uKTogdm9pZCB7XG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IGFwaU1vY2tTZXJ2ZXI6IHsgaG9zdG5hbWU6IFwiMTI3LjAuMC4xXCIsIGhvc3RQb3J0OiAzMDAwIH0gfSwgY29uZmlnKTtcblxuICAgIHN0YXJ0U2VydmVyKGNvbmZpZyk7XG4gICAgb24oXCJ0YXNrXCIsIHtcbiAgICAgICAgXCJhcGktbW9jazpyZWdpc3RlclwiOiAob3B0aW9uczogSUFwaU1vY2tPcHRpb25zKTogbnVsbCA9PiByZWdpc3Rlck1vY2sob3B0aW9ucy5wYXR0ZXJuLCBvcHRpb25zLnJlc3BvbnNlKSxcbiAgICAgICAgXCJhcGktbW9jazpnZXQtY2FsbHNcIjogKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSA9PiBnZXRDYWxscygpLFxuICAgICAgICBcImFwaS1tb2NrOnJlc2V0LWNhbGxzXCI6ICgpOiBudWxsID0+IHJlc2V0Q2FsbHMoKSxcbiAgICAgICAgXCJhcGktbW9jazpyZXNldFwiOiAoKTogbnVsbCA9PiByZXNldCgpLFxuICAgIH0pO1xufVxuXG5jb25zdCBtb2NrcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmcgfCBPYmplY3Q+KCk7XG5jb25zdCBjYWxscyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcblxuZnVuY3Rpb24gZ2V0Q2FsbHMoKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSA9IHt9O1xuICAgIGNhbGxzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0Q2FsbHMoKTogbnVsbCB7XG4gICAgY2FsbHMuY2xlYXIoKTtcbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKTogbnVsbCB7XG4gICAgcmVzZXRDYWxscygpO1xuICAgIG1vY2tzLmNsZWFyKCk7XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTW9jayhwYXR0ZXJuOiBzdHJpbmcsIHJlc3BvbnNlOiBzdHJpbmcgfCBPYmplY3QpOiBudWxsIHtcbiAgICBtb2Nrcy5zZXQocGF0dGVybiwgcmVzcG9uc2UpO1xuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gc3RhcnRTZXJ2ZXIoY29uZmlnOiBJQXBpTW9ja0NvbmZpZ3VyYXRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICAgICAgYXdhaXQgcHJvY2Vzc1JlcXVlc3QocmVxKTtcbiAgICAgICAgaWYgKHJlcS51cmwgIT09IHVuZGVmaW5lZCAmJiBtb2Nrcy5oYXMocmVxLnVybCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGFuc3dlciA9IHByZXBhcmVBbnN3ZXIocmVxLnVybCk7XG4gICAgICAgICAgICByZWdpc3RlckNhbGwocmVxLnVybCwgYW5zd2VyKTtcbiAgICAgICAgICAgIGFuc3dlck9LKHJlcywgYW5zd2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuc3dlck5vdEZvdW5kKHJlcyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlcnZlci5saXN0ZW4oY29uZmlnLmFwaU1vY2tTZXJ2ZXIuaG9zdFBvcnQsIGNvbmZpZy5hcGlNb2NrU2VydmVyLmhvc3RuYW1lLCAoKSA9PiB7XG4gICAgICAgIGxvZyhgU2VydmVyIHJ1bm5pbmcgYXQgaHR0cDovLyR7Y29uZmlnLmFwaU1vY2tTZXJ2ZXIuaG9zdG5hbWV9OiR7Y29uZmlnLmFwaU1vY2tTZXJ2ZXIuaG9zdFBvcnR9L2ApO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckNhbGwodXJsOiBzdHJpbmcsIGFuc3dlcjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcGFydGljdWxhckNhbGxzID0gY2FsbHMuZ2V0KHVybCkgfHwgW107XG4gICAgcGFydGljdWxhckNhbGxzLnB1c2goYW5zd2VyKTtcbiAgICBjYWxscy5zZXQodXJsLCBwYXJ0aWN1bGFyQ2FsbHMpO1xufVxuZnVuY3Rpb24gcHJlcGFyZUFuc3dlcih1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgYW5zd2VyID0gbW9ja3MuZ2V0KHVybCkgfHwgXCJcIjtcbiAgICByZXR1cm4gdHlwZW9mIGFuc3dlciA9PT0gXCJzdHJpbmdcIiA/IGFuc3dlciA6IEpTT04uc3RyaW5naWZ5KGFuc3dlcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NSZXF1ZXN0KHJlcTogaHR0cC5JbmNvbWluZ01lc3NhZ2UpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRSZXF1ZXN0RGF0YShyZXEpO1xuICAgIGxvZyhgLT4gVVJMOiAke3JlcS51cmx9IERhdGE6ICR7ZGF0YX1gKTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gYW5zd2VyT0socmVzOiBodHRwLlNlcnZlclJlc3BvbnNlLCBtb2NrUmVzdWx0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpblwiKTtcbiAgICByZXMuZW5kKG1vY2tSZXN1bHQpO1xuICAgIGxvZyhcIlxceDFiWzMybVwiICsgYDwtIFN0YXR1czogJHtyZXMuc3RhdHVzQ29kZX0gUmVzcG9uc2U6JHttb2NrUmVzdWx0fWApO1xufVxuXG5mdW5jdGlvbiBhbnN3ZXJOb3RGb3VuZChyZXM6IGh0dHAuU2VydmVyUmVzcG9uc2UpOiB2b2lkIHtcbiAgICByZXMuc3RhdHVzQ29kZSA9IDQwNDtcbiAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpblwiKTtcbiAgICByZXMuZW5kKFwiTW9jayBub3QgZm91bmRcIik7XG5cbiAgICBsb2coXCJcXHgxYlszMW1cIiArIGA8LSBTdGF0dXM6ICR7cmVzLnN0YXR1c0NvZGV9YCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFJlcXVlc3REYXRhKHJlcTogaHR0cC5JbmNvbWluZ01lc3NhZ2UpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGxldCBhbGxEYXRhID0gXCJcIjtcblxuICAgICAgICByZXEub24oXCJkYXRhXCIsIChkYXRhKSA9PiAoYWxsRGF0YSArPSBkYXRhKSk7XG4gICAgICAgIHJlcS5vbihcImVuZFwiLCAoKSA9PiByZXNvbHZlKGFsbERhdGEpKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiQVBJLU1PQ0tcIiwgbWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMsIFwiXFx4MWJbMG1cIik7XG59XG5cbmV4cG9ydCA9IHJlZ2lzdGVyO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiXSwic291cmNlUm9vdCI6IiJ9