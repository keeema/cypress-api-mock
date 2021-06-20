/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/depd/index.js":
/*!************************************!*\
  !*** ./node_modules/depd/index.js ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*!\n * depd\n * Copyright(c) 2014-2017 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n/**\n * Module dependencies.\n */\n\nvar callSiteToString = __webpack_require__(/*! ./lib/compat */ \"./node_modules/depd/lib/compat/index.js\").callSiteToString\nvar eventListenerCount = __webpack_require__(/*! ./lib/compat */ \"./node_modules/depd/lib/compat/index.js\").eventListenerCount\nvar relative = __webpack_require__(/*! path */ \"path\").relative\n\n/**\n * Module exports.\n */\n\nmodule.exports = depd\n\n/**\n * Get the path to base files on.\n */\n\nvar basePath = process.cwd()\n\n/**\n * Determine if namespace is contained in the string.\n */\n\nfunction containsNamespace (str, namespace) {\n  var vals = str.split(/[ ,]+/)\n  var ns = String(namespace).toLowerCase()\n\n  for (var i = 0; i < vals.length; i++) {\n    var val = vals[i]\n\n    // namespace contained\n    if (val && (val === '*' || val.toLowerCase() === ns)) {\n      return true\n    }\n  }\n\n  return false\n}\n\n/**\n * Convert a data descriptor to accessor descriptor.\n */\n\nfunction convertDataDescriptorToAccessor (obj, prop, message) {\n  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)\n  var value = descriptor.value\n\n  descriptor.get = function getter () { return value }\n\n  if (descriptor.writable) {\n    descriptor.set = function setter (val) { return (value = val) }\n  }\n\n  delete descriptor.value\n  delete descriptor.writable\n\n  Object.defineProperty(obj, prop, descriptor)\n\n  return descriptor\n}\n\n/**\n * Create arguments string to keep arity.\n */\n\nfunction createArgumentsString (arity) {\n  var str = ''\n\n  for (var i = 0; i < arity; i++) {\n    str += ', arg' + i\n  }\n\n  return str.substr(2)\n}\n\n/**\n * Create stack string from stack.\n */\n\nfunction createStackString (stack) {\n  var str = this.name + ': ' + this.namespace\n\n  if (this.message) {\n    str += ' deprecated ' + this.message\n  }\n\n  for (var i = 0; i < stack.length; i++) {\n    str += '\\n    at ' + callSiteToString(stack[i])\n  }\n\n  return str\n}\n\n/**\n * Create deprecate for namespace in caller.\n */\n\nfunction depd (namespace) {\n  if (!namespace) {\n    throw new TypeError('argument namespace is required')\n  }\n\n  var stack = getStack()\n  var site = callSiteLocation(stack[1])\n  var file = site[0]\n\n  function deprecate (message) {\n    // call to self as log\n    log.call(deprecate, message)\n  }\n\n  deprecate._file = file\n  deprecate._ignored = isignored(namespace)\n  deprecate._namespace = namespace\n  deprecate._traced = istraced(namespace)\n  deprecate._warned = Object.create(null)\n\n  deprecate.function = wrapfunction\n  deprecate.property = wrapproperty\n\n  return deprecate\n}\n\n/**\n * Determine if namespace is ignored.\n */\n\nfunction isignored (namespace) {\n  /* istanbul ignore next: tested in a child processs */\n  if (process.noDeprecation) {\n    // --no-deprecation support\n    return true\n  }\n\n  var str = process.env.NO_DEPRECATION || ''\n\n  // namespace ignored\n  return containsNamespace(str, namespace)\n}\n\n/**\n * Determine if namespace is traced.\n */\n\nfunction istraced (namespace) {\n  /* istanbul ignore next: tested in a child processs */\n  if (process.traceDeprecation) {\n    // --trace-deprecation support\n    return true\n  }\n\n  var str = process.env.TRACE_DEPRECATION || ''\n\n  // namespace traced\n  return containsNamespace(str, namespace)\n}\n\n/**\n * Display deprecation message.\n */\n\nfunction log (message, site) {\n  var haslisteners = eventListenerCount(process, 'deprecation') !== 0\n\n  // abort early if no destination\n  if (!haslisteners && this._ignored) {\n    return\n  }\n\n  var caller\n  var callFile\n  var callSite\n  var depSite\n  var i = 0\n  var seen = false\n  var stack = getStack()\n  var file = this._file\n\n  if (site) {\n    // provided site\n    depSite = site\n    callSite = callSiteLocation(stack[1])\n    callSite.name = depSite.name\n    file = callSite[0]\n  } else {\n    // get call site\n    i = 2\n    depSite = callSiteLocation(stack[i])\n    callSite = depSite\n  }\n\n  // get caller of deprecated thing in relation to file\n  for (; i < stack.length; i++) {\n    caller = callSiteLocation(stack[i])\n    callFile = caller[0]\n\n    if (callFile === file) {\n      seen = true\n    } else if (callFile === this._file) {\n      file = this._file\n    } else if (seen) {\n      break\n    }\n  }\n\n  var key = caller\n    ? depSite.join(':') + '__' + caller.join(':')\n    : undefined\n\n  if (key !== undefined && key in this._warned) {\n    // already warned\n    return\n  }\n\n  this._warned[key] = true\n\n  // generate automatic message from call site\n  var msg = message\n  if (!msg) {\n    msg = callSite === depSite || !callSite.name\n      ? defaultMessage(depSite)\n      : defaultMessage(callSite)\n  }\n\n  // emit deprecation if listeners exist\n  if (haslisteners) {\n    var err = DeprecationError(this._namespace, msg, stack.slice(i))\n    process.emit('deprecation', err)\n    return\n  }\n\n  // format and write message\n  var format = process.stderr.isTTY\n    ? formatColor\n    : formatPlain\n  var output = format.call(this, msg, caller, stack.slice(i))\n  process.stderr.write(output + '\\n', 'utf8')\n}\n\n/**\n * Get call site location as array.\n */\n\nfunction callSiteLocation (callSite) {\n  var file = callSite.getFileName() || '<anonymous>'\n  var line = callSite.getLineNumber()\n  var colm = callSite.getColumnNumber()\n\n  if (callSite.isEval()) {\n    file = callSite.getEvalOrigin() + ', ' + file\n  }\n\n  var site = [file, line, colm]\n\n  site.callSite = callSite\n  site.name = callSite.getFunctionName()\n\n  return site\n}\n\n/**\n * Generate a default message from the site.\n */\n\nfunction defaultMessage (site) {\n  var callSite = site.callSite\n  var funcName = site.name\n\n  // make useful anonymous name\n  if (!funcName) {\n    funcName = '<anonymous@' + formatLocation(site) + '>'\n  }\n\n  var context = callSite.getThis()\n  var typeName = context && callSite.getTypeName()\n\n  // ignore useless type name\n  if (typeName === 'Object') {\n    typeName = undefined\n  }\n\n  // make useful type name\n  if (typeName === 'Function') {\n    typeName = context.name || typeName\n  }\n\n  return typeName && callSite.getMethodName()\n    ? typeName + '.' + funcName\n    : funcName\n}\n\n/**\n * Format deprecation message without color.\n */\n\nfunction formatPlain (msg, caller, stack) {\n  var timestamp = new Date().toUTCString()\n\n  var formatted = timestamp +\n    ' ' + this._namespace +\n    ' deprecated ' + msg\n\n  // add stack trace\n  if (this._traced) {\n    for (var i = 0; i < stack.length; i++) {\n      formatted += '\\n    at ' + callSiteToString(stack[i])\n    }\n\n    return formatted\n  }\n\n  if (caller) {\n    formatted += ' at ' + formatLocation(caller)\n  }\n\n  return formatted\n}\n\n/**\n * Format deprecation message with color.\n */\n\nfunction formatColor (msg, caller, stack) {\n  var formatted = '\\x1b[36;1m' + this._namespace + '\\x1b[22;39m' + // bold cyan\n    ' \\x1b[33;1mdeprecated\\x1b[22;39m' + // bold yellow\n    ' \\x1b[0m' + msg + '\\x1b[39m' // reset\n\n  // add stack trace\n  if (this._traced) {\n    for (var i = 0; i < stack.length; i++) {\n      formatted += '\\n    \\x1b[36mat ' + callSiteToString(stack[i]) + '\\x1b[39m' // cyan\n    }\n\n    return formatted\n  }\n\n  if (caller) {\n    formatted += ' \\x1b[36m' + formatLocation(caller) + '\\x1b[39m' // cyan\n  }\n\n  return formatted\n}\n\n/**\n * Format call site location.\n */\n\nfunction formatLocation (callSite) {\n  return relative(basePath, callSite[0]) +\n    ':' + callSite[1] +\n    ':' + callSite[2]\n}\n\n/**\n * Get the stack as array of call sites.\n */\n\nfunction getStack () {\n  var limit = Error.stackTraceLimit\n  var obj = {}\n  var prep = Error.prepareStackTrace\n\n  Error.prepareStackTrace = prepareObjectStackTrace\n  Error.stackTraceLimit = Math.max(10, limit)\n\n  // capture the stack\n  Error.captureStackTrace(obj)\n\n  // slice this function off the top\n  var stack = obj.stack.slice(1)\n\n  Error.prepareStackTrace = prep\n  Error.stackTraceLimit = limit\n\n  return stack\n}\n\n/**\n * Capture call site stack from v8.\n */\n\nfunction prepareObjectStackTrace (obj, stack) {\n  return stack\n}\n\n/**\n * Return a wrapped function in a deprecation message.\n */\n\nfunction wrapfunction (fn, message) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('argument fn must be a function')\n  }\n\n  var args = createArgumentsString(fn.length)\n  var deprecate = this // eslint-disable-line no-unused-vars\n  var stack = getStack()\n  var site = callSiteLocation(stack[1])\n\n  site.name = fn.name\n\n   // eslint-disable-next-line no-eval\n  var deprecatedfn = eval('(function (' + args + ') {\\n' +\n    '\"use strict\"\\n' +\n    'log.call(deprecate, message, site)\\n' +\n    'return fn.apply(this, arguments)\\n' +\n    '})')\n\n  return deprecatedfn\n}\n\n/**\n * Wrap property in a deprecation message.\n */\n\nfunction wrapproperty (obj, prop, message) {\n  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {\n    throw new TypeError('argument obj must be object')\n  }\n\n  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)\n\n  if (!descriptor) {\n    throw new TypeError('must call property on owner object')\n  }\n\n  if (!descriptor.configurable) {\n    throw new TypeError('property must be configurable')\n  }\n\n  var deprecate = this\n  var stack = getStack()\n  var site = callSiteLocation(stack[1])\n\n  // set site name\n  site.name = prop\n\n  // convert data descriptor\n  if ('value' in descriptor) {\n    descriptor = convertDataDescriptorToAccessor(obj, prop, message)\n  }\n\n  var get = descriptor.get\n  var set = descriptor.set\n\n  // wrap getter\n  if (typeof get === 'function') {\n    descriptor.get = function getter () {\n      log.call(deprecate, message, site)\n      return get.apply(this, arguments)\n    }\n  }\n\n  // wrap setter\n  if (typeof set === 'function') {\n    descriptor.set = function setter () {\n      log.call(deprecate, message, site)\n      return set.apply(this, arguments)\n    }\n  }\n\n  Object.defineProperty(obj, prop, descriptor)\n}\n\n/**\n * Create DeprecationError for deprecation\n */\n\nfunction DeprecationError (namespace, message, stack) {\n  var error = new Error()\n  var stackString\n\n  Object.defineProperty(error, 'constructor', {\n    value: DeprecationError\n  })\n\n  Object.defineProperty(error, 'message', {\n    configurable: true,\n    enumerable: false,\n    value: message,\n    writable: true\n  })\n\n  Object.defineProperty(error, 'name', {\n    enumerable: false,\n    configurable: true,\n    value: 'DeprecationError',\n    writable: true\n  })\n\n  Object.defineProperty(error, 'namespace', {\n    configurable: true,\n    enumerable: false,\n    value: namespace,\n    writable: true\n  })\n\n  Object.defineProperty(error, 'stack', {\n    configurable: true,\n    enumerable: false,\n    get: function () {\n      if (stackString !== undefined) {\n        return stackString\n      }\n\n      // prepare stack trace\n      return (stackString = createStackString.call(this, stack))\n    },\n    set: function setter (val) {\n      stackString = val\n    }\n  })\n\n  return error\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/depd/index.js?");

