"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./components/Header.tsx":
/*!*******************************!*\
  !*** ./components/Header.tsx ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/_/_tagged_template_literal */ \"./node_modules/@swc/helpers/esm/_tagged_template_literal.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n\nfunction _templateObject() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  from { transform: scale(1); }\\n  50% { transform: scale(1.05); }\\n  to { transform: scale(1); }\\n\"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\n\nvar _s = $RefreshSig$();\n\nconst pulseAnimation = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.keyframes)(_templateObject());\nconst Header = ()=>{\n    _s();\n    const bgGradient = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.useColorModeValue)(\"linear(to-l, #7928CA, #FF0080)\", \"linear(to-r, #7928CA, #FF0080)\");\n    const baseStyle = {\n        fontWeight: \"bold\",\n        borderRadius: \"full\",\n        fontSize: \"md\",\n        px: 4,\n        py: 2,\n        color: \"white\",\n        boxShadow: \"lg\"\n    };\n    const buttonStyle = {\n        ...baseStyle,\n        variant: \"solid\",\n        background: \"rgba(255, 255, 255, 0.2)\",\n        _hover: {\n            background: \"rgba(255, 255, 255, 0.3)\"\n        }\n    };\n    const connectButtonStyle = {\n        ...baseStyle,\n        background: \"rgba(0, 255, 255, 0.2)\",\n        _hover: {\n            animation: \"\".concat(pulseAnimation, \" 1s infinite ease-in-out\"),\n            background: \"rgba(0, 255, 255, 0.3)\"\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {\n        as: \"header\",\n        width: \"full\",\n        align: \"center\",\n        justifyContent: \"space-between\",\n        p: 4,\n        bgGradient: bgGradient,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Link, {\n                    href: \"/\",\n                    style: {\n                        textDecoration: \"none\"\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                        variant: \"ghost\",\n                        size: \"lg\",\n                        fontSize: \"2xl\",\n                        fontWeight: \"bold\",\n                        color: \"white\",\n                        children: \"VouchSafe\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n                        lineNumber: 44,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n                    lineNumber: 43,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                        ...buttonStyle,\n                        mr: 4,\n                        onClick: ()=>alert(\"Claim functionality here\"),\n                        children: \"Claim\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                        ...buttonStyle,\n                        mr: 4,\n                        onClick: ()=>alert(\"Attest functionality here\"),\n                        children: \"Attest\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                        ...connectButtonStyle,\n                        onClick: ()=>alert(\"Connect wallet functionality here\"),\n                        children: \"Connect Wallet\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n                        lineNumber: 56,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/gm/Desktop/hallofshame/components/Header.tsx\",\n        lineNumber: 41,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Header, \"ZMYtVD9O66WR31u9VTBM2vy/HYQ=\", false, function() {\n    return [\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.useColorModeValue\n    ];\n});\n_c = Header;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0hlYWRlci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUY7QUFFekYsTUFBTU0saUJBQWlCRiwyREFBU0E7QUFNaEMsTUFBTUcsU0FBUzs7SUFDYixNQUFNQyxhQUFhSCxtRUFBaUJBLENBQUMsa0NBQWtDO0lBRXZFLE1BQU1JLFlBQVk7UUFDaEJDLFlBQVk7UUFDWkMsY0FBYztRQUNkQyxVQUFVO1FBQ1ZDLElBQUk7UUFDSkMsSUFBSTtRQUNKQyxPQUFPO1FBQ1BDLFdBQVc7SUFDYjtJQUVBLE1BQU1DLGNBQWM7UUFDbEIsR0FBR1IsU0FBUztRQUNaUyxTQUFTO1FBQ1RDLFlBQVk7UUFDWkMsUUFBUTtZQUNORCxZQUFZO1FBQ2Q7SUFDRjtJQUVBLE1BQU1FLHFCQUFxQjtRQUN6QixHQUFHWixTQUFTO1FBQ1pVLFlBQVk7UUFDWkMsUUFBUTtZQUNORSxXQUFXLEdBQWtCLE9BQWZoQixnQkFBZTtZQUM3QmEsWUFBWTtRQUNkO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2pCLGtEQUFJQTtRQUFDcUIsSUFBRztRQUFTQyxPQUFNO1FBQU9DLE9BQU07UUFBU0MsZ0JBQWU7UUFBZ0JDLEdBQUc7UUFBR25CLFlBQVlBOzswQkFDN0YsOERBQUNSLGlEQUFHQTswQkFDRiw0RUFBQ0csa0RBQUlBO29CQUFDeUIsTUFBSztvQkFBSUMsT0FBTzt3QkFBRUMsZ0JBQWdCO29CQUFPOzhCQUM3Qyw0RUFBQzdCLG9EQUFNQTt3QkFBQ2lCLFNBQVE7d0JBQVFhLE1BQUs7d0JBQUtuQixVQUFTO3dCQUFNRixZQUFXO3dCQUFPSyxPQUFNO2tDQUFROzs7Ozs7Ozs7Ozs7Ozs7OzBCQUtyRiw4REFBQ2YsaURBQUdBOztrQ0FDRiw4REFBQ0Msb0RBQU1BO3dCQUFFLEdBQUdnQixXQUFXO3dCQUFFZSxJQUFJO3dCQUFHQyxTQUFTLElBQU1DLE1BQU07a0NBQTZCOzs7Ozs7a0NBR2xGLDhEQUFDakMsb0RBQU1BO3dCQUFFLEdBQUdnQixXQUFXO3dCQUFFZSxJQUFJO3dCQUFHQyxTQUFTLElBQU1DLE1BQU07a0NBQThCOzs7Ozs7a0NBR25GLDhEQUFDakMsb0RBQU1BO3dCQUFFLEdBQUdvQixrQkFBa0I7d0JBQUVZLFNBQVMsSUFBTUMsTUFBTTtrQ0FBc0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1uRztHQXJETTNCOztRQUNlRiwrREFBaUJBOzs7S0FEaENFO0FBdUROLCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvSGVhZGVyLnRzeD8wMzY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgQnV0dG9uLCBGbGV4LCBMaW5rLCBrZXlmcmFtZXMsIHVzZUNvbG9yTW9kZVZhbHVlIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCc7XG5cbmNvbnN0IHB1bHNlQW5pbWF0aW9uID0ga2V5ZnJhbWVzYFxuICBmcm9tIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxuICA1MCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpOyB9XG4gIHRvIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxuYDtcblxuY29uc3QgSGVhZGVyID0gKCkgPT4ge1xuICBjb25zdCBiZ0dyYWRpZW50ID0gdXNlQ29sb3JNb2RlVmFsdWUoJ2xpbmVhcih0by1sLCAjNzkyOENBLCAjRkYwMDgwKScsICdsaW5lYXIodG8tciwgIzc5MjhDQSwgI0ZGMDA4MCknKTtcblxuICBjb25zdCBiYXNlU3R5bGUgPSB7XG4gICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgIGJvcmRlclJhZGl1czogJ2Z1bGwnLFxuICAgIGZvbnRTaXplOiAnbWQnLFxuICAgIHB4OiA0LFxuICAgIHB5OiAyLFxuICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgIGJveFNoYWRvdzogJ2xnJyxcbiAgfTtcblxuICBjb25zdCBidXR0b25TdHlsZSA9IHtcbiAgICAuLi5iYXNlU3R5bGUsXG4gICAgdmFyaWFudDogJ3NvbGlkJyxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyxcbiAgICBfaG92ZXI6IHtcbiAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgY29ubmVjdEJ1dHRvblN0eWxlID0ge1xuICAgIC4uLmJhc2VTdHlsZSxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4yKScsXG4gICAgX2hvdmVyOiB7XG4gICAgICBhbmltYXRpb246IGAke3B1bHNlQW5pbWF0aW9ufSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dGAsXG4gICAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAyNTUsIDI1NSwgMC4zKScsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGbGV4IGFzPVwiaGVhZGVyXCIgd2lkdGg9XCJmdWxsXCIgYWxpZ249XCJjZW50ZXJcIiBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIiBwPXs0fSBiZ0dyYWRpZW50PXtiZ0dyYWRpZW50fT5cbiAgICAgIDxCb3g+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvXCIgc3R5bGU9e3sgdGV4dERlY29yYXRpb246ICdub25lJyB9fT5cbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJnaG9zdFwiIHNpemU9XCJsZ1wiIGZvbnRTaXplPVwiMnhsXCIgZm9udFdlaWdodD1cImJvbGRcIiBjb2xvcj1cIndoaXRlXCI+XG4gICAgICAgICAgICBWb3VjaFNhZmVcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94PlxuICAgICAgICA8QnV0dG9uIHsuLi5idXR0b25TdHlsZX0gbXI9ezR9IG9uQ2xpY2s9eygpID0+IGFsZXJ0KCdDbGFpbSBmdW5jdGlvbmFsaXR5IGhlcmUnKX0+XG4gICAgICAgICAgQ2xhaW1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gey4uLmJ1dHRvblN0eWxlfSBtcj17NH0gb25DbGljaz17KCkgPT4gYWxlcnQoJ0F0dGVzdCBmdW5jdGlvbmFsaXR5IGhlcmUnKX0+XG4gICAgICAgICAgQXR0ZXN0XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHsuLi5jb25uZWN0QnV0dG9uU3R5bGV9IG9uQ2xpY2s9eygpID0+IGFsZXJ0KCdDb25uZWN0IHdhbGxldCBmdW5jdGlvbmFsaXR5IGhlcmUnKX0+XG4gICAgICAgICAgQ29ubmVjdCBXYWxsZXRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0ZsZXg+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iXSwibmFtZXMiOlsiQm94IiwiQnV0dG9uIiwiRmxleCIsIkxpbmsiLCJrZXlmcmFtZXMiLCJ1c2VDb2xvck1vZGVWYWx1ZSIsInB1bHNlQW5pbWF0aW9uIiwiSGVhZGVyIiwiYmdHcmFkaWVudCIsImJhc2VTdHlsZSIsImZvbnRXZWlnaHQiLCJib3JkZXJSYWRpdXMiLCJmb250U2l6ZSIsInB4IiwicHkiLCJjb2xvciIsImJveFNoYWRvdyIsImJ1dHRvblN0eWxlIiwidmFyaWFudCIsImJhY2tncm91bmQiLCJfaG92ZXIiLCJjb25uZWN0QnV0dG9uU3R5bGUiLCJhbmltYXRpb24iLCJhcyIsIndpZHRoIiwiYWxpZ24iLCJqdXN0aWZ5Q29udGVudCIsInAiLCJocmVmIiwic3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsInNpemUiLCJtciIsIm9uQ2xpY2siLCJhbGVydCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Header.tsx\n"));

/***/ })

});