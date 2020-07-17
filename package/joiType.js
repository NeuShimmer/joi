"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validate = exports.Type = exports.IsNotNull = void 0;
var joi_1 = __importDefault(require("@hapi/joi"));
var IsNotNull = /** @class */ (function () {
    function IsNotNull() {
        this._Z = true;
    }
    return IsNotNull;
}());
exports.IsNotNull = IsNotNull;
var Type = /** @class */ (function () {
    function Type() {
        this._A = {};
        this._B = {};
    }
    return Type;
}());
exports.Type = Type;
function validate(schema, value) {
    return schema.validate(value).value;
}
exports.validate = validate;
joi_1["default"]['combine'] = function (args) {
    return args;
};
var __Joi = joi_1["default"];
exports["default"] = __Joi;