/***/ }),

/***/ "./node_modules/depd/lib/compat/callsite-tostring.js":
/*!***********************************************************!*\
  !*** ./node_modules/depd/lib/compat/callsite-tostring.js ***!
  \***********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 13:0-14 */
/***/ ((module) => {

"use strict";
eval("/*!\n * depd\n * Copyright(c) 2014 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n */\n\nmodule.exports = callSiteToString\n\n/**\n * Format a CallSite file location to a string.\n */\n\nfunction callSiteFileLocation (callSite) {\n  var fileName\n  var fileLocation = ''\n\n  if (callSite.isNative()) {\n    fileLocation = 'native'\n  } else if (callSite.isEval()) {\n    fileName = callSite.getScriptNameOrSourceURL()\n    if (!fileName) {\n      fileLocation = callSite.getEvalOrigin()\n    }\n  } else {\n    fileName = callSite.getFileName()\n  }\n\n  if (fileName) {\n    fileLocation += fileName\n\n    var lineNumber = callSite.getLineNumber()\n    if (lineNumber != null) {\n      fileLocation += ':' + lineNumber\n\n      var columnNumber = callSite.getColumnNumber()\n      if (columnNumber) {\n        fileLocation += ':' + columnNumber\n      }\n    }\n  }\n\n  return fileLocation || 'unknown source'\n}\n\n/**\n * Format a CallSite to a string.\n */\n\nfunction callSiteToString (callSite) {\n  var addSuffix = true\n  var fileLocation = callSiteFileLocation(callSite)\n  var functionName = callSite.getFunctionName()\n  var isConstructor = callSite.isConstructor()\n  var isMethodCall = !(callSite.isToplevel() || isConstructor)\n  var line = ''\n\n  if (isMethodCall) {\n    var methodName = callSite.getMethodName()\n    var typeName = getConstructorName(callSite)\n\n    if (functionName) {\n      if (typeName && functionName.indexOf(typeName) !== 0) {\n        line += typeName + '.'\n      }\n\n      line += functionName\n\n      if (methodName && functionName.lastIndexOf('.' + methodName) !== functionName.length - methodName.length - 1) {\n        line += ' [as ' + methodName + ']'\n      }\n    } else {\n      line += typeName + '.' + (methodName || '<anonymous>')\n    }\n  } else if (isConstructor) {\n    line += 'new ' + (functionName || '<anonymous>')\n  } else if (functionName) {\n    line += functionName\n  } else {\n    addSuffix = false\n    line += fileLocation\n  }\n\n  if (addSuffix) {\n    line += ' (' + fileLocation + ')'\n  }\n\n  return line\n}\n\n/**\n * Get constructor name of reviver.\n */\n\nfunction getConstructorName (obj) {\n  var receiver = obj.receiver\n  return (receiver.constructor && receiver.constructor.name) || null\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/depd/lib/compat/callsite-tostring.js?");

/***/ }),

/***/ "./node_modules/depd/lib/compat/event-listener-count.js":
/*!**************************************************************!*\
  !*** ./node_modules/depd/lib/compat/event-listener-count.js ***!
  \**************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 14:0-14 */
/***/ ((module) => {

"use strict";
eval("/*!\n * depd\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = eventListenerCount\n\n/**\n * Get the count of listeners on an event emitter of a specific type.\n */\n\nfunction eventListenerCount (emitter, type) {\n  return emitter.listeners(type).length\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/depd/lib/compat/event-listener-count.js?");

/***/ }),

/***/ "./node_modules/depd/lib/compat/index.js":
/*!***********************************************!*\
  !*** ./node_modules/depd/lib/compat/index.js ***!
  \***********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/*! CommonJS bailout: module.exports is used directly at 21:13-27 */
/*! CommonJS bailout: module.exports is used directly at 45:13-27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*!\n * depd\n * Copyright(c) 2014-2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar EventEmitter = __webpack_require__(/*! events */ \"events\").EventEmitter\n\n/**\n * Module exports.\n * @public\n */\n\nlazyProperty(module.exports, 'callSiteToString', function callSiteToString () {\n  var limit = Error.stackTraceLimit\n  var obj = {}\n  var prep = Error.prepareStackTrace\n\n  function prepareObjectStackTrace (obj, stack) {\n    return stack\n  }\n\n  Error.prepareStackTrace = prepareObjectStackTrace\n  Error.stackTraceLimit = 2\n\n  // capture the stack\n  Error.captureStackTrace(obj)\n\n  // slice the stack\n  var stack = obj.stack.slice()\n\n  Error.prepareStackTrace = prep\n  Error.stackTraceLimit = limit\n\n  return stack[0].toString ? toString : __webpack_require__(/*! ./callsite-tostring */ \"./node_modules/depd/lib/compat/callsite-tostring.js\")\n})\n\nlazyProperty(module.exports, 'eventListenerCount', function eventListenerCount () {\n  return EventEmitter.listenerCount || __webpack_require__(/*! ./event-listener-count */ \"./node_modules/depd/lib/compat/event-listener-count.js\")\n})\n\n/**\n * Define a lazy property.\n */\n\nfunction lazyProperty (obj, prop, getter) {\n  function get () {\n    var val = getter()\n\n    Object.defineProperty(obj, prop, {\n      configurable: true,\n      enumerable: true,\n      value: val\n    })\n\n    return val\n  }\n\n  Object.defineProperty(obj, prop, {\n    configurable: true,\n    enumerable: true,\n    get: get\n  })\n}\n\n/**\n * Call toString() on the obj\n */\n\nfunction toString (obj) {\n  return obj.toString()\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/depd/lib/compat/index.js?");

/***/ }),

/***/ "./node_modules/http-errors/index.js":
/*!*******************************************!*\
  !*** ./node_modules/http-errors/index.js ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 26:0-14 */
