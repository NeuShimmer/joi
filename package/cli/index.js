"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.start = void 0;
var yargs_1 = __importDefault(require("yargs"));
var util_1 = require("../util");
function start() {
    var argv = yargs_1["default"].command('generate', '生成某个schema的默认值', function (v) {
        return v.option('f', {
            type: 'string',
            alias: 'file',
            demandOption: true,
            describe: 'schema所在的文件',
            array: false
        }).option('s', {
            type: 'string',
            alias: 'schema',
            "default": 'default',
            description: 'schema的名称',
            array: false
        }).option('d', {
            type: 'string',
            alias: 'dist',
            "default": 'default.js',
            array: false,
            description: '目标文件路径'
        }).option('t', {
            type: 'string',
            alias: 'type',
            "default": 'js',
            array: false,
            choices: ['js', 'ts', 'json'],
            description: '输出类型'
        }).option('space', {
            type: 'number',
            "default": 2,
            array: false,
            description: '空格数'
        });
    }, function (v) {
        util_1.generateDefaultFileAndWrite(v.f, v.s, v.t, v.space, v.d).then(function (v) {
            console.log('done');
        })["catch"](function (v) {
            console.error(v);
        });
    }).help().argv;
}
exports.start = start;
