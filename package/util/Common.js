"use strict";
exports.__esModule = true;
exports.JSON2JS = exports.createDefaultObject = void 0;
function createDefaultObject(schema) {
    var _a = schema["default"]().validate(undefined), error = _a.error, value = _a.value;
    if (error)
        throw error;
    return value;
}
exports.createDefaultObject = createDefaultObject;
function JSON2JS(obj, space, deep) {
    if (space === void 0) { space = 2; }
    if (deep === void 0) { deep = 0; }
    if (deep === 0) {
        return ("{" + JSON2JS(obj, space, deep + 1) + "}");
    }
    var data = "\n";
    for (var key in obj) {
        switch (typeof obj[key]) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
                data += "" + getSpace(space, deep) + key + ":" + valueDecorate(obj[key]) + ",\n";
                break;
            case 'object':
                if (!obj[key]) {
                    data += "" + getSpace(space, deep) + key + ":null,\n";
                    continue;
                }
                if (obj[key] instanceof Array)
                    break;
                data += "" + getSpace(space, deep) + key + ":{" + JSON2JS(obj[key], space, deep + 1) + getSpace(space, deep) + "},\n";
                break;
            default:
                data += '';
        }
        if (obj[key] instanceof Array) {
            var arr = obj[key];
            data += "" + getSpace(space, deep) + key + ":[" + arr.map(valueDecorate).join() + "],\n";
        }
    }
    return data.replace(/,\n$/, "\n");
}
exports.JSON2JS = JSON2JS;
function valueDecorate(val) {
    switch (typeof val) {
        case 'string':
            return "\"" + val + "\"";
        case 'number':
        case 'boolean':
            return "" + val;
        case 'object':
            if (!val)
                return 'null';
            return "" + val;
        case 'undefined':
            return 'null';
        default:
            return "" + val;
    }
}
function getSpace(space, deep) {
    return " ".repeat(space).repeat(deep);
}
