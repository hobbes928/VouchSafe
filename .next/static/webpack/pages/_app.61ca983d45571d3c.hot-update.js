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

/***/ "./components/WalletConnect.tsx":
/*!**************************************!*\
  !*** ./components/WalletConnect.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/_/_tagged_template_literal */ \"./node_modules/@swc/helpers/esm/_tagged_template_literal.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/icons */ \"./node_modules/@chakra-ui/icons/dist/index.mjs\");\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! web3 */ \"./node_modules/web3/lib/esm/index.js\");\n\nfunction _templateObject() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }\\n  70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }\\n  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }\\n\"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst pulseAnimation = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.keyframes)(_templateObject());\nconst WalletConnect = ()=>{\n    _s();\n    const [walletAddress, setWalletAddress] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\");\n    const [balance, setBalance] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\");\n    const [network, setNetwork] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\");\n    const [isConnected, setIsConnected] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.useToast)();\n    const bgGradient = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.useColorModeValue)(\"linear(to-r, #FF416C, #FF4B2B)\", \"linear(to-r, #8E2DE2, #4A00E0)\");\n    const textColor = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.useColorModeValue)(\"white\", \"gray.200\");\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        checkConnection();\n    }, []);\n    const checkConnection = async ()=>{\n        if (window.ethereum) {\n            const web3 = new web3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](window.ethereum);\n            const accounts = await web3.eth.getAccounts();\n            if (accounts.length > 0) {\n                setWalletAddress(accounts[0]);\n                setIsConnected(true);\n                fetchBalanceAndNetwork(web3, accounts[0]);\n            }\n        }\n    };\n    const fetchBalanceAndNetwork = async (web3, address)=>{\n        const balance = await web3.eth.getBalance(address);\n        setBalance(web3.utils.fromWei(balance, \"ether\"));\n        const networkId = await web3.eth.net.getId();\n        setNetwork(getNetworkName(networkId));\n    };\n    const getNetworkName = (networkId)=>{\n        switch(networkId){\n            case 1:\n                return \"Mainnet\";\n            case 11155111:\n                return \"Sepolia\";\n            default:\n                return \"Unknown\";\n        }\n    };\n    const connectWallet = async ()=>{\n        if (window.ethereum) {\n            try {\n                const web3 = new web3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](window.ethereum);\n                const accounts = await web3.eth.requestAccounts();\n                setWalletAddress(accounts[0]);\n                setIsConnected(true);\n                fetchBalanceAndNetwork(web3, accounts[0]);\n                toast({\n                    title: \"Wallet Connected\",\n                    description: \"Address: \".concat(accounts[0]),\n                    status: \"success\",\n                    duration: 5000,\n                    isClosable: true\n                });\n            } catch (error) {\n                toast({\n                    title: \"Connection Error\",\n                    description: error.message,\n                    status: \"error\",\n                    duration: 5000,\n                    isClosable: true\n                });\n            }\n        } else {\n            toast({\n                title: \"Ethereum object not found\",\n                description: \"Please install MetaMask!\",\n                status: \"error\",\n                duration: 5000,\n                isClosable: true\n            });\n        }\n    };\n    const disconnectWallet = ()=>{\n        setWalletAddress(\"\");\n        setBalance(\"\");\n        setNetwork(\"\");\n        setIsConnected(false);\n        toast({\n            title: \"Wallet Disconnected\",\n            status: \"info\",\n            duration: 5000,\n            isClosable: true\n        });\n    };\n    const switchNetwork = async (networkName)=>{\n        if (window.ethereum) {\n            try {\n                await window.ethereum.request({\n                    method: \"wallet_switchEthereumChain\",\n                    params: [\n                        {\n                            chainId: web3__WEBPACK_IMPORTED_MODULE_3__[\"default\"].utils.toHex(getNetworkId(networkName))\n                        }\n                    ]\n                });\n                setNetwork(networkName);\n            } catch (error) {\n                console.error(error);\n                toast({\n                    title: \"Network Switch Error\",\n                    description: error.message,\n                    status: \"error\",\n                    duration: 5000,\n                    isClosable: true\n                });\n            }\n        }\n    };\n    const getNetworkId = (networkName)=>{\n        switch(networkName){\n            case \"Mainnet\":\n                return 1;\n            case \"Sepolia\":\n                return 11155111;\n            default:\n                return 1;\n        }\n    };\n    const addressSummary = walletAddress ? \"\".concat(walletAddress.substring(0, 6), \"...\").concat(walletAddress.substring(walletAddress.length - 4)) : \"\";\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex, {\n        alignItems: \"center\",\n        ml: 4,\n        children: isConnected ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Menu, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.MenuButton, {\n                    as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button,\n                    rightIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.ChevronDownIcon, {}, void 0, false, {\n                        fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                        lineNumber: 138,\n                        columnNumber: 24\n                    }, void 0),\n                    bgGradient: bgGradient,\n                    color: textColor,\n                    _hover: {\n                        opacity: 0.8\n                    },\n                    _active: {\n                        opacity: 0.9\n                    },\n                    borderRadius: \"full\",\n                    px: 6,\n                    py: 2,\n                    fontWeight: \"bold\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex, {\n                        alignItems: \"center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                                w: 3,\n                                h: 3,\n                                borderRadius: \"full\",\n                                bg: isConnected ? \"green.400\" : \"red.400\",\n                                mr: 2,\n                                animation: isConnected ? \"\".concat(pulseAnimation, \" 2s infinite\") : \"none\"\n                            }, void 0, false, {\n                                fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                lineNumber: 149,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                                children: addressSummary\n                            }, void 0, false, {\n                                fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                lineNumber: 157,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                        lineNumber: 148,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                    lineNumber: 136,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.MenuList, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.MenuItem, {\n                            onClick: ()=>switchNetwork(\"Mainnet\"),\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex, {\n                                alignItems: \"center\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                                        w: 2,\n                                        h: 2,\n                                        borderRadius: \"full\",\n                                        bg: network === \"Mainnet\" ? \"green.400\" : \"red.400\",\n                                        mr: 2\n                                    }, void 0, false, {\n                                        fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                        lineNumber: 163,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                                        children: \"Mainnet\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                        lineNumber: 164,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                lineNumber: 162,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                            lineNumber: 161,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.MenuItem, {\n                            onClick: ()=>switchNetwork(\"Sepolia\"),\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex, {\n                                alignItems: \"center\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                                        w: 2,\n                                        h: 2,\n                                        borderRadius: \"full\",\n                                        bg: network === \"Sepolia\" ? \"green.400\" : \"red.400\",\n                                        mr: 2\n                                    }, void 0, false, {\n                                        fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                        lineNumber: 169,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                                        children: \"Sepolia (Testnet)\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                        lineNumber: 170,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                lineNumber: 168,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                            lineNumber: 167,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.MenuItem, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                                fontWeight: \"bold\",\n                                children: [\n                                    \"Balance: \",\n                                    parseFloat(balance).toFixed(4),\n                                    \" ETH\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                lineNumber: 174,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                            lineNumber: 173,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.MenuItem, {\n                            onClick: disconnectWallet,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                                color: \"red.500\",\n                                children: \"Disconnect Wallet\"\n                            }, void 0, false, {\n                                fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                                lineNumber: 177,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                            lineNumber: 176,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n                    lineNumber: 160,\n                    columnNumber: 11\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n            lineNumber: 135,\n            columnNumber: 9\n        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n            onClick: connectWallet,\n            bgGradient: bgGradient,\n            color: textColor,\n            _hover: {\n                opacity: 0.8\n            },\n            _active: {\n                opacity: 0.9\n            },\n            borderRadius: \"full\",\n            px: 6,\n            py: 2,\n            fontWeight: \"bold\",\n            animation: \"\".concat(pulseAnimation, \" 2s infinite\"),\n            children: \"Connect Wallet\"\n        }, void 0, false, {\n            fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n            lineNumber: 182,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/gm/Desktop/hallofshame/components/WalletConnect.tsx\",\n        lineNumber: 133,\n        columnNumber: 5\n    }, undefined);\n};\n_s(WalletConnect, \"tqdCm0yLhbqSlGxOKgSBWxgriNY=\", false, function() {\n    return [\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.useToast,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.useColorModeValue,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.useColorModeValue\n    ];\n});\n_c = WalletConnect;\n/* harmony default export */ __webpack_exports__[\"default\"] = (WalletConnect);\nvar _c;\n$RefreshReg$(_c, \"WalletConnect\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtZQUNMZ0YsU0FBU3RDO1lBQ1RuQixZQUFZQTtZQUNaNEMsT0FBTzNDO1lBQ1A0QyxRQUFRO2dCQUFFQyxTQUFTO1lBQUk7WUFDdkJDLFNBQVM7Z0JBQUVELFNBQVM7WUFBSTtZQUN4QkUsY0FBYTtZQUNiQyxJQUFJO1lBQ0pDLElBQUk7WUFDSkMsWUFBVztZQUNYSyxXQUFXLEdBQWtCLE9BQWZuRSxnQkFBZTtzQkFDOUI7Ozs7Ozs7Ozs7O0FBTVQ7R0EzTE1DOztRQUtVUixzREFBUUE7UUFFSEksK0RBQWlCQTtRQUNsQkEsK0RBQWlCQTs7O0tBUi9CSTtBQTZMTiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1dhbGxldENvbm5lY3QudHN4PzliZWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgTWVudSwgTWVudUJ1dHRvbiwgTWVudUl0ZW0sIE1lbnVMaXN0LCB1c2VUb2FzdCwgRmxleCwgVGV4dCwga2V5ZnJhbWVzLCB1c2VDb2xvck1vZGVWYWx1ZSB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25JY29uIH0gZnJvbSAnQGNoYWtyYS11aS9pY29ucyc7XG5pbXBvcnQgV2ViMyBmcm9tICd3ZWIzJztcblxuY29uc3QgcHVsc2VBbmltYXRpb24gPSBrZXlmcmFtZXNgXG4gIDAlIHsgYm94LXNoYWRvdzogMCAwIDAgMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7IH1cbiAgNzAlIHsgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApOyB9XG4gIDEwMCUgeyBib3gtc2hhZG93OiAwIDAgMCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7IH1cbmA7XG5cbmNvbnN0IFdhbGxldENvbm5lY3QgPSAoKSA9PiB7XG4gIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCBzZXRXYWxsZXRBZGRyZXNzXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2JhbGFuY2UsIHNldEJhbGFuY2VdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV0d29yaywgc2V0TmV0d29ya10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpc0Nvbm5lY3RlZCwgc2V0SXNDb25uZWN0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB0b2FzdCA9IHVzZVRvYXN0KCk7XG5cbiAgY29uc3QgYmdHcmFkaWVudCA9IHVzZUNvbG9yTW9kZVZhbHVlKCdsaW5lYXIodG8tciwgI0ZGNDE2QywgI0ZGNEIyQiknLCAnbGluZWFyKHRvLXIsICM4RTJERTIsICM0QTAwRTApJyk7XG4gIGNvbnN0IHRleHRDb2xvciA9IHVzZUNvbG9yTW9kZVZhbHVlKCd3aGl0ZScsICdncmF5LjIwMCcpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2hlY2tDb25uZWN0aW9uKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjaGVja0Nvbm5lY3Rpb24gPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5ldGhlcmV1bSkge1xuICAgICAgY29uc3Qgd2ViMyA9IG5ldyBXZWIzKHdpbmRvdy5ldGhlcmV1bSk7XG4gICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHdlYjMuZXRoLmdldEFjY291bnRzKCk7XG4gICAgICBpZiAoYWNjb3VudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXRXYWxsZXRBZGRyZXNzKGFjY291bnRzWzBdKTtcbiAgICAgICAgc2V0SXNDb25uZWN0ZWQodHJ1ZSk7XG4gICAgICAgIGZldGNoQmFsYW5jZUFuZE5ldHdvcmsod2ViMywgYWNjb3VudHNbMF0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBmZXRjaEJhbGFuY2VBbmROZXR3b3JrID0gYXN5bmMgKHdlYjMsIGFkZHJlc3MpID0+IHtcbiAgICBjb25zdCBiYWxhbmNlID0gYXdhaXQgd2ViMy5ldGguZ2V0QmFsYW5jZShhZGRyZXNzKTtcbiAgICBzZXRCYWxhbmNlKHdlYjMudXRpbHMuZnJvbVdlaShiYWxhbmNlLCAnZXRoZXInKSk7XG4gICAgY29uc3QgbmV0d29ya0lkID0gYXdhaXQgd2ViMy5ldGgubmV0LmdldElkKCk7XG4gICAgc2V0TmV0d29yayhnZXROZXR3b3JrTmFtZShuZXR3b3JrSWQpKTtcbiAgfTtcblxuICBjb25zdCBnZXROZXR3b3JrTmFtZSA9IChuZXR3b3JrSWQpID0+IHtcbiAgICBzd2l0Y2gobmV0d29ya0lkKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiAnTWFpbm5ldCc7XG4gICAgICBjYXNlIDExMTU1MTExOiByZXR1cm4gJ1NlcG9saWEnO1xuICAgICAgZGVmYXVsdDogcmV0dXJuICdVbmtub3duJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY29ubmVjdFdhbGxldCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAod2luZG93LmV0aGVyZXVtKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB3ZWIzID0gbmV3IFdlYjMod2luZG93LmV0aGVyZXVtKTtcbiAgICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB3ZWIzLmV0aC5yZXF1ZXN0QWNjb3VudHMoKTtcbiAgICAgICAgc2V0V2FsbGV0QWRkcmVzcyhhY2NvdW50c1swXSk7XG4gICAgICAgIHNldElzQ29ubmVjdGVkKHRydWUpO1xuICAgICAgICBmZXRjaEJhbGFuY2VBbmROZXR3b3JrKHdlYjMsIGFjY291bnRzWzBdKTtcbiAgICAgICAgdG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiBcIldhbGxldCBDb25uZWN0ZWRcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYEFkZHJlc3M6ICR7YWNjb3VudHNbMF19YCxcbiAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgIGR1cmF0aW9uOiA1MDAwLFxuICAgICAgICAgIGlzQ2xvc2FibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiBcIkNvbm5lY3Rpb24gRXJyb3JcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICBkdXJhdGlvbjogNTAwMCxcbiAgICAgICAgICBpc0Nsb3NhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG9hc3Qoe1xuICAgICAgICB0aXRsZTogXCJFdGhlcmV1bSBvYmplY3Qgbm90IGZvdW5kXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlBsZWFzZSBpbnN0YWxsIE1ldGFNYXNrIVwiLFxuICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgZHVyYXRpb246IDUwMDAsXG4gICAgICAgIGlzQ2xvc2FibGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzY29ubmVjdFdhbGxldCA9ICgpID0+IHtcbiAgICBzZXRXYWxsZXRBZGRyZXNzKCcnKTtcbiAgICBzZXRCYWxhbmNlKCcnKTtcbiAgICBzZXROZXR3b3JrKCcnKTtcbiAgICBzZXRJc0Nvbm5lY3RlZChmYWxzZSk7XG4gICAgdG9hc3Qoe1xuICAgICAgdGl0bGU6IFwiV2FsbGV0IERpc2Nvbm5lY3RlZFwiLFxuICAgICAgc3RhdHVzOiBcImluZm9cIixcbiAgICAgIGR1cmF0aW9uOiA1MDAwLFxuICAgICAgaXNDbG9zYWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzd2l0Y2hOZXR3b3JrID0gYXN5bmMgKG5ldHdvcmtOYW1lKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5ldGhlcmV1bSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgd2luZG93LmV0aGVyZXVtLnJlcXVlc3Qoe1xuICAgICAgICAgIG1ldGhvZDogJ3dhbGxldF9zd2l0Y2hFdGhlcmV1bUNoYWluJyxcbiAgICAgICAgICBwYXJhbXM6IFt7IGNoYWluSWQ6IFdlYjMudXRpbHMudG9IZXgoZ2V0TmV0d29ya0lkKG5ldHdvcmtOYW1lKSkgfV0sXG4gICAgICAgIH0pO1xuICAgICAgICBzZXROZXR3b3JrKG5ldHdvcmtOYW1lKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB0b2FzdCh7XG4gICAgICAgICAgdGl0bGU6IFwiTmV0d29yayBTd2l0Y2ggRXJyb3JcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICBkdXJhdGlvbjogNTAwMCxcbiAgICAgICAgICBpc0Nsb3NhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0TmV0d29ya0lkID0gKG5ldHdvcmtOYW1lKSA9PiB7XG4gICAgc3dpdGNoKG5ldHdvcmtOYW1lKSB7XG4gICAgICBjYXNlICdNYWlubmV0JzogcmV0dXJuIDE7XG4gICAgICBjYXNlICdTZXBvbGlhJzogcmV0dXJuIDExMTU1MTExO1xuICAgICAgZGVmYXVsdDogcmV0dXJuIDE7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFkZHJlc3NTdW1tYXJ5ID0gd2FsbGV0QWRkcmVzcyA/IGAke3dhbGxldEFkZHJlc3Muc3Vic3RyaW5nKDAsIDYpfS4uLiR7d2FsbGV0QWRkcmVzcy5zdWJzdHJpbmcod2FsbGV0QWRkcmVzcy5sZW5ndGggLSA0KX1gIDogJyc7XG5cbiAgcmV0dXJuIChcbiAgICA8RmxleCBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgbWw9ezR9PlxuICAgICAge2lzQ29ubmVjdGVkID8gKFxuICAgICAgICA8TWVudT5cbiAgICAgICAgICA8TWVudUJ1dHRvblxuICAgICAgICAgICAgYXM9e0J1dHRvbn1cbiAgICAgICAgICAgIHJpZ2h0SWNvbj17PENoZXZyb25Eb3duSWNvbiAvPn1cbiAgICAgICAgICAgIGJnR3JhZGllbnQ9e2JnR3JhZGllbnR9XG4gICAgICAgICAgICBjb2xvcj17dGV4dENvbG9yfVxuICAgICAgICAgICAgX2hvdmVyPXt7IG9wYWNpdHk6IDAuOCB9fVxuICAgICAgICAgICAgX2FjdGl2ZT17eyBvcGFjaXR5OiAwLjkgfX1cbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgICAgcHg9ezZ9XG4gICAgICAgICAgICBweT17Mn1cbiAgICAgICAgICAgIGZvbnRXZWlnaHQ9XCJib2xkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmxleCBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxCb3ggXG4gICAgICAgICAgICAgICAgdz17M30gXG4gICAgICAgICAgICAgICAgaD17M30gXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZnVsbFwiIFxuICAgICAgICAgICAgICAgIGJnPXtpc0Nvbm5lY3RlZCA/IFwiZ3JlZW4uNDAwXCIgOiBcInJlZC40MDBcIn0gXG4gICAgICAgICAgICAgICAgbXI9ezJ9XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uPXtpc0Nvbm5lY3RlZCA/IGAke3B1bHNlQW5pbWF0aW9ufSAycyBpbmZpbml0ZWAgOiAnbm9uZSd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxUZXh0PnthZGRyZXNzU3VtbWFyeX08L1RleHQ+XG4gICAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgICAgPC9NZW51QnV0dG9uPlxuICAgICAgICAgIDxNZW51TGlzdD5cbiAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXsoKSA9PiBzd2l0Y2hOZXR3b3JrKCdNYWlubmV0Jyl9PlxuICAgICAgICAgICAgICA8RmxleCBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPEJveCB3PXsyfSBoPXsyfSBib3JkZXJSYWRpdXM9XCJmdWxsXCIgYmc9e25ldHdvcmsgPT09ICdNYWlubmV0JyA/IFwiZ3JlZW4uNDAwXCIgOiBcInJlZC40MDBcIn0gbXI9ezJ9IC8+XG4gICAgICAgICAgICAgICAgPFRleHQ+TWFpbm5ldDwvVGV4dD5cbiAgICAgICAgICAgICAgPC9GbGV4PlxuICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXsoKSA9PiBzd2l0Y2hOZXR3b3JrKCdTZXBvbGlhJyl9PlxuICAgICAgICAgICAgICA8RmxleCBhbGlnbkl0ZW1zPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPEJveCB3PXsyfSBoPXsyfSBib3JkZXJSYWRpdXM9XCJmdWxsXCIgYmc9e25ldHdvcmsgPT09ICdTZXBvbGlhJyA/IFwiZ3JlZW4uNDAwXCIgOiBcInJlZC40MDBcIn0gbXI9ezJ9IC8+XG4gICAgICAgICAgICAgICAgPFRleHQ+U2Vwb2xpYSAoVGVzdG5ldCk8L1RleHQ+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgICA8TWVudUl0ZW0+XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCI+QmFsYW5jZToge3BhcnNlRmxvYXQoYmFsYW5jZSkudG9GaXhlZCg0KX0gRVRIPC9UZXh0PlxuICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXtkaXNjb25uZWN0V2FsbGV0fT5cbiAgICAgICAgICAgICAgPFRleHQgY29sb3I9XCJyZWQuNTAwXCI+RGlzY29ubmVjdCBXYWxsZXQ8L1RleHQ+XG4gICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgIDwvTWVudUxpc3Q+XG4gICAgICAgIDwvTWVudT5cbiAgICAgICkgOiAoXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtjb25uZWN0V2FsbGV0fVxuICAgICAgICAgIGJnR3JhZGllbnQ9e2JnR3JhZGllbnR9XG4gICAgICAgICAgY29sb3I9e3RleHRDb2xvcn1cbiAgICAgICAgICBfaG92ZXI9e3sgb3BhY2l0eTogMC44IH19XG4gICAgICAgICAgX2FjdGl2ZT17eyBvcGFjaXR5OiAwLjkgfX1cbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJmdWxsXCJcbiAgICAgICAgICBweD17Nn1cbiAgICAgICAgICBweT17Mn1cbiAgICAgICAgICBmb250V2VpZ2h0PVwiYm9sZFwiXG4gICAgICAgICAgYW5pbWF0aW9uPXtgJHtwdWxzZUFuaW1hdGlvbn0gMnMgaW5maW5pdGVgfVxuICAgICAgICA+XG4gICAgICAgICAgQ29ubmVjdCBXYWxsZXRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApfVxuICAgIDwvRmxleD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGxldENvbm5lY3Q7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJCb3giLCJCdXR0b24iLCJNZW51IiwiTWVudUJ1dHRvbiIsIk1lbnVJdGVtIiwiTWVudUxpc3QiLCJ1c2VUb2FzdCIsIkZsZXgiLCJUZXh0Iiwia2V5ZnJhbWVzIiwidXNlQ29sb3JNb2RlVmFsdWUiLCJDaGV2cm9uRG93bkljb24iLCJXZWIzIiwicHVsc2VBbmltYXRpb24iLCJXYWxsZXRDb25uZWN0Iiwid2FsbGV0QWRkcmVzcyIsInNldFdhbGxldEFkZHJlc3MiLCJiYWxhbmNlIiwic2V0QmFsYW5jZSIsIm5ldHdvcmsiLCJzZXROZXR3b3JrIiwiaXNDb25uZWN0ZWQiLCJzZXRJc0Nvbm5lY3RlZCIsInRvYXN0IiwiYmdHcmFkaWVudCIsInRleHRDb2xvciIsImNoZWNrQ29ubmVjdGlvbiIsIndpbmRvdyIsImV0aGVyZXVtIiwid2ViMyIsImFjY291bnRzIiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJsZW5ndGgiLCJmZXRjaEJhbGFuY2VBbmROZXR3b3JrIiwiYWRkcmVzcyIsImdldEJhbGFuY2UiLCJ1dGlscyIsImZyb21XZWkiLCJuZXR3b3JrSWQiLCJuZXQiLCJnZXRJZCIsImdldE5ldHdvcmtOYW1lIiwiY29ubmVjdFdhbGxldCIsInJlcXVlc3RBY2NvdW50cyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJzdGF0dXMiLCJkdXJhdGlvbiIsImlzQ2xvc2FibGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJkaXNjb25uZWN0V2FsbGV0Iiwic3dpdGNoTmV0d29yayIsIm5ldHdvcmtOYW1lIiwicmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImNoYWluSWQiLCJ0b0hleCIsImdldE5ldHdvcmtJZCIsImNvbnNvbGUiLCJhZGRyZXNzU3VtbWFyeSIsInN1YnN0cmluZyIsImFsaWduSXRlbXMiLCJtbCIsImFzIiwicmlnaHRJY29uIiwiY29sb3IiLCJfaG92ZXIiLCJvcGFjaXR5IiwiX2FjdGl2ZSIsImJvcmRlclJhZGl1cyIsInB4IiwicHkiLCJmb250V2VpZ2h0IiwidyIsImgiLCJiZyIsIm1yIiwiYW5pbWF0aW9uIiwib25DbGljayIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/WalletConnect.tsx\n"));

/***/ })

});