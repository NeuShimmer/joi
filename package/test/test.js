"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.otherSchema = void 0;
var joiType_1 = __importDefault(require("../joiType"));
exports["default"] = joiType_1["default"].object({
    a: joiType_1["default"].string()["default"]('test'),
    b: joiType_1["default"].object({
        c: joiType_1["default"].number()["default"](3),
        d: joiType_1["default"].bool()["default"](false),
        e: joiType_1["default"].any()["default"](null)
    })["default"](),
    t: joiType_1["default"].number()["default"](5)
})["default"]();
exports.otherSchema = joiType_1["default"].object({
    test: joiType_1["default"].array().items(joiType_1["default"].string())["default"](['a', 'b', 'c']),
    run: joiType_1["default"].any()["default"](null)
});