/*! CommonJS bailout: module.exports is used directly at 31:27-41 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*!\n * http-errors\n * Copyright(c) 2014 Jonathan Ong\n * Copyright(c) 2016 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar deprecate = __webpack_require__(/*! depd */ \"./node_modules/depd/index.js\")('http-errors')\nvar setPrototypeOf = __webpack_require__(/*! setprototypeof */ \"./node_modules/setprototypeof/index.js\")\nvar statuses = __webpack_require__(/*! statuses */ \"./node_modules/statuses/index.js\")\nvar inherits = __webpack_require__(/*! inherits */ \"./node_modules/inherits/inherits.js\")\nvar toIdentifier = __webpack_require__(/*! toidentifier */ \"./node_modules/toidentifier/index.js\")\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = createError\nmodule.exports.HttpError = createHttpErrorConstructor()\nmodule.exports.isHttpError = createIsHttpErrorFunction(module.exports.HttpError)\n\n// Populate exports for all constructors\npopulateConstructorExports(module.exports, statuses.codes, module.exports.HttpError)\n\n/**\n * Get the code class of a status code.\n * @private\n */\n\nfunction codeClass (status) {\n  return Number(String(status).charAt(0) + '00')\n}\n\n/**\n * Create a new HTTP Error.\n *\n * @returns {Error}\n * @public\n */\n\nfunction createError () {\n  // so much arity going on ~_~\n  var err\n  var msg\n  var status = 500\n  var props = {}\n  for (var i = 0; i < arguments.length; i++) {\n    var arg = arguments[i]\n    if (arg instanceof Error) {\n      err = arg\n      status = err.status || err.statusCode || status\n      continue\n    }\n    switch (typeof arg) {\n      case 'string':\n        msg = arg\n        break\n      case 'number':\n        status = arg\n        if (i !== 0) {\n          deprecate('non-first-argument status code; replace with createError(' + arg + ', ...)')\n        }\n        break\n      case 'object':\n        props = arg\n        break\n    }\n  }\n\n  if (typeof status === 'number' && (status < 400 || status >= 600)) {\n    deprecate('non-error status code; use only 4xx or 5xx status codes')\n  }\n\n  if (typeof status !== 'number' ||\n    (!statuses[status] && (status < 400 || status >= 600))) {\n    status = 500\n  }\n\n  // constructor\n  var HttpError = createError[status] || createError[codeClass(status)]\n\n  if (!err) {\n    // create error\n    err = HttpError\n      ? new HttpError(msg)\n      : new Error(msg || statuses[status])\n    Error.captureStackTrace(err, createError)\n  }\n\n  if (!HttpError || !(err instanceof HttpError) || err.status !== status) {\n    // add properties to generic error\n    err.expose = status < 500\n    err.status = err.statusCode = status\n  }\n\n  for (var key in props) {\n    if (key !== 'status' && key !== 'statusCode') {\n      err[key] = props[key]\n    }\n  }\n\n  return err\n}\n\n/**\n * Create HTTP error abstract base class.\n * @private\n */\n\nfunction createHttpErrorConstructor () {\n  function HttpError () {\n    throw new TypeError('cannot construct abstract class')\n  }\n\n  inherits(HttpError, Error)\n\n  return HttpError\n}\n\n/**\n * Create a constructor for a client error.\n * @private\n */\n\nfunction createClientErrorConstructor (HttpError, name, code) {\n  var className = toClassName(name)\n\n  function ClientError (message) {\n    // create the error object\n    var msg = message != null ? message : statuses[code]\n    var err = new Error(msg)\n\n    // capture a stack trace to the construction point\n    Error.captureStackTrace(err, ClientError)\n\n    // adjust the [[Prototype]]\n    setPrototypeOf(err, ClientError.prototype)\n\n    // redefine the error message\n    Object.defineProperty(err, 'message', {\n      enumerable: true,\n      configurable: true,\n      value: msg,\n      writable: true\n    })\n\n    // redefine the error name\n    Object.defineProperty(err, 'name', {\n      enumerable: false,\n      configurable: true,\n      value: className,\n      writable: true\n    })\n\n    return err\n  }\n\n  inherits(ClientError, HttpError)\n  nameFunc(ClientError, className)\n\n  ClientError.prototype.status = code\n  ClientError.prototype.statusCode = code\n  ClientError.prototype.expose = true\n\n  return ClientError\n}\n\n/**\n * Create function to test is a value is a HttpError.\n * @private\n */\n\nfunction createIsHttpErrorFunction (HttpError) {\n  return function isHttpError (val) {\n    if (!val || typeof val !== 'object') {\n      return false\n    }\n\n    if (val instanceof HttpError) {\n      return true\n    }\n\n    return val instanceof Error &&\n      typeof val.expose === 'boolean' &&\n      typeof val.statusCode === 'number' && val.status === val.statusCode\n  }\n}\n\n/**\n * Create a constructor for a server error.\n * @private\n */\n\nfunction createServerErrorConstructor (HttpError, name, code) {\n  var className = toClassName(name)\n\n  function ServerError (message) {\n    // create the error object\n    var msg = message != null ? message : statuses[code]\n    var err = new Error(msg)\n\n    // capture a stack trace to the construction point\n    Error.captureStackTrace(err, ServerError)\n\n    // adjust the [[Prototype]]\n    setPrototypeOf(err, ServerError.prototype)\n\n    // redefine the error message\n    Object.defineProperty(err, 'message', {\n      enumerable: true,\n      configurable: true,\n      value: msg,\n      writable: true\n    })\n\n    // redefine the error name\n    Object.defineProperty(err, 'name', {\n      enumerable: false,\n      configurable: true,\n      value: className,\n      writable: true\n    })\n\n    return err\n  }\n\n  inherits(ServerError, HttpError)\n  nameFunc(ServerError, className)\n\n  ServerError.prototype.status = code\n  ServerError.prototype.statusCode = code\n  ServerError.prototype.expose = false\n\n  return ServerError\n}\n\n/**\n * Set the name of a function, if possible.\n * @private\n */\n\nfunction nameFunc (func, name) {\n  var desc = Object.getOwnPropertyDescriptor(func, 'name')\n\n  if (desc && desc.configurable) {\n    desc.value = name\n    Object.defineProperty(func, 'name', desc)\n  }\n}\n\n/**\n * Populate the exports object with constructors for every error class.\n * @private\n */\n\nfunction populateConstructorExports (exports, codes, HttpError) {\n  codes.forEach(function forEachCode (code) {\n    var CodeError\n    var name = toIdentifier(statuses[code])\n\n    switch (codeClass(code)) {\n      case 400:\n        CodeError = createClientErrorConstructor(HttpError, name, code)\n        break\n      case 500:\n        CodeError = createServerErrorConstructor(HttpError, name, code)\n        break\n    }\n\n    if (CodeError) {\n      // export the constructor\n      exports[code] = CodeError\n      exports[name] = CodeError\n    }\n  })\n\n  // backwards-compatibility\n  exports[\"I'mateapot\"] = deprecate.function(exports.ImATeapot,\n    '\"I\\'mateapot\"; use \"ImATeapot\" instead')\n}\n\n/**\n * Get a class name from a name identifier.\n * @private\n */\n\nfunction toClassName (name) {\n  return name.substr(-5) !== 'Error'\n    ? name + 'Error'\n    : name\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/http-errors/index.js?");

/***/ }),

/***/ "./node_modules/inherits/inherits.js":
/*!*******************************************!*\
  !*** ./node_modules/inherits/inherits.js ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:2-16 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("try {\n  var util = __webpack_require__(/*! util */ \"util\");\n  /* istanbul ignore next */\n  if (typeof util.inherits !== 'function') throw '';\n  module.exports = util.inherits;\n} catch (e) {\n  /* istanbul ignore next */\n  module.exports = __webpack_require__(/*! ./inherits_browser.js */ \"./node_modules/inherits/inherits_browser.js\");\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/inherits/inherits.js?");

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:2-16 */
/*! CommonJS bailout: module.exports is used directly at 18:2-16 */
/***/ ((module) => {

eval("if (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    if (superCtor) {\n      ctor.super_ = superCtor\n      ctor.prototype = Object.create(superCtor.prototype, {\n        constructor: {\n          value: ctor,\n          enumerable: false,\n          writable: true,\n          configurable: true\n        }\n      })\n    }\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    if (superCtor) {\n      ctor.super_ = superCtor\n      var TempCtor = function () {}\n      TempCtor.prototype = superCtor.prototype\n      ctor.prototype = new TempCtor()\n      ctor.prototype.constructor = ctor\n    }\n  }\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/inherits/inherits_browser.js?");

/***/ }),

/***/ "./node_modules/multiparty/index.js":
/*!******************************************!*\
  !*** ./node_modules/multiparty/index.js ***!
  \******************************************/
