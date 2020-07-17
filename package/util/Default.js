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
function JSON2JS(obj, space) {
    if (space === void 0) { space = 2; }
    return test(obj, space);
}
exports.JSON2JS = JSON2JS;
function getSpace(space, deep) {
    return " ".repeat(space).repeat(deep);
}
function test(obj, space, deep) {
    if (space === void 0) { space = 2; }
    if (deep === void 0) { deep = 0; }
    if (deep === 0) {
        return ("{" + test(obj, space, deep + 1) + "}");
    }
    var data = "\n";
    for (var key in obj) {
        switch (typeof obj[key]) {
            case 'string':
                data += "" + getSpace(space, deep) + key + ":\"" + obj[key] + "\",\n";
                break;
            case 'number':
            case 'boolean':
                data += "" + getSpace(space, deep) + key + ":" + obj[key] + ",\n";
                break;
            case 'undefined':
                data += "" + getSpace(space, deep) + key + ":null,\n";
                break;
            case 'object':
                if (!obj[key]) {
                    data += "" + getSpace(space, deep) + key + ":null,\n";
                    continue;
                }
                data += "" + getSpace(space, deep) + key + ":{" + test(obj[key], space, deep + 1) + getSpace(space, deep) + "},\n";
                break;
            default:
                data += '';
        }
    }
    return data.replace(/,\n$/, "\n");
}
