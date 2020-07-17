"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joiType_1 = __importDefault(require("./joiType"));
var joiType_2 = require("./joiType");
__createBinding(exports, joiType_2, "default", "Joi");
__createBinding(exports, joiType_2, "Type");
__createBinding(exports, joiType_2, "validate");
exports["default"] = joiType_1["default"];
