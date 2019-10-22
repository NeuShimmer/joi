"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joiType_1 = __importDefault(require("./joiType"));
var TypeJson_1 = require("./TypeJson");
exports.TypeJson = TypeJson_1["default"];
var joiType_2 = require("./joiType");
exports.Joi = joiType_2["default"];
exports.Type = joiType_2.Type;
exports.validate = joiType_2.validate;
exports["default"] = joiType_1["default"];