/*! default exports */
/*! export Form [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("/*!\n * multiparty\n * Copyright(c) 2013 Felix Geisendörfer\n * Copyright(c) 2014 Andrew Kelley\n * Copyright(c) 2014 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\nvar createError = __webpack_require__(/*! http-errors */ \"./node_modules/http-errors/index.js\")\nvar uid = __webpack_require__(/*! uid-safe */ \"./node_modules/uid-safe/index.js\")\nvar stream = __webpack_require__(/*! stream */ \"stream\");\nvar util = __webpack_require__(/*! util */ \"util\");\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar os = __webpack_require__(/*! os */ \"os\");\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"./node_modules/safe-buffer/index.js\").Buffer\nvar StringDecoder = __webpack_require__(/*! string_decoder */ \"string_decoder\").StringDecoder;\n\nvar START = 0;\nvar START_BOUNDARY = 1;\nvar HEADER_FIELD_START = 2;\nvar HEADER_FIELD = 3;\nvar HEADER_VALUE_START = 4;\nvar HEADER_VALUE = 5;\nvar HEADER_VALUE_ALMOST_DONE = 6;\nvar HEADERS_ALMOST_DONE = 7;\nvar PART_DATA_START = 8;\nvar PART_DATA = 9;\nvar CLOSE_BOUNDARY = 10;\nvar END = 11;\n\nvar LF = 10;\nvar CR = 13;\nvar SPACE = 32;\nvar HYPHEN = 45;\nvar COLON = 58;\nvar A = 97;\nvar Z = 122;\n\nvar CONTENT_TYPE_RE = /^multipart\\/(?:form-data|related)(?:;|$)/i;\nvar CONTENT_TYPE_PARAM_RE = /;\\s*([^=]+)=(?:\"([^\"]+)\"|([^;]+))/gi;\nvar FILE_EXT_RE = /(\\.[_\\-a-zA-Z0-9]{0,16})[\\S\\s]*/;\nvar LAST_BOUNDARY_SUFFIX_LEN = 4; // --\\r\\n\n\nexports.Form = Form;\n\nutil.inherits(Form, stream.Writable);\nfunction Form(options) {\n  var opts = options || {}\n  var self = this;\n  stream.Writable.call(self, { emitClose: false })\n\n  self.error = null;\n\n  self.autoFields = !!opts.autoFields\n  self.autoFiles = !!opts.autoFiles\n\n  self.maxFields = opts.maxFields || 1000\n  self.maxFieldsSize = opts.maxFieldsSize || 2 * 1024 * 1024\n  self.maxFilesSize = opts.maxFilesSize || Infinity\n  self.uploadDir = opts.uploadDir || os.tmpdir()\n  self.encoding = opts.encoding || 'utf8'\n\n  self.bytesReceived = 0;\n  self.bytesExpected = null;\n\n  self.openedFiles = [];\n  self.totalFieldSize = 0;\n  self.totalFieldCount = 0;\n  self.totalFileSize = 0;\n  self.flushing = 0;\n\n  self.backpressure = false;\n  self.writeCbs = [];\n\n  self.emitQueue = [];\n\n  self.on('newListener', function(eventName) {\n    if (eventName === 'file') {\n      self.autoFiles = true;\n    } else if (eventName === 'field') {\n      self.autoFields = true;\n    }\n  });\n}\n\nForm.prototype.parse = function(req, cb) {\n  var called = false;\n  var self = this;\n  var waitend = true;\n\n  self.on('close', onClosed)\n\n  if (cb) {\n    // if the user supplies a callback, this implies autoFields and autoFiles\n    self.autoFields = true;\n    self.autoFiles = true;\n\n    // wait for request to end before calling cb\n    var end = function (done) {\n      if (called) return;\n\n      called = true;\n\n      // wait for req events to fire\n      process.nextTick(function() {\n        if (waitend && req.readable) {\n          // dump rest of request\n          req.resume();\n          req.once('end', done);\n          return;\n        }\n\n        done();\n      });\n    };\n\n    var fields = {};\n    var files = {};\n    self.on('error', function(err) {\n      end(function() {\n        cb(err);\n      });\n    });\n    self.on('field', function(name, value) {\n      var fieldsArray = fields[name] || (fields[name] = []);\n      fieldsArray.push(value);\n    });\n    self.on('file', function(name, file) {\n      var filesArray = files[name] || (files[name] = []);\n      filesArray.push(file);\n    });\n    self.on('close', function() {\n      end(function() {\n        cb(null, fields, files);\n      });\n    });\n  }\n\n  self.handleError = handleError;\n  self.bytesExpected = getBytesExpected(req.headers);\n\n  req.on('end', onReqEnd);\n  req.on('error', function(err) {\n    waitend = false;\n    handleError(err);\n  });\n  req.on('aborted', onReqAborted);\n\n  var state = req._readableState;\n  if (req._decoder || (state && (state.encoding || state.decoder))) {\n    // this is a binary protocol\n    // if an encoding is set, input is likely corrupted\n    validationError(new Error('request encoding must not be set'));\n    return;\n  }\n\n  var contentType = req.headers['content-type'];\n  if (!contentType) {\n    validationError(createError(415, 'missing content-type header'));\n    return;\n  }\n\n  var m = CONTENT_TYPE_RE.exec(contentType);\n  if (!m) {\n    validationError(createError(415, 'unsupported content-type'));\n    return;\n  }\n\n  var boundary;\n  CONTENT_TYPE_PARAM_RE.lastIndex = m.index + m[0].length - 1;\n  while ((m = CONTENT_TYPE_PARAM_RE.exec(contentType))) {\n    if (m[1].toLowerCase() !== 'boundary') continue;\n    boundary = m[2] || m[3];\n    break;\n  }\n\n  if (!boundary) {\n    validationError(createError(400, 'content-type missing boundary'));\n    return;\n  }\n\n  setUpParser(self, boundary);\n  req.pipe(self);\n\n  function onClosed () {\n    req.removeListener('aborted', onReqAborted)\n  }\n\n  function onReqAborted() {\n    waitend = false;\n    self.emit('aborted');\n    handleError(new Error('Request aborted'))\n  }\n\n  function onReqEnd() {\n    waitend = false;\n  }\n\n  function handleError(err) {\n    var first = !self.error;\n    if (first) {\n      self.error = err;\n      req.removeListener('aborted', onReqAborted);\n      req.removeListener('end', onReqEnd);\n      if (self.destStream) {\n        errorEventQueue(self, self.destStream, err);\n      }\n    }\n\n    cleanupOpenFiles(self);\n\n    if (first) {\n      self.emit('error', err);\n    }\n  }\n\n  function validationError(err) {\n    // handle error on next tick for event listeners to attach\n    process.nextTick(handleError.bind(null, err))\n  }\n};\n\nForm.prototype._write = function(buffer, encoding, cb) {\n  if (this.error) return;\n\n  var self = this;\n  var i = 0;\n  var len = buffer.length;\n  var prevIndex = self.index;\n  var index = self.index;\n  var state = self.state;\n  var lookbehind = self.lookbehind;\n  var boundary = self.boundary;\n  var boundaryChars = self.boundaryChars;\n  var boundaryLength = self.boundary.length;\n  var boundaryEnd = boundaryLength - 1;\n  var bufferLength = buffer.length;\n  var c;\n  var cl;\n\n  for (i = 0; i < len; i++) {\n    c = buffer[i];\n    switch (state) {\n      case START:\n        index = 0;\n        state = START_BOUNDARY;\n        /* falls through */\n      case START_BOUNDARY:\n        if (index === boundaryLength - 2 && c === HYPHEN) {\n          index = 1;\n          state = CLOSE_BOUNDARY;\n          break;\n        } else if (index === boundaryLength - 2) {\n          if (c !== CR) return self.handleError(createError(400, 'Expected CR Received ' + c));\n          index++;\n          break;\n        } else if (index === boundaryLength - 1) {\n          if (c !== LF) return self.handleError(createError(400, 'Expected LF Received ' + c));\n          index = 0;\n          self.onParsePartBegin();\n          state = HEADER_FIELD_START;\n          break;\n        }\n\n        if (c !== boundary[index+2]) index = -2;\n        if (c === boundary[index+2]) index++;\n        break;\n      case HEADER_FIELD_START:\n        state = HEADER_FIELD;\n        self.headerFieldMark = i;\n        index = 0;\n        /* falls through */\n      case HEADER_FIELD:\n        if (c === CR) {\n          self.headerFieldMark = null;\n          state = HEADERS_ALMOST_DONE;\n          break;\n        }\n\n        index++;\n        if (c === HYPHEN) break;\n\n        if (c === COLON) {\n          if (index === 1) {\n            // empty header field\n            self.handleError(createError(400, 'Empty header field'));\n            return;\n          }\n          self.onParseHeaderField(buffer.slice(self.headerFieldMark, i));\n          self.headerFieldMark = null;\n          state = HEADER_VALUE_START;\n          break;\n        }\n\n        cl = lower(c);\n        if (cl < A || cl > Z) {\n          self.handleError(createError(400, 'Expected alphabetic character, received ' + c));\n          return;\n        }\n        break;\n      case HEADER_VALUE_START:\n        if (c === SPACE) break;\n\n        self.headerValueMark = i;\n        state = HEADER_VALUE;\n        /* falls through */\n      case HEADER_VALUE:\n        if (c === CR) {\n          self.onParseHeaderValue(buffer.slice(self.headerValueMark, i));\n          self.headerValueMark = null;\n          self.onParseHeaderEnd();\n          state = HEADER_VALUE_ALMOST_DONE;\n        }\n        break;\n      case HEADER_VALUE_ALMOST_DONE:\n        if (c !== LF) return self.handleError(createError(400, 'Expected LF Received ' + c));\n        state = HEADER_FIELD_START;\n        break;\n      case HEADERS_ALMOST_DONE:\n        if (c !== LF) return self.handleError(createError(400, 'Expected LF Received ' + c));\n        var err = self.onParseHeadersEnd(i + 1);\n        if (err) return self.handleError(err);\n        state = PART_DATA_START;\n        break;\n      case PART_DATA_START:\n        state = PART_DATA;\n        self.partDataMark = i;\n        /* falls through */\n      case PART_DATA:\n        prevIndex = index;\n\n        if (index === 0) {\n          // boyer-moore derrived algorithm to safely skip non-boundary data\n          i += boundaryEnd;\n          while (i < bufferLength && !(buffer[i] in boundaryChars)) {\n            i += boundaryLength;\n          }\n          i -= boundaryEnd;\n          c = buffer[i];\n        }\n\n        if (index < boundaryLength) {\n          if (boundary[index] === c) {\n            if (index === 0) {\n              self.onParsePartData(buffer.slice(self.partDataMark, i));\n              self.partDataMark = null;\n            }\n            index++;\n          } else {\n            index = 0;\n          }\n        } else if (index === boundaryLength) {\n          index++;\n          if (c === CR) {\n            // CR = part boundary\n            self.partBoundaryFlag = true;\n          } else if (c === HYPHEN) {\n            index = 1;\n            state = CLOSE_BOUNDARY;\n            break;\n          } else {\n            index = 0;\n          }\n        } else if (index - 1 === boundaryLength) {\n          if (self.partBoundaryFlag) {\n            index = 0;\n            if (c === LF) {\n              self.partBoundaryFlag = false;\n              self.onParsePartEnd();\n              self.onParsePartBegin();\n              state = HEADER_FIELD_START;\n              break;\n            }\n          } else {\n            index = 0;\n          }\n        }\n\n        if (index > 0) {\n          // when matching a possible boundary, keep a lookbehind reference\n          // in case it turns out to be a false lead\n          lookbehind[index-1] = c;\n        } else if (prevIndex > 0) {\n          // if our boundary turned out to be rubbish, the captured lookbehind\n          // belongs to partData\n          self.onParsePartData(lookbehind.slice(0, prevIndex));\n          prevIndex = 0;\n          self.partDataMark = i;\n\n          // reconsider the current character even so it interrupted the sequence\n          // it could be the beginning of a new sequence\n          i--;\n        }\n\n        break;\n      case CLOSE_BOUNDARY:\n        if (c !== HYPHEN) return self.handleError(createError(400, 'Expected HYPHEN Received ' + c));\n        if (index === 1) {\n          self.onParsePartEnd();\n          state = END;\n        } else if (index > 1) {\n          return self.handleError(new Error('Parser has invalid state.'))\n        }\n        index++;\n        break;\n      case END:\n        break;\n      default:\n        self.handleError(new Error('Parser has invalid state.'))\n        return;\n    }\n  }\n\n  if (self.headerFieldMark != null) {\n    self.onParseHeaderField(buffer.slice(self.headerFieldMark));\n    self.headerFieldMark = 0;\n  }\n  if (self.headerValueMark != null) {\n    self.onParseHeaderValue(buffer.slice(self.headerValueMark));\n    self.headerValueMark = 0;\n  }\n  if (self.partDataMark != null) {\n    self.onParsePartData(buffer.slice(self.partDataMark));\n    self.partDataMark = 0;\n  }\n\n  self.index = index;\n  self.state = state;\n\n  self.bytesReceived += buffer.length;\n  self.emit('progress', self.bytesReceived, self.bytesExpected);\n\n  if (self.backpressure) {\n    self.writeCbs.push(cb);\n  } else {\n    cb();\n  }\n};\n\nForm.prototype.onParsePartBegin = function() {\n  clearPartVars(this);\n}\n\nForm.prototype.onParseHeaderField = function(b) {\n  this.headerField += this.headerFieldDecoder.write(b);\n}\n\nForm.prototype.onParseHeaderValue = function(b) {\n  this.headerValue += this.headerValueDecoder.write(b);\n}\n\nForm.prototype.onParseHeaderEnd = function() {\n  this.headerField = this.headerField.toLowerCase();\n  this.partHeaders[this.headerField] = this.headerValue;\n\n  var m;\n  if (this.headerField === 'content-disposition') {\n    if (m = this.headerValue.match(/\\bname=\"([^\"]+)\"/i)) {\n      this.partName = m[1];\n    }\n    this.partFilename = parseFilename(this.headerValue);\n  } else if (this.headerField === 'content-transfer-encoding') {\n    this.partTransferEncoding = this.headerValue.toLowerCase();\n  }\n\n  this.headerFieldDecoder = new StringDecoder(this.encoding);\n  this.headerField = '';\n  this.headerValueDecoder = new StringDecoder(this.encoding);\n  this.headerValue = '';\n}\n\nForm.prototype.onParsePartData = function(b) {\n  if (this.partTransferEncoding === 'base64') {\n    this.backpressure = ! this.destStream.write(b.toString('ascii'), 'base64');\n  } else {\n    this.backpressure = ! this.destStream.write(b);\n  }\n}\n\nForm.prototype.onParsePartEnd = function() {\n  if (this.destStream) {\n    flushWriteCbs(this);\n    var s = this.destStream;\n    process.nextTick(function() {\n      s.end();\n    });\n  }\n  clearPartVars(this);\n}\n\nForm.prototype.onParseHeadersEnd = function(offset) {\n  var self = this;\n  switch(self.partTransferEncoding){\n    case 'binary':\n    case '7bit':\n    case '8bit':\n      self.partTransferEncoding = 'binary';\n      break;\n\n    case 'base64': break;\n    default:\n      return createError(400, 'unknown transfer-encoding: ' + self.partTransferEncoding);\n  }\n\n  self.totalFieldCount += 1;\n  if (self.totalFieldCount > self.maxFields) {\n    return createError(413, 'maxFields ' + self.maxFields + ' exceeded.');\n  }\n\n  self.destStream = new stream.PassThrough();\n  self.destStream.on('drain', function() {\n    flushWriteCbs(self);\n  });\n  self.destStream.headers = self.partHeaders;\n  self.destStream.name = self.partName;\n  self.destStream.filename = self.partFilename;\n  self.destStream.byteOffset = self.bytesReceived + offset;\n  var partContentLength = self.destStream.headers['content-length'];\n  self.destStream.byteCount = partContentLength ? parseInt(partContentLength, 10) :\n    self.bytesExpected ? (self.bytesExpected - self.destStream.byteOffset -\n      self.boundary.length - LAST_BOUNDARY_SUFFIX_LEN) :\n      undefined;\n\n  if (self.destStream.filename == null && self.autoFields) {\n    handleField(self, self.destStream);\n  } else if (self.destStream.filename != null && self.autoFiles) {\n    handleFile(self, self.destStream);\n  } else {\n    handlePart(self, self.destStream);\n  }\n}\n\nutil.inherits(LimitStream, stream.Transform)\nfunction LimitStream (limit) {\n  stream.Transform.call(this)\n\n  this.bytes = 0\n  this.limit = limit\n}\n\nLimitStream.prototype._transform = function _transform (chunk, encoding, callback) {\n  var length = !Buffer.isBuffer(chunk)\n    ? Buffer.byteLength(chunk, encoding)\n    : chunk.length\n\n  this.bytes += length\n\n  if (this.bytes > this.limit) {\n    var err = new Error('maximum file length exceeded')\n    err.code = 'ETOOBIG'\n    callback(err)\n  } else {\n    this.push(chunk)\n    this.emit('progress', this.bytes, length)\n    callback()\n  }\n}\n\nfunction flushWriteCbs(self) {\n  self.writeCbs.forEach(function(cb) {\n    process.nextTick(cb);\n  });\n  self.writeCbs = [];\n  self.backpressure = false;\n}\n\nfunction getBytesExpected(headers) {\n  var contentLength = headers['content-length'];\n  if (contentLength) {\n    return parseInt(contentLength, 10);\n  } else if (headers['transfer-encoding'] == null) {\n    return 0;\n  } else {\n    return null;\n  }\n}\n\nfunction beginFlush(self) {\n  self.flushing += 1;\n}\n\nfunction endFlush(self) {\n  self.flushing -= 1;\n\n  if (self.flushing < 0) {\n    // if this happens this is a critical bug in multiparty and this stack trace\n    // will help us figure it out.\n    self.handleError(new Error('unexpected endFlush'))\n    return;\n  }\n\n  maybeClose(self);\n}\n\nfunction maybeClose(self) {\n  if (self.flushing > 0 || self.error) return;\n\n  // go through the emit queue in case any field, file, or part events are\n  // waiting to be emitted\n  holdEmitQueue(self)(function() {\n    // nextTick because the user is listening to part 'end' events and we are\n    // using part 'end' events to decide when to emit 'close'. we add our 'end'\n    // handler before the user gets a chance to add theirs. So we make sure\n    // their 'end' event fires before we emit the 'close' event.\n    // this is covered by test/standalone/test-issue-36\n    process.nextTick(function() {\n      self.emit('close');\n    });\n  });\n}\n\nfunction cleanupOpenFiles(self) {\n  self.openedFiles.forEach(function(internalFile) {\n    // since fd slicer autoClose is true, destroying the only write stream\n    // is guaranteed by the API to close the fd\n    internalFile.ws.destroy();\n\n    fs.unlink(internalFile.publicFile.path, function(err) {\n      if (err) self.handleError(err);\n    });\n  });\n  self.openedFiles = [];\n}\n\nfunction holdEmitQueue(self, eventEmitter) {\n  var item = { cb: null, ee: eventEmitter, err: null }\n  self.emitQueue.push(item);\n  return function(cb) {\n    item.cb = cb;\n    flushEmitQueue(self);\n  };\n}\n\nfunction errorEventQueue(self, eventEmitter, err) {\n  var items = self.emitQueue.filter(function (item) {\n    return item.ee === eventEmitter;\n  });\n\n  if (items.length === 0) {\n    eventEmitter.emit('error', err);\n    return;\n  }\n\n  items.forEach(function (item) {\n    item.err = err;\n  });\n}\n\nfunction flushEmitQueue(self) {\n  while (self.emitQueue.length > 0 && self.emitQueue[0].cb) {\n    var item = self.emitQueue.shift();\n\n    // invoke the callback\n    item.cb();\n\n    if (item.err) {\n      // emit the delayed error\n      item.ee.emit('error', item.err);\n    }\n  }\n}\n\nfunction handlePart(self, partStream) {\n  beginFlush(self);\n  var emitAndReleaseHold = holdEmitQueue(self, partStream);\n  partStream.on('end', function() {\n    endFlush(self);\n  });\n  emitAndReleaseHold(function() {\n    self.emit('part', partStream);\n  });\n}\n\nfunction handleFile(self, fileStream) {\n  if (self.error) return;\n  var publicFile = {\n    fieldName: fileStream.name,\n    originalFilename: fileStream.filename,\n    path: uploadPath(self.uploadDir, fileStream.filename),\n    headers: fileStream.headers,\n    size: 0\n  };\n  var internalFile = {\n    publicFile: publicFile,\n    ls: null,\n    ws: fs.createWriteStream(publicFile.path, { flags: 'wx' })\n  };\n  self.openedFiles.push(internalFile)\n  beginFlush(self); // flush to write stream\n  var emitAndReleaseHold = holdEmitQueue(self, fileStream);\n  fileStream.on('error', function(err) {\n    self.handleError(err);\n  });\n  internalFile.ws.on('error', function (err) {\n    self.handleError(err)\n  })\n  internalFile.ws.on('open', function () {\n    // end option here guarantees that no more than that amount will be written\n    // or else an error will be emitted\n    internalFile.ls = new LimitStream(self.maxFilesSize - self.totalFileSize)\n    internalFile.ls.pipe(internalFile.ws)\n\n    internalFile.ls.on('error', function (err) {\n      self.handleError(err.code === 'ETOOBIG'\n        ? createError(413, err.message, { code: err.code })\n        : err)\n    });\n    internalFile.ls.on('progress', function (totalBytes, chunkBytes) {\n      publicFile.size = totalBytes\n      self.totalFileSize += chunkBytes\n    });\n    internalFile.ws.on('close', function () {\n      if (self.error) return;\n      emitAndReleaseHold(function() {\n        self.emit('file', fileStream.name, publicFile);\n      });\n      endFlush(self);\n    });\n    fileStream.pipe(internalFile.ls)\n  });\n}\n\nfunction handleField(self, fieldStream) {\n  var value = '';\n  var decoder = new StringDecoder(self.encoding);\n\n  beginFlush(self);\n  var emitAndReleaseHold = holdEmitQueue(self, fieldStream);\n  fieldStream.on('error', function(err) {\n    self.handleError(err);\n  });\n  fieldStream.on('readable', function() {\n    var buffer = fieldStream.read();\n    if (!buffer) return;\n\n    self.totalFieldSize += buffer.length;\n    if (self.totalFieldSize > self.maxFieldsSize) {\n      self.handleError(createError(413, 'maxFieldsSize ' + self.maxFieldsSize + ' exceeded'));\n      return;\n    }\n    value += decoder.write(buffer);\n  });\n\n  fieldStream.on('end', function() {\n    emitAndReleaseHold(function() {\n      self.emit('field', fieldStream.name, value);\n    });\n    endFlush(self);\n  });\n}\n\nfunction clearPartVars(self) {\n  self.partHeaders = {};\n  self.partName = null;\n  self.partFilename = null;\n  self.partTransferEncoding = 'binary';\n  self.destStream = null;\n\n  self.headerFieldDecoder = new StringDecoder(self.encoding);\n  self.headerField = ''\n  self.headerValueDecoder = new StringDecoder(self.encoding);\n  self.headerValue = ''\n}\n\nfunction setUpParser(self, boundary) {\n  self.boundary = Buffer.alloc(boundary.length + 4)\n  self.boundary.write('\\r\\n--', 0, boundary.length + 4, 'ascii');\n  self.boundary.write(boundary, 4, boundary.length, 'ascii');\n  self.lookbehind = Buffer.alloc(self.boundary.length + 8)\n  self.state = START;\n  self.boundaryChars = {};\n  for (var i = 0; i < self.boundary.length; i++) {\n    self.boundaryChars[self.boundary[i]] = true;\n  }\n\n  self.index = null;\n  self.partBoundaryFlag = false;\n\n  beginFlush(self);\n  self.on('finish', function() {\n    if (self.state !== END) {\n      self.handleError(createError(400, 'stream ended unexpectedly'));\n    }\n    endFlush(self);\n  });\n}\n\nfunction uploadPath(baseDir, filename) {\n  var ext = path.extname(filename).replace(FILE_EXT_RE, '$1');\n  var name = uid.sync(18) + ext\n  return path.join(baseDir, name);\n}\n\nfunction parseFilename(headerValue) {\n  var m = headerValue.match(/\\bfilename=\"(.*?)\"($|; )/i);\n  if (!m) {\n    m = headerValue.match(/\\bfilename\\*=utf-8''(.*?)($|; )/i)\n    if (m) {\n      m[1] = decodeURI(m[1]);\n    } else {\n      return;\n    }\n  }\n\n  var filename = m[1];\n  filename = filename.replace(/%22|\\\\\"/g, '\"');\n  filename = filename.replace(/&#([\\d]{4});/g, function(m, code) {\n    return String.fromCharCode(code);\n  });\n  return filename.substr(filename.lastIndexOf('\\\\') + 1);\n}\n\nfunction lower(c) {\n  return c | 0x20;\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/multiparty/index.js?");

