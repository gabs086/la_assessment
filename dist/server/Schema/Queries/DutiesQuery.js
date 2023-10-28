"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_DUTIES = void 0;
const DutiesType_1 = require("server/Schema/TypeDef/DutiesType");
const Db_1 = __importDefault(require("server/Db"));
exports.GET_ALL_DUTIES = {
    type: DutiesType_1.DutiesType,
    resolve() {
        const data = Db_1.default.query('SELECT * FROM duties ORDER BY created DESC');
        return data;
    },
};
//# sourceMappingURL=DutiesQuery.js.map