/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _class_cookiebot_popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-cookiebot-popup */ \"./src/js/class-cookiebot-popup.js\");\n\nfunction showCookieBanner() {\n  new _class_cookiebot_popup__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().init();\n  cookiebanner.style.display = 'block';\n}\nfunction hideCookieBanner() {\n  cookiebanner.style.display = 'none';\n}\nwindow.addEventListener('CookiebotOnDialogInit', () => {\n  if ((\"development\" || 0).trim() !== 'development') return;\n  showCookieBanner();\n  const hideProdBanner = function (mutationsList, observer) {\n    for (const mutation of mutationsList) {\n      if (mutation.type !== 'childList') continue;\n      const cookiebanner = document.querySelector('#cookiebanner:not([data-development=\"true\"])');\n      if (!cookiebanner) continue;\n      cookiebanner.remove();\n      observer.disconnect();\n    }\n  };\n  const observer = new MutationObserver(hideProdBanner);\n  observer.observe(document.body, {\n    childList: true\n  });\n});\nwindow.showCookieBanner = showCookieBanner;\nwindow.hideCookieBanner = hideCookieBanner;\n\n//# sourceURL=webpack://@huddly/cookiebot-popup/./src/js/app.js?");

/***/ }),

/***/ "./src/js/class-cookiebot-popup.js":
/*!*****************************************!*\
  !*** ./src/js/class-cookiebot-popup.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CookiebotPopup; }\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\nclass CookiebotPopup {\n  constructor() {\n    this.cookiebanner = document.getElementById('cookiebanner');\n    this.detailsModal = document.getElementById('cookiebannerDetails');\n    this.showDetailsLink = document.getElementById('HuddlyCookiebotListToggle');\n  }\n  init = () => {\n    const _this = this;\n    this.handleMissingHideDetailsLabel();\n    document.addEventListener('click', e => {\n      const {\n        target\n      } = e;\n      if (!target) return;\n\n      // Handle views\n      if (target.hasAttribute('data-hcb-view-anchor')) {\n        const view = target.getAttribute('data-hcb-view-anchor');\n        const viewElements = document.querySelectorAll('[data-hcb-view]');\n        viewElements.forEach(el => {\n          if (el.getAttribute('data-hcb-view') === view) {\n            el.style.display = 'block';\n            el.setAttribute('aria-hidden', 'false');\n          } else {\n            el.style.display = 'none';\n            el.setAttribute('aria-hidden', 'true');\n          }\n        });\n      }\n\n      // Handle triggers, these are buttons that clicks the id of the attribute\n      if (target.hasAttribute('data-hcb-trigger')) {\n        const id = target.getAttribute('data-hcb-trigger');\n        const el = document.getElementById(id);\n        if (el) el.click();\n      }\n\n      // Toggle detail accordions\n      if (target.hasAttribute('data-hcb-accordion-toggle')) {\n        _this.toggleAccordion(target);\n        const modifierClass = _this.setModifierClass(target);\n        _this.setAriaState(target, modifierClass);\n      }\n    });\n  };\n  handleMissingHideDetailsLabel = () => {\n    const needle = '[#HIDE_DETAILS#]';\n    const replacement = CookiebotDialog.hideDetailsText;\n    this.cookiebanner.querySelectorAll('button').forEach(button => {\n      if (button.innerHTML.indexOf(needle) < 0) return;\n      button.innerText = button.innerText.replace(needle, replacement);\n    });\n  };\n  toggleAccordion = el => {\n    const id = el.getAttribute('data-hcb-accordion-toggle');\n    const accordionContent = document.querySelector(`[data-hcb-accordion=\"${id}\"]`);\n    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.slideToggle)(accordionContent);\n  };\n  setModifierClass = (() => function (el) {\n    let modifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'active';\n    const [mainClass] = el.className.split(' ');\n    const activeClass = `${mainClass}--${modifier}`;\n    if (el.classList.contains(activeClass)) {\n      el.classList.remove(activeClass);\n    } else {\n      el.classList.add(activeClass);\n    }\n    return activeClass;\n  })();\n  setDetailsText = (el, activeClass) => {\n    if (el.classList.contains(activeClass)) {\n      el.innerHTML = CookiebotDialog.hideDetailsText;\n    } else {\n      el.innerHTML = CookiebotDialog.showDetailsText;\n    }\n  };\n  setAriaState = (el, activeClass) => {\n    if (el.classList.contains(activeClass)) {\n      el.setAttribute('aria-hidden', false);\n      el.setAttribute('aria-expanded', true);\n    } else {\n      el.setAttribute('aria-hidden', true);\n      el.setAttribute('aria-expanded', false);\n    }\n  };\n}\n\n//# sourceURL=webpack://@huddly/cookiebot-popup/./src/js/class-cookiebot-popup.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setTransition: function() { return /* binding */ setTransition; },\n/* harmony export */   slideToggle: function() { return /* binding */ slideToggle; }\n/* harmony export */ });\nconst slideToggle = function (el) {\n  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;\n  setTransition(el, {\n    target: 'height',\n    duration,\n    type: 'linear'\n  });\n  el.style.overflowY = 'hidden';\n  if (el.style.display !== 'block') {\n    el.style.display = 'block';\n    el.style.height = 'auto';\n    const height = el.clientHeight + 'px';\n    el.style.height = '0px';\n    setTimeout(() => {\n      el.style.height = height;\n    }, 0);\n    setTimeout(() => {\n      el.style.height = 'auto';\n    }, duration);\n  } else {\n    el.style.height = '0px';\n    setTimeout(() => {\n      el.style.display = 'none';\n    }, duration);\n  }\n};\nconst setTransition = (el, options) => {\n  const {\n    target,\n    duration,\n    type\n  } = options;\n  el.style.transition = `${target} ${duration}ms ${type}`;\n  el.style.MozTransition = `${target} ${duration} ${type}`;\n  el.style.WebkitTransition = `${target} ${duration} ${type}`;\n  el.style.willChange = target;\n};\n\n//# sourceURL=webpack://@huddly/cookiebot-popup/./src/js/util.js?");

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://@huddly/cookiebot-popup/./src/scss/app.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/js/app.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scss/app.scss");
/******/ 	
/******/ })()
;