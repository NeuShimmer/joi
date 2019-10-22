"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("@hapi/joi"));
var __Joi = joi_1["default"];
exports["default"] = __Joi;
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