/***/ }),

/***/ "./node_modules/random-bytes/index.js":
/*!********************************************!*\
  !*** ./node_modules/random-bytes/index.js ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 28:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*!\n * random-bytes\n * Copyright(c) 2016 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\")\n\n/**\n * Module variables.\n * @private\n */\n\nvar generateAttempts = crypto.randomBytes === crypto.pseudoRandomBytes ? 1 : 3\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = randomBytes\nmodule.exports.sync = randomBytesSync\n\n/**\n * Generates strong pseudo-random bytes.\n *\n * @param {number} size\n * @param {function} [callback]\n * @return {Promise}\n * @public\n */\n\nfunction randomBytes(size, callback) {\n  // validate callback is a function, if provided\n  if (callback !== undefined && typeof callback !== 'function') {\n    throw new TypeError('argument callback must be a function')\n  }\n\n  // require the callback without promises\n  if (!callback && !global.Promise) {\n    throw new TypeError('argument callback is required')\n  }\n\n  if (callback) {\n    // classic callback style\n    return generateRandomBytes(size, generateAttempts, callback)\n  }\n\n  return new Promise(function executor(resolve, reject) {\n    generateRandomBytes(size, generateAttempts, function onRandomBytes(err, str) {\n      if (err) return reject(err)\n      resolve(str)\n    })\n  })\n}\n\n/**\n * Generates strong pseudo-random bytes sync.\n *\n * @param {number} size\n * @return {Buffer}\n * @public\n */\n\nfunction randomBytesSync(size) {\n  var err = null\n\n  for (var i = 0; i < generateAttempts; i++) {\n    try {\n      return crypto.randomBytes(size)\n    } catch (e) {\n      err = e\n    }\n  }\n\n  throw err\n}\n\n/**\n * Generates strong pseudo-random bytes.\n *\n * @param {number} size\n * @param {number} attempts\n * @param {function} callback\n * @private\n */\n\nfunction generateRandomBytes(size, attempts, callback) {\n  crypto.randomBytes(size, function onRandomBytes(err, buf) {\n    if (!err) return callback(null, buf)\n    if (!--attempts) return callback(err)\n    setTimeout(generateRandomBytes.bind(null, size, attempts, callback), 10)\n  })\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/random-bytes/index.js?");

/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 13:2-16 */
/*! CommonJS bailout: exports is used directly at 16:20-27 */
/***/ ((module, exports, __webpack_require__) => {

eval("/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */\n/* eslint-disable node/no-deprecated-api */\nvar buffer = __webpack_require__(/*! buffer */ \"buffer\")\nvar Buffer = buffer.Buffer\n\n// alternative to using Object.keys for old browsers\nfunction copyProps (src, dst) {\n  for (var key in src) {\n    dst[key] = src[key]\n  }\n}\nif (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {\n  module.exports = buffer\n} else {\n  // Copy properties from require('buffer')\n  copyProps(buffer, exports)\n  exports.Buffer = SafeBuffer\n}\n\nfunction SafeBuffer (arg, encodingOrOffset, length) {\n  return Buffer(arg, encodingOrOffset, length)\n}\n\nSafeBuffer.prototype = Object.create(Buffer.prototype)\n\n// Copy static methods from Buffer\ncopyProps(Buffer, SafeBuffer)\n\nSafeBuffer.from = function (arg, encodingOrOffset, length) {\n  if (typeof arg === 'number') {\n    throw new TypeError('Argument must not be a number')\n  }\n  return Buffer(arg, encodingOrOffset, length)\n}\n\nSafeBuffer.alloc = function (size, fill, encoding) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  var buf = Buffer(size)\n  if (fill !== undefined) {\n    if (typeof encoding === 'string') {\n      buf.fill(fill, encoding)\n    } else {\n      buf.fill(fill)\n    }\n  } else {\n    buf.fill(0)\n  }\n  return buf\n}\n\nSafeBuffer.allocUnsafe = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return Buffer(size)\n}\n\nSafeBuffer.allocUnsafeSlow = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return buffer.SlowBuffer(size)\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/safe-buffer/index.js?");

/***/ }),

/***/ "./node_modules/setprototypeof/index.js":
/*!**********************************************!*\
  !*** ./node_modules/setprototypeof/index.js ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {

"use strict";
eval("\n/* eslint no-proto: 0 */\nmodule.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties)\n\nfunction setProtoOf (obj, proto) {\n  obj.__proto__ = proto\n  return obj\n}\n\nfunction mixinProperties (obj, proto) {\n  for (var prop in proto) {\n    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {\n      obj[prop] = proto[prop]\n    }\n  }\n  return obj\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/setprototypeof/index.js?");

/***/ }),

