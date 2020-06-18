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
/******/ 	return __webpack_require__(__webpack_require__.s = "./plugin/apiMock.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./plugin/apiMock.ts":
/*!***************************!*\
  !*** ./plugin/apiMock.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/// <reference path=\"common.d.ts\" />\r\n/// <reference types=\"cypress\" />\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __spreadArrays = (this && this.__spreadArrays) || function () {\r\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\r\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\r\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\r\n            r[k] = a[j];\r\n    return r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar http = __webpack_require__(/*! http */ \"http\");\r\nvar paramRegex = /\\$\\{(?![0-9])[.a-zA-Z0-9$_]+\\}/gm;\r\nfunction register(on, config) {\r\n    var fullConfig = Object.assign({ apiMockServer: { hostname: \"127.0.0.1\", hostPort: 3000 } }, config);\r\n    startServer(fullConfig);\r\n    on(\"task\", {\r\n        \"api-mock:register\": function (options) { return registerMock(options.pattern, options.response); },\r\n        \"api-mock:get-calls\": function () { return getCalls(); },\r\n        \"api-mock:reset-calls\": function () { return resetCalls(); },\r\n        \"api-mock:reset\": function () { return reset(); },\r\n    });\r\n}\r\nexports.default = register;\r\nvar mocks = new Map();\r\nvar calls = new Map();\r\nfunction getCalls() {\r\n    var result = {};\r\n    calls.forEach(function (value, key) {\r\n        if (result !== undefined) {\r\n            result[key] = value;\r\n        }\r\n    });\r\n    return result;\r\n}\r\nfunction resetCalls() {\r\n    calls.clear();\r\n    return null;\r\n}\r\nfunction reset() {\r\n    resetCalls();\r\n    mocks.clear();\r\n    return null;\r\n}\r\nfunction registerMock(pattern, response) {\r\n    mocks.set(pattern, response);\r\n    return null;\r\n}\r\nfunction startServer(config) {\r\n    var _this = this;\r\n    var server = http.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n        var body, answer, _a;\r\n        return __generator(this, function (_b) {\r\n            switch (_b.label) {\r\n                case 0:\r\n                    _b.trys.push([0, 2, , 3]);\r\n                    return [4 /*yield*/, processRequest(req)];\r\n                case 1:\r\n                    body = _b.sent();\r\n                    if (req.url !== undefined && mocks.has(req.url)) {\r\n                        answer = prepareAnswer(req.url, body);\r\n                        registerCall(req.url, answer);\r\n                        answerOK(res, answer);\r\n                    }\r\n                    else {\r\n                        answerNotFound(res);\r\n                    }\r\n                    return [3 /*break*/, 3];\r\n                case 2:\r\n                    _a = _b.sent();\r\n                    answerError(res);\r\n                    return [3 /*break*/, 3];\r\n                case 3: return [2 /*return*/];\r\n            }\r\n        });\r\n    }); });\r\n    server.listen(config.apiMockServer.hostPort, config.apiMockServer.hostname, function () {\r\n        log(\"Server running at http://\" + config.apiMockServer.hostname + \":\" + config.apiMockServer.hostPort + \"/\");\r\n    });\r\n}\r\nfunction registerCall(url, answer) {\r\n    var particularCalls = calls.get(url) || [];\r\n    particularCalls.push(answer);\r\n    calls.set(url, particularCalls);\r\n}\r\nfunction prepareAnswer(url, body) {\r\n    var answer = mocks.get(url) || \"\";\r\n    return parseParameters(answer, body);\r\n}\r\nfunction parseParameters(answer, body) {\r\n    var answerStr = typeof answer === \"string\" ? answer : JSON.stringify(answer);\r\n    var regex = new RegExp(paramRegex);\r\n    var bodyObj;\r\n    return answerStr.replace(regex, function (match) {\r\n        if (bodyObj === undefined) {\r\n            bodyObj = JSON.parse(body);\r\n        }\r\n        return getParamValue(bodyObj, match);\r\n    });\r\n}\r\nfunction getParamValue(bodyObj, param) {\r\n    try {\r\n        var cleanParam = param.substr(2, param.length - 3);\r\n        var path = cleanParam.split(\".\");\r\n        var result = bodyObj;\r\n        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {\r\n            var part = path_1[_i];\r\n            if (part !== \"body\") {\r\n                result = result[part];\r\n            }\r\n        }\r\n        return result ? result.toString() : result;\r\n    }\r\n    catch (err) {\r\n        log(\"\\x1b[31m\" + (\"Error in parsing param '\" + param + \"':  \" + err));\r\n        return \"error\";\r\n    }\r\n}\r\nfunction processRequest(req) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var data;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, getRequestData(req)];\r\n                case 1:\r\n                    data = _a.sent();\r\n                    log(\"-> URL: \" + req.url + \" Data: \" + data);\r\n                    return [2 /*return*/, data];\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction answerOK(res, mockResult) {\r\n    res.statusCode = 200;\r\n    res.setHeader(\"Content-Type\", \"text/plain\");\r\n    res.end(mockResult);\r\n    log(\"\\x1b[32m\" + (\"<- Status: \" + res.statusCode + \" Response:\" + mockResult));\r\n}\r\nfunction answerNotFound(res) {\r\n    res.statusCode = 404;\r\n    res.setHeader(\"Content-Type\", \"text/plain\");\r\n    res.end(\"Mock not found\");\r\n    log(\"\\x1b[31m\" + (\"<- Status: \" + res.statusCode));\r\n}\r\nfunction answerError(res) {\r\n    res.statusCode = 500;\r\n    res.setHeader(\"Content-Type\", \"text/plain\");\r\n    res.end(\"Internal Server Error. Problem in creating response.\");\r\n    log(\"\\x1b[31m\" + (\"<- Status: \" + res.statusCode));\r\n}\r\nfunction getRequestData(req) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            return [2 /*return*/, new Promise(function (resolve) {\r\n                    var allData = \"\";\r\n                    req.on(\"data\", function (data) { return (allData += data); });\r\n                    req.on(\"end\", function () { return resolve(allData); });\r\n                })];\r\n        });\r\n    });\r\n}\r\nfunction log(message) {\r\n    var optionalParams = [];\r\n    for (var _i = 1; _i < arguments.length; _i++) {\r\n        optionalParams[_i - 1] = arguments[_i];\r\n    }\r\n    console.log.apply(console, __spreadArrays([\"API-MOCK\", message], optionalParams, [\"\\x1b[0m\"]));\r\n}\r\nmodule.exports = register;\r\n\n\n//# sourceURL=webpack:///./plugin/apiMock.ts?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ })

/******/ });