"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const AppError_1 = __importDefault(require("../modules/error/AppError"));
const globalErrorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let message = 'Validation Erroreee';
    let status = 500;
    let details = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof AppError_1.default) {
        status = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        details = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        details = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(status).json({
        success: false,
        message,
        statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || status,
        error: { details },
        stack: config_1.config.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