/***/ "./node_modules/statuses/codes.json":
/*!******************************************!*\
  !*** ./node_modules/statuses/codes.json ***!
  \******************************************/
/*! default exports */
/*! export 100 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 101 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 102 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 103 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 200 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 201 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 202 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 203 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 204 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 205 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 206 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 207 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 208 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 226 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 300 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 301 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 302 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 303 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 304 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 305 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 306 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 307 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 308 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 400 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 401 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 402 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 403 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 404 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 405 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 406 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 407 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 408 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 409 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 410 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 411 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 412 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 413 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 414 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 415 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 416 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 417 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 418 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 421 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 422 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 423 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 424 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 425 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 426 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 428 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 429 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 431 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 451 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 500 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 501 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 502 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 503 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 504 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 505 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 506 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 507 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 508 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 509 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 510 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export 511 [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse(\"{\\\"100\\\":\\\"Continue\\\",\\\"101\\\":\\\"Switching Protocols\\\",\\\"102\\\":\\\"Processing\\\",\\\"103\\\":\\\"Early Hints\\\",\\\"200\\\":\\\"OK\\\",\\\"201\\\":\\\"Created\\\",\\\"202\\\":\\\"Accepted\\\",\\\"203\\\":\\\"Non-Authoritative Information\\\",\\\"204\\\":\\\"No Content\\\",\\\"205\\\":\\\"Reset Content\\\",\\\"206\\\":\\\"Partial Content\\\",\\\"207\\\":\\\"Multi-Status\\\",\\\"208\\\":\\\"Already Reported\\\",\\\"226\\\":\\\"IM Used\\\",\\\"300\\\":\\\"Multiple Choices\\\",\\\"301\\\":\\\"Moved Permanently\\\",\\\"302\\\":\\\"Found\\\",\\\"303\\\":\\\"See Other\\\",\\\"304\\\":\\\"Not Modified\\\",\\\"305\\\":\\\"Use Proxy\\\",\\\"306\\\":\\\"(Unused)\\\",\\\"307\\\":\\\"Temporary Redirect\\\",\\\"308\\\":\\\"Permanent Redirect\\\",\\\"400\\\":\\\"Bad Request\\\",\\\"401\\\":\\\"Unauthorized\\\",\\\"402\\\":\\\"Payment Required\\\",\\\"403\\\":\\\"Forbidden\\\",\\\"404\\\":\\\"Not Found\\\",\\\"405\\\":\\\"Method Not Allowed\\\",\\\"406\\\":\\\"Not Acceptable\\\",\\\"407\\\":\\\"Proxy Authentication Required\\\",\\\"408\\\":\\\"Request Timeout\\\",\\\"409\\\":\\\"Conflict\\\",\\\"410\\\":\\\"Gone\\\",\\\"411\\\":\\\"Length Required\\\",\\\"412\\\":\\\"Precondition Failed\\\",\\\"413\\\":\\\"Payload Too Large\\\",\\\"414\\\":\\\"URI Too Long\\\",\\\"415\\\":\\\"Unsupported Media Type\\\",\\\"416\\\":\\\"Range Not Satisfiable\\\",\\\"417\\\":\\\"Expectation Failed\\\",\\\"418\\\":\\\"I'm a teapot\\\",\\\"421\\\":\\\"Misdirected Request\\\",\\\"422\\\":\\\"Unprocessable Entity\\\",\\\"423\\\":\\\"Locked\\\",\\\"424\\\":\\\"Failed Dependency\\\",\\\"425\\\":\\\"Unordered Collection\\\",\\\"426\\\":\\\"Upgrade Required\\\",\\\"428\\\":\\\"Precondition Required\\\",\\\"429\\\":\\\"Too Many Requests\\\",\\\"431\\\":\\\"Request Header Fields Too Large\\\",\\\"451\\\":\\\"Unavailable For Legal Reasons\\\",\\\"500\\\":\\\"Internal Server Error\\\",\\\"501\\\":\\\"Not Implemented\\\",\\\"502\\\":\\\"Bad Gateway\\\",\\\"503\\\":\\\"Service Unavailable\\\",\\\"504\\\":\\\"Gateway Timeout\\\",\\\"505\\\":\\\"HTTP Version Not Supported\\\",\\\"506\\\":\\\"Variant Also Negotiates\\\",\\\"507\\\":\\\"Insufficient Storage\\\",\\\"508\\\":\\\"Loop Detected\\\",\\\"509\\\":\\\"Bandwidth Limit Exceeded\\\",\\\"510\\\":\\\"Not Extended\\\",\\\"511\\\":\\\"Network Authentication Required\\\"}\");\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/statuses/codes.json?");

/***/ }),

