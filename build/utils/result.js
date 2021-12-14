"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
function formatResult(data, errorMesg) {
    if (errorMesg) {
        return {
            successful: false,
            errorMesg: errorMesg,
            data: null
        };
    }
    return {
        successful: true,
        data: data
    };
}
exports.default = formatResult;
