"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adRouter = void 0;
const express_1 = require("express");
const ad_record_1 = require("../records/ad.record");
exports.adRouter = (0, express_1.Router)()
    .get('/search/:name?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ads = yield ad_record_1.AdRecord.findAll((_a = req.params.name) !== null && _a !== void 0 ? _a : '');
    res.json(ads);
}))
    //:id musi być pod /search/:name żeby nie łapało 'search' jako id
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ad = yield ad_record_1.AdRecord.findOne(req.params.id);
    res.json(ad);
}))
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ad = new ad_record_1.AdRecord(req.body);
    yield ad.insert();
    res.json(ad);
}));
//# sourceMappingURL=ad.router.js.map