/***/ "./node_modules/statuses/index.js":
/*!****************************************!*\
  !*** ./node_modules/statuses/index.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 22:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*!\n * statuses\n * Copyright(c) 2014 Jonathan Ong\n * Copyright(c) 2016 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar codes = __webpack_require__(/*! ./codes.json */ \"./node_modules/statuses/codes.json\")\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = status\n\n// status code to message map\nstatus.STATUS_CODES = codes\n\n// array of status codes\nstatus.codes = populateStatusesMap(status, codes)\n\n// status codes for redirects\nstatus.redirect = {\n  300: true,\n  301: true,\n  302: true,\n  303: true,\n  305: true,\n  307: true,\n  308: true\n}\n\n// status codes for empty bodies\nstatus.empty = {\n  204: true,\n  205: true,\n  304: true\n}\n\n// status codes for when you should retry the request\nstatus.retry = {\n  502: true,\n  503: true,\n  504: true\n}\n\n/**\n * Populate the statuses map for given codes.\n * @private\n */\n\nfunction populateStatusesMap (statuses, codes) {\n  var arr = []\n\n  Object.keys(codes).forEach(function forEachCode (code) {\n    var message = codes[code]\n    var status = Number(code)\n\n    // Populate properties\n    statuses[status] = message\n    statuses[message] = status\n    statuses[message.toLowerCase()] = status\n\n    // Add to array\n    arr.push(status)\n  })\n\n  return arr\n}\n\n/**\n * Get the status code.\n *\n * Given a number, this will throw if it is not a known status\n * code, otherwise the code will be returned. Given a string,\n * the string will be parsed for a number and return the code\n * if valid, otherwise will lookup the code assuming this is\n * the status message.\n *\n * @param {string|number} code\n * @returns {number}\n * @public\n */\n\nfunction status (code) {\n  if (typeof code === 'number') {\n    if (!status[code]) throw new Error('invalid status code: ' + code)\n    return code\n  }\n\n  if (typeof code !== 'string') {\n    throw new TypeError('code must be a number or string')\n  }\n\n  // '403'\n  var n = parseInt(code, 10)\n  if (!isNaN(n)) {\n    if (!status[n]) throw new Error('invalid status code: ' + n)\n    return n\n  }\n\n  n = status[code.toLowerCase()]\n  if (!n) throw new Error('invalid status message: \"' + code + '\"')\n  return n\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/statuses/index.js?");

/***/ }),

/***/ "./node_modules/toidentifier/index.js":
/*!********************************************!*\
  !*** ./node_modules/toidentifier/index.js ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 12:0-14 */
/***/ ((module) => {

eval("/*!\n * toidentifier\n * Copyright(c) 2016 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = toIdentifier\n\n/**\n * Trasform the given string into a JavaScript identifier\n *\n * @param {string} str\n * @returns {string}\n * @public\n */\n\nfunction toIdentifier (str) {\n  return str\n    .split(' ')\n    .map(function (token) {\n      return token.slice(0, 1).toUpperCase() + token.slice(1)\n    })\n    .join('')\n    .replace(/[^ _0-9a-z]/gi, '')\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/toidentifier/index.js?");

/***/ }),

/***/ "./plugin/apiMock.ts":
/*!***************************!*\
  !*** ./plugin/apiMock.ts ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, module, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 3:16-20 */
/*! CommonJS bailout: this is used directly at 14:17-21 */
/*! CommonJS bailout: this is used directly at 23:19-23 */
/*! CommonJS bailout: module.exports is used directly at 257:0-14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\r\n/// <reference path=\"common.d.ts\" />\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar http = __webpack_require__(/*! http */ \"http\");\r\nvar multiparty = __webpack_require__(/*! multiparty */ \"./node_modules/multiparty/index.js\");\r\nvar fs = __webpack_require__(/*! fs */ \"fs\");\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar paramRegex = /\\$\\{(?![0-9])[.a-zA-Z0-9$_]+\\}/gm;\r\nvar apiMockLogsFolderPath = path.resolve(\"cypress/api-mock-logs\");\r\nvar testTimestamp = new Date().toISOString().replace(/(:)|(\\.)/g, \"-\");\r\nvar guid = uuid();\r\nvar apiMockLogsPath = path.resolve(apiMockLogsFolderPath + \"/\" + testTimestamp + \"-\" + guid + \".log\");\r\nfunction register(on, config) {\r\n    var fullConfig = Object.assign({ apiMockServer: { hostname: \"127.0.0.1\", hostPort: 3000 } }, config);\r\n    startServer(fullConfig);\r\n    on(\"task\", {\r\n        \"api-mock:register\": function (options) { return registerMock(options.pattern, options.response); },\r\n        \"api-mock:get-requests\": function () { return getRequests(); },\r\n        \"api-mock:get-responses\": function () { return getResponses(); },\r\n        \"api-mock:reset-calls\": function () { return resetCalls(); },\r\n        \"api-mock:reset\": function () { return reset(); },\r\n    });\r\n}\r\nvar mocks = new Map();\r\nvar requests = new Map();\r\nvar responses = new Map();\r\nfunction getRequests() {\r\n    var result = {};\r\n    requests.forEach(function (value, key) {\r\n        if (result !== undefined) {\r\n            result[key] = value;\r\n        }\r\n    });\r\n    return result;\r\n}\r\nfunction getResponses() {\r\n    var result = {};\r\n    responses.forEach(function (value, key) {\r\n        if (result !== undefined) {\r\n            result[key] = value;\r\n        }\r\n    });\r\n    return result;\r\n}\r\nfunction resetCalls() {\r\n    requests.clear();\r\n    responses.clear();\r\n    return null;\r\n}\r\nfunction reset() {\r\n    resetCalls();\r\n    mocks.clear();\r\n    return null;\r\n}\r\nfunction registerMock(pattern, response) {\r\n    mocks.set(pattern, response);\r\n    return null;\r\n}\r\nfunction startServer(config) {\r\n    var _this = this;\r\n    var server = http.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n        var body, answer, _a;\r\n        return __generator(this, function (_b) {\r\n            switch (_b.label) {\r\n                case 0:\r\n                    _b.trys.push([0, 2, , 3]);\r\n                    return [4 /*yield*/, processRequest(req)];\r\n                case 1:\r\n                    body = _b.sent();\r\n                    if (req.url !== undefined && mocks.has(req.url)) {\r\n                        answer = prepareAnswer(req.url, body.data);\r\n                        registerCall(req.url, body, answer);\r\n                        answerOK(res, answer);\r\n                    }\r\n                    else {\r\n                        answerNotFound(res);\r\n                    }\r\n                    return [3 /*break*/, 3];\r\n                case 2:\r\n                    _a = _b.sent();\r\n                    answerError(res);\r\n                    return [3 /*break*/, 3];\r\n                case 3: return [2 /*return*/];\r\n            }\r\n        });\r\n    }); });\r\n    server.listen(config.apiMockServer.hostPort, config.apiMockServer.hostname, function () {\r\n        log(\"I\\tServer running at http://\" + config.apiMockServer.hostname + \":\" + config.apiMockServer.hostPort + \"/\");\r\n    });\r\n}\r\nfunction registerCall(url, request, response) {\r\n    var particularRequests = requests.get(url) || [];\r\n    particularRequests.push(request);\r\n    var particularResponses = responses.get(url) || [];\r\n    particularResponses.push(response);\r\n    requests.set(url, particularRequests);\r\n    responses.set(url, particularResponses);\r\n}\r\nfunction prepareAnswer(url, body) {\r\n    var answer = mocks.get(url) || \"\";\r\n    return parseParameters(answer, body);\r\n}\r\nfunction parseParameters(answer, body) {\r\n    var answerStr = typeof answer === \"string\" ? answer : JSON.stringify(answer);\r\n    var regex = new RegExp(paramRegex);\r\n    var bodyObj;\r\n    return answerStr.replace(regex, function (match) {\r\n        if (bodyObj === undefined) {\r\n            bodyObj = JSON.parse(body);\r\n        }\r\n        return getParamValue(bodyObj, match);\r\n    });\r\n}\r\nfunction getParamValue(bodyObj, param) {\r\n    try {\r\n        var cleanParam = param.substr(2, param.length - 3);\r\n        var paramPath = cleanParam.split(\".\");\r\n        var result = bodyObj;\r\n        for (var _i = 0, paramPath_1 = paramPath; _i < paramPath_1.length; _i++) {\r\n            var part = paramPath_1[_i];\r\n            if (part !== \"body\") {\r\n                result = result[part];\r\n            }\r\n        }\r\n        return result ? result.toString() : result;\r\n    }\r\n    catch (err) {\r\n        log(\"E\\tError in parsing param '\" + param + \"':  \" + err, \"\\x1b[31m\");\r\n        return \"error\";\r\n    }\r\n}\r\nfunction processRequest(req) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var data;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, getRequestData(req)];\r\n                case 1:\r\n                    data = _a.sent();\r\n                    log(\"->\\tURL: \" + req.url + \"\\tData: \" + data.data);\r\n                    return [2 /*return*/, data];\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction answerOK(res, mockResult) {\r\n    res.statusCode = 200;\r\n    res.setHeader(\"Content-Type\", \"text/plain\");\r\n    res.end(mockResult);\r\n    log(\"<-\\tStatus: \" + res.statusCode + \"\\tResponse:\" + mockResult, \"\\x1b[32m\");\r\n}\r\nfunction answerNotFound(res) {\r\n    res.statusCode = 404;\r\n    res.setHeader(\"Content-Type\", \"text/plain\");\r\n    res.end(\"Mock not found\");\r\n    log(\"<-\\tStatus: \" + res.statusCode, \"\\x1b[31m\");\r\n}\r\nfunction answerError(res) {\r\n    res.statusCode = 500;\r\n    res.setHeader(\"Content-Type\", \"text/plain\");\r\n    res.end(\"Internal Server Error. Problem in creating response.\");\r\n    log(\"<-\\tStatus: \" + res.statusCode, \"\\x1b[31m\");\r\n}\r\nfunction getRequestData(req) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            return [2 /*return*/, new Promise(function (resolve) {\r\n                    var allData = \"\";\r\n                    var form = new multiparty.Form({ autoFiles: true });\r\n                    var fileResult = [];\r\n                    var fieldsResult;\r\n                    form.parse(req, function (_err, fields, files) {\r\n                        fieldsResult = fields;\r\n                        if (files) {\r\n                            for (var key in files) {\r\n                                var file = files[key][0];\r\n                                fileResult.push(__assign(__assign({}, file), { content: Array.from(fs.readFileSync(file.path)) }));\r\n                            }\r\n                        }\r\n                    });\r\n                    req.on(\"data\", function (data) { return (allData += data); });\r\n                    req.on(\"end\", function () {\r\n                        return resolve({\r\n                            files: fileResult,\r\n                            fields: fieldsResult,\r\n                            data: allData,\r\n                        });\r\n                    });\r\n                })];\r\n        });\r\n    });\r\n}\r\nfunction log(message, color) {\r\n    if (color === void 0) { color = \"\\x1b[0m\"; }\r\n    console.log(\"API-MOCK\", \"\\t\", color, message, \"\\x1b[0m\");\r\n    writeFileLog(message);\r\n}\r\nfunction uuid() {\r\n    return \"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\".replace(/[xy]/g, function (c) {\r\n        var r = (Math.random() * 16) | 0, v = c === \"x\" ? r : (r & 0x3) | 0x8;\r\n        return v.toString(16);\r\n    });\r\n}\r\nfunction writeFileLog(message) {\r\n    var timestamp = new Date().toISOString();\r\n    if (!fs.existsSync(apiMockLogsFolderPath)) {\r\n        fs.mkdirSync(apiMockLogsFolderPath);\r\n    }\r\n    fs.appendFileSync(apiMockLogsPath, timestamp + \"\\t\" + message + \"\\n\");\r\n}\r\nmodule.exports = register;\r\n\n\n//# sourceURL=webpack://cypress-api-mock/./plugin/apiMock.ts?");

/***/ }),

/***/ "./node_modules/uid-safe/index.js":
/*!****************************************!*\
  !*** ./node_modules/uid-safe/index.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 31:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*!\n * uid-safe\n * Copyright(c) 2014 Jonathan Ong\n * Copyright(c) 2015-2017 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar randomBytes = __webpack_require__(/*! random-bytes */ \"./node_modules/random-bytes/index.js\")\n\n/**\n * Module variables.\n * @private\n */\n\nvar EQUAL_END_REGEXP = /=+$/\nvar PLUS_GLOBAL_REGEXP = /\\+/g\nvar SLASH_GLOBAL_REGEXP = /\\//g\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = uid\nmodule.exports.sync = uidSync\n\n/**\n * Create a unique ID.\n *\n * @param {number} length\n * @param {function} [callback]\n * @return {Promise}\n * @public\n */\n\nfunction uid (length, callback) {\n  // validate callback is a function, if provided\n  if (callback !== undefined && typeof callback !== 'function') {\n    throw new TypeError('argument callback must be a function')\n  }\n\n  // require the callback without promises\n  if (!callback && !global.Promise) {\n    throw new TypeError('argument callback is required')\n  }\n\n  if (callback) {\n    // classic callback style\n    return generateUid(length, callback)\n  }\n\n  return new Promise(function executor (resolve, reject) {\n    generateUid(length, function onUid (err, str) {\n      if (err) return reject(err)\n      resolve(str)\n    })\n  })\n}\n\n/**\n * Create a unique ID sync.\n *\n * @param {number} length\n * @return {string}\n * @public\n */\n\nfunction uidSync (length) {\n  return toString(randomBytes.sync(length))\n}\n\n/**\n * Generate a unique ID string.\n *\n * @param {number} length\n * @param {function} callback\n * @private\n */\n\nfunction generateUid (length, callback) {\n  randomBytes(length, function (err, buf) {\n    if (err) return callback(err)\n    callback(null, toString(buf))\n  })\n}\n\n/**\n * Change a Buffer into a string.\n *\n * @param {Buffer} buf\n * @return {string}\n * @private\n */\n\nfunction toString (buf) {\n  return buf.toString('base64')\n    .replace(EQUAL_END_REGEXP, '')\n    .replace(PLUS_GLOBAL_REGEXP, '-')\n    .replace(SLASH_GLOBAL_REGEXP, '_')\n}\n\n\n//# sourceURL=webpack://cypress-api-mock/./node_modules/uid-safe/index.js?");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"buffer\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22buffer%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"crypto\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22crypto%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"events\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22events%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"fs\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"http\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22http%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"os\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"path\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22path%22?");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"stream\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22stream%22?");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"string_decoder\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22string_decoder%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"util\");;\n\n//# sourceURL=webpack://cypress-api-mock/external_%22util%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./plugin/apiMock.ts");
/******/ })()
;